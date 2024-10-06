import React, { useState } from 'react';
import Formulario from '@src/components/LegalSection/LegalForm';

interface SidebarProps {
    activeView: string;
}

const LegalSectionBody: React.FC<SidebarProps> = ({ activeView }) => {
    const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
    const [tipoDocumento, setTipoDocumento] = useState<string | null>(null);

    const opcionesDocumentos = {
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
        setMenuAbierto(menuAbierto === menu ? null : menu);
    };

    const seleccionarDocumento = (tipo: string) => {
        setTipoDocumento(tipo);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 h-screen bg-gray-100 p-4">
                <div className="text-lg font-semibold text-gray-800 mb-4">Documentos</div>

                {/* Contratos */}
                <div className="mb-2">
                    <button
                        onClick={() => alternarMenu('contratos')}
                        className="w-full flex justify-between items-center bg-gray-200 p-2 rounded-lg"
                    >
                        Contratos
                        <span>{menuAbierto === 'contratos' ? '-' : '+'}</span>
                    </button>
                    {menuAbierto === 'contratos' && (
                        <div className="pl-4 pt-2">
                            <ul>
                                {opcionesDocumentos.contratos.map((contrato, index) => (
                                    <li key={index} className="mb-2">
                                        <button onClick={() => seleccionarDocumento('contratos')}>
                                            {contrato}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Convenios */}
                <div className="mb-2">
                    <button
                        onClick={() => alternarMenu('convenios')}
                        className="w-full flex justify-between items-center bg-gray-200 p-2 rounded-lg"
                    >
                        Convenios
                        <span>{menuAbierto === 'convenios' ? '-' : '+'}</span>
                    </button>
                    {menuAbierto === 'convenios' && (
                        <div className="pl-4 pt-2">
                            <ul>
                                {opcionesDocumentos.convenios.map((convenio, index) => (
                                    <li key={index} className="mb-2">
                                        <button onClick={() => seleccionarDocumento('convenios')}>
                                            {convenio}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Acuerdos */}
                <div className="mb-2">
                    <button
                        onClick={() => alternarMenu('acuerdos')}
                        className="w-full flex justify-between items-center bg-gray-200 p-2 rounded-lg"
                    >
                        Acuerdos
                        <span>{menuAbierto === 'acuerdos' ? '-' : '+'}</span>
                    </button>
                    {menuAbierto === 'acuerdos' && (
                        <div className="pl-4 pt-2">
                            <ul>
                                {opcionesDocumentos.acuerdos.map((acuerdo, index) => (
                                    <li key={index} className="mb-2">
                                        <button onClick={() => seleccionarDocumento('acuerdos')}>
                                            {acuerdo}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Contenedor del Formulario */}
            <div className="w-3/4 h-screen p-6">
                {tipoDocumento ? (
                    <Formulario tipoDocumento={tipoDocumento} />
                ) : (
                    <p className="text-gray-500">Selecciona un tipo de documento para empezar.</p>
                )}
            </div>
        </div>
    );
};

export default LegalSectionBody;