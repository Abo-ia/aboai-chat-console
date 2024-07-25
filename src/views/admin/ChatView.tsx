import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import { fetchAuthSession } from "aws-amplify/auth";
import MessageService from '@src/services/messages.service';
import ConversationsHistoryService from '@src/services/conversationsHistory.service';

import Sidebar from "../../components/Sidebar/Sidebar";
import LoadingComponent from "@src/components/LoadingComponent/LoadingComponent";
import GoogleDriveModal from '@src/components/Modals/GoogleDriveModal';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Message {
    prompt: string;
    chatResponse?: string;
    references: Reference[];
    timeline: string;
}

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
    const [DocumentsReferencesNotFound, setDocumentsReferencesNotFound] = useState<any[]>([]);
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

    type Message = {
        prompt: string;
        chat_response?: string;
        timeline: string;
    };

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

            console.log('validMessages:', validMessages);

            const sortedMessages = validMessages.sort((a: Message, b: Message) => {
                return new Date(a.timeline).getTime() - new Date(b.timeline).getTime(); // Ordenar por fecha ascendente
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
                            timeline: message.timeline,
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

            const response = await messageService.sendMessage(message, userId, currentConversationId);
            console.log('response:', response);
            const body = JSON.parse(response.body);

            if (body.bedrock_response && body.bedrock_response.chat_response) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        references: body.bedrock_response.references_list,
                        query: textInput,
                        response: body.bedrock_response.chat_response,
                    },
                ]);
            } else {
                console.error("Unexpected response structure or missing chat_response:", body);
            }

            setDocumentReferences(body?.bedrock_response?.references_list);
            setIsLoading(false);
        } catch (error) {
            console.error("Error sending message:", error);
            setIsLoading(false);
        }
    };

    const showReferences = (references: string[], query: string) => {
        if (references.length === 0) {
            setActiveQuestion(query);
            setDocumentReferences([{ file_key: 'No references found for this message.', bucket_name: 'N/A', pages: [] }]);
        }
        else {
            setActiveQuestion(query);
            setDocumentReferences(references);
        }
    };

    const formatResponseAsBullets = (response: string) => {
        const [intro, listPart] = response.split(":");

        if (!listPart) {
            return response;
        }

        const items = listPart.split("-").filter((item) => item.trim() !== "");
        const bulletList = items.map((item) => `<li>${item.trim()}</li>`).join("");
        return `${intro}:<ul>${bulletList}</ul>`;
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="font-sans antialiased h-screen flex">
            <Sidebar
                loadConversation={loadConversation}
                isSidebarOpen={isSidebarOpen} />

            <div className="flex-1 flex flex-col bg-white overflow-hidden">
                <div className="border-b flex px-6 py-2 items-center flex-none">
                    <button onClick={toggleSidebar} className="mr-4">
                        <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M3 6h14v2H3V6zm0 4h14v2H3v-2zm0 4h14v2H3v-2z" />
                        </svg>
                    </button>
                    <div className="flex flex-col">
                        <h3 className="text-grey-darkest mb-1 font-extrabold">#general</h3>
                        <div className="text-grey-dark text-sm truncate">
                            Información general
                        </div>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <div className="relative">
                            <input type="search" placeholder="Buscar" className="appearance-none border border-grey rounded-lg pl-8 pr-4 py-2" />
                            <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="col-chat-area w-1/3 grow h-[91vh]">
                        <div className="flex flex-row h-full w-full overflow-x-hidden">
                            <div className="flex flex-col flex-auto h-full p-6">
                                <div className="flex flex-col flex-auto flex-shrink-0 h-full p-4">
                                    <div className="flex flex-col h-full overflow-x-auto relative mb-4">
                                        <div className="flex flex-col h-full start-of-life">
                                            <div className="gap-y-2">
                                                {messages.map((msg, index) => (
                                                    <div key={index} className={`flex items-start mb-4 text-sm`}>
                                                        <img
                                                            src='https://cdn.icon-icons.com/icons2/2136/PNG/512/google_assistant_icon_131681.png'
                                                            className="w-10 h-10 rounded-full mr-3"
                                                            alt='Avatar'
                                                        />
                                                        <div className={`flex-1 overflow-hidden`}>
                                                            <div>
                                                                <span className="font-bold">...</span>
                                                                <span className="text-grey text-xs ml-2">{new Date(msg.timeline).toLocaleTimeString()}</span>
                                                            </div>
                                                            <div className="mt-1 p-3 bg-gray-100 rounded-lg shadow-sm">
                                                                <p className="text-black leading-normal"><strong>Pregunta:</strong> {msg.query}</p>
                                                                <p className="text-black leading-normal mt-1"><strong>Respuesta:</strong> {msg.response}</p>
                                                            </div>
                                                            {msg.references && msg.references.length > 0 && (
                                                                <button
                                                                    className="bg-indigo-100 text-neutral-800 px-3 py-2 rounded mt-2 hover:bg-indigo-200 transition-colors duration-300 text-sm font-semibold"
                                                                >
                                                                    Mostrar referencias.
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                <div ref={messagesEndRef}></div>
                                                {isLoading && <LoadingComponent />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-grow ml-4">
                                            <div className="relative w-full">
                                                <textarea
                                                    placeholder="Type a message..."
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
                                                <span className="mr-2">Send</span>
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
                    <Modal content={documentReferences} onClose={closeModal} />
                )}
            </div>

            <GoogleDriveModal />
        </div>
    )
}

const Modal: React.FC<{ content: Reference[]; onClose: () => void }> = ({ content, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
        <div className="bg-white rounded-lg p-8 shadow-lg z-10 max-w-2xl w-3/4">
            <h2 className="text-2xl font-bold mb-4">Referencias</h2>
            {content.map((ref, index) => (
                <ReferenceItem key={index} content={ref} />
            ))}
            <button
                onClick={onClose}
                className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
                Cerrar
            </button>
        </div>
    </div>
);

const ReferenceItem: React.FC<{ content: Reference }> = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const fileName = content.location.s3Location.uri.split('s3://iabogado-bucket/')[1];

    return (
        <div className="mb-1">
            <p
                className="flex items-center text-neutral-500 gap-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                <span
                    className="bg-neutral-100 text-neutral-800 px-3 py-2 rounded mt-2 hover:bg-neutral-200 transition-colors duration-300 text-sm font-semibold"
                >
                    {fileName}
                </span>
            </p>
            {isOpen && <p className="mt-2">{content.content.text}</p>}
        </div>
    );
};

export default ChatView;
