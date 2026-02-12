import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useParams } from "react-router";
import useAxiosSecure from "../customHook/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
    const { bookingId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [booking, setBooking] = useState({});
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // 1️⃣ Fetch booking info
        axiosSecure.get(`/bookings/${bookingId}`).then((res) => setBooking(res.data));
    }, [bookingId, axiosSecure]);

    // 2️⃣ Create payment intent only when booking is loaded
    useEffect(() => {
        if (!booking?.data?.destination?.pricePerMonth) return; // wait for booking

        const createPayment = async () => {
            try {
                const res = await axiosSecure.post("/payments/create-payment-intent", {
                    amount: booking.data.destination.pricePerMonth, // numeric
                    userId: booking.data.destinationId,
                });
                setClientSecret(res.data.clientSecret);
            } catch (err) {
                console.error("Payment creation error:", err);
            }
        };

        createPayment();
    }, [booking, axiosSecure]);

    console.log("booked destination checkout", booking?.data?.destinationId);

    return (
        <div className="flex justify-center items-start min-h-screen px-4 py-10 bg-gray-50">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Checkout</h2>

                <div className="space-y-3 mb-8 text-gray-700">
                    <p className="text-lg md:text-xl">
                        <span className="font-semibold">Destination:</span> {booking?.data?.destination?.name}
                    </p>
                    <p className="text-lg md:text-xl">
                        <span className="font-semibold">Price:</span> ${booking?.data?.destination?.pricePerMonth}
                    </p>
                </div>

                {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm
                            destination={booking?.data?.destination}
                            clientSecret={clientSecret} // ✅ pass here
                        />
                    </Elements>
                )}
            </div>
        </div>
    );
}
