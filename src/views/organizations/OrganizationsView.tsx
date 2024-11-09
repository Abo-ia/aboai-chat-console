import React, { useState } from 'react';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';
import ChatView from '@src/components/Chat/ChatView';
import Organizations from '@src/components/Organizations/Organizations';

const OrganizationsView: React.FC = () => {
    const [activeView, setActiveView] = useState<string>('Inicio');

    return (
        <div className="flex">
            <Sidebar
                activeView={activeView}
                setActiveView={setActiveView}
            />
            <div className="flex-1 flex flex-col">
                <Header />
                <Organizations/>
            </div>
        </div>
    )
};

export default OrganizationsView;