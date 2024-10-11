// src/components/LegalForms/LeaseContractForm.tsx

import React from 'react';

const LeaseContractForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Contrato de Arrendamiento</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Arrendador y Arrendatario</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Juan Pérez (Arrendador) y María Gómez (Arrendataria)"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Propiedad Arrendada</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Casa en Av. Reforma #123, Ciudad de México"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Duración del Contrato</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 12 meses"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Monto del Alquiler</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, $10,000 MXN por mes"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Depósito de Seguridad</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, $10,000 MXN"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Condiciones de Mantenimiento</label>
                    <textarea
                        placeholder="Describe las responsabilidades de mantenimiento"
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
                    Crear Contrato de Arrendamiento
                </button>
            </form>
        </div>
    );
};

export default LeaseContractForm;
