import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../customHook/useAxiosSecure';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router';   // ✅ added navigation

const BookingForm = ({ singleDestination }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [bookingData, setBookingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();   // ✅ activate navigation

  const destination = singleDestination;
  const today = new Date().toISOString().split('T')[0];

  // ✅ Mutation for saving booking
  const { mutateAsync: saveBooking, isLoading } = useMutation({
    mutationFn: async (bookingInfo) => {
      const { data } = await axiosSecure.post('/bookings', bookingInfo);
      return data;
    },
    onSuccess: (res) => {
      toast.success('Booking saved successfully!');
    },
    onError: (err) => {
      toast.error('Failed to save booking');
      console.error(err);
    }
  });

  const onSubmit = (data) => {
    const bookingInfo = {
      ...data,
      bookedTime: new Date().toISOString(),
      paymentStatus: 'unpaid',
      destinationId: destination._id,
      destination
    };
    setBookingData(bookingInfo);
    setIsModalOpen(true);
  };

  // Save for Later (No payment)
  const handleSaveForLater = async () => {
    if (!bookingData) return;
    try {
      await saveBooking(bookingData);
      setIsModalOpen(false);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Pay Now (Save + Redirect to Stripe Checkout Page)
  const handlePayNow = async () => {
    if (!bookingData) return;
    try {
      const res = await saveBooking(bookingData);  // ✅ save booking first
      if (res?.data?._id) {
        toast.success('Redirecting to payment...');
        console.log("payment id",res.data._id)
        navigate(`/payment/${res.data._id}`);      // ✅ navigate to Stripe payment page
      } else {
        toast.error('Booking not saved properly');
      }
      setIsModalOpen(false);
      reset();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save booking for payment');
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 border rounded-md shadow-md bg-gray-50 max-w-md mx-auto w-full">
      <h3 className="text-xl font-bold mb-4">Book This Destination</h3>

      {/* Booking Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Name *"
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email *"
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone"
            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: 'Invalid phone number'
              }
            })}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <input
            type="date"
            min={today}
            className={`w-full p-2 border rounded ${errors.bookedDate ? 'border-red-500' : ''}`}
            {...register('bookedDate', { required: 'Booking date is required' })}
          />
          {errors.bookedDate && <p className="text-red-500 text-sm mt-1">{errors.bookedDate.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors"
        >
          Book Now
        </button>
      </form>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Confirm Booking</h3>

            <div className="mb-4">
              <h4 className="font-semibold text-lg">{destination.title}</h4>
              <p>{destination.name}, {destination.country}, {destination.continent}</p>
              <p className="mt-2">{destination.type}</p>
              <p className="mt-2">Total Free Seats: {destination.totalSeat}</p>
              <p className="mt-2">Payment Amount: ${destination.pricePerMonth}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleSaveForLater}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded transition-colors"
              >
                Save for Later
              </button>

              {/* ✅ Updated Pay Now button */}
              <button
                onClick={handlePayNow}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition-colors"
              >
                Pay Now
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full rounded-[4px] bg-red-500 text-gray-100 hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
