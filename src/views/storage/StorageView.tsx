import React, { useState, useEffect } from 'react';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';
import { FiFolder, FiFile, FiMoreVertical } from 'react-icons/fi';
import { FaFolder, FaFile } from "react-icons/fa";


const organizeFilesByFolders = (items: any[]) => {
    const folderStructure: { folder_path: string; files: { file_name: string; file_size: number }[] }[] = [];

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
            });
        }
    });

    return folderStructure;
};

const FileExplorerTable: React.FC = () => {
    const [organizedData, setOrganizedData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openFolders, setOpenFolders] = useState<string[]>([]); // Estado para manejar las carpetas abiertas
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

    useEffect(() => {
        fetchFilesFromS3();
    }, []);

    const formatSizeInMB = (sizeInBytes: number) => (sizeInBytes / (1024 * 1024)).toFixed(2); // Conversión a MB

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="p-8 m-6 rounded-lg bg-white">
                    <div className="overflow-y-auto max-h-[500px]"> {/* Scroll vertical y altura máxima */}
                        <table className="bg-white shadow-md rounded-lg min-w-full">
                            <thead>
                                <tr className="border-b-[1px] border-gray-200">
                                    <th className="p-4 text-left text-custom-dark font-semibold">Nombre</th>
                                    <th className="p-4 text-left text-custom-dark font-semibold">Tamaño</th>
                                    <th className="p-4 text-right text-custom-dark font-semibold">Acciones</th>
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
                                                <div className="flex items-center">
                                                    <FaFolder className="mr-2 text-custom-darkest" />
                                                    {folder.folder_path || ''}
                                                </div>
                                            </td>
                                        </tr>

                                        {openFolders.includes(folder.folder_path) &&
                                            folder.files.map((file: any, fileIndex: any) => (
                                                <tr
                                                    key={`${folder.folder_path}-${fileIndex}`}
                                                    className="border-b-[1px] border-gray-200"
                                                >
                                                    <td className="p-4 pl-12 flex items-center">
                                                        <FaFile className="mr-2 text-custom-base" />
                                                        {file.file_name}
                                                    </td>
                                                    <td className="p-4">{formatSizeInMB(file.file_size)} MB</td> {/* Mostrar tamaño en MB */}
                                                    <td className="p-4 text-right">
                                                        <FiMoreVertical className="cursor-pointer text-custom-base" />
                                                    </td>
                                                </tr>
                                            ))}
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
