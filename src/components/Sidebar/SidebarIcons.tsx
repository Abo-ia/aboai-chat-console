import React from 'react';

import { AppContext } from '@src/context/AppContext';
import { BsChatSquareDotsFill } from 'react-icons/bs';

interface SidebarIconsProps {
    openChatHistory: () => void;
}

const SidebarIcons: React.FC<SidebarIconsProps> = (props) => {
    const appContext = React.useContext(AppContext);
    const { openChatHistory } = props;

    return (
        <div className="flex shadow justify-between gap-7 py-2 bg-custom-bg-main items-center cursor-pointer px-5 transition-all border-y">
            {/* <BsChatSquareDotsFill 
                onClick={openChatHistory}
                className='text-2xl text-gray-500 hover:text-gray-700'
            />

            <div className='flex gap-3'>
                <div
                    onClick={() => appContext?.setShowModal(true)}
                    className="h-8 w-8 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png'
                        alt="Google Drive"
                    />
                </div>
            </div> */}
        </div>
    );
};

export default SidebarIcons;
