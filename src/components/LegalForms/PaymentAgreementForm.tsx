// src/components/LegalForms/PaymentAgreementForm.tsx

import React from 'react';

const PaymentAgreementForm: React.FC = () => {
    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Convenio de Pago</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Deudor y Acreedor</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, Juan Pérez (Deudor) y Empresa X (Acreedor)"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Monto Total a Pagar</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, $10,000 MXN"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Plazo de Pago</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 12 meses"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Frecuencia de Pagos</label>
                    <select className="w-full border border-gray-300 p-2 rounded-lg">
                        <option>Mensual</option>
                        <option>Quincenal</option>
                        <option>Semanal</option>
                        <option>Único</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tasa de Interés (si aplica)</label>
                    <input
                        type="text"
                        placeholder="Por ejemplo, 5% anual"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Condiciones de Incumplimiento</label>
                    <textarea
                        placeholder="Describe las consecuencias en caso de incumplimiento del pago"
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
                    Crear Convenio de Pago
                </button>
            </form>
        </div>
    );
};

export default PaymentAgreementForm;
