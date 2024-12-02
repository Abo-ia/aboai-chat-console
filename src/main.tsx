import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from '@src/context/AppContext.tsx'

import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_Zi2dM23gS",
    client_id: "4455nvqq8t9dd979a33e0nlc0e",
    redirect_uri: "https://development.dbe4134e5l979.amplifyapp.com",
    response_type: "code",
    scope: "email openid phone",
  };

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <AppProvider>
                <App />
            </AppProvider>
        </AuthProvider>
    </React.StrictMode>,
)
