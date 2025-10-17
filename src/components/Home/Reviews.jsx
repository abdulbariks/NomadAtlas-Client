import React from "react";

const Reviews = () => {
  const reviews = [
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      location: "Currently in Bangkok",
      tag: "15 countries visited",
      color: "#3ea1f1",
      text: `"This platform completely changed my life. I've been working remotely for 2 years now and have visited 15 countries. The community support is incredible!"`,
    },
    {
      name: "Maria Rodriguez",
      role: "UX Designer",
      location: "Currently in Porto",
      tag: "40% savings",
      color: "#11c3c0",
      text: `"Found my dream lifestyle thanks to the resources here. The cost calculator helped me plan everything perfectly, and I've saved 40% compared to living in NYC."`,
    },
    {
      name: "James Park",
      role: "Marketing Manager",
      location: "Currently in Tokyo",
      tag: "Found co-founder",
      color: "#3ea1f1",
      text: `"The community connections I made here led to incredible opportunities. Met my co-founder at a nomad meetup and now we're building our startup together!"`,
    },
  ];

  return (
    <div className=" mt-15  px-5 md:px-8 lg:px-10">
      <div className="text-center mb-12">
        <button className="px-4 py-1 rounded-full text-white text-sm font-semibold bg-[#11c3c0] mb-4 shadow-md">
          ★ Success Stories
        </button>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
          Join thousands of professionals who've transformed their work-life balance
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="w-full max-w-sm bg-white shadow-sm rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow"
          >
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

            <div className="flex items-center pt-3 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3ea1f1] to-[#11c3c0] flex items-center justify-center text-white font-bold mr-3">
                {review.name.charAt(0)}
              </div>
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
      </div>
    </div>
  );
};

export default Reviews;
