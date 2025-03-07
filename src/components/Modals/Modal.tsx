import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaPrint, FaFilePdf, FaTimes } from 'react-icons/fa';

interface ModalProps {
    children: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
            <div className="bg-white h-[80vh] overflow-y-scroll rounded-xl shadow-2xl w-11/12 max-w-3xl p-8 relative transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Opciones del Documento</h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-800 focus:outline-none"
                            title="Cerrar"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <ReactMarkdown className="prose max-w-none">{children}</ReactMarkdown>
            </div>
        </div>
    );
};

export default Modal;
