import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Work From Paradise",
    tag: "Most Popular",
    description:
      "Join 100,000+ professionals who’ve ditched the 9–5 cubicle for beaches, mountains, and cities worldwide.",
    button1: "Start Your Journey",
    button2: "Learn More",
    image: "https://i.ibb.co.com/4Z9q90sR/business-scene-with-nature-1.jpg",
  },
  {
    id: 2,
    title: "Remote Work Hub",
    tag: "Premium",
    description:
      "Access exclusive remote job boards, coworking spaces, and networking events in 150+ cities.",
    button1: "Explore Jobs",
    button2: "Learn More",
    image: "https://i.ibb.co.com/p6VyyvTs/person-home-working-late-night-1.jpg",
  },
  {
    id: 3,
    title: "Global Community",
    tag: "Trending",
    description:
      "Meet like-minded nomads, attend meetups, and build lasting friendships across continents.",
    button1: "Join Community",
    button2: "Learn More",
    image: "https://i.ibb.co.com/Wvf65BDn/entrepreneur-uses-high-speed-internet-connection-mountain-top-1.jpg",
  },
];

const FeaturedOpportunities = () => {
  return (
    <div className="mt-15  px-5 md:px-8 lg:px-10 ">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className=" text-3xl md:text-4xl font-bold px-4 py-3 text-gray-700 rounded-full">
          Featured Opportunities
        </span>
        <h2 className="text-sm text  mt-6 text-gray-500">
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
            } items-center justify-between bg-white rounded-2xl shadow-md overflow-hidden`}
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
                className="w-full h-full object-cover md:rounded-none rounded-t-2xl"
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
                className="text-sm font-semibold px-3 py-1 rounded-full mb-3 inline-block"
                style={{
                  background: "linear-gradient(to right, #3ea1f1, #11c3c0)",
                  color: "white",
                }}
              >
                {feature.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">{feature.description}</p>

              <div className="flex gap-4">
                <button
                  className="text-white font-semibold px-5 py-2 rounded-full transition"
                  style={{
                    background: "linear-gradient(to right, #3ea1f1, #11c3c0)",
                  }}
                >
                  {feature.button1}
                </button>
                <button
                  className="border-2 px-5 py-2 rounded-full font-semibold transition"
                  style={{
                    borderColor: "#11c3c0",
                    color: "#11c3c0",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background =
                      "linear-gradient(to right, #3ea1f1, #11c3c0)";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#11c3c0";
                  }}
                >
                  {feature.button2}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedOpportunities;
