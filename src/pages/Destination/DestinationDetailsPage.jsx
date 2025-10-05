import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import destinations from "../Destination/Destination.json";
import reviewsData from "../Destination/reviews.json";
import {
  FaWifi,
  FaSnowflake,
  FaUtensils,
  FaLaptop,
  FaUser,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const DestinationDetailsPage = () => {
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === parseInt(id));

  const [activeTab, setActiveTab] = useState("information");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("Anonymous");
  const [userAvatar, setUserAvatar] = useState("https://i.pravatar.cc/50");

  useEffect(() => {
    // Load comments for this destination from reviews.json
    const filteredComments = reviewsData.filter(
      (r) => r.destinationId === destination.id
    );
    setComments(filteredComments);
  }, [destination.id]);

  if (!destination) return <p className="p-10">Destination not found!</p>;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];

    const commentObj = {
      id: comments.length + 1,
      destinationId: destination.id,
      user: {
        name: userName,
        avatar: userAvatar,
      },
      date: dateStr,
      text: newComment,
    };

    setComments([...comments, commentObj]);
    setNewComment("");
  };

  return (
    <section className="w-full mt-15">
      {/* Top Image */}
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

      {/* Content */}
      <div className="px-6 md:px-16 lg:px-21 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-3">{destination.title}</h2>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 ${
                activeTab === "information"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : ""
              }`}
              onClick={() => setActiveTab("information")}
            >
              Information
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "location"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : ""
              }`}
              onClick={() => setActiveTab("location")}
            >
              Location
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "reviews"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({comments.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "information" && (
            <div>
              {/* Description */}
              <p className="text-gray-600 mb-6">{destination.description}</p>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="line-through text-red-500 font-semibold">
                  ${destination.price}
                </span>
                <span className="text-teal-500 font-bold text-2xl">
                  ${destination.discountPrice}
                </span>
                <span className="text-gray-500">/ per month</span>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 mb-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <FaClock /> <span>Best Season: {destination.climate.seasonBest}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser /> <span>Seats: {destination.totalSeat}</span>
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

              {/* Climate & Visa */}
              <h3 className="text-lg font-semibold mb-3">Climate & Visa Info</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                <li>Temperature: {destination.climate.temperature}°C</li>
                <li>Humidity: {destination.climate.humidity}%</li>
                <li>
                  Visa: {destination.visaInfo.visaType} ({destination.visaInfo.visaDuration})
                </li>
              </ul>

              {/* Reviews */}
              <h3 className="text-lg font-semibold mb-3">Reviews</h3>
              <div className="mb-6 space-y-3">
                {comments.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3 border-b pb-2">
                    <img
                      src={c.user.avatar}
                      alt={c.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{c.user.name}</span>
                        <span className="text-gray-400 text-sm">{c.date}</span>
                      </div>
                      <p className="text-gray-700">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <form onSubmit={handleCommentSubmit} className="space-y-3 mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment..."
                  className="w-full p-2 border rounded"
                  rows={3}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          )}

          {activeTab === "location" && (
            <div className="mb-6">
              <iframe
                title="destination-map"
                src={`https://maps.google.com/maps?q=${destination.latitude},${destination.longitude}&z=15&output=embed`}
                width="100%"
                height="400"
                className="border rounded"
              ></iframe>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="mb-6 space-y-3">
                {comments.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3 border-b pb-2">
                    <img
                      src={c.user.avatar}
                      alt={c.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{c.user.name}</span>
                        <span className="text-gray-400 text-sm">{c.date}</span>
                      </div>
                      <p className="text-gray-700">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <form onSubmit={handleCommentSubmit} className="space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment..."
                  className="w-full p-2 border rounded"
                  rows={3}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right - Booking Form */}
        <div className="p-6 border rounded-md shadow-md bg-gray-50">
          <h3 className="text-xl font-bold mb-4">BOOK THIS DESTINATION</h3>
          <form className="space-y-3">
            <input type="text" placeholder="Name *" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email *" className="w-full p-2 border rounded" />
            <input type="tel" placeholder="Phone" className="w-full p-2 border rounded" />
            <input type="date" className="w-full p-2 border rounded" />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DestinationDetailsPage;
