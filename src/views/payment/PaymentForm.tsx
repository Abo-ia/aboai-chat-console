import React from "react";

import PaymentMethods from "./paymentsSteps/PaymentMethods";
import OrderSummary from "./paymentsSteps/OrderSummary";
import NewPaymentForm from "./paymentsSteps/NewPaymentForm";
import Promotions from "./paymentsSteps/Promotions";


const PaymentForm = () => {

    return (
        <div className="max-w-5xl mx-auto p-6 flex flex-col bg-white rounded-lg">

            <div className="grid grid-cols-[65%_35%] gap-5 mb-6">
                <PaymentMethods />
                <OrderSummary />
                <NewPaymentForm />
                <Promotions />
            </div>
        </div>
    );
};


export default PaymentForm;