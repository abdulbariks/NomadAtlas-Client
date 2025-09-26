import React from 'react';
import { useParams, Link } from "react-router";
import { blogs } from "../BlogDetails/blogs.json";
import { useState } from "react";
import { Heart, MessageCircle, Bookmark } from "lucide-react";

const BlogDetailsPage = () => {

    const { id } = useParams();
  const blog = blogs.find((b) => b._id === id);
  const [likes, setLikes] = useState(234);
  const [comments] = useState([
    {
      id: 1,
      name: "Ethan Carter",
      time: "2 weeks ago",
      text: "Great article! I’m planning a trip to Chiang Mai next month and this was super helpful.",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 2,
      name: "Sophia Bennett",
      time: "1 month ago",
      text: "I lived in Chiang Mai for a year and everything in this guide is spot on. Highly recommend!",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
      id: 3,
      name: "Liam Wilson",
      time: "3 months ago",
      text: "The cost breakdown is very useful, thanks for sharing!",
      avatar: "https://i.pravatar.cc/40?img=7",
    },
  ]);

  const related = blogs.filter((b) => b._id !== id).slice(0, 3);

  if (!blog) return <div className="p-6 text-center">Blog not found.</div>;

    return (
     <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Title & meta */}
      <div className="mb-6">
        <h3 className='mb-7 '><span className='text-blue-300'>Stories / </span>     {blog.title}</h3>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {blog.title}
        </h1>
        <p className="text-blue-300 text-sm">
          By {blog.author} • Published on {blog.date}
        </p>
      </div>

      {/* Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[350px] md:h-[450px] object-cover rounded-xl mb-8"
      />

      {/* Content */}
     <div className="prose max-w-none mb-10 whitespace-pre-line break-words">
  {blog.content}
</div>

      {/* Action Icons */}
      <div className="flex items-center gap-8 mb-10 text-gray-600">
        <button
          onClick={() => setLikes(likes + 1)}
          className="flex items-center gap-1 hover:text-red-500"
        >
          <Heart size={22} /> {likes}
        </button>
        <div className="flex items-center gap-1">
          <MessageCircle size={22} /> {comments.length}
        </div>
        <button className="flex items-center gap-1 hover:text-blue-500">
          <Bookmark size={22} /> Save
        </button>
      </div>

      {/* Comments */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <div className="space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-4">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-sm text-gray-500">{c.time}</span>
                </div>
                <p className="text-gray-700">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Stories */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Related Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((r) => (
            <Link
              to={`/blog/${r._id}`}
              key={r._id}
              className="group block border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg group-hover:text-blue-600">
                  {r.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{r.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    );
};

export default BlogDetailsPage;