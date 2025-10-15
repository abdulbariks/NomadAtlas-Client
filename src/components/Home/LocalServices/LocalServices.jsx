import React from "react";
import { motion } from "framer-motion";
import { FaPassport, FaSimCard, FaHospitalAlt, FaBusAlt } from "react-icons/fa";

const LocalServices = () => {
  return (
    <section className="relative py-10 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-blue-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-indigo-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Section — Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-start flex-wrap -gap-6"
        >
          {/* 3 Animated Circular Images */}
          <motion.img
            src="https://i.ibb.co.com/YFsqmPvH/tourists-men-women-look-map-near-flower-gardens.jpg"
            alt="Local guide"
            className="w-40 h-40 md:w-55 md:h-55 rounded-full object-cover shadow-xl"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.img
            src="https://i.ibb.co.com/tM8SYRw7/people-navigating-with-map-road-trip.jpg"
            alt="Map guide"
            className="w-36 h-36 md:w-50 md:h-50 rounded-full object-cover shadow-lg mt-8"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.img
            src="https://i.ibb.co.com/5xYYzKjw/May22-27-88090660.jpg"
            alt="Transport"
            className="w-50 h-50 md:w-55 md:h-55 rounded-full object-cover shadow-xl mt-4"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

        {/* Right Section — Text & Icons */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Local Services & Guides
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about living and working remotely in a
            new place — from essential services to daily conveniences.
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <FaPassport className="text-blue-600 text-xl mt-1" />
              <span>
                <strong>Visa Requirements:</strong> Up-to-date info on digital
                nomad visas,  entry rules, and stay durations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaSimCard className="text-blue-600 text-xl mt-1" />
              <span>
                <strong>SIM Cards & Internet:</strong> Best mobile data plans and
                internet providers to keep you connected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaHospitalAlt className="text-blue-600 text-xl mt-1" />
              <span>
                <strong>Healthcare & Emergency:</strong> Guidance on hospitals,
                clinics, pharmacies, and local emergency numbers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaBusAlt className="text-blue-600 text-xl mt-1" />
              <span>
                <strong>Transportation:</strong> Local transport tips, including
                buses, trains, bikes, and ride-sharing services.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default LocalServices;
