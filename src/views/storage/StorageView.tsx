import React, { useState, useEffect } from 'react';
import { S3Client, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';
import { FiFolder, FiFile, FiMoreVertical } from 'react-icons/fi';
import { FaFolder, FaFile } from "react-icons/fa";
import Alert from '@src/components/Alert/Alert';
import { FaSyncAlt } from "react-icons/fa";

const organizeFilesByFolders = (items: any[]) => {
    const folderStructure: { folder_path: string; files: { file_name: string; file_size: number, key: string }[] }[] = [];

    items.forEach((item) => {
        const isFolder = item.Key.endsWith('/');
        const pathParts = item.Key.split('/');

        const folderPath = pathParts.slice(0, pathParts.length - 1).join('/');

        if (isFolder && !folderStructure.some(f => f.folder_path === folderPath)) {
            folderStructure.push({
                folder_path: folderPath || '',
                files: [],
            });
        } else {
            const fileName = pathParts[pathParts.length - 1];
            if (!fileName) return;

            let folder = folderStructure.find((f) => f.folder_path === folderPath);
            if (!folder) {
                folder = {
                    folder_path: folderPath || '',
                    files: [],
                };
                folderStructure.push(folder);
            }

            folder.files.push({
                file_name: fileName,
                file_size: item.Size,
                key: item.Key,
            });
        }
    });

    return folderStructure;
};

const FileExplorerTable: React.FC = () => {
    const [organizedData, setOrganizedData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [openFolders, setOpenFolders] = useState<string[]>([]);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [showSyncAlert, setShowSyncAlert] = useState<boolean>(false);  // Estado para controlar la alerta de sincronización
    const itemsPerPage = 20;

    const s3Client = new S3Client({
        region: 'us-west-2',
        credentials: {
            accessKeyId: 'AKIAQEFWA3RHL6DN3NVI',
            secretAccessKey: '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',
        },
    });

    const fetchFilesFromS3 = async () => {
        setIsLoading(true);
        const command = new ListObjectsV2Command({
            Bucket: 'iabogado-bucket',
        });

        try {
            const response = await s3Client.send(command);
            const organized = organizeFilesByFolders(response.Contents || []);
            setOrganizedData(organized);
        } catch (error) {
            console.error('Error fetching files from S3:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFolder = (folderPath: string) => {
        setOpenFolders((prevOpenFolders) =>
            prevOpenFolders.includes(folderPath)
                ? prevOpenFolders.filter((path) => path !== folderPath)
                : [...prevOpenFolders, folderPath]
        );
    };

    const toggleMenu = (fileKey: string) => {
        setOpenMenu((prevMenu) => (prevMenu === fileKey ? null : fileKey));
    };

    const handleDeleteFile = async (fileKey: string) => {
        setIsDeleting(true);
        try {
            const command = new DeleteObjectCommand({
                Bucket: 'iabogado-bucket',
                Key: fileKey,
            });
            await s3Client.send(command);
            fetchFilesFromS3();
        } catch (error) {
            console.error('Error deleting file:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleOpenFile = (fileKey: string) => {
        const fileUrl = `https://iabogado-bucket.s3.amazonaws.com/${fileKey}`;
        window.open(fileUrl, '_blank');
    };

    const handleSync = () => {
        setShowSyncAlert(true);
        setTimeout(() => setShowSyncAlert(false), 3000); 
    };

    useEffect(() => {
        fetchFilesFromS3();
    }, []);

    const formatSizeInMB = (sizeInBytes: number) => (sizeInBytes / (1024 * 1024)).toFixed(2);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="p-8 m-6 rounded-lg bg-white relative">
                    {isDeleting && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-2 rounded-lg shadow-lg z-50">
                            Eliminando archivo...
                        </div>
                    )}

                    {showSyncAlert && (
                        <Alert type="info" message="Sincronización en progreso..." />
                    )}

                    <div className="overflow-y-auto max-h-[80vh]">
                        <table className="bg-white shadow-md rounded-lg min-w-full">
                            <thead className="sticky top-0 bg-white z-10">
                                <tr className="border-b-[1px] border-gray-200">
                                    <th className="p-4 text-left text-custom-dark font-semibold">Nombre</th>
                                    <th className="p-4 text-left text-custom-dark font-semibold">Propietario</th>
                                    <th className="p-4 text-left text-custom-dark font-semibold">Tamaño</th>
                                    <th className="p-4 text-right text-custom-dark font-semibold">
                                        <FiMoreVertical />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {organizedData.map((folder, folderIndex) => (
                                    <React.Fragment key={folderIndex}>
                                        <tr
                                            className="border-b-[1px] border-gray-200 cursor-pointer"
                                            onClick={() => toggleFolder(folder.folder_path)}
                                        >
                                            <td colSpan={3} className="p-4">
                                                <div className="flex items-center justify-between"> {/* Agregado justify-between */}
                                                    <div className="flex items-center">
                                                        <FaFolder className="mr-2 text-custom-darkest" />
                                                        {folder.folder_path || ''}
                                                    </div>
                                                    {folder.folder_path === 'sync' && (
                                                        <div
                                                            onClick={handleSync}
                                                            className="flex items-center bg-gray-100 p-1 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-200 gap-2"  // Agregado hover:bg-gray-200
                                                        >
                                                            <FaSyncAlt className="text-custom-darkest" />
                                                            <p className="text-xs text-custom-darkest">Sincronizar</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>


                                        {openFolders.includes(folder.folder_path) &&
                                            folder.files.map((file: any, fileIndex: any) => {
                                                return (
                                                    <tr
                                                        key={`${folder.folder_path}-${fileIndex}`}
                                                        className="border-b-[1px] border-gray-200"
                                                    >
                                                        <td className="p-4 pl-12 flex items-center">
                                                            <FaFile className="mr-2 text-custom-base" />
                                                            {file.file_name}
                                                        </td>
                                                        <td className="p-4">
                                                            <img
                                                                className='w-5 h-5 rounded-full'
                                                                src='https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
                                                            />
                                                        </td>
                                                        <td className="p-4">{formatSizeInMB(file.file_size)} MB</td>
                                                        <td className="p-4 relative">
                                                            <FiMoreVertical
                                                                className="cursor-pointer text-custom-base"
                                                                onClick={() => toggleMenu(file.key)}
                                                            />
                                                            {openMenu === file.key && (
                                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                                                                    <ul>
                                                                        <li
                                                                            className="py-2 pl-4 cursor-pointer hover:bg-gray-100"
                                                                            onClick={() => handleOpenFile(file.key)}
                                                                        >
                                                                            Abrir archivo
                                                                        </li>
                                                                        <li
                                                                            className="py-2 pl-4 cursor-pointer hover:bg-gray-100"
                                                                            onClick={() => handleDeleteFile(file.key)}
                                                                        >
                                                                            Eliminar archivo
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {isLoading && <p className="text-center mt-4">Cargando...</p>}
                </div>
            </div>
        </div>
    );
};

export default FileExplorerTable;
