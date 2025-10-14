import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
import YoutubeVideos from "../components/YoutubeVideos";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

const categories = [
  "All",
  "Destinations",
  "Tips & Tricks",
  "Community",
  "Travel Guides",
];

// Temporary Fake Data (remove later when backend is ready)
const blogs = [
  {
    _id: "1",
    category: "Destinations",
    title: "Exploring Bali: A Nomad's Paradise",
    author: "Alice",
    date: "2025-09-20",
    image: "https://source.unsplash.com/400x300/?bali",
    tags: ["Bali", "Travel", "Nomad", "Beach"],
    content:
      "Bali offers an ideal location for remote workers with beautiful beaches, coworking spaces, and vibrant culture...",
  },
  {
    _id: "2",
    category: "Tips & Tricks",
    title: "How to Travel Cheap as a Remote Worker",
    author: "Bob",
    date: "2025-08-15",
    image: "https://source.unsplash.com/400x300/?travel",
    tags: ["Budget", "Travel Hacks", "Remote Work"],
    content:
      "Traveling on a budget as a digital nomad is possible with smart planning, flexible schedules, and choosing cost-effective destinations...",
  },
  {
    _id: "3",
    category: "Community",
    title: "Joining Nomad Groups Around the World",
    author: "Charlie",
    date: "2025-07-10",
    image: "https://source.unsplash.com/400x300/?community",
    tags: ["Networking", "Community", "Nomads"],
    content:
      "Connecting with other nomads can provide support, friendship, and valuable information about living and working abroad...",
  },
  {
    _id: "4",
    category: "Travel Guides",
    title: "Top 10 Cities for Digital Nomads in 2025",
    author: "Diana",
    date: "2025-06-30",
    image: "https://source.unsplash.com/400x300/?city",
    tags: ["Cities", "Nomad Guide", "Remote Work"],
    content:
      "These top cities offer fast internet, affordable living, and coworking spaces to help digital nomads thrive in 2025...",
  },
  {
    _id: "5",
    category: "Destinations",
    title: "Remote Work in Chiang Mai: Tips & Insights",
    author: "Ethan",
    date: "2025-05-22",
    image: "https://source.unsplash.com/400x300/?chiangmai",
    tags: ["Chiang Mai", "Thailand", "Nomads"],
    content:
      "Chiang Mai is popular among digital nomads for its low cost of living, vibrant expat community, and scenic surroundings...",
  },
  {
    _id: "6",
    category: "Tips & Tricks",
    title: "Managing Time Zones as a Global Worker",
    author: "Fiona",
    date: "2025-04-18",
    image: "https://source.unsplash.com/400x300/?clock",
    tags: ["Time Management", "Productivity", "Remote Work"],
    content:
      "Working across different time zones requires planning meetings, tracking deadlines, and maintaining flexibility in your schedule...",
  },
  {
    _id: "7",
    category: "Community",
    title: "Building Friendships While Traveling",
    author: "George",
    date: "2025-03-12",
    image: "https://source.unsplash.com/400x300/?friends",
    tags: ["Friendship", "Travel Community", "Nomads"],
    content:
      "Making friends while constantly moving can be challenging, but attending meetups and coworking spaces helps build connections...",
  },
  {
    _id: "8",
    category: "Travel Guides",
    title: "Visa Tips for Remote Workers",
    author: "Hannah",
    date: "2025-02-05",
    image: "https://source.unsplash.com/400x300/?visa",
    tags: ["Visa", "Travel", "Remote Work"],
    content:
      "Understanding visa rules is crucial for remote workers to avoid legal issues and ensure smooth stays abroad...",
  },
  {
    _id: "9",
    category: "Destinations",
    title: "Digital Nomad Hotspots in Europe",
    author: "Ian",
    date: "2025-01-20",
    image: "https://source.unsplash.com/400x300/?europe",
    tags: ["Europe", "Nomads", "Destinations"],
    content:
      "Europe offers multiple nomad hotspots with rich culture, excellent infrastructure, and strong expat communities...",
  },
  {
    _id: "10",
    category: "Tips & Tricks",
    title: "How to Stay Productive on the Road",
    author: "Julia",
    date: "2024-12-15",
    image: "https://source.unsplash.com/400x300/?laptop",
    tags: ["Productivity", "Remote Work", "Tips"],
    content:
      "Maintaining productivity while traveling requires proper routines, tools, and creating a dedicated workspace wherever you go...",
  },
  {
    _id: "11",
    category: "Community",
    title: "Finding Co-Working Spaces Abroad",
    author: "Kevin",
    date: "2024-11-10",
    image: "https://source.unsplash.com/400x300/?coworking",
    tags: ["Coworking", "Remote Work", "Networking"],
    content:
      "Coworking spaces are essential for remote workers to collaborate, network, and stay motivated while abroad...",
  },
  {
    _id: "12",
    category: "Travel Guides",
    title: "Essential Apps for Remote Workers",
    author: "Laura",
    date: "2024-10-05",
    image: "https://source.unsplash.com/400x300/?apps",
    tags: ["Apps", "Remote Work", "Productivity"],
    content:
      "These apps help digital nomads manage tasks, communicate with teams, and stay organized on the move...",
  },
];

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const blogsPerPage = 5;

  console.log("Tesing selected vidoes in blogs.jsx", selectedCategory);

  // below part for backend part. don't dare to delete.

  //  Fetch blogs from backend with filters
  // const { data: blogs = [], isLoading } = useQuery({
  //     queryKey: ["blogs", selectedCategory, search, page],
  //     queryFn: async () => {
  //         const res = await axios.get("http://localhost:5000/blogs", {
  //             params: {
  //                 category: selectedCategory !== "All" ? selectedCategory : undefined,
  //                 search,
  //                 page,
  //                 limit: blogsPerPage,
  //             },
  //         });
  //         return res.data;
  //     },
  // });

  // if (isLoading) {
  //     return <p className="text-center py-10">Loading blogs...</p>;
  // }

  //for check the funtionality is working when backend intregrate remove below code before return part

  //Filter blogs based on category + title + author. Case-insensitive search
  const filteredBlogs = blogs.filter((b) => {
    const searchTerm = search.toLowerCase(); // normalize search term
    return (
      (selectedCategory === "All" || b.category === selectedCategory) &&
      (b.title.toLowerCase().includes(searchTerm) || //  case-insensitive match
        b.author.toLowerCase().includes(searchTerm)) //  case-insensitive match
    );
  });

  //  Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (page - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage
  );
  console.log("blog data", blogs);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid  mgrid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar */}
      <aside className="md:col-span-1">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => {
                    setSelectedCategory(cat);
                    setPage(1);
                  }}
                  className="accent-blue-600"
                />
                <span>{cat}</span>
              </label>
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-semibold mt-4">
          <Link to="/createBlog">
            <span className="flex items-center gap-2">
              <FaPlus /> Create a blog
            </span>
          </Link>
        </h2>
      </aside>

      {/* Blog List */}
      <main className="md:col-span-3">
        <h1 className="text-3xl font-bold mb-6">Nomad Stories</h1>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-6">
          <Search className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search by title, category or author"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="bg-transparent outline-none flex-1"
          />
        </div>

        {/* Blog Items */}
        {/* this part is for json data from backend */}
        {/* <div className="space-y-6">
                    {blogs?.data?.length > 0 ? (
                        blogs.data.map((blog) => (
                            <div
                                key={blog._id}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4"
                            >
                                <div>
                                    <span className="text-blue-600 font-medium">{blog.category}</span>
                                    <Link to={`/blogs/${blog._id}`}>
                                        <h2 className="text-xl font-semibold mt-1 hover:text-blue-600 transition">
                                            {blog.title}
                                        </h2>
                                    </Link>
                                    <p className="text-gray-500 text-sm mt-1">
                                        By {blog.author} · {new Date(blog.createdAt).toISOString().split("T")[0]}
                                    </p>
                                </div>
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full sm:w-40 h-28 object-cover rounded-md mt-3 sm:mt-0 sm:ml-4"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center py-10">No blogs found.</p>
                    )}
                </div> */}

        {/* this is for test case with fake data */}
        <div className="space-y-6">
          {currentBlogs?.length > 0 ? (
            currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4"
              >
                <div>
                  <span className="text-blue-600 font-medium">
                    {blog.category}
                  </span>
                  <Link to={`/blogs/${blog._id}`}>
                    <h2 className="text-xl font-semibold mt-1 hover:text-blue-600 transition">
                      {blog.title}
                    </h2>
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">
                    By {blog.author} · {blog.date}
                  </p>
                </div>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full sm:w-40 h-28 object-cover rounded-md mt-3 sm:mt-0 sm:ml-4"
                />
              </div>
            ))
          ) : (
            <p className="text-center py-10">No blogs found.</p>
          )}
        </div>

        {/* Pagination */}
        {/* this pagination part is for json data from backend */}
        {/* <div className="flex justify-center space-x-2 mt-8">
                    {Array.from({ length: blogs?.totalPages || 1 }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num)}
                            className={`px-3 py-1 rounded ${num === page ? "bg-blue-600 text-white" : "bg-gray-200"
                                }`}
                        >
                            {num}
                        </button>
                    ))}
                </div> */}

        {/* this part is for fake data */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded ${
                num === page ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        <YoutubeVideos selectedCategory={selectedCategory} />
      </main>
    </div>
  );
};

export default Blogs;
