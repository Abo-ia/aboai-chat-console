import React, { useState } from 'react';
import { FiFolder, FiFile, FiUser, FiMoreVertical, FiHome, FiHardDrive, FiUsers, FiClock, FiStar, FiTrash, FiCloud, FiSearch, FiSettings } from 'react-icons/fi';

import { FileItem } from '@src/types/types';
import FileItemRow from '@src/components/Storage/FileItemRow';
import Sidebar from '@src/components/Storage/Sidebar';

const Header: React.FC = () => {
    const [optionsState, setOptionsState] = useState(false);

    const handleOptionsState = () => {
        setOptionsState(!optionsState);
    }
    return (
        <div className="bg-white p-4 shadow-md flex justify-between items-center">
            <div></div>
            <div className="relative inline-block text-left justify-end">
                <div>
                    <button
                        onClick={handleOptionsState}
                        type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <span>
                            <img
                                className="w-6 h-6 rounded-full"
                                src="https://cdn-icons-png.flaticon.com/512/2496/2496951.png"
                                alt="User Avatar"
                            />
                        </span>
                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {optionsState &&
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className="py-1" role="none">
                            <a href="/" className="block px-4 hover:bg-custom-base hover:text-white transition py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">Chat</a>
                            <a href="/almacenamiento" className="block px-4 hover:bg-custom-base hover:text-white transition py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">Almacenamiento</a>
                            <a href="#" className="block px-4 hover:bg-custom-base hover:text-white transition py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-1">Ajustes</a>
                            <form method="POST" action="#" role="none">
                                <button type="submit" className="block hover:bg-custom-base hover:text-white transition w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-3">Cerrar sesión</button>
                            </form>
                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default Header;