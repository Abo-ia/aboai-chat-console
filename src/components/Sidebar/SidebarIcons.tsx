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
        <div className='flex shadow justify-end gap-7 mr-5 py-1 bg-gray-50 items-center cursor-pointer px-2 rounded-lg transition-all'>
            <div className="cursor-pointer ">
                <div
                    onClick={() => appContext?.setShowModal(true)}
                    className="h-8 w-8 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png'
                        alt="Google Drive"
                    />
                </div>
            </div>
            <div className="cursor-pointer ">
                <div
                    onClick={() => appContext?.setSyncHistoryShowModal(true)}
                    className="h-8 w-8 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/5582/5582334.png'
                        alt="Slack"
                    />
                </div>
            </div>
        </div>
    )
}

export default SidebarIcons