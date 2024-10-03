import React from 'react';
import { FiHome, FiHardDrive, FiUsers, FiClock, FiStar, FiTrash, FiCloud } from 'react-icons/fi';
import logo from '@src/assets/harvee_logo.png';


const Sidebar: React.FC = () => {
    return (
        <div className="bg-[#f8fbfc] p-4 w-64 h-screen shadow-lg flex flex-col">
            <div className='flex items-center cursor-pointer mb-5'>
                <img src={logo} alt="Harvee" className="w-12 h-12" />
                <h1 className='font-semibold ml-2'>Harvee AI</h1>
            </div>
            <button className="flex items-center p-3 mb-6 bg-white rounded-lg shadow transition duration-200">
                <span className="flex items-center justify-center w-10 h-10 rounded-full mr-2">+</span>
                <span className="font-semibold">Nuevo</span>
            </button>
            <ul className="flex-1 space-y-3">
                <li className="cursor-pointer text-sm py-1 px-2 rounded hover:bg-[#e9eaee] flex items-center text-[#484b4b] transition duration-200">
                    <FiHome className="mr-2" />
                    <span>Inicio</span>
                </li>
                <li className="cursor-pointer text-sm py-1 px-2 rounded hover:bg-[#e9eaee] flex items-center text-[#484b4b] transition duration-200">
                    <FiHardDrive className="mr-2" />
                    <span>Mi Unidad</span>
                </li>
                <li className="cursor-pointer text-sm py-1 px-2 rounded hover:bg-[#e9eaee] flex items-center text-[#484b4b] transition duration-200">
                    <FiUsers className="mr-2" />
                    <span>Compartidos conmigo</span>
                </li>
                <li className="cursor-pointer text-sm py-1 px-2 rounded hover:bg-[#e9eaee] flex items-center text-[#484b4b] transition duration-200">
                    <FiClock className="mr-2" />
                    <span>Recientes</span>
                </li>
                <li className="cursor-pointer text-sm py-1 px-2 rounded hover:bg-[#e9eaee] flex items-center text-[#484b4b] transition duration-200">
                    <FiStar className="mr-2" />
                    <span>Destacados</span>
                </li>
                <li className="cursor-pointer text-sm py-1 px-2 rounded hover:bg-[#e9eaee] flex items-center text-[#484b4b] transition duration-200">
                    <FiTrash className="mr-2" />
                    <span>Papelera</span>
                </li>
                <li className="mt-auto cursor-pointer text-sm py-1 px-2 rounded hover:bg-[#e9eaee] flex items-center text-[#484b4b] transition duration-200">
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