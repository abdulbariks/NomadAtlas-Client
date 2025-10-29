import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaTrashAlt, FaEye, FaMapMarkerAlt, FaUser, FaMoneyBillWave, FaCalendar, FaStar, FaEnvelope, FaPhone, FaClock, FaGlobe } from "react-icons/fa";
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
        <div className="min-h-screen bg-gray-50/30 p-4 md:p-10">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                    All Destination Bookings
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Manage and review all booking requests from your customers in one place
                </p>
            </div>

            {bookings.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-600 mt-20"
                >
                    <div className="bg-white rounded-2xl p-12 max-w-md mx-auto border border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCalendar className="text-2xl text-gray-400" />
                        </div>
                        <p className="text-lg font-medium text-gray-700 mb-2">No bookings found</p>
                        <p className="text-gray-500">When customers book your destinations, they'll appear here.</p>
                    </div>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {bookings.map((booking, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="bg-white rounded-2xl border border-gray-200/80 hover:border-[#11c3c0]/40 transition-all duration-300 overflow-hidden group"
                        >
                            {/* Card Header */}
                            <div className="p-6 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#11c3c0] transition-colors line-clamp-1">
                                            {booking.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <FaMapMarkerAlt className="text-[#11c3c0] text-xs" />
                                            <span className="text-sm text-gray-600">
                                                {booking.city}, {booking.country}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="bg-[#11c3c0]/10 text-[#11c3c0] text-xs font-medium px-3 py-1 rounded-full">
                                        {booking.type}
                                    </span>
                                </div>

                                {/* Booking Details */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                                            <FaUser className="text-[#11c3c0] text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Customer</p>
                                            <p className="text-sm font-medium text-gray-800">{booking.userName}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                                            <FaCalendar className="text-[#11c3c0] text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Booking Date</p>
                                            <p className="text-sm font-medium text-gray-800">
                                                {new Date(booking.bookedDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                                            <FaMoneyBillWave className="text-[#11c3c0] text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Amount</p>
                                            <p className="text-sm font-medium text-gray-800">
                                                {booking.price} {booking.currency}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="px-6 pb-6 pt-4 bg-gray-50/50 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.paymentStatus === "paid"
                                            ? "bg-green-100 text-green-700 border border-green-200"
                                            : booking.paymentStatus === "cancelled"
                                                ? "bg-red-100 text-red-700 border border-red-200"
                                                : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                            }`}
                                    >
                                        {booking.paymentStatus}
                                    </span>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <FaStar className="text-xs" />
                                        <span className="text-xs font-medium">Booking</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setSelectedBooking(booking)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#11c3c0] hover:bg-[#0fa9a7] text-white py-2.5 rounded-xl transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                                    >
                                        <FaEye className="text-xs" />
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleDelete(booking._id)}
                                        className="w-12 h-12 flex items-center justify-center bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        <FaTrashAlt className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* ✅ View Details Modal - Keep as is */}
            <AnimatePresence>
                {selectedBooking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden border border-[#11c3c0]/20"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-[#11c3c0] to-[#0fa9a7] p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            {selectedBooking.title}
                                        </h3>
                                        <p className="text-white/80 flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-white" />
                                            {selectedBooking.city}, {selectedBooking.country}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedBooking(null)}
                                        className="text-white hover:text-white/80 text-lg font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-[#11c3c0]/10 p-2 rounded-lg">
                                                <FaUser className="text-[#11c3c0]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Customer</p>
                                                <p className="font-semibold text-gray-800">{selectedBooking.userName}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-[#11c3c0]/10 p-2 rounded-lg">
                                                <FaEnvelope className="text-[#11c3c0]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-semibold text-gray-800">{selectedBooking.userEmail}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-[#11c3c0]/10 p-2 rounded-lg">
                                                <FaPhone className="text-[#11c3c0]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="font-semibold text-gray-800">{selectedBooking.userPhone}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-[#11c3c0]/10 p-2 rounded-lg">
                                                <FaMoneyBillWave className="text-[#11c3c0]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Price</p>
                                                <p className="font-semibold text-gray-800">{selectedBooking.price} {selectedBooking.currency}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-[#11c3c0]/10 p-2 rounded-lg">
                                                <FaCalendar className="text-[#11c3c0]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Booked Date</p>
                                                <p className="font-semibold text-gray-800">
                                                    {new Date(selectedBooking.bookedDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-[#11c3c0]/10 p-2 rounded-lg">
                                                <FaClock className="text-[#11c3c0]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Created At</p>
                                                <p className="font-semibold text-gray-800">
                                                    {new Date(selectedBooking.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-[#11c3c0]/10 p-2 rounded-lg">
                                                <FaGlobe className="text-[#11c3c0]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Continent</p>
                                                <p className="font-semibold text-gray-800">{selectedBooking.continent}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-[#11c3c0]/10 p-2 rounded-lg">
                                                <FaEnvelope className="text-[#11c3c0]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Provider</p>
                                                <p className="font-semibold text-gray-800">{selectedBooking.providerEmail}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Status Badge */}
                                <div className="mt-6 flex justify-center">
                                    <span
                                        className={`px-6 py-2 rounded-full text-sm font-semibold ${selectedBooking.paymentStatus === "paid"
                                            ? "bg-[#11c3c0]/10 text-[#11c3c0] border border-[#11c3c0]/20"
                                            : selectedBooking.paymentStatus === "cancelled"
                                                ? "bg-red-100 text-red-600 border border-red-200"
                                                : "bg-yellow-100 text-yellow-600 border border-yellow-200"
                                            }`}
                                    >
                                        Payment Status: {selectedBooking.paymentStatus}
                                    </span>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="border-t border-gray-200 p-6 bg-gray-50">
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setSelectedBooking(null)}
                                        className="px-6 py-2 bg-[#11c3c0] hover:bg-[#0fa9a7] text-white rounded-lg transition-all font-medium"
                                    >
                                        Close Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}