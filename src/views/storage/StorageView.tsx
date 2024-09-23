import React, { useState } from 'react';
import { FiFolder, FiFile, FiUser, FiMoreVertical, FiHome, FiHardDrive, FiUsers, FiClock, FiStar, FiTrash, FiCloud, FiSearch, FiSettings } from 'react-icons/fi';

interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    owner: string;
    lastModified: string;
    size?: string;
}

const initialData: FileItem[] = [
    {
        id: '1',
        name: 'Carpeta 1',
        type: 'folder',
        owner: 'me',
        lastModified: 'Feb 19, 2024',
    },
    {
        id: '2',
        name: 'Documento 1',
        type: 'file',
        owner: 'me',
        lastModified: 'Sep 4, 2024',
        size: '793 KB',
    },
    {
        id: '3',
        name: 'Documento 2',
        type: 'file',
        owner: 'me',
        lastModified: 'Jul 29, 2024',
        size: '2 KB',
    },
    {
        id: '4',
        name: 'Documento 3',
        type: 'file',
        owner: 'me',
        lastModified: 'Aug 2, 2024',
        size: '2 KB',
    },
    {
        id: '5',
        name: 'Carpeta 2',
        type: 'folder',
        owner: 'me',
        lastModified: 'May 6, 2023',
    },
];

const FileItemRow: React.FC<{ item: FileItem }> = ({ item }) => {
    return (
        <tr className="hover:bg-custom-lightest transition duration-200">
            <td className="p-4">
                <div className="flex items-center">
                    {item.type === 'folder' ? (
                        <FiFolder className="mr-2 text-custom-base" />
                    ) : (
                        <FiFile className="mr-2 text-custom-darkest" />
                    )}
                    <span className="text-custom-darkest">{item.name}</span>
                </div>
            </td>
            <td className="p-4 text-custom-darkest">{item.owner}</td>
            <td className="p-4 text-custom-darkest">{item.lastModified}</td>
            <td className="p-4 text-custom-darkest">{item.size || '—'}</td>
            <td className="p-4 text-custom-darkest text-right">
                <FiMoreVertical className="cursor-pointer" />
            </td>
        </tr>
    );
};

const Sidebar: React.FC = () => {
    return (
        <div className="bg-custom-lightest p-4 w-64 h-screen shadow-md flex flex-col">
            <button className="flex items-center p-2 mb-4 text-custom-darkest bg-white hover:bg-custom-lighter rounded shadow">
                <span className="flex items-center justify-center w-10 h-10 bg-custom-base text-white rounded-full mr-2">+</span>
                <span className="font-semibold">New</span>
            </button>
            <ul className="flex-1">
                <li className="mb-4 cursor-pointer p-2 rounded hover:bg-custom-lighter flex items-center text-custom-dark">
                    <FiHome className="mr-2" />
                    <span>Home</span>
                </li>
                <li className="mb-4 cursor-pointer p-2 rounded hover:bg-custom-lighter flex items-center text-custom-dark">
                    <FiHardDrive className="mr-2" />
                    <span>My Drive</span>
                </li>
                <li className="mb-4 cursor-pointer p-2 rounded hover:bg-custom-lighter flex items-center text-custom-dark">
                    <FiUsers className="mr-2" />
                    <span>Shared with me</span>
                </li>
                <li className="mb-4 cursor-pointer p-2 rounded hover:bg-custom-lighter flex items-center text-custom-dark">
                    <FiClock className="mr-2" />
                    <span>Recent</span>
                </li>
                <li className="mb-4 cursor-pointer p-2 rounded hover:bg-custom-lighter flex items-center text-custom-dark">
                    <FiStar className="mr-2" />
                    <span>Starred</span>
                </li>
                <li className="mb-4 cursor-pointer p-2 rounded hover:bg-custom-lighter flex items-center text-custom-dark">
                    <FiTrash className="mr-2" />
                    <span>Trash</span>
                </li>
                <li className="mt-auto cursor-pointer p-2 rounded hover:bg-custom-lighter flex items-center text-custom-dark">
                    <FiCloud className="mr-2" />
                    <span>Storage</span>
                </li>
            </ul>
            <div className="bg-white p-2 rounded-lg shadow mt-4">
                <div className="flex items-center justify-between text-sm text-custom-dark">
                    <span>13.2 GB of 15 GB used</span>
                    <button className="text-custom-base hover:underline">Get more storage</button>
                </div>
                <div className="w-full h-2 bg-custom-light mt-2 rounded-full">
                    <div className="h-2 bg-custom-base rounded-full" style={{ width: '88%' }}></div>
                </div>
            </div>
        </div>
    );
};

const Header: React.FC = () => {
    return (
        <div className="bg-white p-4 shadow-md flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-custom-lighter">
                    <FiSettings className="text-custom-darkest" />
                </button>
                <button className="p-2 rounded-full hover:bg-custom-lighter">
                    <FiSearch className="text-custom-darkest" />
                </button>
                <button className="p-2 rounded-full hover:bg-custom-lighter">
                    <FiUser className="text-custom-darkest" />
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-custom-lighter">
                    <FiMoreVertical className="text-custom-darkest" />
                </button>
            </div>
        </div>
    );
};

const FileExplorerTable: React.FC = () => {
    const [data, setData] = useState<FileItem[]>(initialData);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-white">
                <Header />
                <div className="p-6 shadow-md m-4 rounded-lg flex-1 bg-white">
                    <h2 className="text-xl font-semibold mb-4 text-custom-dark">Archivos</h2>
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="border-b-2 border-custom-lightest">
                                <th className="p-4 text-left text-custom-dark font-semibold">Nombre</th>
                                <th className="p-4 text-left text-custom-dark font-semibold">Propietario</th>
                                <th className="p-4 text-left text-custom-dark font-semibold">Última modificación</th>
                                <th className="p-4 text-left text-custom-dark font-semibold">Tamaño del archivo</th>
                                <th className="p-4 text-right text-custom-dark font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <FileItemRow key={item.id} item={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FileExplorerTable;