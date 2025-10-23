import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaWifi, FaSnowflake, FaUtensils, FaLaptop, FaUser, FaClock, FaMapMarkerAlt, FaTemperatureHigh, FaPassport } from "react-icons/fa";
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
      const { data } = await axiosSecure.get(`https://nomad-atlas-server-delta.vercel.app/api/destinations/${id}`);
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
    <section className="w-full ">
      {/* Top Hero Image */}
      <div className="relative w-full h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden">
        <img
          src={destination.images[0]}
          alt={destination.name}
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        {/* Destination Info Text */}
        <div className="absolute bottom-6 left-6 text-white">
          {/* Continent */}
          <div className="flex items-center gap-2 mb-2">

            <span className="px-2 py-1 text-xs bg-none border border-cyan-300 text-cyan-500 font-medium rounded-full flex justify-between gap-1">
              <FaMapMarkerAlt className="text-cyan-300" /> {destination.continent}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-white">
            {/* Destination Name */}
            <h1 className="text-lg leading-tight drop-shadow-lg flex items-center gap-2">
              <FaUser className="text-cyan-300" />
              {destination.name},
            </h1>

            {/* Country */}
            <p className="text-lg flex items-center gap-2 text-gray-200 mt-[2px]">
              {destination.country}
            </p>
          </div>

        </div>
      </div>



      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-20 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-3">{destination.title}</h2>

          {/* Tabs */}
          <div className="flex flex-wrap border-b border-gray-400 mb-6 text-sm sm:text-base">
            {["information", "location", "reviews"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 capitalize transition-colors ${activeTab === tab
                  ? "border-b-2 border-blue-400 font-semibold text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "reviews" ? `Reviews (${comments.length})` : tab}
              </button>
            ))}
          </div>
          {/* information part */}
          {activeTab === "information" && (
            <div className="space-y-8">
              {/* Description */}
              <p className="text-gray-700 leading-relaxed">{destination.description}</p>

              {/* Price Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-end gap-3">
                  <span className="line-through text-gray-400 text-lg">
                    ${destination.avgLivingCost}
                  </span>
                  <span className="text-sky-600 font-bold text-3xl">
                    ${destination.pricePerMonth}
                  </span>
                  <span className="text-gray-500 mb-[2px]">/month</span>
                </div>
              </div>

              {/* Info Cards (Best Season / Seats / Region) */}
              <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg flex-1 min-w-[150px]">
                  <FaClock className="text-cyan-600 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Best Season</p>
                    <p className="font-semibold">{destination.climate.seasonBest}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg flex-1 min-w-[150px]">
                  <FaUser className="text-cyan-600 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Available</p>
                    <p className="font-semibold">{destination.totalSeat} Seats</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg flex-1 min-w-[150px]">
                  <FaMapMarkerAlt className="text-cyan-600 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Region</p>
                    <p className="font-semibold">{destination.continent}</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <span className="text-cyan-700">★</span> Amenities
                </h3>
                <div className="flex flex-wrap gap-3">
                  {destination.amenities.wifi && (
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 bg-white">
                      <FaWifi className="text-cyan-600" /> Free WiFi
                    </div>
                  )}
                  {destination.amenities.kitchen && (
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 bg-white">
                      <FaUtensils className="text-cyan-600" /> Kitchen
                    </div>
                  )}
                  {destination.amenities.ac && (
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 bg-white">
                      <FaSnowflake className="text-cyan-600" /> AC
                    </div>
                  )}
                  {destination.amenities.workspace && (
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 bg-white">
                      <FaLaptop className="text-cyan-600" /> Workspace
                    </div>
                  )}
                </div>
              </div>

              {/* Climate & Visa Info */}
              <div className="border-t border-gray-200 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Climate */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <FaTemperatureHigh className="text-cyan-600 text-xl" />
                    Climate
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg px-4 py-3">
                      <p className="text-gray-500 text-sm">Temperature</p>
                      <p className="font-semibold">{destination.climate.temperature}°C</p>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-3">
                      <p className="text-gray-500 text-sm">Humidity</p>
                      <p className="font-semibold">{destination.climate.humidity}%</p>
                    </div>
                  </div>
                </div>

                {/* Visa Info */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <FaPassport className="text-cyan-600 text-xl" />
                    Visa Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg px-4 py-3">
                      <p className="text-gray-500 text-sm">Type</p>
                      <p className="font-semibold">{destination.visaInfo.visaType}</p>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-3">
                      <p className="text-gray-500 text-sm">Duration</p>
                      <p className="font-semibold">{destination.visaInfo.visaDuration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Location Tab */}
          {activeTab === "location" && (
            <div className="mb-6 overflow-hidden">
              <DestinationMap
                latitude={destination.location.latitude}
                longitude={destination.location.longitude}
                name={destination.name}
              />
            </div>
          )}

          {/* Reviews Tab */}
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
                    className="flex gap-3 border-b border-gray-400 pb-2 items-start"
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
                className="space-y-3 mt-6 border-t border-gray-400 pt-4"
              >
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment..."
                  className="w-full p-2 border border-gray-400 rounded resize-none outline-none focus:ring-1 focus:ring-cyan-400"
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
        <div className="flex justify-center md:justify-start lg:justify-center">
          <BookingForm singleDestination={singleDestination} userInfo={userInfo}></BookingForm>
        </div>

      </div>
    </section>
  );
};

export default DestinationDetailsPage;
