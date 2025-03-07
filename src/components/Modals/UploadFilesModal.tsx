import React, { useState, useContext } from 'react';
import { AppContext } from '@src/context/AppContext';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_BUCKET_NAME,
} from '@src/config/env';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SyncKnowledgeBase from '@src/services/syncKnowledgeBase.service';
import { fetchAuthSession } from 'aws-amplify/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const UploadFileModal = () => {
    const appContext = useContext(AppContext);
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    if (!appContext?.uploadFileShowModal) {
        return null;
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(event.target.files);
    };

    const uploadToS3 = async (file: File) => {
        const s3Client = new S3Client({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
        });

        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: file.name,
            Body: file,
        };

        const command = new PutObjectCommand(params);
        return s3Client.send(command);
    };

    const handleUpload = async () => {
        const session = await fetchAuthSession();
        const idToken = session?.tokens?.idToken?.toString() as string;

        if (selectedFiles) {
            setUploading(true);
            try {
                const uploadPromises = Array.from(selectedFiles).map(uploadToS3);
                await Promise.all(uploadPromises);

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
                        <div className="flex flex-row justify-between px-4 py-5 border-b items-center bg-white shadow">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="https://icons.iconarchive.com/icons/dtafalonso/win-10x/512/My-Files-icon.png"
                                    alt="Google Drive"
                                    className="w-10 h-10"
                                />
                                <h3 className="text-lg font-semibold">Subir archivos</h3>
                            </div>
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none"
                                type="button"
                                onClick={() => appContext?.setUploadFileShowModal(false)}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="relative flex-auto p-6">
                            <div className="flex items-center justify-center w-full mb-4">
                                <label
                                    htmlFor="file-input"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">
                                                Haz clic para subir
                                            </span>{' '}
                                            o arrastra y suelta
                                        </p>
                                    </div>
                                    <input
                                        id="file-input"
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {selectedFiles && (
                                <div className="bg-white shadow rounded-lg p-6 w-full flex justify-between max-w-3xl mt-6">
                                    <button
                                        onClick={handleUpload}
                                        className="bg-neutral-700 text-white px-4 py-2 rounded mb-4 hover:bg-neutral-900 transition duration-300 flex items-center"
                                        disabled={uploading}
                                    >
                                        <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
                                        {uploading
                                            ? 'Subiendo archivos...'
                                            : 'Subir archivos y sincronizar'}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => appContext?.setUploadFileShowModal(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            <ToastContainer />
        </>
    );
};

export default UploadFileModal;
