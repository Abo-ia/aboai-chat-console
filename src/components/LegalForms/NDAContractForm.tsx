// src/components/LegalForms/NDAContractForm.tsx

import React from 'react';

const NDAContractForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Contrato de Confidencialidad</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Partes Involucradas</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Empresa X y Juan Pérez"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Información Confidencial</label>
                    <textarea
                        placeholder="Describe la información que se considera confidencial"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Duración del Acuerdo</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 2 años"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Excepciones</label>
                    <textarea
                        placeholder="Describe las excepciones a la confidencialidad"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Obligaciones de las Partes</label>
                    <textarea
                        placeholder="Describe las obligaciones de cada parte con respecto a la información confidencial"
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
                    Crear Contrato de Confidencialidad
                </button>
            </form>
        </div>
    );
};

export default NDAContractForm;
