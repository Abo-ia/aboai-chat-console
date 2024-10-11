// src/components/LegalForms/DistributionAgreementForm.tsx

import React from 'react';

const DistributionAgreementForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Convenio de Distribución</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Proveedor y Distribuidor</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Empresa X (Proveedor) y Juan Pérez (Distribuidor)"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Productos a Distribuir</label>
                    <textarea
                        placeholder="Describe los productos que serán distribuidos"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Territorio de Distribución</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Ciudad de México, México"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Condiciones de Venta y Precio</label>
                    <textarea
                        placeholder="Describe las condiciones de venta y los precios acordados"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Duración del Convenio</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 2 años"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Obligaciones del Distribuidor</label>
                    <textarea
                        placeholder="Describe las obligaciones del distribuidor en el convenio"
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
                    Crear Convenio de Distribución
                </button>
            </form>
        </div>
    );
};

export default DistributionAgreementForm;