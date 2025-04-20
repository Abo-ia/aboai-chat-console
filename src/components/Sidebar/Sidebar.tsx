import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import ConversationsHistoryService from '@src/services/conversationsHistory.service';
import { fetchAuthSession } from 'aws-amplify/auth';

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


const Sidebar = forwardRef<SidebarHandle, ChatSidebarProps>(
    ({ loadConversation }, ref) => {
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

        // ✅ Exponer la función refreshHistory
        useImperativeHandle(ref, () => ({
            refreshHistory: (customUserId?: string) => {
                const uid =
                    customUserId ||
                    (() => {
                        for (const key in localStorage) {
                            if (
                                key.startsWith('CognitoIdentityServiceProvider') &&
                                key.endsWith('LastAuthUser')
                            ) {
                                return localStorage.getItem(key);
                            }
                        }
                        return null;
                    })();

                if (uid) {
                    getConversationsHistory(uid);
                }
            },
        }));

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
                    (a: { timestamp: string | number | Date }, b: { timestamp: string | number | Date }) => {
                        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                    }
                );

                const favorites = sortedData.filter((item: { isFavorite: boolean }) => item.isFavorite);
                const nonFavorites = sortedData.filter((item: { isFavorite: boolean }) => !item.isFavorite);

                setFavoriteItems(
                    favorites.map((item: { conversationId: string; conversation_name: string }) => ({
                        conversationId: item.conversationId,
                        conversation_name: item.conversation_name,
                        isFavorite: true,
                    }))
                );

                setMenuItems(
                    nonFavorites.map((item: { conversationId: string; conversation_name: string }) => ({
                        conversationId: item.conversationId,
                        conversation_name: item.conversation_name,
                        isFavorite: false,
                    }))
                );
            } catch (error) {
                console.error('Sidebar: Error getting conversations history:', error);
            }
        };

        const handleDeleteConversation = (conversationId: string) => {
            setMenuItems((prev) => prev.filter((item) => item.conversationId !== conversationId));
            setFavoriteItems((prev) => prev.filter((item) => item.conversationId !== conversationId));
        };

        const handleMarkFavorite = (conversationId: string, isFavorite: boolean) => {
            if (isFavorite) {
                setFavoriteItems((prev) => prev.filter((item) => item.conversationId !== conversationId));
                setMenuItems((prev) => [
                    ...prev,
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
            <div className='shadow-lg bg-white rounded-lg w-full h-full'>
                <div className="h-full flex flex-col overflow-y-auto w-[90%] mx-auto">
                    <div className="text-gray-700 flex justify-between items-center">
                        <div className="text-custom-font-main">Apps</div>
                    </div>

                    <div className="">
                        <div className="text-custom-font-main my-5 font-semibold">
                            Historial de Chats
                        </div>
                        <div>
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
            </div>

        );
    }
);

export default Sidebar;
