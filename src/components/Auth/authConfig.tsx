import {
    AWS_COGNITO_USER_POOL_ID,
    AWS_COGNITO_USER_POOL_CLIENT_ID,
    AWS_COGNITO_DOMAIN,
} from '@src/config/env';
import { Amplify } from 'aws-amplify';

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

export { formFields };