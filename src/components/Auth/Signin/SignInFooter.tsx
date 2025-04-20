import { useAuthenticator } from '@aws-amplify/ui-react';

const SignInFooter = () => {
    const { toSignUp, toForgotPassword } = useAuthenticator();

    return (
        <>
            <div className="text-center mt-4">
                <button
                    onClick={toForgotPassword}
                    className="text-custom-primary font-medium hover:underline"
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </div>

            <div className="text-center mt-4">
                <p className="text-sm text-custom-secondary">
                    ¿Aún no tienes una cuenta?{' '}
                    <button
                        onClick={toSignUp}
                        className="text-custom-primary font-medium hover:underline"
                    >
                        Crear cuenta
                    </button>
                </p>
            </div>
        </>
    );
};

export default SignInFooter;
