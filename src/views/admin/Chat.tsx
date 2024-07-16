import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import Sidebar from "../../components/Sidebar/index";
import Chat from "../../components/Chat/Chat";
import GoogleDriveModal from '@src/components/Modals/GoogleDriveModal';

const ChatView = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSignOut = () => {
        localStorage.removeItem('googleAccessToken');
        window.location.href = '/auth/signin';
    };

    return (
        <div className="font-sans antialiased h-screen flex">
            <Sidebar isSidebarOpen={isSidebarOpen} />

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
                <Chat />
            </div>

            <GoogleDriveModal />
        </div>
    )
}

export default ChatView;
