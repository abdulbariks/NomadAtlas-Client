import { useEffect, useState } from "react";
import useAxiosSecure from "../customHook/useAxiosSecure";
import { Link } from "react-router";
import Spinner from "../components/Spinner/Spinner";

export default function PaymentSuccess({ onClose, paymentId }) {
    const [payment, setPayment] = useState(null);
    const axiosSecure = useAxiosSecure();

    // Fetch payment details
    useEffect(() => {
        axiosSecure
            .get(`/payments/${paymentId}`) // pass paymentId as prop
            .then((res) => setPayment(res.data))
            .catch((err) => console.error("Payment fetch error:", err));
    }, [axiosSecure, paymentId]);
    console.log("payment data", payment)
    if (!payment)
        return (
            <Spinner></Spinner>
        );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            {/* Modal container */}
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-10 text-center transform transition-all scale-95 animate-fadeIn">
                {/* Success Icon */}
                <div className="flex justify-center mb-4">
                    <svg
                        className="w-16 h-16 text-[#06a5a2]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-600 mb-6">
                    Payment Successful!
                </h2>

                {/* Payment Details */}
                <div className="text-left space-y-2 mb-6">
                    <p className="text-gray-700 text-sm md:text-base">
                        <span className="font-semibold">Transaction ID:</span>{" "}
                        {payment[0]?.paymentIntentId}
                    </p>
                    <p className="text-gray-700 text-sm md:text-base">
                        <span className="font-semibold">Amount:</span> ${payment[0]?.amount}
                    </p>
                    <p className="text-gray-700 text-sm md:text-base">
                        <span className="font-semibold">Currency:</span>{" "}
                        {payment[0]?.currency}
                    </p>
                    <p className="text-gray-700 text-sm md:text-base">
                        <span className="font-semibold">Status:</span> {payment[0]?.status}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-400 transition-colors"
                    >
                        Close
                    </button>

                    <Link
                        to="/dashboard/payment-history"
                        className="px-6 py-3 bg-[#11c3c0] text-white font-semibold rounded-lg shadow hover:bg-[#0d9d9a] transition-colors"
                    >
                        Payment History
                    </Link>
                </div>
            </div>
        </div>
    );
}
