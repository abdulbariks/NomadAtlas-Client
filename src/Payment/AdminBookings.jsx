import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import useAxiosSecure from "../customHook/useAxiosSecure";
import { useSelector } from "react-redux";

export default function AdminBookings() {
    const axiosSecure = useAxiosSecure();
    const { user } = useSelector((state) => state.auth);
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // ✅ Fetch bookings created by admin (providerEmail)
    useEffect(() => {
        if (!user?.email) return;
        const fetchBookings = async () => {
            try {
                const res = await axiosSecure.get(`/bookings/provider/${user.email}`);
                setBookings(res.data.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch bookings");
            }
        };
        fetchBookings();
    }, [user?.email, axiosSecure]);

    // ✅ Delete booking with toast confirmation
    const handleDelete = async (id) => {
        toast((t) => (
            <div className="flex flex-col items-center gap-3">
                <p className="text-gray-800 font-medium">Are you sure you want to delete this booking?</p>
                <div className="flex gap-2">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await axiosSecure.delete(`/bookings/${id}`);
                                setBookings((prev) => prev.filter((b) => b._id !== id));
                                toast.success("Booking deleted successfully ✅");
                            } catch (error) {
                                toast.error("Failed to delete booking ❌");
                            }
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 5000 });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-10">
                🌍 All Destination Bookings
            </h1>

            {bookings.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-600 mt-20"
                >
                    <p className="text-lg">No bookings found yet.</p>
                </motion.div>
            ) : (
                <div className="flex flex-wrap justify-center gap-6">
                    {bookings.map((booking, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="w-full md:w-[45%] lg:w-[30%] bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-green-200 hover:border-green-400 transition-all p-5 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-green-700 mb-2">
                                    {booking.title}{" "}
                                    <span className="text-sm text-gray-500">({booking.type})</span>
                                </h2>
                                <p className="text-gray-600 text-sm mb-1">
                                    📍 {booking.city}, {booking.country}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium">Booked By:</span> {booking.userName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium">Date:</span>{" "}
                                    {new Date(booking.bookedDate).toLocaleDateString()}
                                </p>
                                <p className="mt-1 text-sm">
                                    <span className="font-medium">Status:</span>{" "}
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.paymentStatus === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : booking.paymentStatus === "cancelled"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        {booking.paymentStatus}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-5 flex gap-3">
                                <button
                                    onClick={() => setSelectedBooking(booking)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl shadow-md transition-all"
                                >
                                    <FaEye /> View
                                </button>
                                <button
                                    onClick={() => handleDelete(booking._id)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-300 py-2 rounded-xl shadow-sm transition-all"
                                >
                                    <FaTrashAlt /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* ✅ View Details Modal */}
            <AnimatePresence>
                {selectedBooking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-green-950/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto border border-green-200"
                        >
                            <h3 className="text-2xl font-semibold text-green-700 mb-3 border-b pb-2">
                                {selectedBooking.title}
                            </h3>

                            <div className="space-y-2 text-gray-700 text-sm">
                                <p><strong>👤 User:</strong> {selectedBooking.userName} ({selectedBooking.userEmail})</p>
                                <p><strong>📞 Phone:</strong> {selectedBooking.userPhone}</p>
                                <p><strong>🏙️ City:</strong> {selectedBooking.city}, {selectedBooking.country}</p>
                                <p><strong>💰 Price:</strong> {selectedBooking.price} {selectedBooking.currency}</p>
                                <p><strong>📆 Booked Date:</strong> {new Date(selectedBooking.bookedDate).toLocaleDateString()}</p>
                                <p><strong>⏰ Created At:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                                <p>
                                    <strong>💳 Payment Status:</strong>{" "}
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedBooking.paymentStatus === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : selectedBooking.paymentStatus === "cancelled"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        {selectedBooking.paymentStatus}
                                    </span>
                                </p>
                                <p><strong>✉️ Provider:</strong> {selectedBooking.providerEmail}</p>
                                <p><strong>🌍 Continent:</strong> {selectedBooking.continent}</p>
                            </div>

                            <div className="mt-6 text-right">
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
