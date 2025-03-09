import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@src/assets/logo.svg';
import AvailablePlans from './AvailablePlans';

const plans = [
    {
        name: 'Free',
        price: '$0/month',
        description: 'Para proyectos personales y pequeños equipos.',
        features: [
            '1 Usuario',
            '1 Organización',
            '1,000 consultas/mes',
            '5GB de Almacenamiento',
            'Soporte Comunitario',
        ],
        redirectUrl: 'https://buy.stripe.com/test_8wM14g6jdaiJ5PObIJ'
    },
    {
        name: 'Básico',
        price: '$400/mes',
        description: 'Ideal para pequeños equipos y usuarios individuales.',
        features: [
            '5 Usuarios',
            '1 Organización',
            '10,000 consultas/mes',
            '50GB de Almacenamiento',
            'Soporte Comunitario',
        ],
        redirectUrl: 'https://buy.stripe.com/test_7sIcMY0YTeyZa6428a'
    },
    {
        name: 'Pro',
        price: '$4000/mes',
        description: 'Para equipos en crecimiento que necesitan más funciones.',
        features: [
            '20 Usuarios',
            '5 Organizaciones',
            '100,000 consultas/mes',
            '500GB de Almacenamiento',
            'Soporte Prioritario',
        ],
        redirectUrl: 'https://buy.stripe.com/test_8wMdR2dLF62tba83cf'
    },
    {
        name: 'Enterprise',
        price: 'Precio Personalizado',
        description: 'Soluciones adaptadas para grandes empresas.',
        features: [
            'Usuarios Ilimitados',
            'Organizaciones Ilimitadas',
            'Consultas Ilimitadas',
            '2TB de Almacenamiento',
            'Soporte Dedicado',
        ],
        redirectUrl: '/contact/enterprise'
    },
];

const StepperPayment = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Abo.AI - Suscripción';
    }, []);

    return (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg h-screen flex flex-col">
            <header className="sticky top-0 bg-white z-10 border-b pb-4 mb-6">
                <div className="flex justify-between items-center">
                    <div
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <img src={Logo} alt="Logo" className="h-10 w-auto" />
                        <span className="text-xl font-semibold text-gray-800">Abo.AI</span>
                    </div>
                </div>
            </header>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Planes Disponibles</h2>
            <p className="text-gray-600 text-lg mb-6 text-center">
                Elige el mejor plan que se adapte a tus necesidades.
            </p>

            <div className="flex- overflow-y-auto px-2">
                <AvailablePlans plans={plans} onSelectPlan={(url) => window.location.href = url} />
            </div>
        </div>
    );
};

export default StepperPayment;
