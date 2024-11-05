import React, { useState } from 'react';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';
import ChatView from '@src/components/Chat/ChatView';

const AIChat: React.FC = () => {
    const [activeView, setActiveView] = useState<string>('Inicio');

    return (
        <div className="flex">
            <Sidebar
                activeView={activeView}
                setActiveView={setActiveView}
            />
            <div className="flex-1 flex flex-col">
                <Header />
                <ChatView conversation={""} />
            </div>
        </div>
    )
};

export default AIChat;