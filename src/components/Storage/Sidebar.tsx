import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FiHome, FiHardDrive, FiUsers, FiClock, FiStar, FiTrash, FiCloud, FiFile, FiX } from 'react-icons/fi';
import logo from '@src/assets/harvee_logo.png';
import { IoChatboxOutline } from "react-icons/io5";


import { GoLaw } from "react-icons/go";

const menuItems = [
    { icon: <FiHardDrive />, label: 'Mi Unidad' },
    { icon: <IoChatboxOutline />, label: 'Chat' },
    { icon: <GoLaw />, label: 'Legal' },
    { icon: <FiUsers />, label: 'Compartidos conmigo' },
    { icon: <FiClock />, label: 'Recientes' },
    { icon: <FiStar />, label: 'Destacados' },
    { icon: <FiTrash />, label: 'Papelera' },
];

interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [targetFolder, setTargetFolder] = useState<string>('');

    const s3Client = new S3Client({
        region: 'us-west-2',
        credentials: {
            accessKeyId: 'AKIAQEFWA3RHL6DN3NVI',
            secretAccessKey: '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',
        },
    });

    const handleFileUpload = async () => {
        if (!selectedFiles) return;

        const uploadPromises = Array.from(selectedFiles).map(async (file) => {
            const folderPath = targetFolder ? `${targetFolder}/` : '';
            const uploadParams = {
                Bucket: 'iabogado-bucket',
                Key: `${folderPath}${file.name}`,
                Body: file,
            };
            try {
                const command = new PutObjectCommand(uploadParams);
                await s3Client.send(command);
                console.log(`Archivo ${file.name} subido correctamente a ${folderPath || 'root'}`);
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
        <div className="bg-[#f8fbfc] p-4 w-64 h-screen shadow-lg flex flex-col">
            <div className='flex items-center cursor-pointer mb-5'>
                <img src={logo} alt="Harvee" className="w-12 h-12" />
                <h1 className='font-semibold ml-2'>Harvee AI</h1>
            </div>
            <button
                className="flex items-center p-3 mb-6 bg-[#006d5b] text-white rounded-lg shadow transition hover:bg-[#004f45] hover:shadow-xl duration-200"
                onClick={() => {
                    if (props.activeView !== "Chat") {
                        setShowModal(true);
                    } else {
                        window.location.reload();
                    }
                }}
            >
                <span className="flex items-center justify-center w-6 h-6 bg-white text-[#006d5b] rounded-full mr-2">+</span>
                <span className="font-semibold">
                    {props.activeView !== "Chat" ? "Nuevo archivo" : "Nueva conversación"}
                </span>
            </button>
            <ul className="flex-1 space-y-3">
                {menuItems.map((item, index) => (
                    <li
                        onClick={() => props.setActiveView(item.label)}
                        key={index}
                        className={`cursor-pointer text-sm py-2 px-2 rounded hover:bg-[#e9eaee] flex items-center text-[#484b4b] transition duration-200 ${props.activeView === item.label ? 'bg-[#e9eaee]' : ''}`}
                    >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                    </li>
                ))}
            </ul>
            <div className="bg-white p-3 rounded-lg shadow mt-6">
                <div className="flex items-center justify-between text-sm text-[#484b4b]">
                    <span>13.2 GB de 15 GB usados</span>
                    <button className="text-[#006d5b] hover:underline">Más almacenamiento</button>
                </div>
                <div className="w-full h-2 bg-[#e9eaee] mt-2 rounded-full overflow-hidden">
                    <div className="h-2 bg-[#006d5b] rounded-full transition-all duration-500 ease-in-out" style={{ width: '88%' }}></div>
                </div>
            </div>

            {/* Modal para subir archivos */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                        <h2 className="text-xl font-semibold text-black mb-4">Subir archivos</h2>

                        {/* Subir archivos */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar archivos</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#006d5b] p-2"
                            />
                        </div>

                        {/* Input para especificar la carpeta de destino */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Carpeta de destino</label>
                            <input
                                type="text"
                                value={targetFolder}
                                onChange={(e) => setTargetFolder(e.target.value)}
                                placeholder="Ejemplo: documentos o deja vacío para root"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006d5b]"
                            />
                        </div>

                        {/* Mostrar lista de archivos seleccionados */}
                        {selectedFiles && (
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Archivos seleccionados:</h3>
                                <ul className="space-y-2">
                                    {Array.from(selectedFiles).map((file, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <FiFile className="text-gray-500" />
                                                <span className="text-sm text-gray-600">{file.name}</span>
                                            </div>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleRemoveFile(index)}
                                            >
                                                <FiX />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleFileUpload}
                                className="w-full bg-[#006d5b] text-white py-2 rounded-lg hover:bg-[#004f45] transition duration-200 ease-in-out"
                            >
                                Subir archivos
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200 ease-in-out"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;