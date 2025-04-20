import { ResourcesConfig } from 'aws-amplify';
import {
    AWS_COGNITO_USER_POOL_CLIENT_ID,
    AWS_COGNITO_USER_POOL_ID,
    AWS_COGNITO_DOMAIN,
} from '@src/config/env';

const awsConfig: ResourcesConfig = {
    Auth: {
        Cognito: {
            userPoolClientId: AWS_COGNITO_USER_POOL_CLIENT_ID,
            userPoolId: AWS_COGNITO_USER_POOL_ID,
            loginWith: {
                oauth: {
                    domain: AWS_COGNITO_DOMAIN,
                    scopes: ['email', 'openid'],
                    redirectSignIn: [],
                    redirectSignOut: [],
                    responseType: 'token',
                },
            },
        },
    },
};

export default awsConfig;
