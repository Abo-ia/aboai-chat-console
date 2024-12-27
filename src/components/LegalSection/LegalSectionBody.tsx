import React, { useState } from 'react';
import Formulario from '@src/components/LegalSection/LegalForm';
import { FaFileContract, FaHandshake, FaFileAlt } from 'react-icons/fa';
import { FaPlusCircle } from "react-icons/fa";

interface SidebarProps {
    activeView: string;
}

const LegalSectionBody: React.FC<SidebarProps> = ({ activeView }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [documentType, setDocumentType] = useState<string | null>(null);
    const [documentName, setDocumentName] = useState<string | null>(null);

    const optionsDocuments = {
        contratos: [
            'Contrato Laboral',
            'Contrato de Arrendamiento',
            'Contrato de Compraventa',
            'Contrato de Prestación de Servicios',
            'Contrato de Confidencialidad',
            'Contrato de Asociación',
            'Contrato de Franquicia',
            'Contrato de Sociedad',
        ],
        convenios: [
            'Convenio de Colaboración',
            'Convenio de Confidencialidad',
            'Convenio de Pago',
            'Convenio de Asociación',
            'Convenio de Financiación',
            'Convenio de Distribución',
            'Convenio de Subcontratación',
        ],
        denuncias: [
            'Creación de Denuncia',
        ]
    };

    const alternarMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const seleccionarDocumento = (tipo: string, nombre: string) => {
        setDocumentType(tipo);
        setDocumentName(nombre);
    };

    return (
        <div className="flex flex-col lg:flex-row">
            {window.innerWidth < 768 &&
                <div
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='flex items-center bg-gray-100 shadow-lg mx-4 my-1 rounded-lg'>
                    <FaPlusCircle
                        className='my-2 mr-2 right-4 bottom-4 text-2xl text-custom-base cursor-pointer'
                    />
                    Crear nuevo documento
                </div>}

            <div className='flex w-full'>
                {isSidebarOpen &&
                    <div className="w-1/2 bg-gray-100 p-4 shadow-lg">
                        <div className="text-2xl font-bold text-gray-800 mb-6">Documentos</div>

                        <div className="mb-4">
                            <button
                                onClick={() => alternarMenu('contratos')}
                                className="w-full flex justify-between items-center bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                            >
                                <div className="flex items-center">
                                    <FaFileContract className="mr-2 text-gray-700" />
                                    Contratos
                                </div>
                                <span>{openMenu === 'contratos' ? '-' : '+'}</span>
                            </button>
                            {openMenu === 'contratos' && (
                                <div className="pl-6 pt-2">
                                    <ul className="space-y-2">
                                        {optionsDocuments.contratos.map((contrato, index) => (
                                            <li key={index} className="flex items-center">
                                                {documentName === contrato && (
                                                    <span className="w-2 h-2 bg-custom-base rounded-full mr-2"></span>
                                                )}
                                                <button
                                                    onClick={() => seleccionarDocumento('contratos', contrato)}
                                                    className="text-left text-gray-700 hover:bg-gray-200 py-1 px-2 transition-colors duration-300 flex-grow"
                                                >
                                                    {contrato}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <button
                                onClick={() => alternarMenu('convenios')}
                                className="w-full flex justify-between items-center bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                            >
                                <div className="flex items-center">
                                    <FaHandshake className="mr-2 text-gray-700" />
                                    Convenios
                                </div>
                                <span>{openMenu === 'convenios' ? '-' : '+'}</span>
                            </button>
                            {openMenu === 'convenios' && (
                                <div className="pl-6 pt-2">
                                    <ul className="space-y-2">
                                        {optionsDocuments.convenios.map((convenio, index) => (
                                            <li key={index} className="flex items-center">
                                                {documentName === convenio && (
                                                    <span className="w-2 h-2 bg-custom-base rounded-full mr-2"></span>
                                                )}
                                                <button
                                                    onClick={() => seleccionarDocumento('convenios', convenio)}
                                                    className="text-left text-gray-700 hover:bg-gray-200 py-1 px-2 transition-colors duration-300 flex-grow"
                                                >
                                                    {convenio}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <button
                                onClick={() => alternarMenu('denuncias')}
                                className="w-full flex justify-between items-center bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                            >
                                <div className="flex items-center">
                                    <FaHandshake className="mr-2 text-gray-700" />
                                    Denuncias
                                </div>
                                <span>{openMenu === 'denuncia' ? '-' : '+'}</span>
                            </button>
                            {openMenu === 'denuncias' && (
                                <div className="pl-6 pt-2">
                                    <ul className="space-y-2">
                                        {optionsDocuments.denuncias.map((denuncia, index) => (
                                            <li key={index} className="flex items-center">
                                                {documentName === denuncia && (
                                                    <span className="w-2 h-2 bg-custom-base rounded-full mr-2"></span>
                                                )}
                                                <button
                                                    onClick={() => seleccionarDocumento('denuncia', denuncia)}
                                                    className="text-left text-gray-700 hover:bg-gray-200 py-1 px-2 transition-colors duration-300 flex-grow"
                                                >
                                                    {denuncia}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>}



                <div className="w-full h-screen p-8 bg-gray-50">
                    {documentType && documentName ? (
                        <Formulario documentType={documentType} documentName={documentName} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <FaFileAlt className="text-6xl mb-4" />
                            <p className="text-xl">Selecciona un tipo de documento para empezar.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LegalSectionBody;
