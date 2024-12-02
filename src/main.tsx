import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from '@src/context/AppContext.tsx'

import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_x8qEjt0hx",
    client_id: "5m159m99fpk1uv41ip0vdh74lc",
    redirect_uri: "https://development.d3jkwmni3crdra.amplifyapp.com/",
    response_type: "code",
    scope: "phone openid email",
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
