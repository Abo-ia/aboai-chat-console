import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '@src/context/AppContext';

import useWindowSize from '@src/hooks/useWindowSize';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';
import ChatView from '@src/components/Chat/ChatView';

const AIChat: React.FC = () => {
    const [activeView, setActiveView] = useState<string>('Inicio');
    const appContext = useContext(AppContext);

    useEffect(() => {
        document.title = '[TBD] - Chat';
    }, [])

    return (
        <div className="flex h-screen">
            {appContext?.isSidebarOpen || window.innerWidth > 768 ? (
                <Sidebar activeView={activeView} setActiveView={setActiveView} />
            ) : null}
            <div className="flex-1 flex flex-col">
                <Header />
                <ChatView conversation={''} />
            </div>
        </div>
    );
};

export default AIChat;
