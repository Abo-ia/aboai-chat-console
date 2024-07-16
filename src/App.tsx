import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatView from '@src/views/admin/Chat';
import SignIn from '@src/views/auth/SignIn';
import SignUp from '@src/views/auth/Signup';
import VerifyEmail from '@src/views/auth/VerifyEmail';

import { fetchAuthSession } from "aws-amplify/auth";
import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolClientId: "",
            userPoolId: "",
            loginWith: {
                oauth: {
                    domain: "",
                    scopes: ['openid', 'email'],
                    redirectSignIn: [],
                    redirectSignOut: [],
                    responseType: 'token',
                }
            }
        }
    }
});

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const session = await fetchAuthSession();
                const idToken = session?.tokens?.idToken?.toString();
                setIsAuthenticated(!!idToken);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? element : <Navigate to="/auth/signin" />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoute element={<ChatView />} />} />
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/verify-email" element={<VerifyEmail />} />
            </Routes>
        </Router>
    );
}

export default App;
