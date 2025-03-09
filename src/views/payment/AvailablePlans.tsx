import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AvailablePlans = () => {
    const plans = [
        {
            name: "Free",
            price: "$0/month",
            description: "Para proyectos personales y pequeños equipos.",
            features: [
                "1 Usuario",
                "1 Organización",
                "1,000 consultas/mes",
                "5GB de Almacenamiento",
                "Soporte Comunitario",
            ],
        },
        {
            name: "Básico",
            price: "$29.99/mes",
            description: "Ideal para pequeños equipos y usuarios individuales.",
            features: [
                "5 Usuarios",
                "1 Organización",
                "10,000 consultas/mes",
                "50GB de Almacenamiento",
                "Soporte Comunitario",
            ],
        },
        {
            name: "Pro",
            price: "$99.99/mes",
            description: "Para equipos en crecimiento que necesitan más funciones.",
            features: [
                "20 Usuarios",
                "5 Organizaciones",
                "100,000 consultas/mes",
                "500GB de Almacenamiento",
                "Soporte Prioritario",
            ],
        },
        {
            name: "Enterprise",
            price: "Precio Personalizado",
            description: "Soluciones adaptadas para grandes empresas.",
            features: [
                "Usuarios Ilimitados",
                "Organizaciones Ilimitadas",
                "Consultas Ilimitadas",
                "2TB de Almacenamiento",
                "Soporte Dedicado",
            ],
        },
    ];

    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 flex flex-col bg-white rounded-lg">

            <div className="">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Planes Disponibles</h2>
                    <p className="text-gray-600 text-lg mb-6">
                        Elige el mejor plan que se adapte a tus necesidades.
                    </p>

                    {/* Botones de navegación*/}
                    <div className="relative flex items-center justify-center">
                        <button
                            className="absolute left-0 z-10 p-2 bg-white shadow-md rounded-full text-gray-600 hover:bg-gray-200 transition"
                            onClick={scrollLeft}
                        >
                            <FaChevronLeft size={24} />
                        </button>

                        {/* Carrusel */}
                        <div
                            ref={carouselRef}
                            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 px-4 no-scrollbar"
                        >
                            {plans.map((plan) => (
                                <div
                                    key={plan.name}
                                    className="flex-none w-72 bg-white shadow-lg rounded-lg p-6 border border-gray-200 snap-center"
                                >
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                        {plan.name}
                                    </h3>
                                    <p className="text-xl font-bold text-custom-primary mb-4">
                                        {plan.price}
                                    </p>
                                    <p className="text-gray-600 mb-4">{plan.description}</p>
                                    <ul className="text-gray-700 space-y-2 mb-6">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <span className="text-green-500 mr-2">✔</span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full bg-custom-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                                        Elegir Plan
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            className="absolute right-0 z-10 p-2 bg-white shadow-md rounded-full text-gray-600 hover:bg-gray-200 transition"
                            onClick={scrollRight}
                        >
                            <FaChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sección de Métodos de Pago y Resumen
            <div className="grid grid-cols-[65%_35%] gap-4 mb-6">
                <PaymentMethods />
                <OrderSummary />
                <NewPaymentForm />
                <Promotions />
            </div> */}
        </div>
    );
};


export default AvailablePlans;