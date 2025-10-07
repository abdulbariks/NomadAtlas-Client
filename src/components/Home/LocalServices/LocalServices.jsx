import React from "react";
import { motion } from "framer-motion";
import { FaPassport, FaSimCard, FaHospitalAlt, FaBusAlt } from "react-icons/fa";

const LocalServices = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://i.ibb.co.com/5xYYzKjw/May22-27-88090660.jpg"
            alt="Local Services"
            className="rounded-2xl shadow-lg object-cover w-full"
          />
        </motion.div>

        {/* Text Content */}
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

          {/* Feature List */}
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <FaPassport className="text-blue-600 text-xl mt-1" />
              <span>
                <strong>Visa Requirements:</strong> Up-to-date info on digital
                nomad visas, entry rules, and stay durations.
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
