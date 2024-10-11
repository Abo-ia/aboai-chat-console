// src/components/LegalForms/FranchiseContractForm.tsx

import React from 'react';

const FranchiseContractForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Contrato de Franquicia</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Franquiciante y Franquiciado</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Empresa X (Franquiciante) y Juan Pérez (Franquiciado)"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Marca y Productos/Servicios</label>
                    <textarea
                        placeholder="Describe la marca y los productos o servicios que se ofrecerán"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tarifas de Franquicia</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, $50,000 MXN como tarifa inicial"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Regalías y Pagos Continuos</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 5% de las ventas mensuales como regalías"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Duración del Contrato</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 5 años"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Territorio Exclusivo</label>
                    <textarea
                        placeholder="Describe si hay algún territorio exclusivo para la franquicia"
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
                    Crear Contrato de Franquicia
                </button>
            </form>
        </div>
    );
};

export default FranchiseContractForm;
