import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { Link } from "react-router";

const ComminityPosts = () => {
  const data = [
    {
      id: 1,
      author: "Reza",
      avatar: "https://i.pravatar.cc/64?img=1",
      title: "Working from Bali 🌴",
      content:
        "Bali has been amazing for remote work. Great coworking spaces and friendly community.",
      tags: ["Bali", "Asia", "BeachLife"],
      likes: 120,
      comments: 30,
      timestamp: "2025-09-01T10:00:00Z",
      image: "https://etimg.etb2bimg.com/photo/115997634.cms",
      location: "Bali, Indonesia",
    },
    {
      id: 2,
      author: "Aisha",
      avatar: "https://i.pravatar.cc/64?img=2",
      title: "Lisbon is a Digital Nomad Hub",
      content:
        "Affordable, safe, and vibrant. Lisbon has become my favorite remote work destination.",
      tags: ["Lisbon", "Europe", "Nomad"],
      likes: 98,
      comments: 22,
      timestamp: "2025-09-02T14:20:00Z",
      image:
        "https://en.kampaoh.com/wp-content/uploads/2024/06/SPAIN-2024-06-20T134315.647.jpg",
      location: "Lisbon, Portugal",
    },
    {
      id: 3,
      author: "Imran",
      avatar: "https://i.pravatar.cc/64?img=3",
      title: "Remote Work in Dhaka",
      content:
        "Internet speed is improving. Cafes and coworking spaces are popping up everywhere.",
      tags: ["Dhaka", "Bangladesh", "Work"],
      likes: 75,
      comments: 18,
      timestamp: "2025-09-03T09:00:00Z",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/e2/2f/fa/caption.jpg?w=600&h=400&s=1",
      location: "Dhaka, Bangladesh",
    },
    {
      id: 4,
      author: "Fatima",
      avatar: "https://i.pravatar.cc/64?img=4",
      title: "Thailand’s Chiang Mai",
      content:
        "Affordable living, great food, and tons of digital nomads make it perfect for remote workers.",
      tags: ["Thailand", "NomadLife"],
      likes: 110,
      comments: 25,
      timestamp: "2025-09-04T16:40:00Z",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/03/1c/60/caption.jpg?w=600&h=-1&s=1",
      location: "Chiang Mai, Thailand",
    },
    {
      id: 5,
      author: "Rafi",
      avatar: "https://i.pravatar.cc/64?img=5",
      title: "Remote Working from Istanbul",
      content:
        "East meets West here. Vibrant culture and surprisingly good internet.",
      tags: ["Istanbul", "Europe-Asia"],
      likes: 82,
      comments: 15,
      timestamp: "2025-09-05T11:15:00Z",
      image:
        "https://rodinistanbul.com/wp-content/uploads/2023/04/day-trips-from-istanbul-copy-1024x576.jpg",
      location: "Istanbul, Turkey",
    },
    {
      id: 6,
      author: "Nabila",
      avatar: "https://i.pravatar.cc/64?img=6",
      title: "Berlin Coworking Scene",
      content:
        "Berlin offers modern coworking spaces and a creative tech scene.",
      tags: ["Berlin", "Germany", "Tech"],
      likes: 65,
      comments: 10,
      timestamp: "2025-09-06T13:45:00Z",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtT5DSgEEG4zvsjaUcJhWomlM8W_IkxP7Ed08rXNw6B-JOb3XVBtP1oPKzbuUIvh61Ss&usqp=CAU",
      location: "Berlin, Germany",
    },
  ];

  return (
    <div className="my-10">
      <h1 className="text-2xl text-blue-900 font-bold text-center mb-6">
        Community posts_
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-[10%] mx-auto">
        {data.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border broder-primary"
          >
            {post.image && (
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-4">
              {/* post's owner with date */}
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-sm font-medium">{post.author}</h2>
                  <p className="text-xs text-gray-500">
                    {new Date(post.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* post's title */}
              <h3 className="mt-3 text-lg font-semibold hover:underline cursor-pointer">
                {post.title}
              </h3>

              {/* post's content */}
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                {post.content.length > 100 ? (
                  <>
                    {post.content.slice(0, 100)}...{" "}
                    <Link className="text-blue-600 underline ml-1">
                      See more
                    </Link>
                  </>
                ) : (
                  post.content
                )}
              </p>

              {/* post's tags */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* post's like & comment */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-red-500">
                    <AiOutlineLike className="h-4 w-4 text-gray-600" />
                    <span>{post.likes}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <GoCommentDiscussion className="h-4 w-4 text-gray-600" />

                    <span>{post.comments}</span>
                  </div>
                </div>

                {/* post's location */}
                <div className="text-right">
                  <p className="text-xs">{post.location}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* See more posts button */}
      <div className="flex justify-center mt-4">
        <Link
          to="/posts"
          className="group bg-blue-500 py-2 px-5 rounded text-white cursor-pointer 
               hover:bg-blue-700 transition-all flex items-center justify-center gap-2 hover:scale-105"
        >
          <span>See more posts</span>
          <BsArrowRight className="transform transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </div>
    </div>
  );
};

export default ComminityPosts;
