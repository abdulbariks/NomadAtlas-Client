"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaPassport, FaSimCard, FaAmbulance, FaBus, FaLaptopHouse, FaBookOpen } from "react-icons/fa";

const services = [
  {
    icon: <FaPassport className="text-[#11c3c0] text-3xl" />,
    title: "Visa Requirements",
    desc: "Stay updated on visa policies for digital nomads",
    count: "100+ countries",
  },
  {
    icon: <FaSimCard className="text-[#3ea1f1] text-3xl" />,
    title: "SIM Cards & Internet",
    desc: "Get local SIM and best internet options",
    count: "200+ providers",
  },
  {
    icon: <FaAmbulance className="text-[#11c3c0] text-3xl" />,
    title: "Healthcare & Emergency",
    desc: "Find trusted clinics and emergency support",
    count: "1K+ services",
  },
  {
    icon: <FaBus className="text-[#3ea1f1] text-3xl" />,
    title: "Transportation",
    desc: "Public transport and local travel tips",
    count: "500+ routes",
  },
  {
    icon: <FaLaptopHouse className="text-[#11c3c0] text-3xl" />,
    title: "Coworking",
    desc: "Explore top-rated coworking spaces",
    count: "5K+ spaces",
  },
  {
    icon: <FaBookOpen className="text-[#3ea1f1] text-3xl" />,
    title: "Learning",
    desc: "Workshops, language schools & online classes",
    count: "1K+ programs",
  },
];

const LocalServices = () => {
  return (
    <section className=" mt-15 px-5 md:px-8 lg:px-10  ">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center text-gray-700"
      >
        Local Services & Essentials
      </motion.h2>
      <p className=" text-gray-600 mt-2 text-center text-sm font-light mb-12">
        Everything a digital nomad needs — in one place
      </p>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white hover:bg-[#f0faf9] border border-gray-100 hover:border-cyan-200 rounded-2xl p-6 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-start space-y-3">
              <div className="bg-[#f1fcfc] p-3 rounded-xl">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
              <span className="text-sm font-medium text-sky-400 mt-1">{service.count}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-12"
      >
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#11c3c0] text-white rounded-full font-medium shadow-sm hover:bg-[#08a09e] transition-all duration-300">
          Explore All Services →
        </button>
      </motion.div>
    </section>
  );
};

export default LocalServices;
