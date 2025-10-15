import { useState } from "react";
import { Search, ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { motion } from "framer-motion";
import YoutubeVideos from "../YoutubeVideos";


const categories = [
  "All",
  "Destinations",
  "Tips & Tricks",
  "Community",
  "Travel Guides",
];

const AllBlogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [page, setPage] = useState(1);
  const blogsPerPage = 6;

  const { data: blogs = {}, isLoading } = useQuery({
    queryKey: ["blogs", selectedCategory, search, page],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/blogs", {
        params: {
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          search,
          page,
          limit: blogsPerPage,
        },
      });
      return res.data;
    },
  });

  const blogList = blogs?.data || [];

  if (isLoading) return <div className="py-20 text-center"><Spinner /></div>;

  const featured = blogList[0];

  return (
    <div className=" mx-5 md:mx-8 lg:mx-10  my-10 ">

      {/* ================= Hero Banner ================ */}
      {featured && (
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-14">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          <div className="absolute bottom-10 left-10 text-white max-w-xl">
            <span className="bg-white/20 text-sm px-3 py-1 rounded-full backdrop-blur-sm">
              {featured.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">{featured.title}</h2>
            <p className="text-gray-200 mt-2 line-clamp-2">{featured.content}</p>
            <div className="flex items-center mt-4 gap-3 text-sm text-gray-300">
              <img
                src={featured.authorImage || "https://i.pravatar.cc/40?img=12"}
                alt={featured.author}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">{featured.authorName}</p>
                <p>
                  {new Date(featured.createdAt).toISOString().split("T")[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= Header & Controls ================ */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Nomad Stories</h1>
          <p className="text-gray-600 text-sm">
            Discover stories, travel tips, and experiences from explorers around the world.
          </p>
        </div>

        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full md:w-72">
          <Search className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search by title, author or category..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearch(tempSearch);
                setPage(1);
              }
            }}
            className="bg-transparent outline-none flex-1 text-gray-700"
          />
        </div>
      </div>

      {/* ================= Category Tabs ================ */}
    <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
  {/* === Category Tabs === */}
  <div className="flex overflow-x-auto no-scrollbar items-center bg-blue-600 p-1 rounded-full">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => {
          setSelectedCategory(cat);
          setPage(1);
        }}
        className={`px-4 py-1.5 text-sm rounded-full transition whitespace-nowrap
          ${
            selectedCategory === cat
              ? "bg-white text-blue-600 font-medium"
              : "text-white hover:bg-blue-500"
          }`}
      >
        {cat}
      </button>
    ))}
  </div>

  {/* === Create Blog Button === */}
  <div>
    <Link
      to="/createBlog"
      className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
    >
      <FaPlus /> Create a Blog
    </Link>
  </div>
</div>



     {/* ================= Blog Grid ================ */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {blogList.length > 0 ? (
    blogList.map((blog, index) => (
      <motion.div
        key={blog._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col"
      >
        {/* Image + Category */}
        <div className="relative">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition">
              {blog.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {blog.content}
            </p>
          </div>

          {/* Author Row with Arrow */}
          <div className="flex items-center justify-between mt-auto pt-2">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <img
                src={blog.authorImage || "https://i.pravatar.cc/40?img=12"}
                alt={blog.authorName}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-xs text-gray-600">
                <p className="font-medium">{blog.authorName}</p>
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Arrow Button */}
            <Link
              to={`/blogs/${blog._id}`}
              className="text-blue-600 hover:text-blue-700"
            >
              <motion.div
                whileHover={{ x: [0, 6, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <ArrowRight className="h-6 w-6" />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    ))
  ) : (
    <p className="text-center py-10 col-span-full">No blogs found.</p>
  )}
</div>



      {/* ================= Pagination ================ */}
      {blogs?.totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-10">
          {Array.from({ length: blogs.totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded-full ${
                num === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}

     

      <YoutubeVideos selectedCategory={selectedCategory}></YoutubeVideos>
    </div>
  );
};

export default AllBlogs;
