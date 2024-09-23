import React, { useEffect, useState } from 'react'
import SidebarIcons from '@src/components/Sidebar/SidebarIcons';
import ConversationsHistoryService from '@src/services/conversationsHistory.service';
import { fetchAuthSession } from "aws-amplify/auth";


interface SidebarItemProps {
    conversationId: string;
    conversationName: string;
    getConversation: (id: string) => void;
    selected: boolean;
    setSelected: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    conversationId,
    conversationName,
    getConversation,
    selected,
    setSelected }) => {

    const handleClick = () => {
        setSelected(conversationId);
        getConversation(conversationId);
    };

    return (
        <div className="relative group block mb-1">
            <div
                className={`flex justify-between items-center cursor-pointer px-4 py-2 rounded-lg transition-all ${selected ? 'bg-custom-base text-white' : 'group-hover:bg-custom-base'}`}
                onClick={handleClick}
            >
                <p className={`truncate ${selected ? 'text-white' : 'text-white'}`}>{conversationName}</p>
                <span className={`text-3xl mb-2 ${selected ? 'text-green-300' : 'text-gray-800 group-hover:text-green-300'}`}>...</span>
            </div>
        </div>
    );
};

type ChatSidebarProps = {
    loadConversation: (conversationId: string) => void;
    isSidebarOpen: boolean;
};

interface MenuItem {
    conversationId: string;
    conversation_name: string;
}

const Sidebar: React.FC<ChatSidebarProps> = ({ loadConversation, }) => {
    const [selectedId, setSelectedId] = useState<string>('');
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [, setUserId] = useState('');


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
            getConversationsHistory(storedUserId);
        } else {
            console.error('User ID not found in local storage.');
        }
    }, []);

    const getConversation = async (conversationId: string) => {
        loadConversation(conversationId);
    }

    const getConversationsHistory = async (userId: string) => {
        try {
            const session = await fetchAuthSession();
            const idToken = session?.tokens?.idToken?.toString() as string;

            const messageService = new ConversationsHistoryService(idToken);
            const response = await messageService.getConversationsHistory(userId);

            let conversations = [];
            if (response && response.body) {
                const responseBody = JSON.parse(response.body);
                conversations = responseBody;
            }

            const sortedData = conversations.sort((a: { timestamp: string | number | Date; }, b: { timestamp: string | number | Date; }) => {
                const timestampA = new Date(a.timestamp).getTime();
                const timestampB = new Date(b.timestamp).getTime();
                return timestampB - timestampA;
            });
            setMenuItems(sortedData.map((item: { conversationId: string, conversation_name: string }) => ({
                conversationId: item.conversationId,
                conversation_name: item.conversation_name,
            })));

        } catch (error) {
            console.error('Sidebar: Error getting conversations history:', error);
        }
    };

    return (
        <React.Fragment>
            <SidebarIcons />

            <div className={`bg-indigo-darker text-purple-lighter flex-none w-64 pb-6 transform transition-transform duration-300 bg-custom-dark`}>
                <div className="text-white mb-2 mt-3 px-4 flex justify-between">
                    <div className="flex-auto">
                        <h1 className="font-semibold text-xl leading-tight mb-1 truncate">Harvee</h1>
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
                    <button
                        onClick={() => window.location.reload()}
                        className='bg-custom-base text-white px-4 py-2 transition-colors duration-300 rounded border border-custom-dark w-full'>
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
                    <div className="text-white mb-10 mt-3">Historial de Chats</div>
                    <div className="overflow-y-auto">
                        {menuItems.map((item) => (
                            <SidebarItem
                                key={item.conversationId}
                                conversationId={item.conversationId}
                                conversationName={item.conversation_name}
                                getConversation={getConversation}
                                selected={selectedId === item.conversationId}
                                setSelected={setSelectedId}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Sidebar