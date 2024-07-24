import React from 'react';

const ChatHistory = () => {
    const chatHistory = [
        { id: 1, name: "Conversación 1", lastMessage: "Hola, ¿cómo estás?" },
        { id: 2, name: "Conversación 2", lastMessage: "¿Puedes ayudarme con un proyecto?" },
        { id: 3, name: "Conversación 3", lastMessage: "Claro, ¿en qué necesitas ayuda?" },
    ];

    return (
        <div className={`bg-indigo-darker text-purple-lighter flex-none w-64 pb-6 transform transition-transform duration-300 bg-custom-dark`}>
            <div className="text-white mb-2 mt-3 px-4 flex justify-between">
                <div className="flex-auto">
                    <h1 className="font-semibold text-xl leading-tight mb-1 truncate">IAbogado</h1>
                    <div className="flex items-center mb-6">
                        <span className="bg-green rounded-full block w-2 h-2 mr-2"></span>
                        <span className="text-white opacity-50 text-sm">Tú</span>
                    </div>
                </div>
                <div>
                    <svg className="h-6 w-6 fill-current text-white opacity-25" viewBox="0 0 20 20">
                        <path d="M14 8a4 4 0 1 0-8 0v7h8V8zM8.027 2.332A6.003 6.003 0 0 0 4 8v6l-3 2v1h18v-1l-3-2V8a6.003 6.003 0 0 0-4.027-5.668 2 2 0 1 0-3.945 0zM12 18a2 2 0 1 1-4 0h4z" fillRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="px-4 mb-2 text-white flex justify-between items-center cursor-pointer transition-colors duration-300 py-2">
                <button className='bg-indigo-700 text-white px-4 py-2 hover:bg-indigo-900 transition-colors duration-300 rounded border border-custom-dark w-full'>
                    Nueva conversación
                </button>
            </div>
            <div>
                <div className="px-4 mb-2 text-white flex justify-between items-center">
                    <div className="opacity-75">Apps</div>
                    <div>
                        <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="px-4">
                <div className="text-white mb-2 mt-3">Historial de Chats</div>
                {chatHistory.map((chat) => (
                    <div key={chat.id} className="mb-2 flex justify-between items-center cursor-pointer transition-colors duration-300 py-2 px-4 hover:bg-indigo-700 rounded-lg">
                        <div className="text-white">
                            <div className="font-semibold">{chat.name}</div>
                            <div className="text-sm opacity-75">{chat.lastMessage}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatHistory;
