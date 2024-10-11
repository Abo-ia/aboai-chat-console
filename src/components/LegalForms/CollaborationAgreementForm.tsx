// src/components/LegalForms/CollaborationAgreementForm.tsx

import React from 'react';

const CollaborationAgreementForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Convenio de Colaboración</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Partes Involucradas</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Empresa X y Empresa Y"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Objetivo de la Colaboración</label>
                    <textarea
                        placeholder="Describe el objetivo o propósito de la colaboración"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Roles y Responsabilidades</label>
                    <textarea
                        placeholder="Describe los roles y responsabilidades de cada parte en la colaboración"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Duración del Convenio</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 12 meses"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Condiciones de Terminación</label>
                    <textarea
                        placeholder="Describe las condiciones bajo las cuales se puede terminar el convenio"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confidencialidad</label>
                    <textarea
                        placeholder="Describe cualquier acuerdo de confidencialidad relacionado con la colaboración"
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
                    Crear Convenio de Colaboración
                </button>
            </form>
        </div>
    );
};

export default CollaborationAgreementForm;
