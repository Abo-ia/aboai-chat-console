// src/components/LegalForms/LaborContractForm.tsx

import React from 'react';

const LaborContractForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Contrato Laboral</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Empleado y Empleador</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Empresa X y Juan Pérez"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Puesto de Trabajo</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Desarrollador de Software"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Salario y Beneficios</label>
                    <textarea
                        placeholder="Describe el salario y beneficios adicionales"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Duración del Contrato</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Contrato indefinido o por un año"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Período de Prueba</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 3 meses"
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
                    Crear Contrato Laboral
                </button>
            </form>
        </div>
    );
};

export default LaborContractForm;
