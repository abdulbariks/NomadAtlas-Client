import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const posts = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description:
      "Bali is a hub for digital nomads with affordable living, co-working spaces, and a vibrant culture.",
    author: "Sarah K.",
  },
  {
    id: 2,
    name: "Lisbon, Portugal",
    image:
      "https://images.unsplash.com/photo-1505765050516-f72dcac9c60b",
    description:
      "Lisbon offers a thriving community, fast internet, and warm climate – perfect for remote workers.",
    author: "David M.",
  },
  {
    id: 3,
    name: "Chiang Mai, Thailand",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
    description:
      "A peaceful city with low living costs, strong nomad culture, and amazing food.",
    author: "Emily R.",
  },
];

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-14">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to the NomadAtlas Community
        </motion.h1>
        <motion.p
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Connect with fellow remote workers, discover destinations, and share
          your experiences as a digital nomad.
        </motion.p>
      </section>

      {/* Community Feed */}
      <section className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={post.image}
              alt={post.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">
                {post.name}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{post.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-blue-500">By {post.author}</span>
                <Link
                  to={`/community/${post.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Want to share your own journey?
        </motion.h2>
        <motion.div
          className="mt-6"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Link
            to="/share"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            Share Your Experience
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Community;
