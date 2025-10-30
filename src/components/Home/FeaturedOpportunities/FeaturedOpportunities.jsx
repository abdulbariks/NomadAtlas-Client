import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Sparkles, ArrowRight } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Work From Paradise",
    tag: "Most Popular",
    description:
      "Join 100,000+ professionals who’ve ditched the 9–5 cubicle for beaches, mountains, and cities worldwide.",
    button1: "Start Your Journey",
   
    image: "https://i.ibb.co.com/VYg5626j/business-man-his-office-outdoors-1.jpg",
    link: "/destinations",
  },
  {
    id: 2,
    title: "Remote Work Hub",
    tag: "Premium",
    description:
      "Access exclusive remote job boards, coworking spaces, and networking events in 150+ cities.",
    button1: "Explore Jobs",
   
    image: "https://i.ibb.co.com/Q399TybR/girll-with-earphones-making-video-call-waving-1.jpg",
    link: "/jobs",
  },
  {
    id: 3,
    title: "Global Community",
    tag: "Trending",
    description:
      "Meet like-minded nomads, attend meetups, and build lasting friendships across continents.",
    button1: "Join Community",
   
    image: "https://i.ibb.co.com/Lh6YQbmm/students-holding-network-graphic-overlay-banner-1.jpg",
    link: "/community",
  },
];

const FeaturedOpportunities = () => {
  return (
    <div className="mt-15 px-5 md:px-8 lg:px-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-5 py-1 bg-[#3ea1f1] text-white text-sm md:text-base font-medium rounded-full">
          <Sparkles size={15} /> Featured Opportunities
        </span>
        <h2 className="text-sm text mt-6 text-gray-500">
          Discover endless possibilities for remote work and global adventures
        </h2>
      </div>

      {/* Feature Cards */}
      <div className="space-y-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center justify-between bg-white rounded-2xl overflow-hidden`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Image Side */}
            <motion.div
              className="md:w-1/2 w-full"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-80 object-cover md:rounded-none rounded-t-2xl"
              />
            </motion.div>

            {/* Text Side */}
            <motion.div
              className="md:w-1/2 w-full p-6 md:p-10"
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="text-sm font-semibold px-3 py-1 text-[#229a98] rounded-full mb-3 inline-block"
                style={{
                  background: "linear-gradient(to right, #229a98, #11c3c0)",
                  color: "white",
                }}
              >
                {feature.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">{feature.description}</p>

              <div className="flex gap-4 flex-wrap">
                {/* Primary Button */}
                <motion.div
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <Link
    to={feature.link}
    className="text-white font-semibold px-5 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
    style={{
      background: "#11c3c0",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#0fa8a6")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "#11c3c0")}
  >
    {feature.button1} <ArrowRight size={16} />
  </Link>
</motion.div>

              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedOpportunities;
