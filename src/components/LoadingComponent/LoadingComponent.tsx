import React from 'react'

import { useEffect, useState } from 'react';    
import { FaCircleNotch } from 'react-icons/fa';

const LoadingComponent: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const messages = [
        "Recuperando documentos relevantes",
        "Analizando contenido",
        "Sintetizando respuesta",
        "Finalizando salida"
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
        <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <FaCircleNotch className="text-neutral-800 animate-spin text-3xl" />
                </div>
                <h2 className="text-lg font-bold text-center text-gray-800 mb-4">
                    Procesando solicitud
                </h2>
                <ul className="space-y-2 text-center">
                    {messages.map((message, index) => (
                        <li key={index} className={index === messageIndex ? "text-green-700 font-semibold flex items-center justify-center" : "text-gray-600"}>
                            {message}
                            {index === messageIndex && (
                                <span className="ml-2 animate-pulse text-green-600">
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

export default LoadingComponent