import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from '@src/context/AppContext.tsx'
import { OrganizationProvider } from './context/OrganizationContext.tsx'

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <OrganizationProvider>
            <AppProvider>
                <App />
            </AppProvider>
        </OrganizationProvider>
    </React.StrictMode>,
)