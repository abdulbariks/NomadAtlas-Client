import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // ❤️ React icons
import destinationsData from "./FavouriteDestination.json"; // ✅ JSON data

const NomadFavouriteDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [liked, setLiked] = useState({}); // track liked cards

  useEffect(() => {
    // ✅ Load only 4 destinations
    setDestinations(destinationsData.slice(0, 4));
  }, []);

  // ❤️ Toggle Like
  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="px-5 md:px-10 lg:px-20 py-14 ">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold mb-8 text-center"
      >
        Nomads’ Favourite Destinations
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
          >
            {/* Image section */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* ❤️ Love Icon (React Icons) */}
              <button
                onClick={() => toggleLike(item.id)}
                className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-500 p-2 rounded-full shadow-md transition"
              >
                {liked[item.id] ? (
                  <AiFillHeart size={22} className="text-red-500" />
                ) : (
                  <AiOutlineHeart size={22} className="text-gray-600 hover:text-red-500" />
                )}
              </button>

              {/* Details Button (hover on desktop) */}
              <Link
                to={`/destinations/${item.id}`}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
              >
                View Details
              </Link>
            </div>

            {/* Text Content */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {item.description.split(" ").slice(0, 50).join(" ")}...
              </p>

              {/* Mobile-only Details Button */}
              <Link
                to={`/destinations/${item.id}`}
                className="mt-auto bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm py-2 px-4 rounded-md block text-center lg:hidden"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NomadFavouriteDestination;
