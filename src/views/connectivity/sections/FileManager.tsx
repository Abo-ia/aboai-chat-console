import React, { useState, useEffect } from 'react';

import {
    S3Client,
    ListObjectsV2Command,
    PutObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { FiMoreVertical } from 'react-icons/fi';
import { FaFolder, FaFile, FaSyncAlt } from 'react-icons/fa';
import Alert from '@src/components/Alert/Alert';
import { FaFolderPlus } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import { RxReload } from 'react-icons/rx';
import { fetchAuthSession } from 'aws-amplify/auth';
import SyncKnowledgeBase from '@src/services/syncKnowledgeBase.service';

import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME,
    AWS_REGION,
} from '@src/config/env';

import UserIcon from '@src/assets/user-icon.png';

import { useOrganization } from '@src/context/OrganizationContext';

const organizeFilesByFolders = (items: any[], organizationId: string) => {
    const folderStructure: {
        folder_path: string;
        files: { file_name: string; file_size: number; key: string }[];
    }[] = [];

    items.forEach((item) => {
        let cleanedKey = item.Key.replace(`${organizationId}/`, '');
        const isFolder = cleanedKey.endsWith('/');
        const pathParts = cleanedKey.split('/');

        const folderPath = pathParts.slice(0, pathParts.length - 1).join('/');

        if (isFolder && !folderStructure.some((f) => f.folder_path === folderPath)) {
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
                key: cleanedKey,
            });
        }
    });

    return folderStructure;
};

const FileManager: React.FC = () => {
    const [organizedData, setOrganizedData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [openFolders, setOpenFolders] = useState<string[]>([]);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [newFolderName, setNewFolderName] = useState<string>('');
    const [showSyncAlert, setShowSyncAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const { state } = useOrganization();
    const { activeOrganization } = state;

    const s3Client = new S3Client({
        region: AWS_REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
    });

    const fetchFilesFromS3 = async () => {
        setIsLoading(true);
        const organizationId = activeOrganization?.organization_id ?? '';
        const command = new ListObjectsV2Command({
            Bucket: AWS_BUCKET_NAME,
            Prefix: `${organizationId}/`,
        });

        try {
            const response = await s3Client.send(command);
            const organized = organizeFilesByFolders(response.Contents || [], organizationId);
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
                : [...prevOpenFolders, folderPath],
        );
    };

    const toggleMenu = (fileKey: string) => {
        setOpenMenu((prevMenu) => (prevMenu === fileKey ? null : fileKey));
    };

    const handleDeleteFile = async (fileKey: string) => {
        setIsDeleting(true);
        try {
            const command = new DeleteObjectCommand({
                Bucket: AWS_BUCKET_NAME,
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
        const fileUrl = `https://harvey-knowledge-base-bucket.s3.us-west-2.amazonaws.com/${fileKey}`;
        window.open(fileUrl, '_blank');
    };

    const handleSync = async () => {
        setShowSyncAlert(true);
        setTimeout(() => setShowSyncAlert(false), 3000);

        const session = await fetchAuthSession();
        const idToken = session?.tokens?.idToken?.toString() as string;

        const syncKnowledgeBaseInstance = new SyncKnowledgeBase(idToken);
        await syncKnowledgeBaseInstance.syncKnowledgeBase('...', '...');
    };

    const handleCreateFolder = async () => {
        if (!newFolderName) {
            setAlertMessage('El nombre de la carpeta no puede estar vacío.');
            setTimeout(() => setAlertMessage(null), 3000);
            return;
        }

        const folderKey = `${newFolderName}/`;

        const command = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: folderKey,
            Body: '',
        });

        try {
            await s3Client.send(command);
            setAlertMessage(`La carpeta "${newFolderName}" se creó con éxito.`);
            fetchFilesFromS3();
            setNewFolderName('');
        } catch (error) {
            setAlertMessage('Error creando la carpeta.');
        } finally {
            setTimeout(() => setAlertMessage(null), 3000);
        }
    };

    useEffect(() => {
        fetchFilesFromS3();
    }, []);

    useEffect(() => {
        document.title = '[TBD] - Almacenamiento';
    }, []);

    const formatSizeInMB = (sizeInBytes: number) => (sizeInBytes / (1024 * 1024)).toFixed(2);

    return (
        <div className="px-8 m-6 rounded-lg relative">
            {isDeleting && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-2 rounded-lg shadow-lg z-50">
                    Eliminando archivo...
                </div>
            )}

            {alertMessage && <Alert type="info" message={alertMessage} />}
            {showSyncAlert && <Alert type="info" message="Sincronización en progreso..." />}

            <div className="overflow-y-auto max-h-[80vh]">
                <table className="shadow-md rounded-lg min-w-full">
                    <thead className="sticky top-0">
                        <tr className="border-b-[1px] border-gray-200">
                            <th className="p-4 text-left text-custom-dark font-semibold">Nombre</th>
                            <th className="p-4 text-left text-custom-dark font-semibold">
                                Propietario
                            </th>
                            <th className="p-4 text-left text-custom-dark font-semibold">Tamaño</th>
                            <th className="p-4 text-right text-custom-dark font-semibold">
                                <FiMoreVertical />
                            </th>
                        </tr>
                        <tr>
                            <td colSpan={4} className="p- flex items-center mt-4">
                                <div className="flex items-center bg-gray-50 rounded-lg p-2 w-full max-w-lg">
                                    <FaFolderPlus className="text-gray-300" />
                                    <input
                                        type="text"
                                        value={newFolderName}
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                        placeholder="Nombre de la nueva carpeta"
                                        className="bg-transparent w-full focus:outline-none px-2"
                                    />
                                    <BiSend
                                        className="text-gray-600 cursor-pointer"
                                        onClick={handleCreateFolder}
                                    />
                                </div>
                                <RxReload
                                    className="ml-3 text-gray-600 cursor-pointer"
                                    onClick={() => window.location.reload()}
                                />
                            </td>
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
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <FaFolder className="mr-2 text-custom-darkest" />
                                                {folder.folder_path || ''}
                                            </div>
                                            {folder.folder_path === 'sync' && (
                                                <div
                                                    onClick={handleSync}
                                                    className="flex items-center bg-gray-100 p-1 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-200 gap-2"
                                                >
                                                    <FaSyncAlt className="text-custom-darkest" />
                                                    <p className="text-xs text-custom-darkest">
                                                        Sincronizar
                                                    </p>
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
                                                        className="w-5 h-5 rounded-full"
                                                        src={UserIcon}
                                                    />
                                                </td>
                                                <td className="p-4">
                                                    {formatSizeInMB(file.file_size)} MB
                                                </td>
                                                <td className="p-4 relative">
                                                    <FiMoreVertical
                                                        className="cursor-pointer text-custom-base"
                                                        onClick={() => toggleMenu(file.key)}
                                                    />
                                                    {openMenu === file.key && (
                                                        <div className="absolumt-2 w-48 bg-white rounded-lg shadow-lg">
                                                            <ul>
                                                                <li
                                                                    className="py-2 pl-4 cursor-pointer hover:bg-gray-100"
                                                                    onClick={() =>
                                                                        handleOpenFile(file.key)
                                                                    }
                                                                >
                                                                    Abrir archivo
                                                                </li>
                                                                <li
                                                                    className="py-2 pl-4 cursor-pointer hover:bg-gray-100"
                                                                    onClick={() =>
                                                                        handleDeleteFile(file.key)
                                                                    }
                                                                >
                                                                    Eliminar archivo
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            {isLoading && <p className="text-center mt-4">Cargando...</p>}
        </div>
    );
};

export default FileManager;
