// src/components/LegalForms/PartnershipContractForm.tsx

import React from 'react';

const PartnershipContractForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Contrato de Asociación</h2>
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
                    <label className="block text-gray-700">Propósito de la Asociación</label>
                    <textarea
                        placeholder="Describe el propósito o objetivo de la asociación"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contribuciones de los Socios</label>
                    <textarea
                        placeholder="Describe las contribuciones de cada socio (financieras, bienes, servicios, etc.)"
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
                    <label className="block text-gray-700">Duración de la Asociación</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, hasta el 31 de diciembre de 2025"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Resolución de Disputas</label>
                    <textarea
                        placeholder="Describe cómo se resolverán las disputas entre los socios"
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
                    Crear Contrato de Asociación
                </button>
            </form>
        </div>
    );
};

export default PartnershipContractForm;
