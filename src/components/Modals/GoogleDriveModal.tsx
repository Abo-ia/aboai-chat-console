import React, { useEffect, useState } from 'react';
import { AppContext } from '@src/context/AppContext';

import { fetchAuthSession } from 'aws-amplify/auth';
import { gapi } from 'gapi-script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFolderOpen,
    faCloudDownloadAlt,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
    GOOGLE_API_KEY,
    GOOGLE_CLIENT_ID,
    GOOGLE_SCOPES,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_BUCKET_NAME,
} from '@src/config/env';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SyncKnowledgeBase from '@src/services/syncKnowledgeBase.service';

interface GoogleDriveFile {
    id: string;
    name: string;
    mimeType: string;
    webContentLink?: string;
    webViewLink?: string;
}

const GoogleDriveModal = () => {
    const appContext = React.useContext(AppContext);

    if (!appContext?.showModal) {
        return null;
    }

    const [folders, setFolders] = useState<any[]>([]);
    const [files, setFiles] = useState<{ [key: string]: any[] }>({});
    const [expandedFolderId, setExpandedFolderId] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const initClient = () => {
            gapi.client
                .init({
                    apiKey: GOOGLE_API_KEY,
                    clientId: GOOGLE_CLIENT_ID,
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                    scope: GOOGLE_SCOPES,
                })
                .then(() => {
                    const accessToken = localStorage.getItem('googleAccessToken');
                    if (accessToken) {
                        gapi.auth.setToken({ access_token: accessToken });
                        setIsConnected(true);
                        listFolders();
                    } else {
                        console.log('No stored token found, user needs to sign in.');
                    }
                })
                .catch((error: any) => {
                    console.error('Error initializing Google Drive client:', error);
                });
        };
        gapi.load('client:auth2', initClient);
    }, []);

    const handleAuthClick = () => {
        gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
                const accessToken = gapi.auth.getToken().access_token;
                localStorage.setItem('googleAccessToken', accessToken);
                setIsConnected(true);
                listFolders();
            })
            .catch((error: any) => {
                console.error('Error signing in', error);
                toast.error('Error signing in to Google Drive');
            });
    };

    const handleSignOutClick = () => {
        gapi.auth2
            .getAuthInstance()
            .signOut()
            .then(() => {
                localStorage.removeItem('googleAccessToken');
                setFolders([]);
                setFiles({});
                setExpandedFolderId(null);
                setIsConnected(false);
            })
            .catch((error: any) => {
                console.error('Error signing out', error);
                toast.error('Error signing out from Google Drive');
            });
    };

    const listFolders = (parentFolderId: string | null = null) => {
        const query = parentFolderId
            ? `'${parentFolderId}' in parents`
            : "mimeType = 'application/vnd.google-apps.folder' and 'root' in parents";
        gapi.client.drive.files
            .list({
                q: query,
                pageSize: 10,
                fields: 'nextPageToken, files(id, name)',
            })
            .then((response: any) => {
                if (parentFolderId) {
                    setFiles((prevFiles) => ({
                        ...prevFiles,
                        [parentFolderId]: response.result.files,
                    }));
                } else {
                    setFolders(response.result.files);
                }
            })
            .catch((error: any) => {
                console.error('Error listing folders:', error.result.error.message);
                toast.error(`Error listing folders: ${error.result.error.message}`);
            });
    };

    const listFiles = (folderId: string) => {
        gapi.client.drive.files
            .list({
                q: `'${folderId}' in parents`,
                pageSize: 1000,
                fields: 'nextPageToken, files(id, name, mimeType, webContentLink, webViewLink)',
            })
            .then((response: any) => {
                setFiles((prevFiles) => ({
                    ...prevFiles,
                    [folderId]: response.result.files,
                }));
                console.log('Files in folder', folderId, response.result.files);
            })
            .catch((error: any) => {
                console.error('Error listing files:', error.result.error.message);
                toast.error(`Error listing files: ${error.result.error.message}`);
            });
    };

    const handleFolderClick = (folderId: string) => {
        if (expandedFolderId === folderId) {
            setExpandedFolderId(null);
        } else {
            setExpandedFolderId(folderId);
            if (!files[folderId]) {
                listFiles(folderId);
            }
        }
    };

    const downloadFile = async (file: GoogleDriveFile) => {
        const accessToken = gapi.auth.getToken().access_token;
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
            {
                headers: new Headers({
                    Authorization: 'Bearer ' + accessToken,
                }),
            },
        );

        if (!response.ok) {
            console.error('Failed to download file', response.status, response.statusText);
            toast.error(`Failed to download file: ${file.name}`);
            return null;
        }

        const blob = await response.blob();
        return { blob, name: file.name };
    };

    const uploadToS3 = async (file: Blob, fileName: string) => {
        const s3Client = new S3Client({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
        });

        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: fileName,
            Body: file,
        };

        const command = new PutObjectCommand(params);
        return s3Client.send(command);
    };

    const downloadFolderRecursive = async (folderId: string) => {
        const subfolderFiles = await gapi.client.drive.files.list({
            q: `'${folderId}' in parents`,
            pageSize: 1000,
            fields: 'nextPageToken, files(id, name, mimeType, webContentLink, webViewLink)',
        });

        const filePromises = subfolderFiles.result.files.map(async (file: GoogleDriveFile) => {
            if (file.mimeType === 'application/vnd.google-apps.folder') {
                return downloadFolderRecursive(file.id);
            } else {
                const downloadedFile = await downloadFile(file);
                if (downloadedFile) {
                    return uploadToS3(downloadedFile.blob, downloadedFile.name);
                }
            }
        });

        await Promise.all(filePromises);
    };

    const handleDownloadFolder = async () => {
        const session = await fetchAuthSession();
        const idToken = session?.tokens?.idToken?.toString() as string;

        if (expandedFolderId) {
            setUploading(true);
            try {
                await downloadFolderRecursive(expandedFolderId);

                const syncKnowledgeBaseInstance = new SyncKnowledgeBase(idToken);
                await syncKnowledgeBaseInstance.syncKnowledgeBase('...', '...');

                toast.info(
                    'Proceso de sincronización iniciado. Por favor, espere unos minutos para que los cambios se reflejen en la base de conocimiento.',
                );
            } catch (error) {
                console.error('Error in the upload or sync process', error);
                toast.error('Error in the upload or sync process');
            }
            setUploading(false);
        }
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => appContext?.setShowModal(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default GoogleDriveModal;
