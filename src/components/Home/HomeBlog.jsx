import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";

const HomeBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch latest 3 blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/blogs", {
        params: { page: 1, limit: 3 },
      });

      // Ensure blogs is always an array
      setBlogs(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            Latest <span className="text-[#11c3c0]">Blogs</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Stay updated with inspiring stories, insights, and community news.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-[#11c3c0]" size={32} />
          </div>
        ) : blogs.length > 0 ? (
          // Blog Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id || index}
                className="bg-white rounded-2xl  overflow-hidden hover:shadow-md transition"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <img
                  src={blog.image || "/placeholder.jpg"}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-sm text-[#11c3c0] font-semibold mb-2">
                    {blog.category || "General"}
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {blog.title?.slice(0, 60) || "Untitled Blog"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {blog.content?.slice(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.authorImage || "/default-avatar.png"}
                        alt={blog.authorName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{blog.authorName || "Unknown Author"}</span>
                    </div>
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-[#11c3c0] font-semibold hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Empty state
          <p className="text-center text-gray-500 py-10">
            No blogs found. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
};

export default HomeBlogs;
