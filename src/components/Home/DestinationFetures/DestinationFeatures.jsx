import React from "react";
import { motion } from "framer-motion";
import image1 from "../../../assets/BannerImage/image1.jpg"
import image2 from "../../../assets/BannerImage/image2.jpg"
import { Link } from "react-router";

const DestinationFeatures = () => {
  return (
    <section className="relative py-12 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-75"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
        }}
      ></div>

      {/* Overlay for subtle dark tint */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main Content */}
      <div className="relative grid lg:grid-cols-2 gap-16 items-center z-10">
        {/* Left - Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
            Discover Your Next <br /> Remote Work Destination
          </h2>
          <p className="text-gray-200 text-lg">
            NomadAtlas helps digital nomads and remote workers find the perfect
            place to live and work — with real data on living costs, internet
            speed, and lifestyle.
          </p>
          <p className="text-gray-300 max-w-md">
            From tropical islands to mountain escapes, explore cities that fuel
            both your productivity and your adventures.
          </p>
         <Link to="/destinations"><button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition">
            Explore Destinations
          </button></Link>
        </motion.div>

        {/* Right - Animated Images */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center items-center"
        >
          {/* Image 1 */}
          <motion.img
            src={image1}
            alt="Beach Work"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl"
            whileHover={{ scale: 1.05 }}
          />

          {/* Image 2 - Overlapping */}
          <motion.img
            src={image2}
            alt="Mountain Workspace"
            className="absolute -bottom-10 -right-8 w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-lg border-4 border-white"
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.2 }}
          />

          {/* Floating Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-8 left-4 bg-white/80 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium shadow-md backdrop-blur-md"
          >
            🌍 120+ Destinations
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-4 -left-10 bg-blue-500 text-white px-3 py-2 rounded-xl text-sm font-medium shadow-md"
          >
            💻 Work from Paradise
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationFeatures;
