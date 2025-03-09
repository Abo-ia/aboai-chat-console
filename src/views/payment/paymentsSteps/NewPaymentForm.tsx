import React, { useState } from "react";
import { motion } from "framer-motion";

import { FaRegCalendarAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { HiOutlineLockClosed } from "react-icons/hi";

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
            setErrors((prev) => ({ ...prev, card: "Número de tarjeta inválido" }));
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
            setErrors((prev) => ({ ...prev, expiry: "Fecha de expiración inválida" }));
        } else {
            setErrors((prev) => ({ ...prev, expiry: "" }));
        }
    };

    const handleCvvInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4) return;
        setCvv(value);

        if (value.length < 3) {
            setErrors((prev) => ({ ...prev, cvv: "Código CVV inválido" }));
        } else {
            setErrors((prev) => ({ ...prev, cvv: "" }));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-white"
        >
            <h3 className="text-lg font-medium text-gray-700 mb-4">
                Agregar un nuevo método de pago
            </h3>
            <form className="grid grid-cols-2 gap-4">
                {/* Nombre Completo */}
                <motion.div whileFocus={{ scale: 1.05 }} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Nombre completo (como aparece en la tarjeta)*
                    </label>
                    <input
                        type="text"
                        placeholder="Bonnie Green"
                        required
                        className="border rounded-lg p-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    />
                </motion.div>

                {/* Número de Tarjeta */}
                <motion.div whileFocus={{ scale: 1.05 }} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Número de tarjeta*
                    </label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardInput}
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength={19}
                        required
                        className={`border rounded-lg p-2 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 ${
                            errors.card ? "border-red-500" : ""
                        }`}
                    />
                    {errors.card && <span className="text-red-500 text-xs">{errors.card}</span>}
                </motion.div>

                {/* Fecha de Expiración */}
                <motion.div whileFocus={{ scale: 1.05 }} className="flex flex-col relative">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Fecha de expiración*
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={expiry}
                            onChange={handleExpiryInput}
                            placeholder="MM/AA"
                            maxLength={5}
                            required
                            className={`border rounded-lg p-2 bg-gray-100 text-gray-700 w-full pl-10 focus:ring-2 focus:ring-blue-500 ${
                                errors.expiry ? "border-red-500" : ""
                            }`}
                        />
                        <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    {errors.expiry && <span className="text-red-500 text-xs">{errors.expiry}</span>}
                </motion.div>

                <motion.div whileFocus={{ scale: 1.05 }} className="flex flex-col relative">
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        Código CVV*{" "}
                        <BsInfoCircle
                            className="ml-1 text-gray-500 cursor-pointer"
                            title="Código de Verificación de Tarjeta"
                        />
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            value={cvv}
                            onChange={handleCvvInput}
                            placeholder="•••"
                            maxLength={4}
                            required
                            className={`border rounded-lg p-2 bg-gray-100 text-gray-700 w-full pl-10 focus:ring-2 focus:ring-blue-500 ${
                                errors.cvv ? "border-red-500" : ""
                            }`}
                        />
                        <HiOutlineLockClosed className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    {errors.cvv && <span className="text-red-500 text-xs">{errors.cvv}</span>}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-custom-primary text-white text-lg font-medium py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Pagar ahora
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
};

export default NewPaymentForm;
