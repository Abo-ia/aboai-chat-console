import React from "react";

const OrderSummary = () => {
    const orderDetails = {
        originalPrice: 6592.0,
        savings: -299.0,
        storePickup: 99,
        tax: 799,
        total: 7191.0,
    };

    const summaryItems = [
        { label: "Precio original", value: orderDetails.originalPrice },
        { label: "Ahorro", value: orderDetails.savings, className: "text-green-600" },
        { label: "Recogida en tienda", value: orderDetails.storePickup },
        { label: "Impuestos", value: orderDetails.tax },
    ];

    return (
        <div className="border rounded-lg p-6 bg-gray-50">
            <h3 className="sr-only">Resumen del pedido</h3>
            <div className="space-y-3">
                {summaryItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm text-gray-700">
                        <span>{item.label}</span>
                        <span className={`font-semibold ${item.className || ""}`}>
                            {item.value < 0 ? `-$${Math.abs(item.value).toFixed(2)}` : `$${item.value.toFixed(2)}`}
                        </span>
                    </div>
                ))}
                <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-gray-900">${orderDetails.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
