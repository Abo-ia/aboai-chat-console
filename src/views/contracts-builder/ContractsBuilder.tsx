import React, { useState, useContext, useEffect } from 'react';

import { AppContext } from '@src/context/AppContext';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';
import LegalSectionBody from '@src/components/LegalSection/LegalSectionBody';

const ContractsBuilder: React.FC = () => {
    const [activeView, setActiveView] = useState<string>('Inicio');
    const appContext = useContext(AppContext);

    useEffect(() => {
        document.title = 'Abo.AI - Contratos';
    }, [])

    return (
        <div className="flex">
            {appContext?.isSidebarOpen || window.innerWidth > 768 ? (
                <Sidebar activeView={activeView} setActiveView={setActiveView} />
            ) : null}
            <div className="flex-1 flex flex-col">
                <Header />
                <LegalSectionBody activeView={activeView} />
            </div>
        </div>
    );
};

export default ContractsBuilder;
