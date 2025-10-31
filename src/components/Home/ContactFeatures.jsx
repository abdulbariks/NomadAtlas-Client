import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiSend } from "react-icons/fi";
import axios from "axios";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import remoteWorkAnimation from "../../assets/Lottie/Connect with us.json";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://nomad-atlas-server-delta.vercel.app/api/contact", formData);
      toast.success(" Message sent successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(" Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (

    <div className="">
       
    <div
      className="mt-18 flex justify-center items-center bg-cover bg-center"
      
    >

      
      <ToastContainer /> {/* 🔥 Toast container added here */}
      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-2xl flex flex-col md:flex-row mx-5 md:mx-8 lg:mx-10 overflow-hidden "
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Side */}
        <div
          className="md:w-1/2 bg-[#cff9f7] text-gray-700 pt-7  px-6 flex flex-col justify-between"
          style={{
            backgroundImage: "url('/images/leaves-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold mb-3 text-gray-700">
              Nomad Atlas
            </h2>
            <p className="text-sm text-center leading-relaxed text-gray-400 mb-2">
              Discover your next remote work paradise. Connect with us for
              collaboration, partnership, or support.
            </p>

            <Lottie
              animationData={remoteWorkAnimation}
              loop={true}
              className="w-[450px] h-[350px]"
            />
          </motion.div>

         
        </div>

        {/* Right Side Form */}
        <motion.div
          className="md:w-1/2 py-5 px-4 md:px-8 md:py-5 lg:px-10 lg:py-7  "
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-2">Get in Touch</h3>
          <p className="text-gray-500 text-sm mb-6">
            24/7 We will answer your questions and problems
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="relative w-1/2">
                <FiUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full pl-10 border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                  required
                />
              </div>
              <div className="relative w-1/2">
                <FiUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full pl-10 border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                />
              </div>
            </div>

            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                required
              />
            </div>

            <div className="relative">
              <FiPhone className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <textarea
              name="message"
              placeholder="Describe your issue"
              value={formData.message}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg py-2 px-3 h-28 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              required
            ></textarea>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="bg-[#11c3c0] hover:bg-[#0b9c99] text-white flex items-center justify-center gap-2 rounded-lg py-2 font-semibold"
            >
              <FiSend /> Send message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
    </div>
  );
};

export default ContactUs;
