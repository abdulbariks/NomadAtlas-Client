"use client";
import React from "react";
import bannerImage from "../../../assets/BannerImage/hero-workspace.jpg";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router"; 
import { Typewriter } from "react-simple-typewriter";

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
            className="text-2xl md:text-5xl font-extrabold drop-shadow-lg"
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}

const Banner1 = () => {
  const navigate = useNavigate(); 
  const [searchQuery, setSearchQuery] = React.useState(""); 

  const handleSearch = () => {
    if (!searchQuery.trim()) return; 
    navigate(`/destinations?query=${encodeURIComponent(searchQuery)}`); 
  };

  return (
    <section className="relative w-full h-[80] md:h-[95vh] pt-15 pb-6 md:pt-6 md:pb-0 flex items-center justify-center text-white overflow-hidden mt-0 inset-0">
      {/* Background Image */}
      <img
        src={bannerImage}
        alt="NomadAtlas banner"
        className="absolute inset-0 w-full h-full blur-[2px] object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-5xl font-extrabold"
>
  Find Your Perfect Remote <br /> Work{" "}
  <span className="text-white">
    <Typewriter
      words={['Destination',  'Workspace','City',]}
      loop={true}
      cursor
      cursorStyle="_"
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1500}
    />
  </span>
</motion.h1>

        <p className="mt-4 text-light text-gray-100 font-light max-w-2xl mx-auto">
          Explore the world's best cities for digital nomads. Compare costs,
          discover amenities, and connect with a global community.
        </p>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10 max-w-2xl mx-auto"
        >
          {/* Custom Input Field */}
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white z-10" />
            <input
              type="text"
              placeholder="Where do you want to work from?"
              className="w-full pl-12 pr-4 h-14 text-lg rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-[#11c3c0] focus:outline-none backdrop-blur-md relative z-0"
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/*Custom Search Button */}
          <button
            onClick={handleSearch} 
            className="h-14 px-8 bg-[#11c3c0] hover:bg-[#0a8d8b] text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            Search
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner1;
