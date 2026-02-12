import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaWifi, FaUsers } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const NomadFavouriteDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  // ✅ Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(
          "https://nomad-atlas-server-delta.vercel.app/api/destinations/"
        );
        const result = res.data?.data;
        if (Array.isArray(result)) setDestinations(result);
        else if (result && typeof result === "object") setDestinations([result]);
        else setDestinations([]);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  // Handle card click for medium devices
  const handleCardClick = (itemId, e) => {
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      navigate(`/destinations/${itemId}`);
    }
  };

  // Filter logic
  const continents = ["All", "Asia", "Europe", "North America", "South America", "Africa", "Oceania"];
  const filteredDestinations =
    filter === "All"
      ? destinations
      : destinations.filter((item) => item.continent === filter);

  return (
    <section className="px-5 md:px-8 lg:px-10 mt-8 md:mt-12 lg:mt-14">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-3 md:mb-4 text-gray-800"
      >
        Featured Destinations
      </motion.h2>
      <p className="text-sm sm:text-base font-light text-center mb-6 md:mb-8 max-w-2xl mx-auto text-gray-600 px-4">
        Discover top-rated destinations loved by digital nomads, freelancers, and remote workers around the world.
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 md:mb-8 px-2">
        {continents.map((cont) => (
          <button
            key={cont}
            onClick={() => setFilter(cont)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all border ${
              filter === cont
                ? "bg-[#11c3c0] text-white border-[#11c3c0] shadow-md"
                : "bg-white border-gray-300 text-gray-700 hover:bg-[#e8f8f7] hover:border-[#11c3c0]"
            }`}
          >
            {cont}
          </button>
        ))}
      </div>

      {/* 🌀 Swiper Slider */}
      {filteredDestinations.length > 0 ? (
        <div className="relative">
          <Swiper
            spaceBetween={14}
            navigation
            modules={[Navigation]}
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 8 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3.2, spaceBetween: 12 },
              1024: { slidesPerView: 4, spaceBetween: 14 },
              1280: { slidesPerView: 4, spaceBetween: 16 },
            }}
            className="pb-2"
          >
            {filteredDestinations.map((item, index) => (
              <SwiperSlide key={item._id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative bg-white rounded-xl border border-gray-100 hover:border-[#c6f5f4] transition-all hover:scale-[1.02] duration-300 overflow-hidden flex flex-col h-70 lg:h-82"
                  onClick={(e) => handleCardClick(item._id, e)}
                >
                  {/* 🖼️ Image Section */}
                  <div className="relative group cursor-pointer md:cursor-auto">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 md:h-45 lg:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Tag */}
                    {item.tag && (
                      <span
                        className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white shadow-sm ${
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

                    {/* 🡆 Center Arrow Button (only on lg) */}
                    <div
                      className="hidden lg:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <button
                        onClick={() => navigate(`/destinations/${item._id}`)}
                        className="w-10 h-10 bg-[#11c3c0] text-white rounded-full  flex items-center justify-center transform transition-all duration-300 hover:scale-105"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* 📄 Card Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                    <div className="flex justify-between">
                      {/* 📍 Location */}
                      <h3
                        onClick={() => navigate(`/destinations/${item._id}`)}
                        className="text-base sm:text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-[#11c3c0] transition-colors duration-200 line-clamp-1"
                      >
                        {item.country}, {item.continent}
                      </h3>

                      {/* 💰 Price */}
                      <div>
                        <p className="text-[#11c3c0] font-bold text-md md:text-md">
                          ${item.pricePerMonth}
                        </p>
                        <p className="text-gray-400 text-xs">per month</p>
                      </div>
                    </div>

                    {/* 📶 Info Row */}
                    <div className="flex items-center gap-4 sm:gap-5 mt-3 text-xs sm:text-sm text-gray-600 border-t border-gray-100 pt-3">
                      <span className="flex items-center gap-1.5">
                        <FaWifi className="text-gray-500 text-sm" />
                        {item.wifiSpeed || 0} Mbps
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaUsers className="text-gray-500 text-sm" />
                        {item.coworkingSpaces || 0}+
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No destinations found.</p>
      )}
    </section>
  );
};

export default NomadFavouriteDestination;
