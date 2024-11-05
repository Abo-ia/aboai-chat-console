import React, { useState } from 'react';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';
import LegalSectionBody from '@src/components/LegalSection/LegalSectionBody';


const ContractsBuilder: React.FC = () => {
    const [activeView, setActiveView] = useState<string>('Inicio');

    return (
        <div className="flex">
            <Sidebar
                activeView={activeView}
                setActiveView={setActiveView}
            />
            <div className="flex-1 flex flex-col">
                <Header />
                <LegalSectionBody activeView={activeView} />
            </div>
        </div>
    );
};

export default ContractsBuilder;