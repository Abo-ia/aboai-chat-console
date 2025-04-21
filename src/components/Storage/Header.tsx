import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '@src/context/AppContext';
import { useOrganization } from '@src/context/OrganizationContext';
import UserIcon from '@src/assets/user-icon.png';
import { fetchUserAttributes } from 'aws-amplify/auth';

const Header: React.FC = () => {
    const { state } = useOrganization();
    const { activeOrganization } = state;

    const appContext = useContext(AppContext);
    const [optionsState, setOptionsState] = useState(false);
    const [hamburgerMenuState, setHamburgerMenuState] = useState(false);

    const [authEmail, setAuthEmail] = useState('');

    const handleOptionsState = () => {
        setOptionsState(!optionsState);
    };

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const attributes = await fetchUserAttributes();
                if (attributes.email && attributes.sub) {
                    const authEmail = attributes.email.split('@')[0];
                    setAuthEmail(authEmail);
                }
            } catch (err) {
                console.error('Error al obtener atributos del usuario:', err);
            }
        };
        fetchAttributes();
    }, []);

    return (
        <div className="bg-custom-bg-header p-4 flex justify-between lg:justify-end items-center">
            <button
                onClick={() => {
                    appContext?.setIsSidebarOpen(!appContext?.isSidebarOpen);
                }}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300"
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
                        d={hamburgerMenuState ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    />
                </svg>
            </button>

            <div className="relative inline-block text-left justify-e">
                <div
                    onClick={handleOptionsState}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <img
                        id="menu-button"
                        aria-expanded={optionsState}
                        aria-haspopup="true"
                        className="w-7 h-7 rounded-full"
                        src={UserIcon}
                        alt="User Avatar"
                    />

                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">{authEmail}</h3>
                        <p className="text-xs text-gray-600">Administrador</p>
                    </div>

                    <p>
                        <svg
                            className="w-3 h-3"
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
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </p>
                </div>

                {optionsState && (
                    <div
                        className="absolute bg-custom-light border z-10 right-0 mt-2 w-64 origin-top-right rounded-lg bg-custom-bg-sidebar text-gray-600 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex={-1}
                    >
                        {activeOrganization && (
                            <div className="flex items-center p-4">
                                <div className="w-12 h-12 flex items-center justify-center  text-gray-600 text-lg font-semibold rounded-full">
                                    {activeOrganization.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-semibold text-gray-600">
                                        {activeOrganization.name}
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        {activeOrganization.legal_structure} -{' '}
                                        {activeOrganization.operating_countries?.[0] || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="py-1" role="none">
                            <a
                                href="/"
                                className="block px-4 py-2 text-sm hover: rounded-md transition"
                                role="menuitem"
                            >
                                Chat
                            </a>
                            <a
                                href="/almacenamiento"
                                className="block px-4 py-2 text-sm hover: rounded-md transition"
                                role="menuitem"
                            >
                                Almacenamiento
                            </a>
                            <a
                                href="/ajustes"
                                className="block px-4 py-2 text-sm hover: rounded-md transition"
                                role="menuitem"
                            >
                                Ajustes
                            </a>
                        </div>

                        <div className="py-1" role="none">
                            <button
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.reload();
                                }}
                                className="block w-full px-4 py-2 text-left text-sm text-red-500 hover: transition rounded-md"
                                role="menuitem"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
