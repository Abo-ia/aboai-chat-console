import React, { useState } from 'react';
import { FiFolder, FiFile, FiMoreVertical, } from 'react-icons/fi';

import { FileItem } from '@src/types/types';


const FileItemRow: React.FC<{ 
    item: FileItem,
    onClick?: any,
    onDownload?: any
 }> = ({ item }) => {
    const slicedName = item.name.length > 60 ? `${item.name.slice(0, 20)}...` : item.name;
    return (
        <tr className="hover:bg-custom-lightest transition duration-300 ease-in-out">
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
    );
};

export default FileItemRow;