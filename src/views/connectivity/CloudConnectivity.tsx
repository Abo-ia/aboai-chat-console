import React, { useState, useContext, useEffect } from 'react';

import { AppContext } from '@src/context/AppContext';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

import GoogleDriveComponent from '@src/views/connectivity/sections/GoogleDriveComponent';
import CloudStorage from '@src/views/connectivity/sections/FileManager';
import LocalUploadComponent from '@src/views/connectivity/sections/LocalUploadComponent';

import 'react-toastify/dist/ReactToastify.css';

const CloudConnectivity: React.FC = () => {
    const [activeView, setActiveView] = useState<string>('ManageFiles');
    const appContext = useContext(AppContext);

    const viewsMap: Record<string, JSX.Element> = {
        GoogleDrive: <GoogleDriveComponent />,
        LocalUpload: <LocalUploadComponent />,
        ManageFiles: <CloudStorage />,
    };

    const menuOptions = [
        { id: 'ManageFiles', label: 'Administrar Archivos', icon: faGoogleDrive },
        { id: 'LocalUpload', label: 'Subir Archivos', icon: faCloudUploadAlt },
        { id: 'GoogleDrive', label: 'Conectar Drive', icon: faGoogleDrive },
    ];

    return (
        <div className="flex">
            {appContext?.isSidebarOpen || window.innerWidth > 768 ? (
                <Sidebar activeView={activeView} setActiveView={setActiveView} />
            ) : null}
            <div className="flex-1 flex flex-col">
                <Header />

                <div className="flex justify-center space-x-4 p-4 bg-white shadow-md">
                    {menuOptions.map((option) => (
                        <button
                            key={option.id}
                            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                                activeView === option.id
                                    ? 'bg-custom-secondary text-white'
                                    : 'bg-gray-200'
                            }`}
                            onClick={() => setActiveView(option.id)}
                        >
                            <FontAwesomeIcon icon={option.icon} />
                            {option.label}
                        </button>
                    ))}
                </div>

                <div className="p-6">{viewsMap[activeView]}</div>
            </div>
        </div>
    );
};

export default CloudConnectivity;
