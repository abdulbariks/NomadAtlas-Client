import React from "react";
import { motion } from "framer-motion";
import { AiOutlineHeart } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { FiShare2 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const CommunitySpotlight = () => {
  const data = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "Bali, Indonesia",
      time: "2h ago",
      text: "Just found the most amazing coffee shop with gigabit wifi! Perfect spot for deep work sessions. The community here is incredible. 🌴☕",
      likes: 42,
      comments: 8,
      image:"https://i.ibb.co.com/qFD6Gtpw/emotions-people-concept-headshot-serious-looking-handsome-man-with-beard-looking-confident-determine.jpg"
    },
    {
      id: 2,
      name: "Marcus Silva",
      location: "Lisbon, Portugal",
      time: "5h ago",
      text: "Spending 3 months in Lisbon was the best decision ever. Great weather, awesome food, and fantastic networking opportunities. Highly recommend! 🇵🇹",
      likes: 67,
      comments: 15,
      image:"https://i.ibb.co.com/twMtPX1M/surprised-smiling-curly-girl-white-wall.jpg"
    },
    {
      id: 3,
      name: "Emma Johnson",
      location: "Medellín, Colombia",
      time: "1d ago",
      text: "The coworking scene in Medellín is next level! Met so many talented people building amazing things. Plus, the cost of living is unbeatable. 💻🚀",
      likes: 38,
      comments: 12,
      image:"https://i.ibb.co.com/0V1XkD22/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg"
    },
  ];

  return (
    <div className="pt-15 px-5 md:px-20 ">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="bg-blue-400 text-white text-sm font-semibold px-4 py-1 rounded-full">
          Community Spotlight
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mt-6 text-gray-700">
          Real experiences from digital nomads thriving around the world
        </h2>
      </div>

      {/* Cards */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {data.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
           {/* Avatar and Name */}
<div className="flex items-center mb-3">
  {post.image ? (
    <img
      src={post.image}
      alt={post.name}
      className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-[#11c3c0]"
    />
  ) : (
    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3ea1f1] to-[#11c3c0] flex items-center justify-center text-white font-semibold text-lg mr-3">
      {post.name
        .split(" ")
        .map((n) => n[0])
        .join("")}
    </div>
  )}

  <div>
    <h3 className="font-semibold text-gray-800">{post.name}</h3>
    <div className="flex items-center text-sm text-gray-500 gap-2">
      <FaMapMarkerAlt className="text-[#11c3c0]" />
      <span>{post.location}</span>
      <span>• {post.time}</span>
    </div>
  </div>
</div>


            {/* Text */}
            <p className="text-gray-600 mb-5">{post.text}</p>

            {/* Footer */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <AiOutlineHeart className="text-gray-500" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GoCommentDiscussion className="text-gray-500" />
                  <span>{post.comments}</span>
                </div>
              </div>
              <button className="flex items-center gap-1 hover:text-[#11c3c0] transition">
                <FiShare2 /> Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Link
          to="/community"
          className="bg-[#11c3c0] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:opacity-90 transition duration-300 flex items-center gap-2"
        >
          See more posts
          <BsArrowRight className="text-lg" />
        </Link>
      </motion.div>
    </div>
  );
};

export default CommunitySpotlight;
