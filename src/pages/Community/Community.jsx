import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
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
} from "lucide-react";
import ChatSection from "../../Socket/ChatSection";
// --- Dummy data (same as before) ---
const posts = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description:
      "Bali is a hub for digital nomads with affordable living, co-working spaces, and a vibrant culture.",
    author: "Sarah K.",
    avatar: "https://i.pravatar.cc/150?img=1",
    likes: 234,
    comments: 45,
    category: "Destination Guide",
    trending: true,
    nomadCount: 1200,
  },
  {
    id: 2,
    name: "Lisbon, Portugal",
    image: "https://i.ibb.co.com/V0Ycp6rT/Lisbon.jpg",
    description:
      "Lisbon offers a thriving community, fast internet, and warm climate – perfect for remote workers.",
    author: "David M.",
    avatar: "https://i.pravatar.cc/150?img=2",
    likes: 189,
    comments: 32,
    category: "City Spotlight",
    trending: false,
    nomadCount: 850,
  },
  {
    id: 3,
    name: "Chiang Mai, Thailand",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
    description:
      "A peaceful city with low living costs, strong nomad culture, and amazing food.",
    author: "Emily R.",
    avatar: "https://i.pravatar.cc/150?img=3",
    likes: 312,
    comments: 67,
    category: "Hidden Gem",
    trending: true,
    nomadCount: 950,
  },
];

const stats = [
  { icon: Users, label: "Active Nomads", value: "12.5K" },
  { icon: MapPin, label: "Destinations", value: "180+" },
  { icon: MessageCircle, label: "Discussions", value: "8.9K" },
  { icon: Globe, label: "Countries", value: "95" },
];
console.log(stats);

const upcomingMeetups = [
  { city: "Barcelona", date: "Oct 28", attendees: 24, type: "Coworking Day" },
  { city: "Mexico City", date: "Nov 2", attendees: 18, type: "Networking Event" },
  { city: "Tokyo", date: "Nov 5", attendees: 31, type: "Cultural Meetup" },
];

// --- Main Component ---
const Community = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());

  const filters = ["All", "Trending", "Destination Guide", "City Spotlight", "Hidden Gem"];

  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) newSet.delete(postId);
      else newSet.add(postId);
      return newSet;
    });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Trending" && post.trending) ||
      post.category === activeFilter;
    const matchesSearch =
      post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cyan-50 mt-14">
      {/* Header Section with Tabs */}
      <section className="text-center py-16 px-4 border-b border-cyan-100 bg-white/60 backdrop-blur-md">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-[#3ea1f1] w-6 h-6" />
          <span className="text-[#11c3c0] font-semibold text-sm uppercase tracking-wider">
            Your Global Tribe Awaits
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-4">
          NomadAtlas Community
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
          Join thousands of digital nomads sharing experiences, building connections,
          and exploring the world together.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "posts"
                ? "bg-[#11c3c0] text-white"
                : "bg-white text-gray-700 hover:bg-cyan-50 border border-cyan-200"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "chat"
                ? "bg-[#3ea1f1] text-white"
                : "bg-white text-gray-700 hover:bg-cyan-50 border border-cyan-200"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === "posts" ? (
          <>
            {/* Search */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search destinations, stories, or nomads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-[#11c3c0] transition"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-[#11c3c0] text-white"
                      : "bg-white text-gray-700 hover:bg-cyan-50 border border-cyan-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>

            {/* Posts & Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Feed */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#3ea1f1]" />
                  Community Stories
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="group bg-white rounded-3xl overflow-hidden transition-all border border-cyan-100"
                        whileHover={{ y: -8 }}
                      >
                        <div className="relative overflow-hidden h-56">
                          <motion.img
                            src={post.image}
                            alt={post.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-800">
                              {post.category}
                            </span>
                            {post.trending && (
                              <span className="px-3 py-1 bg-[#3ea1f1] rounded-full text-xs font-semibold text-white flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> Trending
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#11c3c0]" /> {post.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.description}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-cyan-100">
                            <div className="flex items-center gap-3">
                              <img
                                src={post.avatar}
                                alt={post.author}
                                className="w-8 h-8 rounded-full ring-2 ring-cyan-100"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                {post.author}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => toggleLike(post.id)}
                                className="flex items-center gap-1 text-gray-600 hover:text-[#11c3c0] transition"
                              >
                                <Heart
                                  className={`w-4 h-4 ${
                                    likedPosts.has(post.id)
                                      ? "fill-[#11c3c0] text-[#11c3c0]"
                                      : ""
                                  }`}
                                />
                                <span className="text-sm font-medium">
                                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                                </span>
                              </button>
                            </div>
                          </div>
                          <Link
                            to={`/community/${post.id}`}
                            className="mt-4 inline-flex items-center text-sm font-semibold text-[#11c3c0] hover:text-[#3ea1f1] transition group"
                          >
                            Read full story
                            <span className="ml-1 group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <motion.div
                  className="bg-white rounded-3xl p-6 border border-cyan-100"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#11c3c0]" /> Upcoming Meetups
                  </h3>
                  <div className="space-y-4">
                    {upcomingMeetups.map((m, i) => (
                      <motion.div
                        key={i}
                        className="p-4 rounded-2xl hover:bg-cyan-50 transition"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800">{m.city}</h4>
                          <span className="text-xs font-semibold px-2 py-1 bg-white rounded-full text-gray-700 border border-cyan-100">
                            {m.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{m.type}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4 text-[#3ea1f1]" />
                          <span>{m.attendees} attending</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <ChatSection />
          </div>
        )}
      </section>
    </div>
  );
};

export default Community;
