import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface AvailablePlans {
    name: string;
    price: string;
    description: string;
    features: string[];
    redirectUrl: string;
}

interface AvailablePlansProps {
    plans: AvailablePlans[];
    onSelectPlan: (url: string) => void;
}

const AvailablePlans = ({ plans, onSelectPlan }: AvailablePlansProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 flex flex-col bg-white rounded-lg">
            <div className="max-w-6xl mx-auto text-center">
                <div className="relative flex items-center justify-center">
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
                                            <span className="text-green-500 mr-2">✔</span>{' '}
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="w-full bg-custom-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                                    onClick={() => onSelectPlan(plan.redirectUrl)}
                                >
                                    Elegir Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailablePlans;
