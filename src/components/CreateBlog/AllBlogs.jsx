import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
const categories = ["All", "Destinations", "Tips & Tricks", "Community", "Travel Guides"];

// 12 fake blog data
const fakeBlogs = [
    {
        _id: "1",
        category: "Destinations",
        title: "Exploring Bali: A Nomad's Paradise",
        author: "Alice",
        date: "2025-09-20",
        image: "https://source.unsplash.com/400x300/?bali",
    },
    {
        _id: "2",
        category: "Tips & Tricks",
        title: "How to Travel Cheap as a Remote Worker",
        author: "Bob",
        date: "2025-08-15",
        image: "https://source.unsplash.com/400x300/?travel",
    },
    {
        _id: "3",
        category: "Community",
        title: "Joining Nomad Groups Around the World",
        author: "Charlie",
        date: "2025-07-10",
        image: "https://source.unsplash.com/400x300/?community",
    },
    {
        _id: "4",
        category: "Travel Guides",
        title: "Top 10 Cities for Digital Nomads in 2025",
        author: "Diana",
        date: "2025-06-30",
        image: "https://source.unsplash.com/400x300/?city",
    },
    {
        _id: "5",
        category: "Destinations",
        title: "Remote Work in Chiang Mai: Tips & Insights",
        author: "Ethan",
        date: "2025-05-22",
        image: "https://source.unsplash.com/400x300/?chiangmai",
    },
    {
        _id: "6",
        category: "Tips & Tricks",
        title: "Managing Time Zones as a Global Worker",
        author: "Fiona",
        date: "2025-04-18",
        image: "https://source.unsplash.com/400x300/?clock",
    },
    {
        _id: "7",
        category: "Community",
        title: "Building Friendships While Traveling",
        author: "George",
        date: "2025-03-12",
        image: "https://source.unsplash.com/400x300/?friends",
    },
    {
        _id: "8",
        category: "Travel Guides",
        title: "Visa Tips for Remote Workers",
        author: "Hannah",
        date: "2025-02-05",
        image: "https://source.unsplash.com/400x300/?visa",
    },
    {
        _id: "9",
        category: "Destinations",
        title: "Digital Nomad Hotspots in Europe",
        author: "Ian",
        date: "2025-01-20",
        image: "https://source.unsplash.com/400x300/?europe",
    },
    {
        _id: "10",
        category: "Tips & Tricks",
        title: "How to Stay Productive on the Road",
        author: "Julia",
        date: "2024-12-15",
        image: "https://source.unsplash.com/400x300/?laptop",
    },
    {
        _id: "11",
        category: "Community",
        title: "Finding Co-Working Spaces Abroad",
        author: "Kevin",
        date: "2024-11-10",
        image: "https://source.unsplash.com/400x300/?coworking",
    },
    {
        _id: "12",
        category: "Travel Guides",
        title: "Essential Apps for Remote Workers",
        author: "Laura",
        date: "2024-10-05",
        image: "https://source.unsplash.com/400x300/?apps",
    },
];

const AllBlogs = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const blogsPerPage = 5;

    // Filter blogs based on category and search
    const filteredBlogs = fakeBlogs.filter(
        (b) =>
            (selectedCategory === "All" || b.category === selectedCategory) &&
            b.title.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    const startIndex = (page - 1) * blogsPerPage;
    const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
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
                                        setPage(1); // reset page
                                    }}
                                    className="accent-blue-600"
                                />
                                <span>{cat}</span>
                            </label>
                        </li>
                    ))}
                </ul>
                <h2 className="text-lg font-semibold mt-4">
                    <Link to='/createBlog'><span className="flex items-center gap-2"><FaPlus />Create a blog</span></Link>
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
                        placeholder="Search stories"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="bg-transparent outline-none flex-1"
                    />
                </div>

                {/* Blog Items */}
                <div className="space-y-6">
                    {currentBlogs.length > 0 ? (
                        currentBlogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4"
                            >
                                <div>
                                    <span className="text-blue-600 font-medium">{blog.category}</span>
                                    <h2 className="text-xl font-semibold mt-1">{blog.title}</h2>
                                    <p className="text-gray-500 text-sm mt-1">
                                        By {blog.author} · {new Date(blog.date).toLocaleDateString()}
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
                <div className="flex justify-center space-x-2 mt-8">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num)}
                            className={`px-3 py-1 rounded ${num === page ? "bg-blue-600 text-white" : "bg-gray-200"
                                }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AllBlogs;
