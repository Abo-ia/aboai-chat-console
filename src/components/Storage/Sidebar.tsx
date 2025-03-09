import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FiHardDrive, FiTrash } from 'react-icons/fi';
import { IoChatboxOutline, IoCloudOutline } from 'react-icons/io5';
import { GoLaw } from 'react-icons/go';
import { RiOrganizationChart } from 'react-icons/ri';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from '@src/assets/logo.svg';
import {
    AWS_ACCESS_KEY_ID,
    AWS_BUCKET_NAME,
    AWS_REGION,
    AWS_SECRET_ACCESS_KEY,
} from '@src/config/env';

import { MdOutlinePayment } from "react-icons/md";


const menuItems = [
    { icon: <IoChatboxOutline />, label: 'Chat', path: '/' },
    { icon: <FiHardDrive />, label: 'Mi Unidad', path: '/almacenamiento' },
    { icon: <GoLaw />, label: 'Legal', path: '/contratos-y-acuerdos' },
    { icon: <RiOrganizationChart />, label: 'Organizaciones', path: '/organizaciones' },
    { icon: <IoCloudOutline />, label: 'Conectividad', path: '/conectividad' },
    { icon: <FiTrash />, label: 'Papelera', path: '/almacenamiento' },
    { icon: <MdOutlinePayment />, label: 'Pagos', path: '/pagos' },
];

interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [targetFolder, setTargetFolder] = useState<string>('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const s3Client = new S3Client({
        region: AWS_REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
    });

    const handleFileUpload = async () => {
        if (!selectedFiles) return;

        const uploadPromises = Array.from(selectedFiles).map(async (file) => {
            const folderPath = targetFolder ? `${targetFolder}/` : '';
            const uploadParams = {
                Bucket: AWS_BUCKET_NAME,
                Key: `${folderPath}${file.name}`,
                Body: file,
            };
            try {
                const command = new PutObjectCommand(uploadParams);
                const response = await s3Client.send(command);
            } catch (error) {
                console.error(`Error subiendo archivo ${file.name}: `, error);
            }
        });

        await Promise.all(uploadPromises);
        alert('Archivos subidos correctamente');
        setSelectedFiles(null);
        setShowModal(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(e.target.files);
    };

    const handleRemoveFile = (index: number) => {
        if (!selectedFiles) return;
        const newFiles = Array.from(selectedFiles);
        newFiles.splice(index, 1);
        const dataTransfer = new DataTransfer();
        newFiles.forEach((file) => dataTransfer.items.add(file));
        setSelectedFiles(dataTransfer.files);
    };

    return (
        <div className="relative text-custom-font-main border-r border-custom-border">
            <div
                className={`bg-custom-bg-sidebar h-screen shadow-lg flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-60' : 'w-16'}`}
            >
                <div
                    className={`flex items-center justify-center p-4 ${isSidebarOpen ? 'space-x-2' : ''}`}
                >
                    <img
                        src={Logo}
                        alt="Harvey"
                        className="object-cover w-12"
                    />
                    {isSidebarOpen && <h1 className="font-semibold text-sm text-center">Abo.AI</h1>}
                </div>

                <button
                    className="flex items-center justify-center gap-3 p-4 mb-3 bg-custom-primary text-white rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    onClick={() => {
                        if (pathname !== '/') {
                            setShowModal(true);
                        } else {
                            window.location.reload();
                        }
                    }}
                    aria-label={pathname === '/' ? 'Nuevo chat' : 'Nuevo archivo'}
                >
                    <span className="flex items-center justify-center w-8 h-8 bg-white text-custom-primary rounded-full">
                        +
                    </span>
                    {isSidebarOpen && (
                        <span className="font-medium text-sm tracking-wide flex items-center justify-center">
                            {pathname === '/' ? 'Nuevo chat' : 'Nuevo archivo'}
                        </span>
                    )}
                </button>

                <ul className="flex-1">
                    {menuItems.map((item, index) => (
                        <li
                            onClick={() => navigate(item.path)}
                            key={index}
                            className={`cursor-pointer hover:bg-custom-accent hover:text-gray-400 text-sm px-2 py-1 rounded hover:bg-custom-bg-hover flex items-center justify-center transition duration-200 ${
                                props.activeView === item.label ? 'bg-[#e9eaee]' : ''
                            }`}
                        >
                            <div className="flex items-center justify-center w-full">
                                <span className="text-xl flex items-center justify-center w-8 h-8">
                                    {item.icon}
                                </span>
                                {isSidebarOpen && (
                                    <span className="ml-3 text-sm flex items-center justify-center">
                                        {item.label}
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                <button
                    className="flex items-center justify-center p-4 rounded-lg shadow transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    aria-label={isSidebarOpen ? 'Ocultar Sidebar' : 'Mostrar Sidebar'}
                >
                    {isSidebarOpen ? (
                        <FiChevronLeft className="w-6 h-6" />
                    ) : (
                        <FiChevronRight className="w-6 h-6" />
                    )}
                </button>

                <div
                    className={`p-3 rounded-lg transition-all duration-300 ${!isSidebarOpen && 'hidden'}`}
                >
                    <div className="flex items-center justify-between text-sm text-custom-font-base">
                        <span>13.2 GB de 15 GB usados</span>
                        <button className="text-custom-gradient hover:underline text-xs">
                            Más almacenamiento
                        </button>
                    </div>
                    <div className="w-full h-2 bg-[#e9eaee] mt-2 rounded-full overflow-hidden">
                        <div
                            className="h-2 bg-custom-primary rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: '88%' }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
