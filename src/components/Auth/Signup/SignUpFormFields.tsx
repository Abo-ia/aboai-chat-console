import { useAuthenticator } from '@aws-amplify/ui-react';

const SignUpFormFields = () => {
    const { validationErrors } = useAuthenticator();

    return (
        <>
            <style>{`.amplify-button { display: none; }`}</style>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-custom-primary">
                    Correo electrónico
                </label>
                <input
                    name="username"
                    type="email"
                    placeholder="nombre@correo.com"
                    className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-custom-primary focus:border-transparent"
                />
                {validationErrors.username && (
                    <span className="text-red-500 text-xs mt-1 block">
                        {validationErrors.username}
                    </span>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-custom-primary">
                    Contraseña
                </label>
                <input
                    name="password"
                    type="password"
                    placeholder="Crea una contraseña"
                    className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-custom-primary focus:border-transparent"
                />
                {validationErrors.password && (
                    <span className="text-red-500 text-xs mt-1 block">
                        {validationErrors.password}
                    </span>
                )}
            </div>

            <div className="mb-6">
                <label
                    htmlFor="confirm_password"
                    className="block text-sm font-medium text-custom-primary"
                >
                    Confirmar contraseña
                </label>
                <input
                    name="confirm_password"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-custom-primary focus:border-transparent"
                />
                {validationErrors.confirm_password && (
                    <span className="text-red-500 text-xs mt-1 block">
                        {validationErrors.confirm_password}
                    </span>
                )}
            </div>

            <div className="text-sm text-custom-secondary text-center mb-4">
                Al registrarte, aceptas nuestros{' '}
                <a href="/terms" className="font-medium hover:underline text-custom-primary">
                    Términos de servicio
                </a>{' '}
                y nuestra{' '}
                <a href="/privacy" className="font-medium hover:underline text-custom-primary">
                    Política de privacidad
                </a>
                .
            </div>

            <div className="mb-6">
                <button
                    type="submit"
                    className="w-full bg-custom-primary text-white p-3 rounded-md font-medium transition hover:bg-opacity-90"
                >
                    Crear cuenta
                </button>
            </div>
        </>
    );
};

export default SignUpFormFields;
