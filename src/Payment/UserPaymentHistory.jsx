import { useEffect, useState } from "react";
import useAxiosSecure from "../customHook/useAxiosSecure";
import { useSelector } from "react-redux";
import { FaEye, FaMoneyBillWave } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner/Spinner";

export default function UserPaymentHistory() {
    const axiosSecure = useAxiosSecure();
    const { user } = useSelector((state) => state.auth);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [cancelBookingId, setCancelBookingId] = useState(null);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    const userInfo = {
        name: user.displayName,
        email: user.email,
    };

    // Fetch user bookings
    useEffect(() => {
        if (userInfo?.email) {
            axiosSecure
                .get(`/bookings/user/${userInfo?.email}`)
                .then((res) => {
                    setBookings(res.data);
                    setFilteredBookings(res.data);
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [axiosSecure, userInfo?.email]);

    // Filter bookings by payment status
    useEffect(() => {
        if (filter === "all") {
            setFilteredBookings(bookings);
        } else {
            setFilteredBookings(bookings.filter((b) => b.paymentStatus === filter));
        }
    }, [filter, bookings]);

    // Open cancel modal
    const openCancelModal = (id) => setCancelBookingId(id);

    // Confirm cancel booking
    const confirmCancelBooking = async () => {
        try {
            await axiosSecure.patch(`/bookings/cancel/${cancelBookingId}`);
            toast.success("Booking canceled successfully");
            setBookings((prev) =>
                prev.map((b) =>
                    b._id === cancelBookingId ? { ...b, paymentStatus: "canceled" } : b
                )
            );
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to cancel booking");
        } finally {
            setCancelBookingId(null);
        }
    };

    if (loading)
        return (
            <Spinner></Spinner>
        );

    return (
        <div className=" min-h-screen rounded-lg bg-gradient-to-br from-[#11c3c0]/10 via-blue-50 to-[#11c3c0]/10 p-6">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Payment History
                </h2>

                {/* Filter Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
                    <div className="w-full sm:w-auto">
                        <select
                            className="select select-bordered w-full sm:w-52 border-green-400 focus:outline-none focus:border-green-600"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Payments</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Pending</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </div>
                    <p className="text-sm text-gray-600">
                        Showing {filteredBookings.length} of {bookings.length} bookings
                    </p>
                </div>

                {/* Table Section */}
                {filteredBookings.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No records found for this filter.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full border border-gray-200 shadow-md rounded-lg">
                            <thead className="bg-[#11c3c0] text-white">
                                <tr>
                                    <th>#</th>
                                    <th>Destination</th>
                                    <th>Location</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking, index) => (
                                    <tr
                                        key={booking._id}
                                        className="hover:bg-green-50 transition duration-200 text-sm"
                                    >
                                        <td>{index + 1}</td>
                                        <td className="font-semibold text-gray-800">{booking.title}</td>
                                        <td>
                                            {booking.city}, {booking.country}
                                        </td>
                                        <td>
                                            {booking.currency} {booking.price}
                                        </td>
                                        <td>{new Date(booking.bookedDate).toLocaleDateString()}</td>
                                        <td>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.paymentStatus === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : booking.paymentStatus === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {booking.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="flex flex-wrap gap-2">
                                            {/* View Button */}
                                            <button
                                                onClick={() => setSelectedBooking(booking)}
                                                className="btn btn-sm bg-[#11c3c0] text-white flex items-center gap-1"
                                            >
                                                <FaEye /> View
                                            </button>
                                            {/* Pay / Status Buttons */}
                                            {booking.paymentStatus === "paid" && (
                                                <button
                                                    className="btn btn-sm bg-green-100 text-green-700 border border-green-400 cursor-not-allowed"
                                                    disabled
                                                >
                                                    <FaMoneyBillWave /> Paid
                                                </button>
                                            )}

                                            {booking.paymentStatus === "canceled" && (
                                                <span className="btn btn-sm bg-red-100 text-red-700 cursor-not-allowed">
                                                    Canceled
                                                </span>
                                            )}

                                            {booking.paymentStatus === "unpaid" || booking.paymentStatus === "pending" ? (
                                                <>
                                                    {/* Pay Button */}
                                                    <button
                                                        className="btn btn-sm bg-[#3ea1f1] text-white"
                                                        onClick={() => {
                                                            toast.success("Redirecting to payment...");
                                                            navigate(`/payment/${booking._id}`);
                                                        }}
                                                    >
                                                        <FaMoneyBillWave /> Pay
                                                    </button>

                                                    {/* Cancel Button */}
                                                    <button
                                                        onClick={() => openCancelModal(booking._id)}
                                                        className="btn btn-sm bg-red-100 text-red-700 hover:bg-red-200 flex items-center gap-1"
                                                    >
                                                        <FaTimesCircle /> Cancel
                                                    </button>
                                                </>
                                            ) : null}


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* View Booking Modal */}
                {selectedBooking && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl w-11/12 max-w-lg p-6 shadow-lg relative">
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
                                onClick={() => setSelectedBooking(null)}
                            >
                                ✕
                            </button>

                            <h3 className="text-xl font-bold text-green-700 mb-4 text-center">
                                Booking Details
                            </h3>

                            <div className="space-y-2 text-gray-700">
                                <p>
                                    <span className="font-semibold">Title:</span> {selectedBooking.title}
                                </p>
                                <p>
                                    <span className="font-semibold">Type:</span> {selectedBooking.type}
                                </p>
                                <p>
                                    <span className="font-semibold">Location:</span>{" "}
                                    {selectedBooking.city}, {selectedBooking.country}
                                </p>
                                <p>
                                    <span className="font-semibold">Price:</span>{" "}
                                    {selectedBooking.currency} {selectedBooking.price}
                                </p>
                                <p>
                                    <span className="font-semibold">Booked Date:</span>{" "}
                                    {new Date(selectedBooking.bookedDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-semibold">Status:</span>{" "}
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${selectedBooking.paymentStatus === "paid"
                                            ? "bg-green-100 text-green-700"
                                            : selectedBooking.paymentStatus === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {selectedBooking.paymentStatus}
                                    </span>
                                </p>
                                <p>
                                    <span className="font-semibold">Provider:</span>{" "}
                                    {selectedBooking.providerEmail}
                                </p>
                                <p>
                                    <span className="font-semibold">Booked By:</span>{" "}
                                    {selectedBooking.userName} ({selectedBooking.userEmail})
                                </p>
                                <p>
                                    <span className="font-semibold">Phone:</span>{" "}
                                    {selectedBooking.userPhone}
                                </p>
                            </div>

                            <div className="mt-5 text-center">
                                <button
                                    className="btn bg-green-600 hover:bg-green-700 text-white px-6"
                                    onClick={() => setSelectedBooking(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cancel Booking Modal */}
                {cancelBookingId && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl w-11/12 max-w-md p-6 shadow-lg relative">
                            <h3 className="text-xl font-bold text-red-700 mb-4 text-center">
                                Confirm Cancellation
                            </h3>
                            <p className="text-center text-gray-700 mb-6">
                                Are you sure you want to cancel this booking? This action cannot be undone.
                            </p>

                            <div className="flex justify-center gap-4">
                                <button
                                    className="btn bg-red-600 hover:bg-red-700 text-white px-6"
                                    onClick={confirmCancelBooking}
                                >
                                    Yes, Cancel Booking
                                </button>
                                <button
                                    className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 px-6"
                                    onClick={() => setCancelBookingId(null)}
                                >
                                    No, Keep Booking
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
