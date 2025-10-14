import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FaWifi, FaSnowflake, FaUtensils, FaLaptop, FaUser, FaClock, FaMapMarkerAlt, } from "react-icons/fa";
import useAxiosSecure from "../../customHook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import DestinationMap from "./DestinationMap";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import BookingForm from "./BookingForm";

const DestinationDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("information");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userAvatar] = useState(
    "https://i.postimg.cc/T10WChj6/gettyimages-1300845620-612x612.jpg"
  );

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useSelector((state) => state.auth);

  //  Fetch single destination details
  const {
    data: singleDestination,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["destination", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/destinations/${id}`);
      return data.data;
    },
  });


  //  Fetch all reviews for this destination
  const {
    data: reviewData,
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${id}`);
      return data.data;
    },
  });


  // Load reviews when fetched
  useEffect(() => {
    if (reviewData) setComments(reviewData);
  }, [reviewData]);

  // Wait for user data before rendering
  if (!user || !user.displayName || !user.email) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  const userInfo = {
    name: user.displayName,
    email: user.email,
  };


  // Loading and error states
  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader className="animate-spin" />
      </div>
    );
  if (isError || !singleDestination)
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load destination.
      </div>
    );

  const destination = singleDestination;

  // ✅ Handle Comment Submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return toast.error("Please write a comment");

    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];

    const commentObj = {
      destinationId: destination._id,
      user: {
        name: userInfo.name,
        email: userInfo.email,
        avatar: userAvatar,
      },
      text: newComment,
      date: dateStr,
    };

    try {
      const { data } = await axiosSecure.post("/reviews", commentObj);
      if (data?.success) {
        toast.success("Comment added!");
        setNewComment("");
        refetchReviews(); // 🔄 Refresh reviews from backend
      } else {
        toast.error("Failed to post comment");
      }
    } catch (error) {
      console.error("❌ Error posting comment:", error);
      toast.error("Error adding comment");
    }
  };

  return (
    <section className="w-full mt-15">
      {/* 🖼️ Top Hero Image */}
      <div className="w-full h-96 relative">
        <img
          src={destination.images[0]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-5 left-5 bg-black bg-opacity-50 px-4 py-2 rounded text-white">
          {destination.name}, {destination.country}
        </div>
      </div>

      {/* 📄 Main Content */}
      <div className="px-6 md:px-12 lg:px-20 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-3">{destination.title}</h2>

          {/* 🔹 Tabs */}
          <div className="flex flex-wrap border-b mb-6 text-sm sm:text-base">
            {["information", "location", "reviews"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 capitalize transition-colors ${activeTab === tab
                  ? "border-b-2 border-blue-500 font-semibold text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "reviews" ? `Reviews (${comments.length})` : tab}
              </button>
            ))}
          </div>

          {/* 🧾 Information Tab */}
          {activeTab === "information" && (
            <div>
              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {destination.description}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="line-through text-red-500 font-semibold">
                  ${destination.avgLivingCost}
                </span>
                <span className="text-teal-500 font-bold text-2xl">
                  ${destination.pricePerMonth}
                </span>
                <span className="text-gray-500">/month</span>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mb-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <FaClock /> <span>{destination.climate.seasonBest}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser /> <span>{destination.totalSeat} Seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt /> <span>{destination.continent}</span>
                </div>
              </div>

              {/* Amenities */}
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700 mb-6">
                {destination.amenities.wifi && (
                  <p className="flex items-center gap-2">
                    <FaWifi /> Free WiFi
                  </p>
                )}
                {destination.amenities.kitchen && (
                  <p className="flex items-center gap-2">
                    <FaUtensils /> Kitchen
                  </p>
                )}
                {destination.amenities.ac && (
                  <p className="flex items-center gap-2">
                    <FaSnowflake /> Air Conditioning
                  </p>
                )}
                {destination.amenities.workspace && (
                  <p className="flex items-center gap-2">
                    <FaLaptop /> Workspace
                  </p>
                )}
              </div>

              {/* Climate & Visa Info */}
              <h3 className="text-lg font-semibold mb-3">
                Climate & Visa Information
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                <li>Temperature: {destination.climate.temperature}°C</li>
                <li>Humidity: {destination.climate.humidity}%</li>
                <li>
                  Visa: {destination.visaInfo.visaType} (
                  {destination.visaInfo.visaDuration})
                </li>
              </ul>
            </div>
          )}

          {/* 🗺️ Location Tab */}
          {activeTab === "location" && (
            <div className="mb-6 overflow-hidden">
              <DestinationMap
                latitude={destination.location.latitude}
                longitude={destination.location.longitude}
                name={destination.name}
              />
            </div>
          )}

          {/* 💬 Reviews Tab */}
          {activeTab === "reviews" && (
            <div>
              {/* Review List */}
              <div className="mb-6 space-y-3">
                {reviewsLoading && (
                  <p className="text-gray-500">Loading reviews...</p>
                )}
                {!reviewsLoading && comments.length === 0 && (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
                {comments.map((c) => (
                  <div
                    key={c._id}
                    className="flex gap-3 border-b pb-2 items-start"
                  >
                    <img
                      src={c.user.avatar}
                      alt={c.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{c.user.name}</span>
                        <span className="text-gray-400 text-sm">{c.date}</span>
                      </div>
                      <p className="text-gray-700 mt-1">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Review Form */}
              <form
                onSubmit={handleCommentSubmit}
                className="space-y-3 mt-6 border-t pt-4"
              >
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment..."
                  className="w-full p-2 border rounded resize-none focus:ring focus:ring-blue-200"
                  rows={3}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - Booking Form */}
        {/* <div className="p-6 border rounded-md shadow-md bg-gray-50">
          <h3 className="text-xl font-bold mb-4">Book This Destination</h3>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Name *"
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email *"
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-2 border rounded"
            />
            <input type="date" className="w-full p-2 border rounded" />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
            >
              Book Now
            </button>
          </form>
        </div> */}
        <BookingForm singleDestination={singleDestination}></BookingForm>
      </div>
    </section>
  );
};

export default DestinationDetailsPage;
