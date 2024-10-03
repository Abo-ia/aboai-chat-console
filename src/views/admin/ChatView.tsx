import React, { useEffect, useRef, useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { fetchAuthSession } from "aws-amplify/auth";
import MessageService from '@src/services/messages.service';
import ConversationsHistoryService from '@src/services/conversationsHistory.service';

import Sidebar from "@src/components/Sidebar/Sidebar";
import LoadingComponent from "@src/components/LoadingComponent/LoadingComponent";
import GoogleDriveModal from '@src/components/Modals/GoogleDriveModal';
import UploadFileModal from '@src/components/Modals/UploadFilesModal';
import SyncHistoryModal from '@src/components/Modals/SyncHistoryModal';
import PromptSidebar from '@src/components/Prompts/PromptsSidebar';

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        window.innerWidth > 768 ? true : false
    );
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [textInput, setTextInput] = useState<string>("");
    const [activeQuestion, setActiveQuestion] = useState<string>("");
    const [messages, setMessages] = useState<any[]>([]);
    const [conversationMode, setConversationMode] = useState('createConversation');
    const [conversationId, setConversationId] = useState('');
    const [userId, setUserId] = useState('');

    const [documentReferences, setDocumentReferences] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const [optionsState, setOptionsState] = useState(false);

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
            const responseBody = response

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

    const handleOptionsState = () => {
        setOptionsState(!optionsState);
    }

    const handleQueyChange = (query: string) => {
        setTextInput(query);
    }

    return (
        <div className="font-sans h-screen flex">
            {isSidebarOpen && (
                <Sidebar
                    loadConversation={loadConversation}
                    isSidebarOpen={isSidebarOpen}
                />
            )}

            <div className="flex-1 flex flex-col bg-white overflow-hidden">
                <div className="border-b flex px-6 py-2 items-center justify-between flex-none">
                    <div className='flex items-center'>
                        <button onClick={toggleSidebar} className="mr-4">
                            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M3 6h14v2H3V6zm0 4h14v2H3v-2zm0 4h14v2H3v-2z" />
                            </svg>
                        </button>
                        <div className="flex flex-col">
                            <h3 className="text-grey-darkest mb-1 font-extrabold">#general</h3>
                            <div className="text-grey-dark text-sm truncate">
                                {activeQuestion}
                            </div>
                        </div>
                    </div>
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                onClick={handleOptionsState}
                                type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                <span>
                                    <img
                                        className="w-6 h-6 rounded-full"
                                        src="https://cdn-icons-png.flaticon.com/512/2496/2496951.png"
                                        alt="User Avatar"
                                    />
                                </span>
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {optionsState &&
                            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                <div className="py-1" role="none">
                                    <a href="/" className="block hover:bg-custom-base hover:text-white transition px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">Chat</a>
                                    <a href="/almacenamiento" className="block hover:bg-custom-base hover:text-white transition px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">Almacenamiento</a>
                                    <a href="#" className="block px-4 hover:bg-custom-base hover:text-white transition py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-1">Ajustes</a>
                                    <form method="POST" action="#" role="none">
                                        <button type="submit" className="block hover:bg-custom-base hover:text-white transition w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-3">Cerrar sesión</button>
                                    </form>
                                </div>
                            </div>}
                    </div>
                </div>

                <div className="lg:w-[90%] w-[94%] mx-auto">
                    <div className="mx-auto h-[85vh]">
                        <div className="flex flex-row h-full w-full overflow-x-hidden">
                            <div className="flex flex-col flex-auto h-full">
                                <div className="flex flex-col flex-auto flex-shrink-0 h-full overflow-y-auto">
                                    <div className="flex flex-col h-full overflow-y-auto mb-4">
                                        <div className="flex flex-col h-full">
                                            <div className="gap-y-1">
                                                {messages.map((msg, index) => {
                                                    const date = new Date(msg.timestamp).toLocaleTimeString();
                                                    return (
                                                        <div key={index} className="flex items-start mb-4 text-sm">
                                                            <div className="w-full">
                                                                <div className="mt-1 p-3 rounded-lg">
                                                                    {/* Usuario */}
                                                                    <div className="flex items-start gap-2.5 mb-4">
                                                                        <img
                                                                            className="w-8 h-8 rounded-full"
                                                                            src="https://cdn-icons-png.flaticon.com/512/2496/2496951.png"
                                                                            alt="User Avatar"
                                                                        />
                                                                        <div className="flex flex-col leading-1.5">
                                                                            <div className="flex items-center space-x-2">
                                                                                <span className="text-sm font-semibold text-gray-900">Tú</span>
                                                                                <span className="text-sm font-normal text-gray-500">{date}</span>
                                                                            </div>
                                                                            <p className="py-2 text-gray-900">{msg.query}</p>
                                                                            <span className="text-sm font-normal text-gray-500">Enviado</span>
                                                                        </div>
                                                                    </div>
                                                                    {/* Asistente de IA */}
                                                                    <div className="flex flex-col gap-2.5">
                                                                        <div className="flex flex-col leading-1.5">
                                                                            <div className="flex items-center space-x-2">
                                                                                <img
                                                                                    className="w-8 h-8 rounded-full"
                                                                                    src="https://cdn.icon-icons.com/icons2/2136/PNG/512/google_assistant_icon_131681.png"
                                                                                    alt="Assistant Avatar"
                                                                                />
                                                                                <span className="text-sm font-semibold text-gray-900">Asistente</span>
                                                                                <span className="text-sm font-normal text-gray-500">{date}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="w-full h-full bg-gray-100 pt-6 py-2 px-5 pb-6 rounded prose prose-sm"
                                                                            dangerouslySetInnerHTML={{ __html: msg.response }}
                                                                        />

                                                                        <span className="text-sm font-normal text-gray-500 mt-1">Entregado</span>
                                                                    </div>
                                                                </div>
                                                                {msg.references && msg.references.length > 0 && (
                                                                    <button
                                                                        className="bg-custom-base text-white px-3 py-2 rounded mt-2 hover:bg-custom-lighter transition-colors duration-300 text-sm font-semibold"
                                                                        onClick={() => showReferences(msg.references, msg.query)}
                                                                    >
                                                                        Mostrar referencias.
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                <div ref={messagesEndRef}></div>
                                                {isLoading && <LoadingComponent />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-grow ml-4">
                                            <div className="relative w-full">
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
                                                    className="flex w-full p-4 h-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent2 focus:border-transparent hover:border-gray-400 resize-none shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="ml-4">
                                            <button
                                                onClick={() => {
                                                    sendMessage(textInput);
                                                    setTextInput("");
                                                }}
                                                className="flex items-center justify-center bg-slate-600 text-white h-10 px-4 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
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
                    </div>
                </div>
                {isModalOpen && (
                    <ReferencesModal content={documentReferences} onClose={closeModal} />
                )}
            </div>

            {isSidebarOpen && (
                <PromptSidebar
                    handleQueyChange={handleQueyChange}
                    loadConversation={loadConversation}
                    isSidebarOpen={isSidebarOpen}
                />
            )}

            <GoogleDriveModal />
            <UploadFileModal />
            <SyncHistoryModal />
        </div>
    )
}

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
            <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-8 shadow-lg z-10 max-w-2xl w-3/4">
                <h2 className="text-2xl font-bold mb-4">Referencias</h2>
                {uniqueReferences.map((ref, index) => (
                    <ReferenceItem key={index} content={ref} />
                ))}
                <button
                    onClick={onClose}
                    className="mt-4 bg-custom-base text-white px-4 py-2 rounded transition-colors"
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
                <div className="mt-2 w-full h-96 overflow-y-auto">
                    <p>{content.content.text}</p>
                </div>
            )}
        </div>
    );
};

export default ChatView;
