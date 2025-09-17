import React from "react";

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
      image: "https://source.unsplash.com/featured/?bali,beach",
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
      image: "https://source.unsplash.com/featured/?lisbon,portugal",
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
      image: "https://source.unsplash.com/featured/?dhaka,city",
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
      image: "https://source.unsplash.com/featured/?chiangmai,thailand",
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
      image: "https://source.unsplash.com/featured/?istanbul,turkey",
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
      image: "https://source.unsplash.com/featured/?berlin,germany",
      location: "Berlin, Germany",
    },
  ];

  return (
    <div>
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
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-4">
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

              <h3 className="mt-3 text-lg font-semibold hover:underline">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                {post.content}
              </p>

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

              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    <span>{post.likes}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.05 0-2.05-.134-2.99-.38L3 20l1.38-3.01C3.64 15.05 3.5 14.05 3.5 13c0-4.97 3.582-9 8-9s8 4.03 8 9z"
                      />
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs">{post.location}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ComminityPosts;
