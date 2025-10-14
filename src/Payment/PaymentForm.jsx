import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router";
// import useAxiosSecure from "../customHook/useAxiosSecure";
// import { useSelector } from "react-redux";

// ✅ Add clientSecret as a prop
export default function PaymentForm({ destination, clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();
    // const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    // const { user } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        // ✅ Guard: make sure clientSecret exists
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

        // ✅ Use clientSecret from props
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: paymentMethod.id,
            }
        );

        if (confirmError) {
            setError(confirmError.message);
            setLoading(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            // Payment succeeded, webhook will update DB automatically
            navigate(`/payment-success/${paymentIntent.id}`);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-4 border rounded" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="btn btn-primary w-full"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
}
