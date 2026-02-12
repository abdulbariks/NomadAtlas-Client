import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  MessageCircle,
  Award,
  Globe,
  Heart,
  Sparkles,
  Search,
  X,
} from "lucide-react";
import ChatSection from "../../Socket/ChatSection";
import { useSelector } from "react-redux";

function resolveApiBase() {
  const raw = (import.meta.env.VITE_API || "").toString().trim();
  if (!raw) return "/community";
  let url = raw.replace(/\/$/, "");
  if (/\/community(\b|$)/.test(url)) return url;
  if (/\/api(\b|\/)/.test(url)) return `${url}/community`;
  return `${url}/api/community`;
}
const API = resolveApiBase();

const emptyNewPost = {
  name: "",
  image: "",
  description: "",
  category: "Destination Guide",
};

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("posts");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [selectedPost, setSelectedPost] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  const [creating, setCreating] = useState(false);
  const [newPost, setNewPost] = useState({ ...emptyNewPost });

  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const filters = ["All", "Destination Guide", "City Spotlight", "Hidden Gem"];

  const authUser = useSelector((state) => state?.auth?.user);
  const currentUserName = authUser?.displayName || (authUser?.email ? authUser.email.split("@")[0] : null) || "Anonymous";
  const currentUserId = authUser?.uid || authUser?.email || "guest";
  const currentUserPhoto = authUser?.photoURL || null;

  const getInitials = (name) => {
    const n = (name || "").trim();
    if (!n) return "?";
    const parts = n.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "?";
  };

  const renderAvatar = (name, url, className = "", size = 40) => {
    if (url) {
      return <img src={url} alt={name || "user"} className={className} style={{ width: size, height: size }} />;
    }
    const initials = getInitials(name);
    return (
      <div
        className={`${className} flex items-center justify-center bg-cyan-100 text-cyan-700 font-semibold`}
        style={{ width: size, height: size, borderRadius: "9999px" }}
      >
        {initials}
      </div>
    );
  };

  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const fetchPosts = async () => {
    setLoadingPosts(true);
    setError(null);
    try {
      const res = await fetch(`${API}/posts`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setToast(err.message || "Failed to load posts");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const key = `na_likes_${currentUserId}`;
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      if (Array.isArray(saved)) {
        setLikedPosts(new Set(saved));
      }
    } catch { }
  }, [currentUserId]);

  useEffect(() => {
    const key = `na_likes_${currentUserId}`;
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(likedPosts)));
    } catch { }
  }, [likedPosts, currentUserId]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Trending" && post.trending) ||
        post.category === activeFilter;
      const matchesSearch =
        !q ||
        (post.name && post.name.toLowerCase().includes(q)) ||
        (post.description && post.description.toLowerCase().includes(q)) ||
        (post.author && post.author.toLowerCase().includes(q)) ||
        (post.category && post.category.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [posts, activeFilter, searchQuery]);

  const createPost = async (e) => {
    e.preventDefault();
    if (!newPost.name.trim() || !newPost.description.trim() || !newPost.image.trim()) {
      setToast("Please provide title, description and image link");
      return;
    }
    try {
      setCreating(true);
      const payload = {
        name: newPost.name.trim(),
        description: newPost.description.trim(),
        image: newPost.image.trim(),
        category: newPost.category,
        author: currentUserName,
        authorAvatar: currentUserPhoto || undefined,
      };
      const res = await fetch(`${API}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create post");
      }
      const created = await res.json();

      setPosts((p) => [created, ...p]);
      setNewPost({ ...emptyNewPost });
      setToast("Post created");
    } catch (err) {
      setToast(err.message || "Failed to create post");
    } finally {
      setCreating(false);
    }
  };

  const likePost = async (postId) => {
    if (likedPosts.has(postId)) return;

    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.add(postId);
      return next;
    });

    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId ? { ...p, likes: Math.max(0, (p.likes || 0) + 1) } : p
      )
    );

    try {
      const res = await fetch(`${API}/posts/${postId}/like`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Failed to like post");
      }
      const updated = await res.json();

      if (updated && updated._id) {
        setPosts((p) => p.map((x) => (x._id === updated._id ? updated : x)));
        setSelectedPost((prev) => (prev && prev._id === updated._id ? { ...prev, ...updated } : prev));
      } else {
        fetchPosts();
      }
    } catch (err) {
      setToast(err.message || "Like failed");
      setLikedPosts((prev) => {
        const s = new Set(prev);
        s.delete(postId);
        return s;
      });
      setPosts((prev) => prev.map((p) => (p._id === postId ? { ...p, likes: Math.max(0, (p.likes || 0) - 1) } : p)));
    }
  };

  const postComment = async (postId) => {
    const text = commentText.trim();
    if (!text) {
      setToast("Please enter a comment");
      return;
    }
    try {
      const res = await fetch(`${API}/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, author: currentUserName, authorAvatar: currentUserPhoto || undefined }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to post comment");
      }
      const newComment = await res.json();
      setPosts((p) =>
        p.map((post) =>
          post._id === postId
            ? {
              ...post,
              comments: Array.isArray(post.comments) ? [newComment, ...post.comments] : [newComment],
            }
            : post
        )
      );

      setSelectedPost((prev) =>
        prev && prev._id === postId
          ? { ...prev, comments: [newComment, ...(prev.comments || [])] }
          : prev
      );

      setCommentText("");
      setToast("Comment added");
    } catch (err) {
      setToast(err.message || "Failed to add comment");
    }
  };

  const postReply = async (postId, commentId) => {
    const text = replyText.trim();
    if (!text) {
      setToast("Please enter a reply");
      return;
    }
    try {
      const res = await fetch(`${API}/posts/${postId}/comments/${commentId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, author: currentUserName, authorAvatar: currentUserPhoto || undefined }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to post reply");
      }
      const newReply = await res.json();

      setPosts((p) =>
        p.map((post) =>
          post._id === postId
            ? {
              ...post,
              comments: (post.comments || []).map((c) =>
                c._id === commentId ? { ...c, replies: [newReply, ...(c.replies || [])] } : c
              ),
            }
            : post
        )
      );

      setSelectedPost((prev) =>
        prev && prev._id === postId
          ? {
            ...prev,
            comments: (prev.comments || []).map((c) =>
              c._id === commentId ? { ...c, replies: [newReply, ...(c.replies || [])] } : c
            ),
          }
          : prev
      );

      setReplyText("");
      setReplyingTo(null);
      setToast("Reply added");
    } catch (err) {
      setToast(err.message || "Failed to add reply");
    }
  };

  const openFullPost = async (post) => {
    if (post.fullStory || (post.comments && post.comments.length >= 0)) {
      setSelectedPost(post);
      return;
    }
    try {
      const res = await fetch(`${API}/posts/${post._id}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      const data = await res.json();
      setSelectedPost(data);
    } catch (err) {
      setToast(err.message || "Failed to open post");
    }
  };

  const clearSearchAndFilter = () => {
    setSearchQuery("");
    setActiveFilter("All");
  };

  if (loadingPosts) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50 mt-14">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cyan-600 mx-auto" />
          <p className="mt-4 text-cyan-700 font-medium">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyan-50 mt-14">

      {toast && (
        <div className="fixed right-6 top-6 z-50 bg-white/95 border border-cyan-200 px-4 py-2 rounded-lg shadow">
          {toast}
        </div>
      )}

      <section className="text-center py-16 px-4 border-b border-cyan-100 bg-white/60 backdrop-blur-md">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-[#3ea1f1] w-6 h-6" />
          <span className="text-[#11c3c0] font-semibold text-sm uppercase tracking-wider">Your Global Tribe Awaits</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-4">NomadAtlas Community</h1>

        <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
          Join thousands of digital nomads sharing experiences, building connections, and exploring the world together.
        </p>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <button
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === "posts" ? "bg-[#11c3c0] text-white" : "bg-white text-gray-700 hover:bg-cyan-50 border border-cyan-200"}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          {/* <button
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === "chat" ? "bg-[#3ea1f1] text-white" : "bg-white text-gray-700 hover:bg-cyan-50 border border-cyan-200"}`}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button> */}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === "posts" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* MAIN LEFT: span 2 columns on large screens */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* ---- Share Form (moved to top) ---- */}
              <motion.form onSubmit={createPost} className="bg-white rounded-3xl p-6 border border-cyan-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Share a Post</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    value={newPost.name}
                    onChange={(e) => setNewPost((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Title (e.g. Chiang Mai, Thailand)"
                    className="w-full px-4 py-2 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-[#11c3c0] outline-none"
                  />
                  <input
                    value={currentUserName}
                    readOnly
                    placeholder="Your name"
                    className="w-full px-4 py-2 rounded-lg border border-cyan-200 bg-gray-50 text-gray-600"
                  />
                  <input
                    value={newPost.image}
                    onChange={(e) => setNewPost((s) => ({ ...s, image: e.target.value }))}
                    placeholder="Image URL (paste link)"
                    className="w-full col-span-1 md:col-span-2 px-4 py-2 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-[#11c3c0] outline-none"
                  />
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost((s) => ({ ...s, category: e.target.value }))}
                    className="px-4 py-2 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-[#11c3c0] outline-none"
                  >
                    <option>Destination Guide</option>
                    <option>City Spotlight</option>
                    <option>Hidden Gem</option>
                  </select>
                </div>

                <textarea
                  value={newPost.description}
                  onChange={(e) => setNewPost((s) => ({ ...s, description: e.target.value }))}
                  placeholder="Write a short description / story..."
                  className="w-full mt-4 px-4 py-3 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-[#11c3c0] outline-none"
                  rows={4}
                />

                <div className="flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setNewPost({ ...emptyNewPost })}
                    className="px-4 py-2 rounded-full bg-white border border-cyan-100 text-gray-700"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="px-6 py-2 rounded-full bg-[#11c3c0] text-white font-semibold hover:bg-[#0fa9a7] transition"
                  >
                    {creating ? "Posting..." : "Post"}
                  </button>
                </div>
              </motion.form>

              {/* ---- Search & Filters (under the form) ---- */}
              <div className="max-w-2xl mx-auto w-full">
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search destinations, stories, or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-[#11c3c0] transition"
                  />
                </div>

                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {filters.map((filter) => (
                    <motion.button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeFilter === filter ? "bg-[#11c3c0] text-white" : "bg-white text-gray-700 hover:bg-cyan-50 border border-cyan-200"}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {filter}
                    </motion.button>
                  ))}
                  <button onClick={clearSearchAndFilter} className="px-4 py-2 rounded-full bg-white border border-cyan-100 text-sm text-gray-600">Clear</button>
                </div>
              </div>


              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-cyan-100">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">No stories found</p>
                  <p className="text-gray-400 text-sm mb-6">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-96 gap-y-9 ml-16">
                  <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post, index) => (
                      <motion.article
                        key={post._id || post.id || index}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ delay: index * 0.03, duration: 0.3 }}
                        className="group bg-white rounded-3xl overflow-hidden border border-cyan-200 hover:border-cyan-300 transition transform hover:-translate-y-2 w-full"
                        style={{ minWidth: '360px', maxWidth: '360px' }}
                      >
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden">
                          <motion.img
                            src={post.image}
                            alt={post.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.5 }}
                          />
                          <div className="absolute inset-0 bg-black/25" />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-800">{post.category}</span>
                            {post.trending && (
                              <span className="px-3 py-1 bg-[#3ea1f1] rounded-full text-xs font-semibold text-white flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> Trending
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#11c3c0]" /> {post.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>

                          <div className="flex items-center justify-between pt-4 border-t border-cyan-100">
                            <div className="flex items-center gap-3">
                              {renderAvatar(
                                post.author || "Anonymous",
                                post.authorAvatar || (post.author === currentUserName ? currentUserPhoto : null),
                                "w-8 h-8 rounded-full ring-2 ring-cyan-100",
                                32
                              )}
                              <span className="text-sm font-medium text-gray-700">{post.author || "Anonymous"}</span>
                            </div>

                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => likePost(post._id)}
                                disabled={likedPosts.has(post._id)}
                                className={`flex items-center gap-1 transition ${likedPosts.has(post._id) ? "text-cyan-400 cursor-not-allowed" : "text-gray-600 hover:text-[#11c3c0]"}`}
                              >
                                <Heart className={`w-4 h-4 ${likedPosts.has(post._id) ? "fill-[#11c3c0] text-[#11c3c0]" : ""}`} />
                                <span className="text-sm font-medium">{post.likes || 0}</span>
                              </button>

                              <button onClick={() => openFullPost(post)} className="flex items-center gap-1 text-gray-600 hover:text-[#3ea1f1] transition">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">{(post.comments && post.comments.length) || 0}</span>
                              </button>
                            </div>
                          </div>

                          <button onClick={() => openFullPost(post)} className="mt-4 inline-flex items-center text-sm font-semibold text-[#11c3c0] hover:text-[#3ea1f1] transition group">
                            Read full story
                            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                          </button>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>

              )}
            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-6">
              <StatsAndMeetupsPanel apiBase={API} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            {/* <div className="w-full max-w-3xl">
              <ChatSection />
            </div> */}
          </div>
        )}
      </section>

      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChatModal(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#11c3c0] to-[#3ea1f1] shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md h-[600px]"
            >
              <ChatSection onClose={() => setShowChatModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPost && (
          <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-white/20">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-gradient-to-b from-white/95 to-cyan-50/95 backdrop-blur-lg border border-cyan-200 rounded-3xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden">
              <div className="bg-gradient-to-r from-[#11c3c0] to-[#3ea1f1] px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-semibold text-white">{selectedPost.name}</h2>
                <button onClick={() => setSelectedPost(null)} className="text-white hover:text-cyan-100 transition"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[75vh]">
                <img src={selectedPost.image} alt={selectedPost.name} className="w-full rounded-xl mb-5 object-cover" />

                <div className="prose prose-cyan max-w-none mb-6 leading-relaxed text-gray-700">
                  {selectedPost.fullStory ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedPost.fullStory }} />
                  ) : (
                    <p className="text-gray-700">{selectedPost.description}</p>
                  )}
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Comments</h4>

                  <div className="flex gap-2">
                    <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 px-4 py-2 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-[#11c3c0] outline-none" />
                    <button onClick={() => postComment(selectedPost._id)} className="px-4 py-2 rounded-full bg-[#11c3c0] text-white">Comment</button>
                  </div>

                  <div className="mt-4 space-y-4">
                    {(selectedPost.comments || []).length === 0 && <p className="text-sm text-gray-500">No comments yet — be first to comment.</p>}
                    {(selectedPost.comments || []).map((c) => (
                      <div key={c._id} className="bg-white p-3 rounded-lg border border-cyan-100">
                        <div className="flex items-start gap-3">
                          {renderAvatar(c.author || "Anonymous", c.authorAvatar || (c.author === currentUserName ? currentUserPhoto : null), "w-9 h-9 rounded-full", 36)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-800 text-sm">{c.author || "Anonymous"}</div>
                                <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
                              </div>
                              <div className="text-sm text-gray-500"></div>
                            </div>
                            <p className="mt-2 text-gray-700 text-sm">{c.text}</p>

                            <div className="mt-3 ml-0 pl-0 space-y-2">
                              {(c.replies || []).map((r) => (
                                <div key={r._id} className="bg-cyan-50 p-2 rounded-md border border-cyan-100 text-sm">
                                  <div className="flex items-center gap-2 mb-1">
                                    {renderAvatar(r.author || "Anonymous", r.authorAvatar || (r.author === currentUserName ? currentUserPhoto : null), "w-6 h-6 rounded-full", 24)}
                                    <div className="font-medium text-gray-800">{r.author || "Anonymous"} <span className="text-xs text-gray-500 ml-2">{new Date(r.createdAt).toLocaleString()}</span></div>
                                  </div>
                                  <div className="text-gray-700">{r.text}</div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                              {replyingTo === c._id ? (
                                <>
                                  <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write reply..." className="flex-1 px-3 py-2 rounded-lg border border-cyan-200 focus:ring-2 focus:ring-[#11c3c0] outline-none text-sm" />
                                  <button onClick={() => postReply(selectedPost._id, c._id)} className="px-3 py-1 rounded-full bg-[#11c3c0] text-white text-sm">Reply</button>
                                  <button onClick={() => { setReplyingTo(null); setReplyText(""); }} className="px-2 py-1 text-sm text-gray-500">Cancel</button>
                                </>
                              ) : (
                                <button onClick={() => setReplyingTo(c._id)} className="text-sm text-[#11c3c0]">Reply</button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 border-t pt-4 border-cyan-100">
                  <div className="flex items-center gap-3">
                    {renderAvatar(selectedPost.author || "Anonymous", selectedPost.authorAvatar || (selectedPost.author === currentUserName ? currentUserPhoto : null), "w-10 h-10 rounded-full ring-2 ring-cyan-200", 40)}
                    <div>
                      <p className="font-medium text-gray-800">{selectedPost.author || "Anonymous"}</p>
                      <p className="text-xs text-gray-500">Shared on NomadAtlas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => likePost(selectedPost._id)}
                      disabled={likedPosts.has(selectedPost._id)}
                      className={`flex items-center gap-2 font-semibold ${likedPosts.has(selectedPost._id) ? "text-cyan-400 cursor-not-allowed" : "text-[#11c3c0] hover:text-[#3ea1f1]"}`}
                    >
                      <Heart className={`w-5 h-5 ${likedPosts.has(selectedPost._id) ? "fill-[#11c3c0]" : ""}`} />
                      {selectedPost.likes || 0}
                    </button>
                    <button onClick={() => setSelectedPost(null)} className="px-4 py-2 rounded-full bg-[#11c3c0] text-white">Close</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;

function StatsAndMeetupsPanel({ apiBase }) {
  const [tiles, setTiles] = React.useState(null);
  const [meetups, setMeetups] = React.useState(null);
  const [loadingTiles, setLoadingTiles] = React.useState(true);
  const [loadingMeetups, setLoadingMeetups] = React.useState(true);
  const [errTiles, setErrTiles] = React.useState(null);
  const [errMeetups, setErrMeetups] = React.useState(null);

  const ICON_MAP = {
    Users,
    MapPin,
    MessageCircle,
    Globe,
    Calendar,
    TrendingUp,
  };

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingTiles(true);
      setErrTiles(null);
      try {
        const res = await fetch(`${apiBase}/stats`);
        if (!res.ok) throw new Error("Stats endpoint returned error");
        const data = await res.json();

        if (Array.isArray(data)) {
          if (mounted) setTiles(data);
        } else if (data && typeof data === "object") {
          const raw = Array.isArray(data) ? data[0] || {} : data || {};
          const statsData = raw.stats || raw;

          const mapped = [
            { iconKey: "Users", label: "Active Nomads", value: statsData.activeNomads || statsData.active_nomads || statsData.active || "-" },
            { iconKey: "MapPin", label: "Destinations", value: "122" },
            { iconKey: "MessageCircle", label: "Discussions", value: statsData.discussions || statsData.discussions_count || "-" },
            { iconKey: "Globe", label: "Countries", value: statsData.countries || statsData.countries_count || "-" },
          ];

          if (mounted) setTiles(mapped);
        } else {
          throw new Error("Unexpected stats format");
        }
      } catch (e) {
        if (mounted) {
          setErrTiles(e?.message || "Failed to load stats");
          setTiles(null);
        }
      } finally {
        if (mounted) setLoadingTiles(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingMeetups(true);
      setErrMeetups(null);
      try {
        const res = await fetch(`${apiBase}/meetups`);
        if (!res.ok) throw new Error("Meetups endpoint returned error");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected meetups format");
        if (mounted) setMeetups(data);
      } catch (e) {
        if (mounted) {
          setErrMeetups(e?.message || "Failed to load meetups");
          setMeetups(null);
        }
      } finally {
        if (mounted) setLoadingMeetups(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  return (
    <>
      <motion.div className="bg-white rounded-3xl p-6 border border-cyan-100" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-[#3ea1f1]" /> Community Stats</h3>

        {loadingTiles ? (
          <div className="text-sm text-gray-500">Loading stats…</div>
        ) : errTiles ? (
          <div className="text-sm text-red-500">Stats not available ({errTiles})</div>
        ) : tiles && tiles.length ? (
          <div className="grid grid-cols-2 gap-4">
            {tiles.map((t, i) => {
              const IconComp = ICON_MAP[t.iconKey] || ICON_MAP[t.icon] || Users;
              return (
                <div key={`${t.label}-${i}`} className="p-4 rounded-xl border border-cyan-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <IconComp className="w-6 h-6 text-[#11c3c0]" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{t.value ?? "-"}</p>
                  <p className="text-xs text-gray-500">{t.label}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-gray-500">No stats returned from backend.</div>
        )}
      </motion.div>

      <motion.div className="bg-white rounded-3xl p-6 border border-cyan-100" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Upcoming Meetups</h3>

        {loadingMeetups ? (
          <div className="text-sm text-gray-500">Loading meetups…</div>
        ) : errMeetups ? (
          <div className="text-sm text-red-500">Meetups not available ({errMeetups})</div>
        ) : meetups && meetups.length ? (
          <ul className="space-y-3 text-sm text-gray-700">
            {meetups.map((m, idx) => (
              <li key={`${m.city}-${idx}`} className="flex items-center justify-between p-3 rounded-lg border border-cyan-50 bg-cyan-50/40">
                <div>
                  <div className="font-medium">{m.city}</div>
                  <div className="text-xs text-gray-500">{m.type} • {m.attendees} attendees</div>
                </div>
                <div className="text-xs font-semibold text-gray-700">{m.date}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-500">No upcoming meetups returned from backend.</div>
        )}
      </motion.div>
    </>
  );
}