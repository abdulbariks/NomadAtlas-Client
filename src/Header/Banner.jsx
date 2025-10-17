import React from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const Banner = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-xl mx-5 md:mx-10 lg:mx-20 mt-5">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10 rounded-xl"></div>

      {/* Background Image */}
      <div className="absolute inset-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1600&q=80"
          alt="City"
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white max-w-3xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
        >
          Discover Your Next{" "}
          <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
            Nomad Destination
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-gray-200 mb-8"
        >
          Find the perfect city to live and work remotely, tailored to your
          preferences and budget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <div className="relative flex-1 max-w-md mx-auto">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="pl-12 pr-4 py-3 w-full rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-white/50 backdrop-blur-md"
            />
          </div>

          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition">
            Explore Cities
          </Button>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl" />
    </section>
  );
};

export default Banner;
