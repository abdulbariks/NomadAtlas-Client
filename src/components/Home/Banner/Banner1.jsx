"use client";
import React from "react";
import bannerImage from "../../../assets/BannerImage/Banner2.jpg";
import { AnimatePresence, motion, useInView } from "framer-motion";

// GradualSpacing Component
export function GradualSpacing({ text = "Gradual Spacing" }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex flex-wrap justify-center gap-1">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.p
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit="hidden"
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="text-2xl md:text-4xl font-extrabold drop-shadow-lg"
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Banner1 Component
const Banner1 = () => {
  return (
    <section className="relative h-[95vh] w-full flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <img
        src={bannerImage}
        alt="NomadAtlas banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center px-6">
        {/* Animated Title */}
        <GradualSpacing text="Discover Your Next Nomad Destination" />

        <p className="mt-4 text-lg font-semibold max-w-2xl mx-auto">
          Find the perfect city to live and work remotely, tailored to your
          preferences and budget.
        </p>


<motion.button
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.5 }}
  whileHover={{ scale: 1.1, backgroundColor: "#FACC15", color: "#000" }} // yellow hover
  whileTap={{ scale: 0.95 }}
  className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md transition"
>
  Start Exploring
</motion.button>

      </div>
    </section>
  );
};

export default Banner1;
