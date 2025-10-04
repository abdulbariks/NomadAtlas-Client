import React from "react";
import { motion } from "framer-motion";

const DestinationFeatures = () => {
  return (
    <section className="relative bg-blue-100 py-16 px-6 md:px-12 lg:px-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Discover Your Next Remote Work Destination
          </h2>
          <p className="text-gray-600 text-lg">
            NomadAtlas helps digital nomads and remote workers find the perfect
            place to live and work. Explore destinations based on cost of living,
            internet speed, coworking spaces, and lifestyle.  
          </p>
          <p className="text-gray-600">
            Whether you prefer beach vibes, mountain views, or bustling cities,
            we make it easy to compare destinations and choose where you’ll feel
            most productive and inspired.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition">
            Explore Destinations
          </button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Remote Work Destination"
            className="rounded-2xl shadow-lg object-cover w-full max-w-md"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationFeatures;
