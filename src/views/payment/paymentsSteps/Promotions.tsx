import React from "react";
import { HiOutlineTruck } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";

const Promotions = () => {
    const promotions = [
        {
            id: 1,
            icon: <HiOutlineTruck className="text-gray-500 text-2xl" />,
            title: "Envío gratis",
            description: "Tienes 3 meses para probar el envío gratis y ofertas exclusivas de Genius.",
            linkText: "Prueba Flowbite PRO 3 meses gratis",
        },
        {
            id: 2,
            icon: <MdOutlineLocalOffer className="text-gray-500 text-2xl" />,
            title: "-10% Extra",
            description: "Obtienes un 10% extra al comprar este producto, en pedidos de al menos $100.",
            linkText: "Guarda el código promocional en tu cuenta",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4">
            {promotions.map((promo) => (
                <div key={promo.id} className="border rounded-lg p-4 flex items-start gap-4 bg-gray-50">
                    <div className="p-2 bg-gray-100 rounded-lg">{promo.icon}</div>
                    <div>
                        <h4 className="font-semibold">{promo.title}</h4>
                        <p className="text-sm text-gray-600">{promo.description}</p>
                        <a href="#" className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                            {promo.linkText} <span className="ml-1">→</span>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Promotions;
