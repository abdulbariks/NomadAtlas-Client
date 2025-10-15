import React from "react";
import { motion } from "framer-motion";
import { FaWifi, FaCloud, FaShieldAlt, FaBriefcase } from "react-icons/fa";
import { GiAirplaneDeparture } from "react-icons/gi"; // new icon for 4th card

const perks = [
  {
    icon: <FaBriefcase className="text-blue-600 text-3xl" />,
    title: "Coworking Discounts",
    description:
      "Save on memberships at top coworking spaces around the world. Perfect for productivity and networking.",
  },
  {
    icon: <FaCloud className="text-blue-600 text-3xl" />,
    title: "VPN & Cloud Storage",
    description:
      "Get exclusive offers on essential digital tools like secure VPNs and cloud storage to work safely anywhere.",
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
    title: "Travel Insurance",
    description:
      "Access affordable, remote-worker-friendly insurance packages for health, gear, and trips abroad.",
  },
  {
    icon: <GiAirplaneDeparture className="text-blue-600 text-3xl" />,
    title: "Flight & Travel Deals",
    description:
      "Special discounts on flights, accommodation, and travel gear to make exploring new cities easier and cheaper.",
  },
];

const NomadPerks = () => {
  return (
    <section className="py-16 px-5 md:px-8 lg:px-10">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Nomad Perks & Discounts
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Exclusive deals for NomadAtlas members to make remote work easier,
          safer, and more affordable.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {perks.map((perk, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <div className="mb-4">{perk.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">
              {perk.title}
            </h3>
            <p className="text-gray-600 mt-2">{perk.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NomadPerks;
