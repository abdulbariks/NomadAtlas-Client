import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../customHook/useAxiosSecure';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router';

const BookingForm = ({ singleDestination, userInfo }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: userInfo?.email || '',
    },
  });

  const [bookingData, setBookingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const destination = singleDestination;
  const today = new Date().toISOString().split('T')[0];

  const { mutateAsync: saveBooking, isLoading } = useMutation({
    mutationFn: async (bookingInfo) => {
      const { data } = await axiosSecure.post('/bookings', bookingInfo);
      return data;
    },
    onSuccess: () => {
      toast.success('Booking saved successfully!');
    },
    onError: () => {
      toast.error('Failed to save booking');
    },
  });

  console.log("creator email", destination.userEmail)
  const onSubmit = (data) => {
    const bookingInfo = {
      ...data,
      bookedTime: new Date().toISOString(),
      paymentStatus: 'unpaid',
      destinationId: destination._id,
      price: destination.pricePerMonth,
      city: destination.name,
      country: destination.country,
      continent: destination.continent,
      title: destination.title,
      type: destination.type,
      currency: destination.currency,
      providerEmail: destination.userEmail,
    };
    setBookingData(bookingInfo);
    setIsModalOpen(true);
  };

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

  const handlePayNow = async () => {
    if (!bookingData) return;
    try {
      const res = await saveBooking(bookingData); // this returns the booking object
      console.log("Saved booking:", res);

      // ✅ Use booking._id, NOT destinationId
      if (res?.data?._id) {
        toast.success('Redirecting to payment...');
        navigate(`/payment/${res.data._id}`);
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
    <div className="p-6 md:p-8 border rounded-2xl shadow-lg bg-white max-w-md w-full mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Book This Destination
      </h3>

      {/* Booking Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name *"
            className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 ${errors.userName ? 'border-red-500' : 'border-gray-300'
              }`}
            {...register('userName', { required: 'Name is required' })}
          />
          {errors.userName && (
            <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
          )}
        </div>

        {/* Email (Read-only) */}
        <div>
          <input
            type="email"
            placeholder="Email *"
            defaultValue={userInfo?.email || ''}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            {...register('userEmail', { required: true })}
          />
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            placeholder="Phone *"
            className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 ${errors.userPhone ? 'border-red-500' : 'border-gray-300'
              }`}
            {...register('userPhone', {
              required: 'Phone is required',
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: 'Invalid phone number',
              },
            })}
          />
          {errors.userPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.userPhone.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <input
            type="date"
            min={today}
            className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 ${errors.bookedDate ? 'border-red-500' : 'border-gray-300'
              }`}
            {...register('bookedDate', { required: 'Booking date is required' })}
          />
          {errors.bookedDate && (
            <p className="text-red-500 text-sm mt-1">{errors.bookedDate.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200"
        >
          Book Now
        </button>
      </form>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 relative animate-fadeIn">
            {/* Close button (optional aesthetic) */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-5 text-gray-800 text-center">
              Confirm Your Booking
            </h3>

            <div className="space-y-2 mb-6 text-gray-700 text-center">
              <h4 className="font-semibold text-lg">{destination.title}</h4>
              <p className="text-sm text-gray-500">
                {destination.name}, {destination.country}, {destination.continent}
              </p>
              <p className="mt-2 text-sm">{destination.type}</p>
              <p className="mt-2 text-sm">Available Seats: {destination.totalSeat}</p>
              <p className="mt-2 font-semibold text-lg text-blue-600">
                Amount: ${destination.pricePerMonth}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSaveForLater}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 rounded-lg transition-colors"
              >
                Save for Later
              </button>

              <button
                onClick={handlePayNow}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                Pay Now
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg transition-colors font-medium"
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
