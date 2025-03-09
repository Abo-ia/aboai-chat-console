import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import AvailablePlans from './AvailablePlans';
import PaymentForm from './PaymentForm';

const StepperPayment = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { name: 'Planes disponibles', component: <AvailablePlans /> },
        { name: 'Confirma tu pago', component: <PaymentForm /> },
    ];

    const goNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg h-screen flex flex-col">
            <header className="sticky top-0 bg-white z-10 border-b pb-4 mb-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Assessment_brain_icon.png"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                        <span className="text-xl font-semibold text-gray-800">Abo.AI</span>
                    </div>
                </div>
            </header>

            <div className="sticky top-16 bg-white z-10 py-4 border-b">
                <div className="max-w-lg mx-auto flex justify-between items-center mb-2">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-white transition-all ${
                                    currentStep >= index ? 'bg-custom-primary' : 'bg-gray-300'
                                }`}
                            >
                                {currentStep > index ? <FaCheck size={16} /> : index + 1}
                            </div>
                            {index < steps.length - 1 && (
                                <div className="w-12 h-1 bg-gray-300 mx-2"></div>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-center text-sm font-semibold text-gray-700">
                    {steps[currentStep].name}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
                <div>{steps[currentStep].component}</div>

                <div className="flex justify-between mt-6 max-w-6xl mx-auto ">
                    <button
                        onClick={goBack}
                        disabled={currentStep === 0}
                        className="px-4 py-2 rounded bg-gray-300 text-gray-700 disabled:opacity-50"
                    >
                        Atrás
                    </button>
                    <button
                        onClick={goNext}
                        disabled={currentStep === steps.length - 1}
                        className="px-4 py-2 rounded bg-custom-primary text-white hover:bg-custom-secondary transition-all"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepperPayment;
