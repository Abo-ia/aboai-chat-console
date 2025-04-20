import { useAuthenticator } from '@aws-amplify/ui-react';

const SignUpFooter = () => {
    const { toSignIn } = useAuthenticator();

    return (
        <div className="text-center mt-4">
            <p className="text-sm text-custom-secondary">
                ¿Ya tienes una cuenta?{' '}
                <button
                    onClick={toSignIn}
                    className="text-custom-primary font-medium hover:underline"
                >
                    Iniciar sesión
                </button>
            </p>
        </div>
    );
};

export default SignUpFooter;
