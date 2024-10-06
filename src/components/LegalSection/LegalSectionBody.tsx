import React, { useState } from 'react';
import Formulario from '@src/components/LegalSection/LegalForm';
import { FaFileContract, FaHandshake, FaFileAlt } from 'react-icons/fa';

interface SidebarProps {
    activeView: string;
}

const LegalSectionBody: React.FC<SidebarProps> = ({ activeView }) => {
    const [openMenu, setopenMenu] = useState<string | null>(null);
    const [documentType, setdocumentType] = useState<string | null>(null);

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
        acuerdos: [
            'Acuerdo de Confidencialidad',
            'Acuerdo de Licencia',
            'Acuerdo de Distribución',
            'Acuerdo de Servicios',
            'Acuerdo de No Competencia',
            'Acuerdo de Arbitraje',
            'Acuerdo de Propiedad Intelectual',
            'Acuerdo de Resolución de Disputas',
        ],
    };

    const alternarMenu = (menu: string) => {
        setopenMenu(openMenu === menu ? null : menu);
    };

    const seleccionarDocumento = (tipo: string) => {
        setdocumentType(tipo);
    };

    return (
        <div className="flex">
            <div className="w-1/4 h-screen bg-gray-100 p-4 shadow-lg">
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
                                    <li key={index}>
                                        <button
                                            onClick={() => seleccionarDocumento('contratos')}
                                            className="text-left text-gray-700 hover:bg-custom-base hover:text-white py-1 px-2 transition-colors duration-300"
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
                                    <li key={index}>
                                        <button
                                            onClick={() => seleccionarDocumento('convenios')}
                                            className="text-left text-gray-700 hover:bg-custom-base hover:text-white py-1 px-2 transition-colors duration-300"
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
                        onClick={() => alternarMenu('acuerdos')}
                        className="w-full flex justify-between items-center bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                    >
                        <div className="flex items-center">
                            <FaFileAlt className="mr-2 text-gray-700" />
                            Acuerdos
                        </div>
                        <span>{openMenu === 'acuerdos' ? '-' : '+'}</span>
                    </button>
                    {openMenu === 'acuerdos' && (
                        <div className="pl-6 pt-2">
                            <ul className="space-y-2">
                                {optionsDocuments.acuerdos.map((acuerdo, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => seleccionarDocumento('acuerdos')}
                                            className="text-left text-gray-700 hover:bg-custom-base hover:text-white py-1 px-2 rounded transition-colors duration-300"
                                        >
                                            {acuerdo}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-3/4 h-screen p-8 bg-gray-50">
                {documentType ? (
                    <Formulario documentType={documentType} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <FaFileAlt className="text-6xl mb-4" />
                        <p className="text-xl">Selecciona un tipo de documento para empezar.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LegalSectionBody;
