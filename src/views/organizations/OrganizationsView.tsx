import React, { useState, useEffect } from 'react';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';
import ChatView from '@src/components/Chat/ChatView';
import OrganizationWrapped from '@src/components/Organizations/OrganizationWrapped';

const OrganizationsView: React.FC = () => {
    const [activeView, setActiveView] = useState<string>('Inicio');

    useEffect(() => {
        document.title = '[TBD] - Organizaciones';
    }, [])

    return (
        <div className="flex">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <div className="flex-1 flex flex-col">
                <Header />
                <OrganizationWrapped />
            </div>
        </div>
    );
};

export default OrganizationsView;
