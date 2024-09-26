import React, { useState } from 'react';
import { FiFolder, FiFile, FiUser, FiMoreVertical, FiHome, FiHardDrive, FiUsers, FiClock, FiStar, FiTrash, FiCloud, FiSearch, FiSettings } from 'react-icons/fi';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-custom-dark p-4 w-64 h-screen shadow-lg flex flex-col">
            <div className="flex items-center space-x-2 mb-6">
                <img
                    src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid"
                    alt="User"
                    className="w-10 h-10 rounded-full" />
                <div>
                    <h4 className="font-semibold text-white">Almacenamiento</h4>
                    <span className="text-white text-sm">
                        <span className="text-custom-base">13.2 GB</span> de 15 GB usados
                    </span>
                </div>
            </div>
            <button className="flex items-center p-3 mb-6 text-white bg-custom-base rounded-lg shadow transition duration-200">
                <span className="flex items-center justify-center w-10 h-10 text-white rounded-full mr-2">+</span>
                <span className="font-semibold">Nuevo</span>
            </button>
            <ul className="flex-1 space-y-3">
                <li className="cursor-pointer p-3 rounded hover:bg-custom-lightest flex items-center text-white transition duration-200">
                    <FiHome className="mr-2" />
                    <span>Inicio</span>
                </li>
                <li className="cursor-pointer p-3 rounded hover:bg-custom-lightest flex items-center text-white transition duration-200">
                    <FiHardDrive className="mr-2" />
                    <span>Mi Unidad</span>
                </li>
                <li className="cursor-pointer p-3 rounded hover:bg-custom-lightest flex items-center text-white transition duration-200">
                    <FiUsers className="mr-2" />
                    <span>Compartidos conmigo</span>
                </li>
                <li className="cursor-pointer p-3 rounded hover:bg-custom-lightest flex items-center text-white transition duration-200">
                    <FiClock className="mr-2" />
                    <span>Recientes</span>
                </li>
                <li className="cursor-pointer p-3 rounded hover:bg-custom-lightest flex items-center text-white transition duration-200">
                    <FiStar className="mr-2" />
                    <span>Destacados</span>
                </li>
                <li className="cursor-pointer p-3 rounded hover:bg-custom-lightest flex items-center text-white transition duration-200">
                    <FiTrash className="mr-2" />
                    <span>Papelera</span>
                </li>
                <li className="mt-auto cursor-pointer p-3 rounded hover:bg-custom-lightest flex items-center text-white transition duration-200">
                    <FiCloud className="mr-2" />
                    <span>Almacenamiento</span>
                </li>
            </ul>
            <div className="bg-white p-3 rounded-lg shadow mt-6">
                <div className="flex items-center justify-between text-sm text-custom-dark">
                    <span>13.2 GB de 15 GB usados</span>
                    <button className="text-custom-base hover:underline">Más almacenamiento</button>
                </div>
                <div className="w-full h-2 bg-custom-light mt-2 rounded-full overflow-hidden">
                    <div className="h-2 bg-custom-base rounded-full transition-all duration-500 ease-in-out" style={{ width: '88%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;