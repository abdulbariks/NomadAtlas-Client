import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) return setMessage("Please enter your email.");
    setLoading(true);
    try {
      const res = await axios.post("https://nomad-atlas-server-delta.vercel.app/api/newsletter", { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setMessage("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 -mb-20 px-6 mt-16 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#11c3c0] to-[#7aeae6] rounded-2xl px-8 py-14 max-w-5xl w-full text-center "
      >
        {/* 🌍 Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-white/90 mb-8 text-sm md:text-base">
          Get travel insights, remote work tips, and Nomad Atlas updates every week.
        </p>

        {/* ✉️ Input and Button */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 w-full px-4 py-3 bg-white/20 backdrop-blur-lg text-white placeholder-white/70 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="bg-white text-[#11c3c0] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#e0f7f6] transition duration-200 w-full md:w-auto"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {message && (
          <p className="text-white mt-3 text-sm font-medium">{message}</p>
        )}

        {/* ✨ Contact Now Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5"
        >
          <div className="flex justify-center mt-8">
      <h1 className="bg-white font-semibold px-4 py-2 rounded-full flex items-center gap-2 text-gray-700 transition-all">
        Meet Your Local Destination Guides!{" "}
        <Link to="/contact-us"
         className="text-[#11c3c0] font-medium flex">Contact Now
        <motion.span
          className="flex items-center"
          initial={{ x: 0 }}
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ArrowUpRight size={18} />
        </motion.span></Link>
      </h1>
    </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Newsletter;
