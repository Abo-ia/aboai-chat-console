import React, { useEffect, useRef, useState, useMemo } from 'react';
import { fetchAuthSession } from "aws-amplify/auth";
import MessageService from '@src/services/messages.service';
import ConversationsHistoryService from '@src/services/conversationsHistory.service';

import useWindowSize from '@src/hooks/useWindowSize';

import Sidebar from "@src/components/Sidebar/Sidebar";
import LoadingComponent from "@src/components/LoadingComponent/LoadingComponent";
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        width > 768 // Visible inicialmente en modo desktop
    );
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsSidebarOpen(width > 768);
    }, [width]);

    const [isChatHistoryOpen, setIsChatHistoryOpen] = useState<boolean>(false);
    const [textInput, setTextInput] = useState<string>("");
    const [activeQuestion, setActiveQuestion] = useState<string>("");
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
                if (key.startsWith('CognitoIdentityServiceProvider') && key.endsWith('LastAuthUser')) {
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
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
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

            const validMessages = response.filter((message: Message) => message.chat_response !== undefined);

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
                    console.error('Error parsing chat_response:', parseError, 'for message:', message);
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
                    throw new Error("Failed to create conversation.");
                }
                setConversationMode('addMessage');
            }

            const response = await messageService.sendMessage(
                message,
                userId,
                currentConversationId,
                messages.map((msg) => msg.query).join(" "),
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
            <SidebarIcons
                openChatHistory={handleChangeChatHistory}
            />
            <div className="font-sans flex bg-custom-bg-main">
                {(isChatHistoryOpen || width > 541) && (
                    <Sidebar
                        loadConversation={loadConversation}
                        isSidebarOpen={isSidebarOpen}
                    />
                )}

                <div className="lg:w-1/2 mx-5 h-[88.8vh]">
                    <div className="flex flex-col lg:flex-row h-full  overflow-x-hidden">
                        <div className="flex flex-col flex-auto h-full">
                            <div className="flex flex-col flex-auto flex-shrink-0 h-full overflow-y-auto">
                                <div className="flex flex-col h-full overflow-y-auto mb-4">
                                    <div className="flex flex-col h-full">
                                        <div className="pt-4 gap-y-1">
                                            {messages.map((msg, index) => {
                                                const date = new Date(msg.timestamp).toLocaleTimeString();
                                                return (
                                                    <div key={index} className="flex items-start mb-4 text-sm">
                                                        <div className="w-full bg-custom-chat-bg p-4 rounded-lg border-[1px] border-[#30363d]">
                                                            <div className="flex flex-col gap-2.5">
                                                                <div className="flex flex-col leading-1.5">
                                                                    <div className="flex items-center space-x-2">
                                                                        <img
                                                                            className="w-8 h-8 rounded-full"
                                                                            src="https://cdn-icons-png.flaticon.com/512/2496/2496951.png"
                                                                            alt="User Avatar"
                                                                        />
                                                                        <span className="text-sm font-semibold text-custom-font-user">Tú</span>
                                                                        <span className="text-sm font-normal text-gray-500">{date}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="h-full pt-3 py-2 px-5 pb-3 rounded prose prose-sm bg-custom-chat-message">
                                                                    <p className="text-custom-font-main">{msg.query}</p>
                                                                </div>
                                                                <span className="text-sm font-normal text-gray-500 mt-1">Enviado</span>
                                                            </div>

                                                            <div className="flex flex-col gap-2.5">
                                                                <div className="flex flex-col leading-1.5">
                                                                    <div className="flex items-center space-x-2">
                                                                        <img
                                                                            className="w-8 h-8 rounded-full"
                                                                            src="https://cdn-icons-png.freepik.com/256/4712/4712106.png?semt=ais_hybrid"
                                                                            alt="Assistant Avatar"
                                                                        />
                                                                        <span className="text-sm font-semibold text-custom-font-user">Harvee</span>
                                                                        <span className="text-sm font-normal text-gray-500">{date}</span>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="h-full pt-3 px-5 pb-3 rounded prose prose-sm bg-custom-chat-message text-custom-font-main"
                                                                    dangerouslySetInnerHTML={{ __html: msg.response }}
                                                                />
                                                                <span className="text-sm font-normal text-gray-500 mt-1">Entregado</span>
                                                            </div>

                                                            {msg.references && msg.references.length > 0 && (
                                                                <button
                                                                    className="px-3 py-2 rounded mt-2 bg-custom-gradient text-white transition-colors duration-300 text-sm font-semibold"
                                                                    onClick={() => showReferences(msg.references, msg.query)}
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
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-center p-4 gap-4">
                                    <textarea
                                        placeholder="Escribe un mensaje..."
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                sendMessage(textInput);
                                                setTextInput("");
                                            }
                                        }}
                                        className="px-4 py-2 w-full h-14 rounded-lg bg-[#0d1117] text-white placeholder-gray-400  border-[1px] border-bg-custom-gradient focus:border-[3px] focus:border-transparent focus:ring-offset-2 focus:ring-offset-[#0d1117] focus:border-gradient-to-r from-green-500 to-teal-600"
                                    />


                                    <button
                                        onClick={() => {
                                            sendMessage(textInput);
                                            setTextInput("");
                                        }}
                                        className="flex items-center justify-center text-white h-10 px-4 rounded-lg bg-custom-gradient focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
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
                        </div>
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

                <GoogleDriveModal />
                <UploadFileModal />
                <SyncHistoryModal />
            </div>
        </div>
    );
};


const ReferencesModal: React.FC<{ content: Reference[]; onClose: () => void }> = ({ content, onClose }) => {
    const uniqueReferences = useMemo(() => {
        const seen = new Set();
        return content.filter(ref => {
            const identifier = `${ref.location.s3Location.uri}-${ref.content.text}`;
            if (seen.has(identifier)) {
                return false;
            }
            seen.add(identifier);
            return true;
        });
    }, [content]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="opacity-50 absolute inset-0" onClick={onClose}></div>
            <div className="rounded-lg p-8 shadow-lg z-10 max-w-2xl w-3/4">
                <h2 className="text-2xl font-bold mb-4">Referencias</h2>
                {uniqueReferences.map((ref: any, index: any) => (
                    <ReferenceItem key={index} content={ref} />
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

const ReferenceItem: React.FC<{ content: Reference }> = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const fileName = content.location.s3Location.uri.split('s3://iabogado-bucket/')[1];

    return (
        <div className="mb-1">
            <p
                className="flex items-center text-neutral-500 gap-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span
                    className="bg-neutral-100 text-neutral-800 px-3 py-2 rounded mt-2 hover:bg-neutral-200 transition-colors duration-300 text-sm font-semibold border-b border-indigo-200"
                >
                    {fileName.length > 30 ? `${fileName.slice(0, 30)}...` : fileName}
                </span>
            </p>
            {isOpen && (
                <div className="mt-2 h-96 overflow-y-auto">
                    <p>{content.content.text}</p>
                </div>
            )}
        </div>
    );
};

export default ChatView;