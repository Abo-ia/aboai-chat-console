import React from 'react'

import { AppContext } from '@src/context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const SidebarIcons = () => {
    const appContext = React.useContext(AppContext);
    const handleSignOut = () => {
        localStorage.clear();
        window.location.href = '/auth/signin';
    };

    
    return (
        <div className="text-purple-lighter flex flex-col justify-between h-full w-24 p-6 bg-custom-darkest transition-transform duration-300">
            <div>
                <div className="cursor-pointer mb-4">
                    <div
                        onClick={() => appContext?.setShowModal(true)}
                        className="h-10 w-10 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                        <img
                            src='https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png'
                            alt="Google Drive"
                        />
                    </div>
                    <div className="text-center text-white opacity-50 text-sm">&#8984;1</div>
                </div>
                <div className="cursor-pointer mb-4">
                    <div 
                        onClick={() => appContext?.setUploadFileShowModal(true)}
                        className="h-10 w-10 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                        <img
                            src='https://icons.iconarchive.com/icons/dtafalonso/win-10x/512/My-Files-icon.png'
                            alt="Slack"
                        />
                    </div>
                    <div className="text-center text-white opacity-50 text-sm">&#8984;2</div>
                </div>
                <div className="cursor-pointer mb-4">
                    <div 
                        onClick={() => appContext?.setSyncHistoryShowModal(true)}
                        className="h-10 w-10 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                        <img
                            src='https://cdn-icons-png.flaticon.com/512/5582/5582334.png'
                            alt="Slack"
                        />
                    </div>
                    <div className="text-center text-white opacity-50 text-sm">&#8984;3</div>
                </div>

                <div className="cursor-pointer">
                    <div className="bg-custom-base opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                        <svg className="fill-current h-10 w-10 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="cursor-pointer mt-auto">
                <div onClick={handleSignOut} className="bg-custom-dark h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-white h-6 w-6" />
                </div>
            </div>
        </div>
    )
}

export default SidebarIcons