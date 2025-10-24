import React, { useState, useMemo } from "react";
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
  Filter,
  SortAsc,
  Bookmark,
} from "lucide-react";

const posts = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
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
    name: "Chiang Mai, Thailand",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=1200&auto=format&fit=crop",
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
  {
    id: 3,
    name: "Porto, Portugal",
    image: "https://images.unsplash.com/photo-1569959220744-ff553533f492?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2064",
    description:
      "Smaller than Lisbon but charming — Porto has good cafes, coworking spots, and lower rents.",
    author: "Ana S.",
    avatar: "https://i.pravatar.cc/150?img=6",
    likes: 142,
    comments: 18,
    category: "Hidden Gem",
    trending: false,
    nomadCount: 430,
  },
  {
    id: 4,
    name: "Bangkok, Thailand",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop",
    description:
      "Big city convenience, excellent food, and many coworking options — good internet in many areas.",
    author: "Nok K.",
    avatar: "https://i.pravatar.cc/150?img=7",
    likes: 198,
    comments: 35,
    category: "City Spotlight",
    trending: true,
    nomadCount: 1490,
  },
  {
    id: 5,
    name: "Prague, Czechia",
    image: "https://images.unsplash.com/photo-1729318227224-59340006ce6a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1311",
    description:
      "A picturesque city with reliable internet and a friendly nomad community — good value in Europe.",
    author: "Petr V.",
    avatar: "https://i.pravatar.cc/150?img=8",
    likes: 123,
    comments: 14,
    category: "Destination Guide",
    trending: false,
    nomadCount: 390,
  },
  {
    id: 6,
    name: "Buenos Aires, Argentina",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    description:
      "Great culture, nightlife and affordable living — internet can vary by neighborhood but many good spots exist.",
    author: "Lucia R.",
    avatar: "https://i.pravatar.cc/150?img=9",
    likes: 157,
    comments: 21,
    category: "City Spotlight",
    trending: false,
    nomadCount: 540,
  },
  {
    id: 7,
    name: "Mexico City, Mexico",
    image: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    description:
      "Vast city with creative communities, good cafes, and plenty to explore — strong digital nomad scene.",
    author: "Sofia L.",
    avatar: "https://i.pravatar.cc/150?img=11",
    likes: 165,
    comments: 24,
    category: "City Spotlight",
    trending: true,
    nomadCount: 760,
  },
  {
    id: 8,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1177",
    description:
      "Ultra-modern, extremely reliable internet, and endless culture — higher costs but excellent quality of life.",
    author: "Hiro T.",
    avatar: "https://i.pravatar.cc/150?img=13",
    likes: 190,
    comments: 29,
    category: "Destination Guide",
    trending: false,
    nomadCount: 910,
  },
];

const stats = [
  { icon: Users, label: "Active Nomads", value: "12387", color: "from-blue-500 to-cyan-500" },
  { icon: MapPin, label: "Destinations", value: "180+", color: "from-purple-500 to-pink-500" },
  { icon: MessageCircle, label: "Discussions", value: "7542", color: "from-orange-500 to-red-500" },
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
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [sortBy, setSortBy] = useState("trending");

  const filters = ["All", "Trending", "Destination Guide", "City Spotlight", "Hidden Gem"];

  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) newSet.delete(postId);
      else newSet.add(postId);
      return newSet;
    });
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) newSet.delete(postId);
      else newSet.add(postId);
      return newSet;
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredPosts = useMemo(() => {
    let filtered = posts.filter((post) => {
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Trending" && post.trending) ||
        post.category === activeFilter;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.name.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      
      return matchesFilter && matchesSearch;
    });

  
    if (sortBy === "likes") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "nomads") {
      filtered.sort((a, b) => b.nomadCount - a.nomadCount);
    } else if (sortBy === "trending") {
      filtered.sort((a, b) => {
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return b.likes - a.likes;
      });
    }

    return filtered;
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 mt-14 relative">
      
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div
          className="absolute left-8 top-20 w-72 h-72 rounded-full bg-blue-300 mix-blend-multiply blur-3xl opacity-30"
          animate={{ x: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-6 top-36 w-72 h-72 rounded-full bg-purple-300 mix-blend-multiply blur-3xl opacity-28"
          animate={{ x: [0, -40, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity }}
        />
      </div>

      <section className="relative text-center py-20 px-4 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/6 to-purple-600/6 backdrop-blur-2xl -z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }} 
          className="relative z-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-yellow-400 w-6 h-6" />
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Your Global Tribe</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600 mb-4">
            NomadAtlas Community
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
            Join thousands of digital nomads sharing experiences, building connections, and exploring the world together.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations, stories, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 mt-2"
              >
                Found {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.45 }} 
          className="relative z-10 max-w-6xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 px-4"
        >
          {stats.map((stat) => (
            <motion.div 
              whileHover={{ y: -6 }} 
              key={stat.label} 
              className="bg-white/90 rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  activeFilter === filter 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <SortAsc className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="trending">Trending First</option>
              <option value="likes">Most Liked</option>
              <option value="nomads">Most Nomads</option>
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>
      </section>

   
      <section className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
       
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Community Stories
            </h2>
            {bookmarkedPosts.size > 0 && (
              <span className="text-sm text-gray-600">
                {bookmarkedPosts.size} saved
              </span>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100"
            >
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No stories found</p>
              <p className="text-gray-400 text-sm mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: index * 0.05, duration: 0.35 }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100"
                  >
                    <div className="relative overflow-hidden h-56">
                      <motion.img 
                        src={post.image} 
                        alt={post.name} 
                        className="w-full h-full object-cover" 
                        whileHover={{ scale: 1.08 }} 
                        transition={{ duration: 0.6 }} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-gray-800">
                          {post.category}
                        </span>
                        {post.trending && (
                          <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition cursor-pointer"
                      >
                        <Bookmark 
                          className={`w-4 h-4 ${
                            bookmarkedPosts.has(post.id) 
                              ? "fill-blue-600 text-blue-600" 
                              : "text-gray-700"
                          }`} 
                        />
                      </button>
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {post.nomadCount} nomads
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {post.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <img 
                            src={post.avatar} 
                            alt={post.author} 
                            className="w-8 h-8 rounded-full ring-2 ring-blue-100" 
                          />
                          <span className="text-sm font-medium text-gray-700">{post.author}</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => toggleLike(post.id)} 
                            className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition cursor-pointer"
                          >
                            <Heart 
                              className={`w-4 h-4 ${
                                likedPosts.has(post.id) ? "fill-red-500 text-red-500" : ""
                              }`} 
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
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

       
        <aside className="space-y-6 mt-14">
          <motion.div 
            className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100" 
            initial={{ opacity: 0, x: 30 }} 
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
                  className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl hover:shadow-md transition cursor-pointer" 
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
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100" 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" /> 
              Top Contributors
            </h3>
            <div className="space-y-3">
              {["Sarah K.", "David M.", "Emily R.", "Marc L."].map((name, index) => (
                <div 
                  key={name} 
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer"
                >
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
        </aside>
      </section>

    
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-cyan-500" />
        
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
            <button className="px-8 py-4 bg-white text-cyan-500 rounded-full font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all cursor-pointer">
              Share Your Experience
            </button>
            <button className="px-8 py-4 bg-cyan-500 text-white rounded-full font-bold border-2 border-white hover:bg-cyan-600 transition-all cursor-pointer">
              Browse Resources
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Community;