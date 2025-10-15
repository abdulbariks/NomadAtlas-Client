import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch Blog + Related
  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(res.data);

      // ✅ Check localStorage for previous like
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
      setLiked(likedBlogs.includes(id));

      const relatedRes = await axios.get(`http://localhost:5000/api/blogs?limit=3`);
      setRelated(relatedRes.data.data.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  // ✅ Handle Like
  const handleLike = async () => {
    try {
      if (liked) return; // Prevent multiple likes
      setLiked(true);

      await axios.post(`http://localhost:5000/api/blogs/${id}/like`);
      setBlog({ ...blog, likes: (blog.likes || 0) + 1 });

      // ✅ Save to localStorage
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
      likedBlogs.push(id);
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  // ✅ Handle Comment Submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setSubmitting(true);

      const newComment = {
        userName: "Anonymous User",
        userImage: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
        text: commentText,
        createdAt: new Date().toISOString(),
      };

      await axios.post(`http://localhost:5000/api/blogs/${id}/comment`, newComment);

      // ✅ Show newest comment at the top
      setBlog({
        ...blog,
        comments: [newComment, ...(blog.comments || [])],
      });

      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center">
        <Spinner />
      </div>
    );

  if (!blog)
    return <div className="p-10 text-center text-gray-600">Blog not found.</div>;

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breadcrumb + Title */}
      <div className="mb-6">
        <Link to="/blogs" className="text-blue-500 hover:underline text-sm">
          ← Back to Blogs
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 text-gray-900">
          {blog.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <img
            src={blog.authorImage || "https://i.pravatar.cc/40"}
            alt={blog.authorName}
            className="w-8 h-8 rounded-full border"
          />
          <span>By {blog.authorName}</span>
          <span>• {new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Main Image */}
      <motion.img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[420px] md:h-[500px] object-cover rounded-2xl mb-10 shadow-lg"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7 }}
      />

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none mb-10 leading-relaxed text-gray-800 bg-gray-50 p-6 rounded-2xl shadow-sm border">
        <p className="whitespace-pre-line">{blog.content}</p>
      </div>

      {/* Like & Comment Buttons */}
      <div className="flex items-center gap-8 mb-10 text-gray-600 border-b pb-5">
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2 ${
            liked ? "text-red-500" : "hover:text-red-400"
          }`}
        >
          <Heart size={22} /> {blog.likes || 0}
        </motion.button>

        <div className="flex items-center gap-2">
          <MessageCircle size={22} /> {blog.comments?.length || 0}
        </div>

        <button className="flex items-center gap-2 hover:text-blue-500">
          <Bookmark size={22} /> Save
        </button>
      </div>

      {/* Comments Section */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-6">Comments</h2>

        {/* Comment Form */}
        <form
          onSubmit={handleCommentSubmit}
          className="mb-8 bg-white rounded-xl shadow-md p-5 border"
        >
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none bg-gray-50"
            rows="3"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={submitting}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </motion.button>
        </form>

        {/* Display Comments */}
        <div className="space-y-6">
          {(blog.comments || []).map((c, i) => (
            <motion.div
              key={i}
              className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <img
                src={c.userImage || "https://i.pravatar.cc/40?img=5"}
                alt={c.userName}
                className="w-12 h-12 rounded-full border"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{c.userName}</span>
                  <span className="text-sm text-gray-500">
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleString()
                      : "Just now"}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{c.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Related Stories */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Related Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((r) => (
            <motion.div
              key={r._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link
                to={`/blog/${r._id}`}
                className="block border rounded-2xl overflow-hidden shadow hover:shadow-xl bg-white transition-all duration-300"
              >
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg hover:text-blue-600 line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{r.category}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetailsPage;
