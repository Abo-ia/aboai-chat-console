import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatView from '@src/components/Chat/ChatView';

import { fetchAuthSession } from "aws-amplify/auth";
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import { AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_USER_POOL_WEB_CLIENT_ID } from '@src/config/env';
import '@aws-amplify/ui-react/styles.css';


import CloudStorage from './views/cloud-storage/CloudStorage';
import PaymentForm from './views/payment/PaymentForm';
import ContractsBuilder from './views/contracts-builder/ContractsBuilder';
import AIChat from './views/ai-chat/AIChat';
import OrganizationsView from './views/organizations/OrganizationsView';

import { useAuth } from "react-oidc-context";


const App: React.FC = () => {
    const auth = useAuth();

    const signOutRedirect = () => {
        const clientId = "fa062126k0kkb25323q1p2mj1";
        const logoutUri = "<logout uri>";
        const cognitoDomain = "https://<user pool domain>";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<AIChat />} />
                    <Route path="/almacenamiento" element={<CloudStorage />} />
                    <Route path="/contratos-y-acuerdos" element={<ContractsBuilder />} />
                    <Route path='/suscripcion' element={<PaymentForm />} />
                    <Route path='/organizaciones' element={<OrganizationsView />} />
                </Routes>
            </Router>
        );
    }

    return (
        <div>
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
        </div>
    );

}
export default App;