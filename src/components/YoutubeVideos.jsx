// src/components/YoutubeVideos.jsx
import { useEffect, useState } from "react";

// এই component টি category অনুযায়ী YouTube ভিডিও দেখাবে
export default function YoutubeVideos({ selectedCategory }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔑 তোমার API key (secure রাখো, পরে .env ফাইলে রাখবে)
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  // category অনুযায়ী ভিডিও fetch করা হবে
  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        // যদি "All" হয়, তাহলে সাধারণ topic দেখাবে
        const searchQuery =
          selectedCategory === "All"
            ? "digital nomad lifestyle"
            : `digital nomad ${selectedCategory}`;

        // YouTube API এর search endpoint ব্যবহার করছি
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            searchQuery
          )}&maxResults=9&type=video&key=${API_KEY}`
        );

        const data = await res.json();
        setVideos(data.items || []);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [selectedCategory]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading YouTube videos...
      </p>
    );
  }

  if (!videos.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No YouTube videos found for "{selectedCategory}"
      </p>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4  flex items-center gap-2">
        Related YouTube Videos for{" "}
        <span className="text-blue-400">{selectedCategory}</span>
      </h2>
      {/* <div className="grid md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <a
            key={video.id.videoId}
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold group-hover:text-blue-600 transition line-clamp-2">
                {video.snippet.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {video.snippet.channelTitle}
              </p>
            </div>
          </a>
        ))}
      </div> */}

      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="group bg-white  rounded-xl overflow-hidden shadow-md hover:shadow-md transition"
          >
            <iframe
              className="w-full h-48"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h3 className="text-lg font-semibold group-hover:text-blue-600 transition line-clamp-2">
                {video.snippet.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {video.snippet.channelTitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* for more button */}
      <div className="text-center mt-8">
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
            selectedCategory === "All"
              ? "digital nomad lifestyle"
              : `digital nomad ${selectedCategory}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          See more on YouTube →
        </a>
      </div>
    </section>
  );
}
