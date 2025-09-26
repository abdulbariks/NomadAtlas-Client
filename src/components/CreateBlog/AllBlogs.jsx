import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const categories = ["All", "Destinations", "Tips & Tricks", "Community", "Travel Guides"];


const AllBlogs = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [tempSearch, setTempSearch] = useState(""); // used for input typing
    const [page, setPage] = useState(1);
    const blogsPerPage = 5;

    // below part for backend part. don't dare to delete.

    //  Fetch blogs from backend with filters
    const { data: blogs = [], isLoading } = useQuery({
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

    console.log("blog data getting in frontend", blogs.data)

    if (isLoading) {
        return <p className="text-center py-10"><Spinner></Spinner></p>;
    }

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
                        value={tempSearch}
                        onChange={(e) => setTempSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setSearch(tempSearch); // update search state only when pressing Enter
                                setPage(1);
                            }
                        }}
                        className="bg-transparent outline-none flex-1"
                    />

                </div>

                {/* Blog Items */}
                {/* this part is for json data from backend */}
                <div className="space-y-6">
                    {blogs?.data?.length > 0 ? (
                        blogs.data?.map((blog) => (
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
                </div>

                {/* Pagination */}
                {/* this pagination part is for json data from backend */}
                <div className="flex justify-center space-x-2 mt-8">
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
                </div>

            </main>
        </div>
    );
};

export default AllBlogs;
