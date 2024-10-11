// src/components/LegalForms/SubcontractingAgreementForm.tsx

import React from 'react';

const SubcontractingAgreementForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Convenio de Subcontratación</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Contratista y Subcontratista</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Empresa X (Contratista) y Juan Pérez (Subcontratista)"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción del Trabajo</label>
                    <textarea
                        placeholder="Describe el trabajo o servicios que serán subcontratados"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Plazo del Convenio</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 6 meses"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Compensación y Condiciones de Pago</label>
                    <textarea
                        placeholder="Describe la compensación y las condiciones de pago acordadas"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Obligaciones del Subcontratista</label>
                    <textarea
                        placeholder="Describe las obligaciones y responsabilidades del subcontratista"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confidencialidad y No Divulgación</label>
                    <textarea
                        placeholder="Incluye cualquier acuerdo de confidencialidad relacionado con la subcontratación"
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
                    Crear Convenio de Subcontratación
                </button>
            </form>
        </div>
    );
};

export default SubcontractingAgreementForm;
