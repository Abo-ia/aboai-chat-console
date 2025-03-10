import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { components, formFields } from '@src/config/authConfig';
import CloudStorage from './views/cloud-storage/CloudStorage';
import StepperPayment from './views/payment/StepperPayment';
import ContractsBuilder from './views/contracts-builder/ContractsBuilder';
import AIChat from './views/ai-chat/AIChat';
import OrganizationsView from './views/organizations/OrganizationsView';
import CloudConnectivity from './views/connectivity/CloudConnectivity';

import '@aws-amplify/ui-react/styles.css';
import { useOrganization } from './context/OrganizationContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { state } = useOrganization();

    if (state.organizations.length === 0) {
        return <Navigate to="/organizaciones" replace />;
    }

    return <>{children}</>;
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
                    <Route path="/" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
                    <Route path="/conectividad" element={<ProtectedRoute><CloudConnectivity /></ProtectedRoute>} />
                    <Route path="/almacenamiento" element={<ProtectedRoute><CloudStorage /></ProtectedRoute>} />
                    <Route path="/contratos-y-acuerdos" element={<ProtectedRoute><ContractsBuilder /></ProtectedRoute>} />
                    <Route path="/pagos" element={<ProtectedRoute><StepperPayment /></ProtectedRoute>} />
                    <Route path="/organizaciones" element={<OrganizationsView />} />
                </Routes>
            </Router>
        </Authenticator>
    );
};

export default App;
