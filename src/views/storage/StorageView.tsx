import React, { useState, useEffect } from 'react';
import { FileItem } from '@src/types/types';
import Sidebar from '@src/components/Storage/Sidebar';
import Header from '@src/components/Storage/Header';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

import { FiFolder, FiFile, FiMoreVertical, } from 'react-icons/fi';

const FileExplorerTable: React.FC = () => {
    const [data, setData] = useState<FileItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [continuationToken, setContinuationToken] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;

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
            console.log('Response:', response);
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
        setCurrentPage(1); // Reset to page 1 on search
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

    const getPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getPaginationNumbers = () => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const pages = [];

        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (currentPage > totalPages - 4) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages;
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
                    <div className="overflow-y-auto max-h-[500px]"> {/* Scroll vertical y altura máxima */}
                        <table className="bg-white shadow-md rounded-lg min-w-full">
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
                                {getPageData()
                                    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item, id) => {
                                        const slicedName = item.name.length > 60 ? `${item.name.slice(0, 20)}...` : item.name;
                                        return (
                                            <tr
                                            key={id} 
                                            className="hover:bg-custom-lightest transition duration-300 ease-in-out">
                                                <td className="p-4">
                                                    <div className="flex items-center">
                                                        {item.type === 'folder' ? (
                                                            <FiFolder className="mr-2 text-custom-base" />
                                                        ) : (
                                                            <FiFile className="mr-2 text-custom-darkest" />
                                                        )}
                                                        <span className="text-custom-darkest">{slicedName}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-custom-darkest">{item.owner}</td>
                                                <td className="p-4 text-custom-darkest">{item.lastModified}</td>
                                                <td className="p-4 text-custom-darkest">{item.size || '—'}</td>
                                                <td className="p-4 text-custom-darkest text-right">
                                                    <FiMoreVertical className="cursor-pointer hover:text-custom-base transition-colors duration-200" />
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                    {isLoading && <p className="text-center mt-4">Cargando...</p>}
                    {!isLoading && hasMore && (<button onClick={fetchFilesFromS3} className="mt-4 p-2 bg-blue-500 text-white rounded">Cargar más</button>)}

                    <nav className="flex items-center gap-x-1 mt-4" aria-label="Pagination">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center text-sm rounded-lg border text-gray-800 hover:bg-gray-100 focus:outline-none disabled:opacity-50"
                            aria-label="Previous"
                        >
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6"></path>
                            </svg>
                        </button>
                        <div className="flex items-center gap-x-1">
                            {getPaginationNumbers().map((page, idx) =>
                                typeof page === 'number' ? (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPage(page)}
                                        className={`min-h-[38px] min-w-[38px] flex justify-center items-center border ${currentPage === page ? 'bg-gray-200' : 'bg-transparent'} text-gray-800 py-2 px-3 text-sm rounded-lg`}
                                        aria-current={currentPage === page ? 'page' : undefined}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span key={idx} className="text-gray-500">...</span>
                                )
                            )}
                        </div>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                            className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center text-sm rounded-lg border text-gray-800 hover:bg-gray-100 focus:outline-none disabled:opacity-50"
                            aria-label="Next"
                        >
                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6"></path>
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default FileExplorerTable;
