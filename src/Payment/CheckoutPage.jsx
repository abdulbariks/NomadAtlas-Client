import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useParams } from "react-router";
import useAxiosSecure from "../customHook/useAxiosSecure";
import PaymentSuccess from "./PaymentSuccess";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [booking, setBooking] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Fetch booking info
    useEffect(() => {
        if (!id) return;
        axiosSecure
            .get(`/bookings/${id}`)
            .then((res) => setBooking(res.data.data))
            .catch((err) => console.error("Fetch booking error:", err));
    }, [id, axiosSecure]);

    // Create payment intent
    useEffect(() => {
        if (!booking) return;

        const createPayment = async () => {
            try {
                const res = await axiosSecure.post("/payments/create-payment-intent", {
                    paidAmount: booking.price,
                    bookDestinationId: booking._id, // match backend
                });

                setClientSecret(res.data.clientSecret);
            } catch (err) {
                console.error("Payment creation error:", err);
            }
        };

        createPayment();
    }, [booking, axiosSecure]);

    // Handle successful payment
    const handlePaymentSuccess = async () => {
        if (!booking) return;
        try {
            const updatedBooking = {
                paymentStatus: "paid",
                paidAt: new Date().toISOString(),
            };

            const res = await axiosSecure.patch(`/bookings/${booking._id}`, updatedBooking);
            setBooking(res.data.data);

            // ✅ Show success modal
            setShowSuccessModal(true);
        } catch (err) {
            console.error("Update booking error:", err);
        }
    };

    if (!booking)
        return (
            <div className="flex justify-center items-center min-h-screen bg-green-50">
                <p className="text-lg text-cyan-700">Loading booking details...</p>
            </div>
        );

    return (
        <div className="flex justify-center items-start min-h-screen pt-24 md:pt-32 px-4 py-10 bg-cyan-50">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-6 md:p-10 ">
                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-700 text-center">
                    Checkout
                </h2>

                {/* Booking Details Card */}
                <div className="bg-cyan-50 p-6 rounded-xl mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                        <div className="space-y-2">
                            <p className="text-lg md:text-xl text-cyan-800 font-semibold">
                                {booking.city}, {booking.country}
                            </p>
                            <p className="text-cyan-700">
                                <span className="font-semibold">Type:</span> {booking.type}
                            </p>
                            <p className="text-cyan-700">
                                <span className="font-semibold">Booked Date:</span> {booking.bookedDate}
                            </p>
                            <p className="text-cyan-700">
                                <span className="font-semibold">Booked Time:</span>{" "}
                                {new Date(booking.bookedTime).toLocaleString()}
                            </p>
                        </div>

                        <div className="text-left md:text-right space-y-2">
                            <p className="text-xl font-semibold text-cyan-800">
                                ${booking.price}
                            </p>
                            <span
                                className={`inline-block px-4 py-1 rounded-full font-medium text-sm ${booking.paymentStatus === "paid"
                                    ? "bg-green-100 text-cyan-800"
                                    : "bg-cyan-500 text-white"
                                    }`}
                            >
                                {booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                            </span>
                            {booking.paymentStatus === "paid" && booking.paidAt && (
                                <p className="text-cyan-700 text-sm mt-1">
                                    Paid at: {new Date(booking.paidAt).toLocaleString()}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stripe Payment */}
                {booking.paymentStatus === "unpaid" && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm
                            destination={booking}
                            clientSecret={clientSecret}
                            onPaymentSuccess={handlePaymentSuccess}
                        />
                    </Elements>
                )}
            </div>

            {/* PaymentSuccess Modal */}
            {showSuccessModal && (
                <PaymentSuccess
                    onClose={() => setShowSuccessModal(false)}
                    paymentId={booking._id} // pass booking/payment ID
                    theme="green" // optional prop if you want PaymentSuccess to know theme
                />
            )}
        </div>
    );
}
