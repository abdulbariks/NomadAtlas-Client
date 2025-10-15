import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../customHook/useAxiosSecure";

export default function PaymentSuccess() {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [payment, setPayment] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/payments/${id}`).then((res) => setPayment(res.data));
    }, [id, axiosSecure]);

    if (!payment)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );

    console.log("booked destination checkout", id);

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 md:p-12 max-w-md w-full text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-6">
                    Payment Successful!
                </h2>

                <div className="space-y-3 text-gray-700">
                    <p className="text-sm md:text-base">
                        <span className="font-medium">Transaction ID:</span>{" "}
                        {payment[0]?.paymentIntentId}
                    </p>
                    <p className="text-sm md:text-base">
                        <span className="font-medium">Amount:</span> ${payment[0]?.amount}
                    </p>
                    <p className="text-sm md:text-base">
                        <span className="font-medium">Currency:</span> {payment[0]?.currency}
                    </p>
                </div>

                <Link to="/">
                    <button className="mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors">
                        Go to Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
}
