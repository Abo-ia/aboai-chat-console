import React, { useState, useEffect } from 'react';
import { FileItem } from '@src/types/types';
import FileItemRow from '@src/components/Storage/FileItemRow';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { saveAs } from 'file-saver';

import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '@src/config/env';

const FileExplorerTable: React.FC = () => {
    const [data, setData] = useState<FileItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [continuationToken, setContinuationToken] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const s3Client = new S3Client({
        region: 'us-west-2',
        credentials: {
            accessKeyId: 'AKIAQEFWA3RHL6DN3NVI',
            secretAccessKey: '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'
        }
    });

    const fetchFilesFromS3 = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        const command = new ListObjectsV2Command({
            Bucket: 'iabogado-bucket',
            ContinuationToken: continuationToken,
        });

        try {
            const response = await s3Client.send(command);
            if (response.Contents) {
                const fetchedData: FileItem[] = response.Contents.map((item) => ({
                    id: item.Key!,
                    name: item.Key!.split('/').pop()!,
                    type: item.Key!.endsWith('/') ? 'folder' : 'file',
                    owner: 'me',
                    lastModified: item.LastModified?.toLocaleDateString() || '',
                    size: item.Size ? `${(item.Size / 1024).toFixed(2)} KB` : undefined,
                }));

                setData((prevData) => [...prevData, ...fetchedData]);
                setContinuationToken(response.NextContinuationToken);
                setHasMore(!!response.NextContinuationToken);
            }
        } catch (error) {
            console.error('Error fetching files from S3:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        setData([]);
        setContinuationToken(undefined);
        setHasMore(true);
        fetchFilesFromS3();
    };

    const handleFileClick = async (file: FileItem) => {
        if (file.type === 'file') {
            const command = new GetObjectCommand({
                Bucket: 'iabogado-bucket',
                Key: file.id,
            });

            try {
                const response = await s3Client.send(command);
                const url = URL.createObjectURL(await response.Body?.blob());
                window.open(url, '_blank');
            } catch (error) {
                console.error('Error opening file from S3:', error);
            }
        }
    };

    const handleFileDownload = async (file: FileItem) => {
        if (file.type === 'file') {
            const command = new GetObjectCommand({
                Bucket: 'iabogado-bucket',
                Key: file.id,
            });

            try {
                const response = await s3Client.send(command);
                const blob = await response.Body?.blob();
                saveAs(blob, file.name);
            } catch (error) {
                console.error('Error downloading file from S3:', error);
            }
        }
    };

    useEffect(() => {
        fetchFilesFromS3();
    }, [continuationToken]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="p-8 min-w-full m-6 rounded-lg bg-white">
                    <h2 className="text-2xl font-semibold mb-6 text-custom-dark">Archivos</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Buscar archivos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">Buscar</button>
                    </div>
                    <table className="bg-white shadow-md rounded-lg">
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
                            {data
                                .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((item) => (
                                    <FileItemRow
                                        key={item.id}
                                        item={item}
                                        onClick={() => handleFileClick(item)}
                                        onDownload={() => handleFileDownload(item)}
                                    />
                                ))}
                        </tbody>
                    </table>
                    {isLoading && <p className="text-center mt-4">Cargando...</p>}
                    {!isLoading && hasMore && (
                        <button onClick={fetchFilesFromS3} className="mt-4 p-2 bg-blue-500 text-white rounded">Cargar más</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileExplorerTable;
