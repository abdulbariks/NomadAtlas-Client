import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const WeatherSeasonInfo = () => {
  const sections = [
    {
      id: 1,
      title: "Best Seasons to Visit",
      text: "Discover the ideal months for traveling to your destination.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=60",
      link: "/weather-alerts",
    },
    {
      id: 2,
      title: "Weather Alerts",
      text: "Stay prepared with real-time alerts about weather conditions.",
      image:
        "https://images.unsplash.com/photo-1606788075761-9b5e4b2d2b65?auto=format&fit=crop&w=900&q=60",
      link: "/weather-alerts",
    },
    {
      id: 3,
      title: "Seasonal Activities",
      text: "Explore the best seasonal activities for each destination.",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=60",
      link: "/weather-alerts",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-indigo-100 py-16 px-6 md:px-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Weather & Seasonal Info
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Plan smarter with seasonal insights, safety alerts, and activity guides.
        </p>
      </div>

      <div className="space-y-20">
        {sections.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="md:w-1/2">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
            </div>

            {/* Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6">{item.text}</p>
              <Link
                to={item.link}
                className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WeatherSeasonInfo;
