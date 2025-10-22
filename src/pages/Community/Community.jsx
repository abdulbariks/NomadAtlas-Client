import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { MapPin, Users, Calendar, TrendingUp, MessageCircle, Award, Globe, Heart, Sparkles, Search } from "lucide-react";

const posts = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Bali is a hub for digital nomads with affordable living, co-working spaces, and a vibrant culture.",
    author: "Sarah K.",
    avatar: "https://i.pravatar.cc/150?img=1",
    likes: 234,
    comments: 45,
    category: "Destination Guide",
    trending: true,
    nomadCount: 1200
  },
  {
    id: 2,
    name: "Lisbon, Portugal",
    image: "https://i.ibb.co.com/V0Ycp6rT/Lisbon.jpg",
    description: "Lisbon offers a thriving community, fast internet, and warm climate – perfect for remote workers.",
    author: "David M.",
    avatar: "https://i.pravatar.cc/150?img=2",
    likes: 189,
    comments: 32,
    category: "City Spotlight",
    trending: false,
    nomadCount: 850
  },
  {
    id: 3,
    name: "Chiang Mai, Thailand",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
    description: "A peaceful city with low living costs, strong nomad culture, and amazing food.",
    author: "Emily R.",
    avatar: "https://i.pravatar.cc/150?img=3",
    likes: 312,
    comments: 67,
    category: "Hidden Gem",
    trending: true,
    nomadCount: 950
  },
];

const stats = [
  { icon: Users, label: "Active Nomads", value: "12.5K", color: "from-blue-500 to-cyan-500" },
  { icon: MapPin, label: "Destinations", value: "180+", color: "from-purple-500 to-pink-500" },
  { icon: MessageCircle, label: "Discussions", value: "8.9K", color: "from-orange-500 to-red-500" },
  { icon: Globe, label: "Countries", value: "95", color: "from-green-500 to-emerald-500" },
];

const upcomingMeetups = [
  { city: "Barcelona", date: "Oct 28", attendees: 24, type: "Coworking Day" },
  { city: "Mexico City", date: "Nov 2", attendees: 18, type: "Networking Event" },
  { city: "Tokyo", date: "Nov 5", attendees: 31, type: "Cultural Meetup" },
];

const Community = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());

  const filters = ["All", "Trending", "Destination Guide", "City Spotlight", "Hidden Gem"];

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesFilter = activeFilter === "All" || 
                         (activeFilter === "Trending" && post.trending) || 
                         post.category === activeFilter;
    const matchesSearch = post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 mt-14">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Hero Section with Glass Morphism */}
      <section className="relative text-center py-20 px-4 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-yellow-500 w-6 h-6" />
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Your Global Tribe Awaits
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            NomadAtlas Community
          </h1>
          
          <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
            Join thousands of digital nomads sharing experiences, building connections, 
            and exploring the world together
          </p>

          {/* Search Bar */}
          <motion.div
            className="mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations, stories, or nomads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Community Feed - 2 columns */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
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
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100"
                  whileHover={{ y: -8 }}
                >
                  {/* Image with Overlay */}
                  <div className="relative overflow-hidden h-56">
                    <motion.img
                      src={post.image}
                      alt={post.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                        {post.category}
                      </span>
                      {post.trending && (
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                    </div>

                    {/* Nomad Count */}
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-xs font-semibold text-white flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {post.nomadCount} nomads
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {post.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-8 h-8 rounded-full ring-2 ring-blue-100"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {post.author}
                        </span>
                      </div>

                      {/* Interaction Buttons */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition"
                        >
                          <Heart
                            className={`w-4 h-4 ${likedPosts.has(post.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                          <span className="text-sm font-medium">
                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                          </span>
                        </button>
                        
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </button>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <Link
                      to={`/community/${post.id}`}
                      className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition group"
                    >
                      Read full story
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Upcoming Meetups */}
          <motion.div
            className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Upcoming Meetups
            </h3>
            
            <div className="space-y-4">
              {upcomingMeetups.map((meetup, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl hover:shadow-md transition"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{meetup.city}</h4>
                    <span className="text-xs font-semibold px-2 py-1 bg-white rounded-full text-gray-700">
                      {meetup.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{meetup.type}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{meetup.attendees} attending</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
              View All Meetups
            </button>
          </motion.div>

          {/* Top Contributors */}
          <motion.div
            className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Top Contributors
            </h3>
            
            <div className="space-y-3">
              {["Sarah K.", "David M.", "Emily R."].map((name, index) => (
                <div key={name} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition">
                  <div className="relative">
                    <img
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                      alt={name}
                      className="w-10 h-10 rounded-full ring-2 ring-blue-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-sm">{name}</div>
                    <div className="text-xs text-gray-500">{120 - index * 20} posts</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        
        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Share Your Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Inspire thousands of nomads with your stories, tips, and discoveries
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/share"
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
            >
              Share Your Experience
            </Link>
            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold border-2 border-white hover:bg-white/30 transition-all">
              Browse Resources
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Community;