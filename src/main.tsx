import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from '@src/context/AppContext.tsx';
import { OrganizationProvider } from './context/OrganizationContext.tsx';

import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports.ts';
import App from './App.tsx';
import './index.css';

Amplify.configure(awsConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <OrganizationProvider>
            <AppProvider>
                <App />
            </AppProvider>
        </OrganizationProvider>
    </React.StrictMode>,
);
