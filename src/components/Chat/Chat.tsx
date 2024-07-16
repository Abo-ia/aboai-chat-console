import React, { useState, useEffect } from 'react';
import MessageService from '../../services/messages.service';
import { FaCircleNotch } from 'react-icons/fa';


interface Message {
    sender: string;
    text: string;
}

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const messageService = new MessageService();

    const fetchMessages = async () => {
        if (input.trim() === '') return;

        const newMessages: Message[] = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        setIsLoading(true);

        const response = await messageService.sendMessage(input);

        setIsLoading(false);

        const llmMessage = response.bedrock_response.output.text;
        setMessages([...newMessages, { sender: 'llm', text: llmMessage }]);
    };

    return (
        <React.Fragment>
            <div className="px-6 py-4 flex-1 overflow-y-scroll">
                {messages.map((msg, index) => (
                    <div key={index} className="flex items-start mb-4 text-sm">
                        <img
                            src={
                                msg.sender === 'user'
                                    ? 'https://cdn-icons-png.flaticon.com/256/149/149071.png'
                                    : 'https://cdn.icon-icons.com/icons2/2136/PNG/512/google_assistant_icon_131681.png'
                            }
                            className="w-10 h-10 rounded mr-3"
                            alt={msg.sender === 'user' ? 'User Avatar' : 'LLM Avatar'}
                        />
                        <div className="flex-1 overflow-hidden">
                            <div>
                                <span className="font-bold">{msg.sender === 'user' ? 'Tú' : 'IAbogado'}</span>
                                <span className="text-grey text-xs ml-2">{new Date().toLocaleTimeString()}</span>
                            </div>
                            <p className="text-black leading-normal">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <LoadingComponent />
                )}
            </div>
            <div className="pb-6 px-4 flex-none">
                <div className="flex rounded-lg border-[1px] border-gray-400 overflow-hidden">
                    <span className="text-3xl text-gray-400 border-r-2 border-gray-400 p-2">
                        <svg className="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z" />
                        </svg>
                    </span>
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        className="w-full px-4 py-2"
                        placeholder="Message #general"
                    />
                    <button
                        onClick={fetchMessages}
                        className="bg-[#072E33] text-white px-4 py-2 hover:bg-[#05161A] transition-colors duration-300"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Chat;



const LoadingComponent: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const messages = [
        "Recuperando documentos relevantes",
        "Analizando contenido",
        "Sintetizando respuesta",
        "Finalizando salida"
    ];

    const totalDuration = 18000;
    const messageDuration = totalDuration / messages.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, messageDuration);

        return () => clearInterval(interval);
    }, [messageDuration]);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <FaCircleNotch className="text-neutral-800 animate-spin text-3xl" />
                </div>
                <h2 className="text-lg font-bold text-center text-gray-800 mb-4">
                    Procesando solicitud
                </h2>
                <ul className="space-y-2 text-center">
                    {messages.map((message, index) => (
                        <li key={index} className={index === messageIndex ? "text-green-700 font-semibold flex items-center justify-center" : "text-gray-600"}>
                            {message}
                            {index === messageIndex && (
                                <span className="ml-2 animate-pulse text-green-600">
                                    <FaCircleNotch className="animate-spin" />
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
