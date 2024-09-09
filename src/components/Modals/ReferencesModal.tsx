
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Modal: React.FC<{ content: any[]; onClose: () => void }> = ({ content, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
        <div className="bg-white rounded-lg p-8 shadow-lg z-10 max-w-2xl w-3/4">
            <h2 className="text-2xl font-bold mb-4">Referencias</h2>
            {/* {content.map((ref, index) => (
                <ReferenceItem key={index} content={ref} />
            ))} */}
            <button
                onClick={onClose}
                className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
                Cerrar
            </button>
        </div>
    </div>
);

const ReferenceItem: React.FC<{ content: any }> = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const fileName = content.location.s3Location.uri.split('s3://iabogado-bucket/')[1];

    return (
        <div className="mb-1">
            <p
                className="flex items-center text-neutral-500 gap-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                <span
                    className="bg-neutral-100 text-neutral-800 px-3 py-2 rounded mt-2 hover:bg-neutral-200 transition-colors duration-300 text-sm font-semibold"
                >
                    {fileName}
                </span>

            </p>
            {isOpen && <p className="mt-2">{content.content.text}</p>}
        </div>
    );
};


export default Modal;