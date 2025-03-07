import React from 'react';
import { useEffect, useState } from 'react';
import { FaCircleNotch } from 'react-icons/fa';

const LoadingComponent: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const messages = [
        'Recuperando documentos relevantes',
        'Analizando contenido',
        'Sintetizando respuesta',
        'Finalizando salida',
    ];

    const totalDuration = 18000;
    const messageDuration = totalDuration / messages.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, messageDuration);

        return () => clearInterval(interval);
    }, [messageDuration]);

    return (
        <div className="flex flex-col items-center justify-center my-5 border w-3/4 rounded-xl mx-auto">
            <div className="bg-custon-bg-main rounded-lg p-6 max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <FaCircleNotch className="text-custom-primary animate-spin text-3xl" />
                </div>
                <h2 className="text-lg font-bold text-center text-custom-primary mb-4">
                    Procesando solicitud
                </h2>
                <ul className="space-y-2 text-center">
                    {messages.map((message, index) => (
                        <li
                            key={index}
                            className={
                                index === messageIndex
                                    ? 'text-custom-secondary font-semibold flex items-center justify-center'
                                    : 'text-gray-500'
                            }
                        >
                            {message}
                            {index === messageIndex && (
                                <span className="ml-2 animate-pulse text-white">
                                    <FaCircleNotch className="animate-spin" />
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LoadingComponent;
