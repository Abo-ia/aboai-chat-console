import { Authenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { useEffect, useState } from 'react';

import SharedHeader from './Shared/Header';
import SignInFooter from './Signin/SignInFooter';
import SignUpFooter from './Signup/SignUpFooter';
import SignUpFormFields from './Signup/SignUpFormFields';

import { formFields } from './authConfig';
import '@src/styles/AuthComponent.css';

interface AuthComponentProps {
    children: React.ReactNode;
}

const components = {
    SignIn: {
        Header: SharedHeader,
        Footer: SignInFooter,
    },
    SignUp: {
        Header: SharedHeader,
        Footer: SignUpFooter,
        FormFields: SignUpFormFields,
    },
};

const AuthWrapper: React.FC<AuthComponentProps> = ({ children }) => {
    const [hasToken, setHasToken] = useState<boolean | null>(null);

    const checkToken = async () => {
        try {
            const session = await fetchAuthSession();
            const idToken = session?.tokens?.idToken?.toString();
            setHasToken(!!idToken);
        } catch {
            setHasToken(false);
        }
    };

    useEffect(() => {
        checkToken();

        // Suscribirse a eventos de autenticación
        const unsubscribe = Hub.listen('auth', (data) => {
            const { payload } = data;
            if (['signedIn', 'signedOut'].includes(payload.event)) {
                checkToken();
            }
        });

        return () => {
            unsubscribe(); // limpiar listener
        };
    }, []);

    if (hasToken === null) return null;

    if (!hasToken) {
        return (
            <main
                className="flex justify-center items-center h-screen overflow-auto"
                style={{
                    background:
                        'url(https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1) center/cover no-repeat',
                    display: 'flex',
                }}
            >
                <Authenticator formFields={formFields} components={components}>
                    {children}
                </Authenticator>
            </main>
        );
    }

    return (
        <Authenticator formFields={formFields} components={components}>
            {children}
        </Authenticator>
    );
};

export default AuthWrapper;
