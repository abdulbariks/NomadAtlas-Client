import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Heart, MessageCircle, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Spinner from "../../Spinner/Spinner";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../../customHook/useAxiosSecure";
import toast from "react-hot-toast";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogComment, setBlogComment] = useState({ comments: [] }); // ✅ initialize empty
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch Blog + Related
  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/blogs/${id}`);
      setBlog(res.data);

      // Restore like state
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
      setLiked(likedBlogs.includes(id));

      const relatedRes = await axiosSecure.get(`/blogs?limit=3`);
      const filtered = relatedRes.data.data.filter((b) => b._id !== id);
      setRelated(filtered);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  // ✅ Handle Like Toggle
  const handleLike = async () => {
    try {
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
      const updatedLikes = liked
        ? (blog.likes || 1) - 1
        : (blog.likes || 0) + 1;

      setBlog({ ...blog, likes: updatedLikes });

      if (liked) {
        await axiosSecure.post(`/blogs/${id}/unlike`);
        localStorage.setItem(
          "likedBlogs",
          JSON.stringify(likedBlogs.filter((b) => b !== id))
        );
      } else {
        await axiosSecure.post(`/blogs/${id}/like`);
        localStorage.setItem(
          "likedBlogs",
          JSON.stringify([...likedBlogs, id])
        );
      }

      setLiked(!liked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  // ✅ Fetch Comments
  const fetchComment = async () => {
    try {
      const res = await axiosSecure.get(`/comments/${id}`);
      const updatedComments = res.data.data || [];
      setBlogComment({ comments: updatedComments }); // always an object with comments array
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [id]);

  // ✅ Handle Comment Submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setSubmitting(true);

      const newComment = {
        userName: user?.displayName || "Anonymous User",
        userImage:
          user?.photoURL ||
          `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
        text: commentText.trim(),
      };

      // Store comment in database
      const postRes = await axiosSecure.post(`/comments/${id}`, newComment);

      if (postRes.data.success) {
        toast.success("Comment added successfully!");
        setCommentText("");
        fetchComment(); // ✅ Refresh comments immediately
      } else {
        toast.error("Failed to add comment. Please try again.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Server error while adding comment.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Loading state
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto pb-20"
    >
      {/* ============== Hero Section ============== */}
      <div className="relative w-full h-[280px] md:h-[380px]">
        <motion.img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="absolute left-1/2 bottom-[-80px] transform -translate-x-1/2 w-[90%] md:w-3/4"
        >
          <div className="bg-white/90 backdrop-blur-md px-6 md:px-10 py-8 rounded-2xl border border-gray-100 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-sm mb-3 flex-wrap">
              <Link to="/blogs" className="text-[#11c3c0] hover:underline">
                ← Back to Blog
              </Link>
              <span className="bg-[#11c3c0] text-white px-3 py-1 rounded-full text-xs font-medium">
                {blog.category}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6 text-gray-600">
              <div className="flex items-center gap-2">
                <img
                  src={blog.authorImage || "https://i.pravatar.cc/40"}
                  alt={blog.authorName}
                  className="w-9 h-9 rounded-full border"
                />
                <span className="font-medium">{blog.authorName}</span>
              </div>

              <div className="flex flex-wrap gap-8">
                <span className="flex gap-2 items-center">
                  <Calendar size={20} />{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span className="flex gap-2 items-center">
                  <Clock size={20} /> 8 min read
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============== Blog Content ============== */}
      <div className="prose prose-lg max-w-4xl mx-auto mt-28 bg-white/90 leading-relaxed px-7 py-10 rounded-xl border border-gray-100">
        <p className="whitespace-pre-line">{blog.content}</p>
      </div>

      {/* ============== Like & Comments Count ============== */}
      <div className="flex flex-wrap items-center gap-8 mt-10 text-gray-700 border-t pt-6 px-5 max-w-4xl mx-auto">
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 0.9 }}
          animate={liked ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`flex items-center gap-2 font-medium ${liked ? "text-red-600" : "hover:text-red-500"
            }`}
        >
          <Heart
            size={24}
            fill={liked ? "red" : "none"}
            className={liked ? "text-red-500" : ""}
          />
          {blog.likes || 0}
        </motion.button>

        <div className="flex items-center gap-2 text-blue-500">
          <MessageCircle size={22} className="text-blue-600" />
          {blogComment.comments.length || 0}
        </div>
      </div>

      {/* ============== Comment Section ============== */}
      <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">
          Comments
        </h2>

        {/* Comments List */}
        <div className="space-y-5 mb-8">
          {blogComment.comments.length ? (
            blogComment.comments.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-5 rounded-2xl border border-gray-100 flex gap-4 items-start hover:shadow-md transition-all"
              >
                <img
                  src={c.userImage || "https://i.pravatar.cc/40?img=5"}
                  alt={c.userName}
                  className="w-12 h-12 rounded-full border"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-gray-900">{c.userName}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{c.text}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 italic">No comments yet. Be the first!</p>
          )}
        </div>

        {/* Comment Form */}
        <motion.form
          onSubmit={handleCommentSubmit}
          whileHover={{ scale: 1.01 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 p-6 mb-10 transition-all"
        >
          <div className="flex items-start gap-4">
            <img
              src={
                user?.photoURL ||
                `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 50)}`
              }
              alt="User"
              className="w-10 h-10 rounded-full border border-blue-400"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-gray-50 text-gray-800"
                rows="3"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={submitting}
                className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-70"
              >
                {submitting ? "Posting..." : "Post Comment"}
              </motion.button>
            </div>
          </div>
        </motion.form>
      </div>

      {/* ============== Related Stories ============== */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">More Stories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {related.map((r, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link
                to={`/blogs/${r._id}`}
                className="block border border-transparent hover:border-cyan-200 rounded-2xl overflow-hidden bg-white transition-all"
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
