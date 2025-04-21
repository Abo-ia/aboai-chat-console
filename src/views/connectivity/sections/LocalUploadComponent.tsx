import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME,
    AWS_REGION,
} from '@src/config/env';
import { useOrganization } from '@src/context/OrganizationContext';

const LocalUploadComponent: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadMessage, setUploadMessage] = useState<string | null>(null);

    const { state } = useOrganization();
    const { activeOrganization } = state;
    const organizationId = activeOrganization?.organization_id ?? '';

    const s3Client = new S3Client({
        region: AWS_REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles([...event.target.files]);
        }
    };

    const handleUploadFiles = async () => {
        if (selectedFiles.length === 0) {
            setUploadMessage('No hay archivos para subir.');
            return;
        }

        if (!organizationId) {
            setUploadMessage('Error: No se encontró el identificador de la organización.');
            return;
        }

        setIsUploading(true);
        setUploadMessage(null);

        try {
            for (const file of selectedFiles) {
                const fileKey = `${organizationId}/${file.name}`;

                const fileBuffer = await file.arrayBuffer();

                const uploadParams = {
                    Bucket: AWS_BUCKET_NAME,
                    Key: fileKey,
                    Body: new Uint8Array(fileBuffer),
                    ContentType: file.type,
                };

                await s3Client.send(new PutObjectCommand(uploadParams));
            }

            setUploadMessage('¡Archivos subidos exitosamente a S3!');
            setSelectedFiles([]);
        } catch (error) {
            console.error('Error subiendo archivos a S3:', error);
            setUploadMessage('Error subiendo archivos a S3.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-2/3 mx-auto">
            <div className="text-center border-b border-gray-300">
                <h2 className="text-2xl font-semibold text-gray-700">Subir Archivos</h2>
                <p className="text-gray-500 mb-6 text-sm text-center">
                    Selecciona archivos desde tu computadora o arrástralos aquí para subirlos.
                </p>
            </div>

            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
                        <span className="font-semibold">Click para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">
                        Archivos de texto (.txt), documentos (.docx, .pdf), hojas de cálculo
                        (.xlsx), imágenes (.jpg, .png), etc.
                    </p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            {selectedFiles.length > 0 && (
                <div className="mt-4 w-full max-w-lg bg-white p-4 rounded-lg">
                    <h3 className="text-gray-700 font-semibold mb-2">Archivos seleccionados:</h3>
                    <ul className="text-sm text-gray-600">
                        {selectedFiles.map((file, index) => (
                            <li key={index} className="py-1 border-b last:border-none">
                                {file.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={handleUploadFiles}
                className={`mt-4 px-6 py-2 rounded-lg font-semibold text-white ${
                    isUploading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-custom-primary hover:bg-custom-secondary transition-all'
                }`}
                disabled={isUploading}
            >
                {isUploading ? 'Subiendo...' : 'Subir Archivos'}
            </button>

            {uploadMessage && <p className="mt-2 text-sm text-gray-700">{uploadMessage}</p>}
        </div>
    );
};

export default LocalUploadComponent;
