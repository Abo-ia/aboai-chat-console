import React, { useEffect, useState } from 'react'
import SidebarIcons from '@src/components/Sidebar/SidebarIcons';
import ConversationsHistoryService from '@src/services/conversationsHistory.service';
import { fetchAuthSession } from "aws-amplify/auth";

type ChatSidebarProps = {
    loadConversation: (conversationId: string) => void;
    isSidebarOpen: boolean;
};

interface IPrompt {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

const PromptSidebar: React.FC<ChatSidebarProps> = () => {
    const [prompts, setPrompts] = useState<IPrompt[]>([
        {
            id: '1',
            title: 'Puedes hablar sobre tu experiencia en el trabajo',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '2',
            title: '¿Qué te gusta hacer en tu tiempo libre?',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '3',
            title: '¿Cuál es tu comida favorita?',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '4',
            title: 'Prompt 4',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '5',
            title: 'Prompt 5',
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ]);

    return (
        <React.Fragment>
            <div className={`bg-custom-dark text-purple-lighter flex-none w-[300px] py-6 transform transition-transform duration-300 bg-custom-dark`}>
                <div className="px-4 py-10 mb-2 text-white flex justify-between items-center cursor-pointer transition-colors duration-300 py-2">
                    <button
                        onClick={() => window.location.reload()}
                        className='bg-custom-lighter text-white px-4 py-2 transition-colors duration-300 rounded border border-custom-dark w-full'>
                        Nuevo Prompt
                    </button>
                </div>
                <div>
                    <div className="px-4 mb-2 text-white flex justify-between items-center">
                        <div className="opacity-75">
                            Prompts Recientes
                        </div>
                        <div>
                            <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="px-4 mb-2">
                    {prompts.map((prompt: IPrompt) => {
                        return (
                            <div 
                                key={prompt.id}
                                className="mb-2 flex justify-between items-center cursor-pointer px-4 rounded-lg transition-all bg-custom-base text-white">
                                <p className="truncate">{prompt.title}</p>
                                <span className="text-3xl mb-2 text-green-300">...</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default PromptSidebar