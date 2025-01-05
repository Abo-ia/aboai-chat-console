import React, { useState, useContext } from 'react';
import { AppContext } from '@src/context/AppContext';

const Header: React.FC = () => {
    const appContext = useContext(AppContext);
    const [optionsState, setOptionsState] = useState(false);
    const [hamburgerMenuState, setHamburgerMenuState] = useState(false);

    const handleOptionsState = () => {
        setOptionsState(!optionsState);
    };

    return (
        <div className="bg-custom-bg-main p-4 flex justify-between lg:justify-end items-center">
            <button
                onClick={() => {
                    appContext?.setIsSidebarOpen(!appContext?.isSidebarOpen);
                }}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300"
                aria-controls="mobile-menu"
                aria-expanded={hamburgerMenuState}
            >
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={hamburgerMenuState ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>

            {/* User Dropdown */}
            <div className="relative inline-block text-left justify-e">
                <button
                    onClick={handleOptionsState}
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={optionsState}
                    aria-haspopup="true"
                >
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

                {optionsState && (
                    <div className="absolute z-10 right-0 mt-2 w-56 origin-top-right rounded-md bg-custom-bg-secondary text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className="py-1" role="none">
                            <a href="/" className="block px-4 py-2 text-sm  hover:bg-gray-100" role="menuitem" id="menu-item-0">Chat</a>
                            <a href="/almacenamiento" className="block px-4 py-2 text-sm  hover:bg-gray-100" role="menuitem" id="menu-item-1">Almacenamiento</a>
                            <a href="#" className="block px-4 py-2 text-sm  hover:bg-gray-100" role="menuitem" id="menu-item-2">Ajustes</a>
                            <form method="POST" action="#" role="none">
                                <button type="submit" className="block w-full px-4 py-2 text-left text-sm  hover:bg-gray-100" role="menuitem" id="menu-item-3">Cerrar sesión</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;