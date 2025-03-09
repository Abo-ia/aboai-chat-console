import React, { useEffect, useRef, useState, useMemo } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import MessageService from '@src/services/messages.service';
import ConversationsHistoryService from '@src/services/conversationsHistory.service';
import { useOrganization } from '@src/context/OrganizationContext';

import useWindowSize from '@src/hooks/useWindowSize';
import UserIcon from '@src/assets/user-icon.png';
import Sidebar from '@src/components/Sidebar/Sidebar';
import LoadingComponent from '@src/components/LoadingComponent/LoadingComponent';
import GoogleDriveModal from '@src/components/Modals/GoogleDriveModal';
import UploadFileModal from '@src/components/Modals/UploadFilesModal';
import SyncHistoryModal from '@src/components/Modals/SyncHistoryModal';
import PromptSidebar from '@src/components/Prompts/PromptsSidebar';
import SidebarIcons from '@src/components/Sidebar/SidebarIcons';

type Message = {
    prompt: string;
    chat_response?: string;
    timestamp: string;
};

interface Reference {
    content: {
        text: string;
    };
    location: {
        s3Location: {
            uri: string;
        };
        type: string;
    };
    metadata: {
        [key: string]: string;
    };
}

type ChatDashboardProps = {
    conversation: any;
};

const ChatView: React.FC<ChatDashboardProps> = () => {
    const { width } = useWindowSize();
    const [isSidebarOpen, setIsSidebarOpen] = useState(width > 768);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { state } = useOrganization();
    const { activeOrganization } = state;

    useEffect(() => {
        setIsSidebarOpen(width > 768);
    }, [width]);

    const [isChatHistoryOpen, setIsChatHistoryOpen] = useState<boolean>(false);
    const [textInput, setTextInput] = useState<string>('');
    const [activeQuestion, setActiveQuestion] = useState<string>('');
    const [messages, setMessages] = useState<any[]>([]);
    const [conversationMode, setConversationMode] = useState('createConversation');
    const [conversationId, setConversationId] = useState('');
    const [userId, setUserId] = useState('');

    const [documentReferences, setDocumentReferences] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const getUserId = () => {
            for (const key in localStorage) {
                if (
                    key.startsWith('CognitoIdentityServiceProvider') &&
                    key.endsWith('LastAuthUser')
                ) {
                    return localStorage.getItem(key);
                }
            }
            return null;
        };
        const storedUserId = getUserId();
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('User ID not found in local storage.');
        }
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const loadConversation = async (conversationId: string) => {
        try {
            setMessages([]);
            const session = await fetchAuthSession();
            const idToken = session?.tokens?.idToken?.toString() as string;

            const messageService = new ConversationsHistoryService(idToken);
            const response = await messageService.getConversation(userId, conversationId);

            setConversationMode('addMessage');
            setConversationId(conversationId);

            const validMessages = response.filter(
                (message: Message) => message.chat_response !== undefined,
            );

            const sortedMessages = validMessages.sort((a: Message, b: Message) => {
                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(); // Ordenar por fecha ascendente
            });

            const messagePromises = sortedMessages.map(async (message: Message) => {
                if (!message.chat_response) {
                    console.error('chat_response is undefined for message:', message);
                    return null;
                }

                try {
                    const chatResponse = JSON.parse(message.chat_response);
                    const specificPart = chatResponse.chat_response;
                    const referencesList = chatResponse.retrieved_references;
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            references: referencesList,
                            query: message.prompt,
                            response: specificPart,
                            timestamp: message.timestamp,
                        },
                    ]);
                    return { prompt: message.prompt, references: referencesList };
                } catch (parseError) {
                    console.error(
                        'Error parsing chat_response:',
                        parseError,
                        'for message:',
                        message,
                    );
                    return null;
                }
            });

            await Promise.all(messagePromises);

            if (validMessages.length > 0) {
                const lastMessage = validMessages[validMessages.length - 1];
                setActiveQuestion(lastMessage.prompt);
                setDocumentReferences(lastMessage.references || []);
            }
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    };

    const sendMessage = async (message: string) => {
        setIsLoading(true);
        setActiveQuestion(textInput);
        setDocumentReferences([]);
        try {
            const session = await fetchAuthSession();
            const idToken = session?.tokens?.idToken?.toString() as string;

            const messageService = new MessageService(idToken);

            let currentConversationId = conversationId;

            if (conversationMode === 'createConversation') {
                const createResponse = await messageService.createConversation(userId, message);
                const createBody = JSON.parse(createResponse.body);
                currentConversationId = createBody.conversationId;
                setConversationId(currentConversationId);
                if (!currentConversationId) {
                    throw new Error('Failed to create conversation.');
                }
                setConversationMode('addMessage');
            }

            const response = await messageService.sendMessage(
                message,
                userId,
                currentConversationId,
                messages.map((msg) => msg.query).join(' '),
                activeOrganization?.knowledge_base_id || '',
            );
            const responseBody = response;

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    query: message,
                    response: response?.bedrock_response.chat_response,
                    references: response?.bedrock_response.retrieved_references,
                    timestamp: new Date().toISOString(),
                },
            ]);

            setDocumentReferences(responseBody?.bedrock_response.retrieved_references || []);
            setIsLoading(false);
        } catch (error) {
            console.error('Error sending message:', error);
            setIsLoading(false);
        }
    };

    const showReferences = (references: Reference[], query: string) => {
        setActiveQuestion(query);
        setDocumentReferences(references);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChangeChatHistory = () => setIsChatHistoryOpen(!isChatHistoryOpen);

    return (
        <div>
            <SidebarIcons openChatHistory={handleChangeChatHistory} />
            <div className="font-sans flex">
                <Sidebar loadConversation={loadConversation} isSidebarOpen={isSidebarOpen} />

                <div className="lg:w-1/2 mx-5 h-[88.8vh] flex flex-col">
                    <div className="flex-auto h-full overflow-y-auto space-y-4">
                        {messages.map((msg, index) => {
                            const date = new Date(msg.timestamp).toLocaleTimeString();
                            return (
                                <div key={index} className="flex flex-col text-sm">
                                    <div className="bg-custom-chat-bg p-4 rounded-lg space-y-3">
                                        {/* Mensaje del usuario */}
                                        <div className="flex items-center space-x-2">
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src={UserIcon}
                                                alt="User Avatar"
                                            />
                                            <span className="text-sm font-semibold text-custom-font-user">
                                                Tú
                                            </span>
                                            <span className="text-sm font-normal text-gray-500">
                                                {date}
                                            </span>
                                        </div>
                                        <div className="bg-custom-light p-4 rounded-lg shadow-sm border border-gray-300">
                                            <p className="text-gray-900 leading-relaxed">
                                                {msg.query}
                                            </p>
                                        </div>

                                        <span className="text-sm text-gray-500">Enviado</span>

                                        {/* Respuesta del asistente */}
                                        <div className="flex items-center space-x-2">
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Assessment_brain_icon.png"
                                                alt="Assistant Avatar"
                                            />
                                            <span className="text-sm font-semibold text-custom-font-user">
                                                Abo.AI
                                            </span>
                                            <span className="text-sm font-normal text-gray-500">
                                                {date}
                                            </span>
                                        </div>
                                        <div
                                            className="bg-custom-light p-4 border border-gray-300 rounded-lg shadow-sm text-gray-800 leading-relaxed prose prose-sm prose-a:text-blue-500 hover:prose-a:underline"
                                            dangerouslySetInnerHTML={{ __html: msg.response }}
                                        />

                                        <span className="text-sm text-gray-500">Entregado</span>
                                        <br />

                                        {msg.references?.length > 0 && (
                                            <button
                                                className="px-3 py-2 rounded bg-custom-primary text-white text-sm font-semibold transition-colors duration-300"
                                                onClick={() =>
                                                    showReferences(msg.references, msg.query)
                                                }
                                            >
                                                Mostrar referencias.
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef}></div>
                        {isLoading && <LoadingComponent />}
                    </div>

                    {/* Input y botón de enviar */}
                    <div className="flex items-center p-4 gap-4">
                        <textarea
                            placeholder="Escribe un mensaje..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage(textInput);
                                    setTextInput('');
                                }
                            }}
                            className="px-4 py-2 w-full h-20 rounded-lg border border-bg-custom-secondary focus:outline-none focus:ring-2 focus:ring-[#3e4b56] focus:ring-opacity-50 transition duration-300"
                        />
                        <button
                            onClick={() => {
                                sendMessage(textInput);
                                setTextInput('');
                            }}
                            className="flex items-center justify-center text-white h-10 px-4 rounded-lg bg-custom-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                        >
                            <span className="mr-2">Enviar</span>
                            <span className="transform rotate-45">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

                {isModalOpen && (
                    <ReferencesModal content={documentReferences} onClose={closeModal} />
                )}

                {!isChatHistoryOpen && width > 541 ? (
                    <PromptSidebar
                        loadConversation={loadConversation}
                        isSidebarOpen={isSidebarOpen}
                        handleQueyChange={sendMessage}
                    />
                ) : null}
            </div>
        </div>
    );
};

const ReferencesModal: React.FC<{ content: Reference[]; onClose: () => void }> = ({
    content,
    onClose,
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const uniqueReferences = useMemo(() => {
        const seen = new Set();
        return content.filter((ref) => {
            const identifier = `${ref.location.s3Location.uri}-${ref.content.text}`;
            if (seen.has(identifier)) {
                return false;
            }
            seen.add(identifier);
            return true;
        });
    }, [content]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
            <div className="opacity-50 absolute inset-0" onClick={onClose}></div>
            <div className="rounded-lg p-8 shadow-lg z-10 max-w-2xl w-3/4 bg-white">
                <h2 className="text-2xl font-bold mb-4">Referencias</h2>
                {uniqueReferences.map((ref, index) => (
                    <ReferenceItem
                        key={index}
                        content={ref}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                ))}
                <button
                    onClick={onClose}
                    className="mt-4 text-white px-4 py-2 rounded transition-colors"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

const ReferenceItem: React.FC<{ content: Reference; isOpen: boolean; onClick: () => void }> = ({
    content,
    isOpen,
    onClick,
}) => {
    return (
        <div className="mb-1">
            <p
                className="flex items-center justify-between text-neutral-600 cursor-pointer hover:text-neutral-800 transition-colors duration-300 bg-neutral-100 px-4 py-2 rounded-lg mt-2 hover:bg-indigo-100 transition-all duration-300 text-sm font-semibold shadow-sm border border-indigo-300"
                onClick={onClick}
            >
                Referencia Encontrada
                <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
            </p>

            {isOpen && (
                <div className="mt-2 h-96 overflow-y-auto">
                    <p>{content?.content?.text}</p>
                </div>
            )}
        </div>
    );
};


export default ChatView;
