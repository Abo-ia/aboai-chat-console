import React from 'react';

const PaymentMethods = () => {
    const methods = [
        {
            id: 1,
            type: 'Visa',
            lastDigits: '7658',
            expiry: '10/2024',
            logo: 'https://1000marcas.net/wp-content/uploads/2019/12/VISA-Logo-2014.png',
            selected: true,
        },
        {
            id: 2,
            type: 'Mastercard',
            lastDigits: '8429',
            expiry: '04/2026',
            logo: 'https://1000marcas.net/wp-content/uploads/2019/12/logo-Mastercard.png',
            selected: false,
        },
        {
            id: 3,
            type: 'Paypal',
            lastDigits: '',
            expiry: '',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png',
            selected: false,
        },
    ];

    return (
        <div className="space-y-4">
            {methods.map((method) => (
                <div
                    key={method.id}
                    className="border rounded-lg p-4 flex justify-between items-center border-2 border-custom-accent bg-custom-light"
                >
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="payment"
                            className="mr-3"
                            defaultChecked={method.selected}
                        />
                        <div>
                            <p className="font-medium">{`${method.type} terminada en ${method.lastDigits}`}</p>
                            {method.expiry && (
                                <p className="text-sm text-gray-500">Expira {method.expiry}</p>
                            )}
                            <div className="text-sm text-custom-secondary mt-1">
                                <span className="cursor-pointer">Eliminar</span> |
                                <span className="cursor-pointer ml-2">Editar</span>
                            </div>
                        </div>
                    </div>
                    <img src={method.logo} alt={method.type} className="h-8" />
                </div>
            ))}
        </div>
    );
};

export default PaymentMethods;
