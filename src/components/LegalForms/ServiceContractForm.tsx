// src/components/LegalForms/ServiceContractForm.tsx

import React from 'react';

const ServiceContractForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Contrato de Prestación de Servicios</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Proveedor de Servicios y Cliente</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Juan Pérez (Proveedor) y Empresa X (Cliente)"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción del Servicio</label>
                    <textarea
                        placeholder="Describe los servicios que se proporcionarán"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tarifas y Método de Pago</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, $500 MXN por hora, pagos mensuales"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Duración del Contrato</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 6 meses"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Condiciones de Terminación</label>
                    <textarea
                        placeholder="Describe las condiciones bajo las cuales se puede terminar el contrato"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Responsabilidades y Garantías</label>
                    <textarea
                        placeholder="Describe las responsabilidades y garantías del proveedor"
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
                    Crear Contrato de Prestación de Servicios
                </button>
            </form>
        </div>
    );
};

export default ServiceContractForm;
