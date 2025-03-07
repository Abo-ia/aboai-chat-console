import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { HiOutlineLockClosed } from "react-icons/hi";
import { motion } from "framer-motion";

import { HiOutlineTruck } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";

const PaymentForm = () => {

    const plans = [
        {
            name: "Basic",
            price: "$29.99/month",
            description: "Perfect for small teams and individual users.",
            features: [
                "5 Users",
                "1 Organization",
                "10,000 queries/month",
                "50GB Storage",
                "Community Support",
            ],
        },
        {
            name: "Pro",
            price: "$99.99/month",
            description: "For growing teams needing advanced features.",
            features: [
                "20 Users",
                "5 Organizations",
                "100,000 queries/month",
                "500GB Storage",
                "Priority Support",
            ],
        },
        {
            name: "Enterprise",
            price: "Custom Pricing",
            description: "Tailored solutions for large enterprises.",
            features: [
                "Unlimited Users",
                "Unlimited Organizations",
                "Unlimited queries",
                "2TB Storage",
                "Dedicated Support",
            ],
        },
    ];
    return (
        <div className="max-w-5xl mx-auto p-6 flex flex-col bg-white rounded-lg ">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>

            <div className="py-12">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Available Plans</h2>
                    <p className="text-gray-600 text-lg mb-12">
                        Choose the best plan that fits your needs.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className="bg-white shadow-lg rounded-lg p-8 border border-gray-200 hover:shadow-2xl transition duration-300"
                            >
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    {plan.name}
                                </h3>
                                <p className="text-xl font-bold text-blue-600 mb-4">
                                    {plan.price}
                                </p>
                                <p className="text-gray-600 mb-6">{plan.description}</p>
                                <ul className="text-gray-700 space-y-2 mb-6">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="text-green-500 mr-2">✔</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                                    Choose Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-[65%_35%] gap-4 mb-6">
                <PaymentMethods />
                <OrderSummary />
                <NewPaymentForm />
                <Promotions />
            </div>
        </div>
    );
};

const PaymentMethods = () => {
    const methods = [
        {
            id: 1,
            type: "Visa",
            lastDigits: "7658",
            expiry: "10/2024",
            logo: "https://1000marcas.net/wp-content/uploads/2019/12/VISA-Logo-2014.png",
            selected: true,
        },
        {
            id: 2,
            type: "Mastercard",
            lastDigits: "8429",
            expiry: "04/2026",
            logo: "https://1000marcas.net/wp-content/uploads/2019/12/logo-Mastercard.png",
            selected: false,
        },
        {
            id: 3,
            type: "Paypal",
            lastDigits: "",
            expiry: "",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png",
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
                            <p className="font-medium">{`${method.type} ending in ${method.lastDigits}`}</p>
                            {method.expiry && (
                                <p className="text-sm text-gray-500">Expiry {method.expiry}</p>
                            )}
                            <div className="text-sm text-custom-secondary mt-1">
                                <span className="cursor-pointer">Delete</span> |
                                <span className="cursor-pointer ml-2">Edit</span>
                            </div>
                        </div>
                    </div>
                    <img
                        src={method.logo}
                        alt={method.type}
                        className="h-8"
                    />
                </div>
            ))}
        </div>
    );
};



const NewPaymentForm = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [errors, setErrors] = useState({ card: "", expiry: "", cvv: "" });

    const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(.{4})/g, "$1 ").trim();
        setCardNumber(value);

        if (value.length < 19) {
            setErrors((prev) => ({ ...prev, card: "Invalid card number" }));
        } else {
            setErrors((prev) => ({ ...prev, card: "" }));
        }
    };

    const handleExpiryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4) return;

        if (value.length >= 2) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }
        setExpiry(value);

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
            setErrors((prev) => ({ ...prev, expiry: "Invalid expiry date" }));
        } else {
            setErrors((prev) => ({ ...prev, expiry: "" }));
        }
    };

    const handleCvvInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4) return;
        setCvv(value);

        if (value.length < 3) {
            setErrors((prev) => ({ ...prev, cvv: "Invalid CVV" }));
        } else {
            setErrors((prev) => ({ ...prev, cvv: "" }));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" rounded-lg p-6 bg-white"
        >
            <h3 className="text-lg font-medium text-gray-700 mb-4">
                Add a new payment method
            </h3>
            <form className="grid grid-cols-2 gap-4">
                {/* Full Name */}
                <motion.div whileFocus={{ scale: 1.05 }} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Full name (as displayed on card)*
                    </label>
                    <input
                        type="text"
                        placeholder="Bonnie Green"
                        required
                        className="border rounded-lg p-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    />
                </motion.div>

                {/* Card Number */}
                <motion.div whileFocus={{ scale: 1.05 }} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Card number*
                    </label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardInput}
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength={19}
                        required
                        className={`border rounded-lg p-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 ${errors.card ? "border-red-500" : ""
                            }`}
                    />
                    {errors.card && <span className="text-red-500 text-xs">{errors.card}</span>}
                </motion.div>

                {/* Card Expiration */}
                <motion.div whileFocus={{ scale: 1.05 }} className="flex flex-col relative">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Card expiration*
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={expiry}
                            onChange={handleExpiryInput}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                            className={`border rounded-lg p-2 bg-gray-100 text-gray-700 w-full pl-10 focus:ring-2 focus:ring-blue-500 ${errors.expiry ? "border-red-500" : ""
                                }`}
                        />
                        <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    {errors.expiry && <span className="text-red-500 text-xs">{errors.expiry}</span>}
                </motion.div>

                {/* CVV */}
                <motion.div whileFocus={{ scale: 1.05 }} className="flex flex-col relative">
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        CVV* <BsInfoCircle className="ml-1 text-gray-500 cursor-pointer" title="Card Verification Value" />
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            value={cvv}
                            onChange={handleCvvInput}
                            placeholder="•••"
                            maxLength={4}
                            required
                            className={`border rounded-lg p-2 bg-gray-100 text-gray-700 w-full pl-10 focus:ring-2 focus:ring-blue-500 ${errors.cvv ? "border-red-500" : ""
                                }`}
                        />
                        <HiOutlineLockClosed className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    {errors.cvv && <span className="text-red-500 text-xs">{errors.cvv}</span>}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white text-lg font-medium py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Pay now
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
};

const OrderSummary = () => {
    const orderDetails = {
        originalPrice: 6592.0,
        savings: -299.0,
        storePickup: 99,
        tax: 799,
        total: 7191.0,
    };

    const summaryItems = [
        { label: "Original price", value: orderDetails.originalPrice },
        { label: "Savings", value: orderDetails.savings, className: "text-green-600" },
        { label: "Store Pickup", value: orderDetails.storePickup },
        { label: "Tax", value: orderDetails.tax },
    ];

    return (
        <div className="border rounded-lg p-6 bg-gray-50">
            <h3 className="sr-only">Order Summary</h3>
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



const Promotions = () => {

    const promotions = [
        {
            id: 1,
            icon: <HiOutlineTruck className="text-gray-500 text-2xl" />,
            title: "Free shipping",
            description: "You have 3 months to try free shipping and exclusive Genius offers.",
            linkText: "Try Flowbite PRO 3 months free",
        },
        {
            id: 2,
            icon: <MdOutlineLocalOffer className="text-gray-500 text-2xl" />,
            title: "-10% Extra",
            description: "You get 10% extra when purchasing this product, for orders of at least $100!",
            linkText: "Save the promo code in your account",
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

export default PaymentForm;