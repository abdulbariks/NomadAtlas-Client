import React from "react";
import Marquee from "react-fast-marquee";

const Reviews = () => {
  const reviews = [
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      location: "Currently in Bangkok",
      tag: "15 countries visited",
      color: "#3ea1f1",
      image: "https://i.pravatar.cc/100?img=12",
      text: `"This platform completely changed my life. I've been working remotely for 2 years now and have visited 15 countries. The community support is incredible!"`,
    },
    {
      name: "Maria Rodriguez",
      role: "UX Designer",
      location: "Currently in Porto",
      tag: "40% savings",
      color: "#11c3c0",
      image: "https://i.pravatar.cc/100?img=32",
      text: `"Found my dream lifestyle thanks to the resources here. The cost calculator helped me plan everything perfectly, and I've saved 40% compared to living in NYC."`,
    },
    {
      name: "James Park",
      role: "Marketing Manager",
      location: "Currently in Tokyo",
      tag: "Found co-founder",
      color: "#3ea1f1",
      image: "https://i.pravatar.cc/100?img=20",
      text: `"The community connections I made here led to incredible opportunities. Met my co-founder at a nomad meetup and now we're building our startup together!"`,
    },
    {
      name: "Sophie Laurent",
      role: "Product Designer",
      location: "Currently in Paris",
      tag: "Remote freedom",
      color: "#11c3c0",
      image: "https://i.pravatar.cc/100?img=47",
      text: `"I finally have the freedom to work from anywhere. The mentorship resources and job boards here made my transition to remote work seamless!"`,
    },
    {
      name: "Daniel Kim",
      role: "Data Scientist",
      location: "Currently in Seoul",
      tag: "Dream achieved",
      color: "#3ea1f1",
      image: "https://i.pravatar.cc/100?img=67",
      text: `"I always dreamed of combining travel and work — now it’s real. Thanks to this community, I found projects that align with my passion!"`,
    },
  ];

  return (
    <div className="mt-15 px-5 md:px-8 lg:px-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <button className="px-4 py-1 rounded-full text-white text-sm font-semibold bg-[#11c3c0] mb-4 shadow-md">
          ★ Success Stories
        </button>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
          Join thousands of professionals who've transformed their work-life balance
        </h2>
      </div>

      {/* Infinite Marquee Review Cards */}
      <Marquee gradient={false} speed={40} pauseOnHover={true} className="py-4">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="w-80 min-h-[340px] bg-white  rounded-2xl p-8 border border-gray-100 hover:border-[#85f5f3] hover:scale-105 transition-shadow mx-4 flex flex-col justify-between"
          >
            <div>
              <div className="text-[#3ea1f1] text-4xl mb-3">❝</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {review.text}
              </p>
              <span
                className="inline-block text-white text-xs font-semibold rounded-full px-3 py-1 mb-6"
                style={{ backgroundColor: review.color }}
              >
                {review.tag}
              </span>
            </div>

            {/* Reviewer Info */}
            <div className="flex items-center pt-3 border-t border-gray-100 mt-auto">
              <img
                src={review.image}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#11c3c0] mr-3"
              />
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  {review.name}
                </h4>
                <p className="text-xs text-gray-500">{review.role}</p>
                <p className="text-xs text-[#11c3c0]">{review.location}</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Reviews;
