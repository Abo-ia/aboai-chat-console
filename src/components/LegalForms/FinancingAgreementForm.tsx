// src/components/LegalForms/FinancingAgreementForm.tsx

import React from 'react';

const FinancingAgreementForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Convenio de Financiación</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Partes Involucradas</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Juan Pérez (Financiador) y Empresa X (Beneficiario)"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Monto del Financiamiento</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, $50,000 MXN"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Plazo del Financiamiento</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 24 meses"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tasa de Interés</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 5% anual"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Condiciones de Reembolso</label>
                    <textarea
                        placeholder="Describe las condiciones de reembolso, como los plazos y la frecuencia de pagos"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Garantías</label>
                    <textarea
                        placeholder="Describe las garantías ofrecidas en caso de incumplimiento"
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
                    Crear Convenio de Financiación
                </button>
            </form>
        </div>
    );
};

export default FinancingAgreementForm;
