import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatView from '@src/components/Chat/ChatView';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import {
    AWS_COGNITO_USER_POOL_ID,
    AWS_COGNITO_USER_POOL_CLIENT_ID,
    AWS_COGNITO_DOMAIN,
} from '@src/config/env';
import '@aws-amplify/ui-react/styles.css';

import CloudStorage from './views/cloud-storage/CloudStorage';
import PaymentForm from './views/payment/PaymentForm';
import ContractsBuilder from './views/contracts-builder/ContractsBuilder';
import AIChat from './views/ai-chat/AIChat';
import OrganizationsView from './views/organizations/OrganizationsView';
import CloudConnectivity from './views/connectivity/CloudConnectivity';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolClientId: AWS_COGNITO_USER_POOL_CLIENT_ID,
            userPoolId: AWS_COGNITO_USER_POOL_ID,
            loginWith: {
                oauth: {
                    domain: AWS_COGNITO_DOMAIN,
                    scopes: ['openid', 'email'],
                    redirectSignIn: [],
                    redirectSignOut: [],
                    responseType: 'token',
                },
            },
        },
    },
});

const formFields = {
    signIn: {
        username: {
            label: 'Email',
            placeholder: 'Ingresa tu correo electrónico',
        },
    },
    signUp: {
        username: {
            label: 'Email',
            placeholder: 'Ingresa tu correo electrónico',
        },
    },
};

const components = {
    SignIn: {
        Header() {
            return (
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Iniciar Sesión</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Ingresa tu correo electrónico y contraseña para iniciar sesión
                    </p>
                </div>
            );
        },
        Footer() {
            const { toSignUp, toForgotPassword } = useAuthenticator();
            return (
                <>
                    <div className="text-center mt-4">
                        <button
                            onClick={toForgotPassword}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            ¿No tienes cuenta?{' '}
                            <button
                                onClick={toSignUp}
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Crear cuenta
                            </button>
                        </p>
                    </div>
                </>
            );
        },
        FormFields() {
            const { validationErrors } = useAuthenticator();
            return (
                <>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            name="username"
                            type="email"
                            placeholder="nombre@correo.com"
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {validationErrors.username && (
                            <span className="text-red-500 text-xs mt-1">
                                {validationErrors.username}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contraseña
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {validationErrors.password && (
                            <span className="text-red-500 text-xs mt-1">
                                {validationErrors.password}
                            </span>
                        )}
                    </div>

                    <div className="mb-6">
                        <button className="w-full bg-secondary_green border-[1px] border-main_green p-3 rounded-md font-medium transition">
                            INICIAR SESIÓN
                        </button>
                    </div>
                </>
            );
        },
    },
    SignUp: {
        Header() {
            return (
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Crear una Cuenta</h1>
                    <p className="mt-2 text-sm text-gray-600">Únete hoy. Es rápido y fácil.</p>
                </div>
            );
        },
        Footer() {
            const { toSignIn } = useAuthenticator();
            return (
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <button
                            onClick={toSignIn}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Iniciar Sesión
                        </button>
                    </p>
                </div>
            );
        },
        FormFields() {
            const { validationErrors } = useAuthenticator();

            return (
                <>
                    <style>
                        {`
                            .amplify-button {
                                display: none; /* Hides the default submit button */
                            }
                        `}
                    </style>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            name="username"
                            type="email"
                            placeholder="nombre@correo.com"
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {validationErrors.username && (
                            <span className="text-red-500 text-xs mt-1">
                                {validationErrors.username}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contraseña
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Crea una contraseña"
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {validationErrors.password && (
                            <span className="text-red-500 text-xs mt-1">
                                {validationErrors.password}
                            </span>
                        )}
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="confirm_password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirmar Contraseña
                        </label>
                        <input
                            name="confirm_password"
                            type="password"
                            placeholder="Confirma tu contraseña"
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {validationErrors.confirm_password && (
                            <span className="text-red-500 text-xs mt-1">
                                {validationErrors.confirm_password}
                            </span>
                        )}
                    </div>

                    <div className="text-sm text-gray-600 text-center">
                        Al registrarte, aceptas nuestros{' '}
                        <a href="/terms" className="text-main_green font-medium hover:underline">
                            Términos de Servicio
                        </a>{' '}
                        y{' '}
                        <a href="/privacy" className="text-main_green font-medium hover:underline">
                            Política de Privacidad
                        </a>
                        .
                    </div>

                    <div className="mb-6">
                        <button className="w-full bg-secondary_green border-[1px] border-main_green p-3 rounded-md font-medium transition">
                            CREAR CUENTA
                        </button>
                    </div>
                </>
            );
        },
    },
};

const App: React.FC = () => {
    return (
        <Authenticator
            components={components}
            formFields={formFields}
            className="flex justify-center items-center h-screen"
        >
            <Router>
                <Routes>
                    <Route path="/" element={<AIChat />} />
                    <Route path='/conectividad' element={<CloudConnectivity />} />
                    <Route path="/almacenamiento" element={<CloudStorage />} />
                    <Route path="/contratos-y-acuerdos" element={<ContractsBuilder />} />
                    <Route path="/suscripcion" element={<PaymentForm />} />
                    <Route path="/organizaciones" element={<OrganizationsView />} />
                </Routes>
            </Router>
        </Authenticator>
    );
};
export default App;
