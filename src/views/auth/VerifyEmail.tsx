import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmSignUp } from 'aws-amplify/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail = () => {
    const [code, setCode] = useState<string>('');
    const location = useLocation();
    const { username } = location.state || {};
    const navigate = useNavigate();

    const handleConfirmSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await confirmSignUp({
                username: username,
                confirmationCode: code,
            })
            toast.success("Usuario confirmado correctamente. Por favor inicia sesión.")
            navigate('/auth/signin/', { state: username });
        } catch (error) {
            console.error('Error confirming user:', error);
            toast.error("Error al confirmar usuario. Por favor intenta de nuevo.")
        }
    };

    return (
        <div className="min-h-screen bg-slate-200 text-gray-900 flex items-center justify-center">
            <div className="bg-white shadow sm:rounded-lg p-6 sm:p-12 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl">
                        Verifica tu correo
                    </h1>
                    <form
                        onSubmit={handleConfirmSignUp}
                        className="w-full mt-8">
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            type="text"
                            placeholder="Ingresa tu código de verificación"
                            className="w-full rounded-lg border border-stroke py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        <button
                            className="mt-5 tracking-wide font-semibold bg-slate-500 text-gray-100 w-full py-4 rounded-lg hover:bg-slate-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            type="submit"
                        >
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M9 5l7 7-7 7"></path>
                            </svg>
                            <span className="ml-3">
                                Verificar código
                            </span>
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default VerifyEmail;
