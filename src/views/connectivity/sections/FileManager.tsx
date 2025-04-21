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
        <div className="px-4 md:px-8 m-6 rounded-lg relative">
            {isDeleting && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-2 rounded-lg shadow-lg z-50">
                    Eliminando archivo...
                </div>
            )}

            {alertMessage && <Alert type="info" message={alertMessage} />}
            {showSyncAlert && <Alert type="info" message="Sincronización en progreso..." />}

            <div className="overflow-x-auto rounded-lg shadow-sm border h-[70vh] overflow-y-scroll">
                <table className="w-full table-auto">
                    <thead className="bg-white sticky top-0 z-10 border-b">
                        <tr>
                            <th className="p-4 text-left text-custom-dark font-semibold">Nombre</th>
                            <th className="p-4 text-left text-custom-dark font-semibold">Propietario</th>
                            <th className="p-4 text-left text-custom-dark font-semibold">Tamaño</th>
                            <th className="p-4 text-right text-custom-dark font-semibold">
                                <FiMoreVertical />
                            </th>
                        </tr>
                        <tr className="">
                            <td colSpan={4} className="px-4 py-2 flex items-center gap-2">
                                <div className="flex items-center bg-white rounded-md border px-2 py-1 w-full max-w-md">
                                    <FaFolderPlus className="text-gray-300" />
                                    <input
                                        type="text"
                                        value={newFolderName}
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                        placeholder="Nombre de la nueva carpeta"
                                        className="bg-transparent w-full focus:outline-none px-2 text-sm"
                                    />
                                    <BiSend
                                        className="text-gray-600 cursor-pointer"
                                        onClick={handleCreateFolder}
                                    />
                                </div>
                                <RxReload
                                    className="text-gray-600 cursor-pointer"
                                    onClick={fetchFilesFromS3}
                                />
                            </td>
                        </tr>
                    </thead>
                    <tbody
                        className=''
                    >
                        {organizedData.map((folder, folderIndex) => (
                            <React.Fragment key={folderIndex}>
                                <tr
                                    className="border-b cursor-pointer transition "
                                    onClick={() => toggleFolder(folder.folder_path)}
                                >
                                    <td colSpan={3} className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <FaFolder className="text-custom-darkest" />
                                                <span className="font-medium">{folder.folder_path || activeOrganization?.name}</span>
                                            </div>
                                            {folder.folder_path === 'sync' && (
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSync();
                                                    }}
                                                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 text-xs text-custom-darkest cursor-pointer"
                                                >
                                                    <FaSyncAlt />
                                                    Sincronizar
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>

                                {openFolders.includes(folder.folder_path) &&
                                    folder.files.map((file: any, fileIndex: any) => (
                                        <tr
                                            key={`${folder.folder_path}-${fileIndex}`}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="p-4 pl-10 flex items-center gap-2">
                                                <FaFile className="text-custom-base" />
                                                <span title={file.file_name}>
                                                    {file.file_name.length > 40
                                                        ? file.file_name.substring(0, 24) + '...'
                                                        : file.file_name}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <img className="w-5 h-5 rounded-full" src={UserIcon} />
                                            </td>
                                            <td className="p-4">{formatSizeInMB(file.file_size)} MB</td>
                                            <td className="p-4 relative text-right">
                                                <FiMoreVertical
                                                    className="cursor-pointer text-custom-base"
                                                    onClick={() => toggleMenu(file.key)}
                                                />
                                                {openMenu === file.key && (
                                                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-50">
                                                        <ul>
                                                            <li
                                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => handleOpenFile(file.key)}
                                                            >
                                                                Abrir archivo
                                                            </li>
                                                            <li
                                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => handleDeleteFile(file.key)}
                                                            >
                                                                Eliminar archivo
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
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

    );
};

export default FileManager;
