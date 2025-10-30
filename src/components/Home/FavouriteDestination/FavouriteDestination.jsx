"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaStar, FaWifi, FaUsers } from "react-icons/fa";

const NomadFavouriteDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(
          "https://nomad-atlas-server-one.vercel.app/api/destinations/"
        );

        const result = res.data?.data;

        // ✅ Handle both array and single object responses
        if (Array.isArray(result)) {
          setDestinations(result.slice(0, 4));
        } else if (result && typeof result === "object") {
          setDestinations([result]);
        } else {
          setDestinations([]);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  // ❤️ Like toggle
  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="px-5 md:px-8 lg:px-10 mt-15">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl text-center font-bold mb-4 text-gray-700"
      >
        Featured Destinations
      </motion.h2>
      <p className="text-sm font-light text-center mb-8">Discover top-rated destinations loved by digital nomads, freelancers, and remote workers around the world.</p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {destinations.length > 0 ? (
          destinations.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-white rounded-xl border border-gray-200 hover:border-[#c6f5f4] transition-all hover:scale-105 duration-300 overflow-hidden flex flex-col"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Tag */}
                {item.tag && (
                  <span
                    className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${
                      item.tag === "Trending"
                        ? "bg-orange-500"
                        : item.tag === "Popular"
                        ? "bg-blue-500"
                        : item.tag === "Rising Star"
                        ? "bg-purple-600"
                        : "bg-teal-500"
                    }`}
                  >
                    {item.tag}
                  </span>
                )}

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(item._id)}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm"
                >
                  {liked[item._id] ? (
                    <AiFillHeart size={20} className="text-red-500" />
                  ) : (
                    <AiOutlineHeart
                      size={20}
                      className="text-gray-600 hover:text-red-500"
                    />
                  )}
                </button>
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  {/* Location & Price */}
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.country}, {item.continent}
                    </h3>
                    <div className="text-right">
                      <p className="text-[#11c3c0] font-bold text-lg">
                        ${item.pricePerMonth}
                      </p>
                      <p className="text-gray-400 text-xs">per month</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-baseline justify-between mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <FaStar className="text-orange-400" />
                      <span>4.7</span>
                      <span className="text-gray-400">(1456)</span>
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="flex items-center gap-5 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaWifi className="text-gray-500" /> {item.wifiSpeed || 0} Mbps
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUsers className="text-gray-500" /> {item.coworkingSpaces || 0}+
                    </span>
                  </div>
                </div>

                {/* Button at bottom */}
                <Link
                  to={`/destinations/${item._id}`}
                  className="mt-3 block w-full text-center border border-[#11c3c0] text-[#11c3c0] hover:bg-[#e8f8f7] py-2 rounded-md font-medium transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            No destinations found.
          </p>
        )}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm bg-[#11c3c0] hover:bg-[#0da3a0] font-medium transition-all hover:scale-105 duration-300 text-white hover:shadow-md"
          >
            <span>View All Destinations</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NomadFavouriteDestination;
