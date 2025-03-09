import React, { useEffect, useState } from 'react';
import SidebarIcons from '@src/components/Sidebar/SidebarIcons';
import ConversationsHistoryService from '@src/services/conversationsHistory.service';
import { fetchAuthSession } from 'aws-amplify/auth';

import logo from '@src/assets/Harvey_logo.png';

interface SidebarItemProps {
    conversationId: string;
    conversationName: string;
    getConversation: (id: string) => void;
    selected: boolean;
    setSelected: (id: string) => void;
    onDeleteConversation: (id: string) => void;
    onMarkFavorite: (id: string, isFavorite: boolean) => void;
    isFavorite: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    conversationId,
    conversationName,
    getConversation,
    selected,
    setSelected,
    onDeleteConversation,
    onMarkFavorite,
    isFavorite,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleClick = () => {
        setSelected(conversationId);
        getConversation(conversationId);
    };

    const handleMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const handleDeleteConversation = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDeleteConversation(conversationId);
        setIsMenuOpen(false);
    };

    const handleMarkFavoriteToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        onMarkFavorite(conversationId, isFavorite);
        setIsMenuOpen(false);
    };

    return (
        <div className="relative group block mb-1 text-custom-font-main  hover:rounded transition-all">
            <div
                className={`flex justify-between items-center cursor-pointer px-2 border-custom-base rounded-lg hover:bg-custom-secondary hover:text-white transition-all ${selected && 'bg-custom-primary text-white'}`}
                onClick={handleClick}
            >
                <div className="flex items-center  gap-2 flex-grow overflow-hidden">
                    {isFavorite && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-yellow-500 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                        </svg>
                    )}
                    <p className={`truncate pl-2`}>{conversationName}</p>
                </div>
                <span
                    className={`text-3xl mb-2  ${selected ? 'text-green-300' : 'text-gray-800 group-hover:text-green-300'}`}
                    onClick={handleMenuToggle}
                >
                    ...
                </span>
            </div>

            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                    <button
                        onClick={handleDeleteConversation}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm font-medium rounded-md hover:bg-custom-light transition-colors focus:outline-none focus:bg-gray-100 "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        Borrar conversación
                    </button>
                    <button
                        onClick={handleMarkFavoriteToggle}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm font-medium rounded-md hover:bg-custom-light transition-colors focus:outline-none focus:bg-gray-100 active:bg-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                        </svg>
                        {isFavorite ? 'Dejar de ser favorita' : 'Marcar como favorita'}
                    </button>
                </div>
            )}
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
    isFavorite: boolean;
}

const Sidebar: React.FC<ChatSidebarProps> = ({ loadConversation }) => {
    const [selectedId, setSelectedId] = useState<string>('');
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [favoriteItems, setFavoriteItems] = useState<MenuItem[]>([]);
    const [, setUserId] = useState('');

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
            getConversationsHistory(storedUserId);
        } else {
            console.error('User ID not found in local storage.');
        }
    }, []);

    const getConversation = async (conversationId: string) => {
        loadConversation(conversationId);
    };

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

            const sortedData = conversations.sort(
                (
                    a: { timestamp: string | number | Date },
                    b: { timestamp: string | number | Date },
                ) => {
                    const timestampA = new Date(a.timestamp).getTime();
                    const timestampB = new Date(b.timestamp).getTime();
                    return timestampB - timestampA;
                },
            );

            const favorites = sortedData.filter((item: { isFavorite: boolean }) => item.isFavorite);
            const nonFavorites = sortedData.filter(
                (item: { isFavorite: boolean }) => !item.isFavorite,
            );

            setFavoriteItems(
                favorites.map((item: { conversationId: string; conversation_name: string }) => ({
                    conversationId: item.conversationId,
                    conversation_name: item.conversation_name,
                    isFavorite: true,
                })),
            );

            setMenuItems(
                nonFavorites.map((item: { conversationId: string; conversation_name: string }) => ({
                    conversationId: item.conversationId,
                    conversation_name: item.conversation_name,
                    isFavorite: false,
                })),
            );
        } catch (error) {
            console.error('Sidebar: Error getting conversations history:', error);
        }
    };

    const handleDeleteConversation = (conversationId: string) => {
        setMenuItems(menuItems.filter((item) => item.conversationId !== conversationId));
        setFavoriteItems(favoriteItems.filter((item) => item.conversationId !== conversationId));
    };

    const handleMarkFavorite = (conversationId: string, isFavorite: boolean) => {
        if (isFavorite) {
            setFavoriteItems(
                favoriteItems.filter((item) => item.conversationId !== conversationId),
            );
            setMenuItems((prevItems) => [
                ...prevItems,
                {
                    conversationId,
                    conversation_name:
                        favoriteItems.find((item) => item.conversationId === conversationId)
                            ?.conversation_name || '',
                    isFavorite: false,
                },
            ]);
        } else {
            setMenuItems((prevItems) => {
                const item = prevItems.find((item) => item.conversationId === conversationId);
                if (item) {
                    item.isFavorite = true;
                    setFavoriteItems((prevFavorites) => [...prevFavorites, item]);
                    return prevItems.filter((item) => item.conversationId !== conversationId);
                }
                return prevItems;
            });
        }
    };

    return (
        <React.Fragment>
            <div
                className={`max-w-[20%] pt-6 transform border-r transition-transform duration-300`}
            >
                <div className="px-4 mb-2 text-gray-700 flex justify-between items-center">
                    <div className="text-custom-font-main">Apps</div>
                    <div>
                        <svg
                            className="fill-current h-4 w-4 opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                        </svg>
                    </div>
                </div>

                <div className="px-4">
                    <div className="text-custom-font-main mb-5 mt-3 font-semibold">
                        Historial de Chats
                    </div>
                    <div className="overflow-y-auto h-[55vh]">
                        {menuItems.map((item) => (
                            <SidebarItem
                                key={item.conversationId}
                                conversationId={item.conversationId}
                                conversationName={item.conversation_name}
                                getConversation={getConversation}
                                selected={selectedId === item.conversationId}
                                setSelected={setSelectedId}
                                onDeleteConversation={handleDeleteConversation}
                                onMarkFavorite={handleMarkFavorite}
                                isFavorite={item.isFavorite}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Sidebar;
