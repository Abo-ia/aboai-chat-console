// src/components/LegalForms/SaleContractForm.tsx

import React from 'react';

const SaleContractForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Contrato de Compraventa</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Vendedor y Comprador</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Juan Pérez (Vendedor) y María Gómez (Compradora)"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción del Bien</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Vehículo modelo 2020, color blanco"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Precio de Venta</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, $150,000 MXN"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Condiciones de Pago</label>
                    <textarea
                        placeholder="Describe las condiciones de pago, por ejemplo, pago único o en cuotas"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha de Entrega</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 1 de diciembre de 2024"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Garantías</label>
                    <textarea
                        placeholder="Describe cualquier garantía ofrecida por el vendedor"
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
                    Crear Contrato de Compraventa
                </button>
            </form>
        </div>
    );
};

export default SaleContractForm;
