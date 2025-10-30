import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function PaymentForm({ destination, clientSecret, onPaymentSuccess }) {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // updated and automated version

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        if (!clientSecret) {
            setError("Payment not ready yet. Please wait...");
            return;
        }

        setLoading(true);
        setError("");

        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card details not found");
            setLoading(false);
            return;
        }

        // Confirm the payment using automatic payment methods
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card }, //just pass the card element
        });

        if (confirmError) {
            setError(confirmError.message);
            setLoading(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            if (onPaymentSuccess) onPaymentSuccess();
        }

        setLoading(false);
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-xl"
        >
            <h3 className="text-xl font-semibold text-gray-700">Payment Details</h3>

            <div className="p-4 border border-cyan-400 rounded-lg bg-white">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#155E75",
                                "::placeholder": { color: "#06B6D4" },
                            },
                            invalid: { color: "#EF4444" },
                        },
                    }}
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-[#11c3c0] text-white font-semibold py-3 rounded-lg hover:bg-[#0b9795] transition duration-300"
            >
                {loading ? "Processing..." : `Pay $${destination.price}`}
            </button>
        </form>
    );
}
