import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import StepperPayment from './views/payment/StepperPayment';
import ContractsBuilder from './views/contracts-builder/ContractsBuilder';
import AIChat from './views/ai-chat/AIChat';
import OrganizationsView from './views/organizations/OrganizationsView';
import CloudConnectivity from './views/connectivity/CloudConnectivity';

import '@aws-amplify/ui-react/styles.css';
import { useOrganization } from './context/OrganizationContext';
import AuthWrapper from './components/Auth/AuthWrapper';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { state, isLoading } = useOrganization();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-custom-light">
                <div className="w-10 h-10 border-4 border-custom-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isLoading && state.organizations.length === 0) {
        console.log('No organizations found, redirecting to organizations page');
        return <Navigate to="/organizaciones" replace />;
    }

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <AuthWrapper>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <AIChat />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/conectividad"
                        element={
                            <ProtectedRoute>
                                <CloudConnectivity />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/contratos-y-acuerdos"
                        element={
                            <ProtectedRoute>
                                <ContractsBuilder />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/pagos"
                        element={
                            <ProtectedRoute>
                                <StepperPayment />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/organizaciones" element={<OrganizationsView />} />
                </Routes>
            </Router>
        </AuthWrapper>
    );
};

export default App;
