import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const CommunityFeatures = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]  mt-5 ">
      <div className="w-[90%] md:w-[93%] lg:w-[93%] bg-gradient-to-r from-[#a1f3f1] to-[#8fedea] rounded-xl border border-[#69dbe1] shadow-sm py-10 px-6 text-center">
        
        {/* Animated Icon */}
        <div className="flex justify-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <FaStar className="text-teal-600 text-5xl" />
          </motion.div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          Ready to Transform Your Lifestyle?
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-base md:text-lg mb-8 max-w-2xl mx-auto">
          Join our community today and get access to exclusive resources,
          networking events, and travel guides.
        </p>

        {/* Button */}
        <div className="flex justify-center">

          <Link to="/community">
        <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="bg-[#11c3c0] border-2 border-[#69dbdf] text-white font-semibold py-2 px-8 rounded-lg hover:opacity-90 transition duration-300 flex items-center gap-2"
>
  Get Started Free
  <span className="text-lg">→</span>
</motion.button></Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeatures;
