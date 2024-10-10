import React, { useState } from 'react';

interface FormularioProps {
    documentType: string;
}

const LegalForm: React.FC<FormularioProps> = ({ documentType }) => {
    const renderForm = () => {
        switch (documentType) {
            case 'contratos':
                return (
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Crear un Contrato</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Partes del Contrato</label>
                                <input
                                    type="text"
                                    placeholder="Por ejemplo, Empresa X y Juan Pérez"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Objetivo del Contrato</label>
                                <input
                                    type="text"
                                    placeholder="Por ejemplo, Servicios de consultoría"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Obligaciones de las Partes</label>
                                <textarea
                                    placeholder="Describe las obligaciones de cada parte"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Duración del Contrato</label>
                                <input
                                    type="text"
                                    placeholder="Por ejemplo, Desde el 1 de enero de 2024 hasta el 31 de diciembre de 2024"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Jurisdicción</label>
                                <input
                                    type="text"
                                    placeholder="Por ejemplo, Ciudad de México, México"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Método de Firma</label>
                                <select className="w-full border border-gray-300 p-2 rounded-lg">
                                    <option>Firma electrónica</option>
                                    <option>Firma manuscrita</option>
                                </select>
                            </div>
                            <button className="bg-custom-base text-white p-2 rounded-lg w-full">
                                Crear Contrato
                            </button>
                        </form>
                    </div>
                );
            case 'convenios':
                return (
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Crear un Convenio</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Partes del Convenio</label>
                                <input
                                    type="text"
                                    placeholder="Por ejemplo, Empresa X y Proveedor Y"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Propósito del Convenio</label>
                                <input
                                    type="text"
                                    placeholder="Por ejemplo, Colaboración para distribución"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Duración del Convenio</label>
                                <input
                                    type="text"
                                    placeholder="Por ejemplo, Desde el 1 de marzo de 2024 hasta el 1 de marzo de 2026"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Obligaciones de las Partes</label>
                                <textarea
                                    placeholder="Describe las obligaciones de cada parte"
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Método de Firma</label>
                                <select className="w-full border border-gray-300 p-2 rounded-lg">
                                    <option>Firma electrónica</option>
                                    <option>Firma manuscrita</option>
                                </select>
                            </div>
                            <button className="bg-custom-base text-white p-2 rounded-lg w-full">
                                Crear Convenio
                            </button>
                        </form>
                    </div>
                );
            default:
                return <p>No se ha seleccionado ningún tipo de documento</p>;
        }
    };

    return <div>{renderForm()}</div>;
};

export default LegalForm;
