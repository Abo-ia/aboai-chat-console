// src/components/LegalForms/SocietyContractForm.tsx

import React from 'react';

const SocietyContractForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Contrato de Sociedad</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Socios Involucrados</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Juan Pérez y María Gómez"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Propósito de la Sociedad</label>
                    <textarea
                        placeholder="Describe el propósito o actividad principal de la sociedad"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contribuciones de Capital</label>
                    <textarea
                        placeholder="Describe las contribuciones de capital de cada socio"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Distribución de Ganancias y Pérdidas</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 50% para cada socio"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Duración de la Sociedad</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, hasta el 31 de diciembre de 2025"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mecanismo de Toma de Decisiones</label>
                    <textarea
                        placeholder="Describe cómo se tomarán las decisiones dentro de la sociedad"
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
                    Crear Contrato de Sociedad
                </button>
            </form>
        </div>
    );
};

export default SocietyContractForm;
