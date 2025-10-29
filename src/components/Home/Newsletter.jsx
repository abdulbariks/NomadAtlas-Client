import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) return setMessage("Please enter your email.");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/newsletter", { email });
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
      {/* -mb-24 pulls it above footer */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#11c3c0] to-[#7aeae6] rounded-2xl px-8 py-14 max-w-5xl w-full text-center "
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-white/90 mb-8 text-sm md:text-base">
          Get travel insights, remote work tips, and NomadAtlas updates every week.
        </p>

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
          <p className="text-white mt-4 text-sm font-medium">{message}</p>
        )}
      </motion.div>
    </div>
  );
};

export default Newsletter;
