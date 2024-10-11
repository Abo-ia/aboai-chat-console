// src/components/LegalForms/ConfidentialityAgreementForm.tsx

import React, { useState } from 'react';
import generateConfidentialityAgreement from '@src/config/generateConfidentialityAgreement';
import Modal from '@src/components/Modals/Modal';

const ConfidentialityAgreementForm: React.FC = () => {
    const [formData, setFormData] = useState({
        fechaConvenio: '',
        nombreParteDivulgante: '',
        direccionParteDivulgante: '',
        nombreParteReceptora: '',
        direccionParteReceptora: '',
        definicionInformacionConfidencial: '',
        obligacionesParteReceptora: '',
        excepcionesConfidencialidad: '',
        duracionConfidencialidad: '',
        medidasSeguridad: '',
        consecuenciasIncumplimiento: '',
        resolucionDisputas: '',
        jurisdiccion: '',
        ciudadFirma: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showModal, setShowModal] = useState(false);
    const [generatedContract, setGeneratedContract] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key] = 'Este campo es obligatorio';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            setTimeout(() => {
                const contract = generateConfidentialityAgreement(formData);
                setGeneratedContract(contract);
                setShowModal(true);
                setIsLoading(false);
            }, 3000);
        }
    };

    return (
        <div className="px-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Crear un Convenio de Confidencialidad</h2>
            <form onSubmit={handleSubmit} className=' h-[80vh] overflow-y-scroll'>
                {Object.keys(formData).map((fieldName) => (
                    <div className="mb-4" key={fieldName}>
                        <label className="block text-gray-700 capitalize">
                            {fieldName
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                        <input
                            type={fieldName.includes('fecha') ? 'date' : 'text'}
                            name={fieldName}
                            value={formData[fieldName as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={`Introduce ${fieldName}`}
                            className={`w-full border p-2 rounded-lg ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors[fieldName] && <p className="text-red-500 text-sm">{errors[fieldName]}</p>}
                    </div>
                ))}

                <button
                    type="submit"
                    className={`bg-custom-base text-white p-2 rounded-lg w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Procesando...' : 'Crear Convenio de Confidencialidad'}
                </button>
            </form>

            {showModal && (
                <Modal children={generatedContract} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default ConfidentialityAgreementForm;
