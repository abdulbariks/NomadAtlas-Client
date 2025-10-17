import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function PaymentForm({ destination, clientSecret, onPaymentSuccess }) {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

        const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (pmError) {
            setError(pmError.message);
            setLoading(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            setError(confirmError.message);
            setLoading(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            // ✅ Call the callback from CheckoutPage to update booking UI
            if (onPaymentSuccess) onPaymentSuccess();
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-xl shadow-md"
        >
            <h3 className="text-xl font-semibold text-gray-700">Payment Details</h3>

            <div className="p-4 border rounded-lg bg-white">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#065F46", // professional green
                                "::placeholder": { color: "#A7F3D0" },
                            },
                            invalid: { color: "#EF4444" }, // keep red for invalid
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
