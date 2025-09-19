import React from "react";

const Banner = () => {
  return (
    <div className="relative mx-5 md:mx-10 lg:mx-20 h-[400px] flex items-center justify-center mt-5 overflow-hidden rounded-lg group">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1600&q=80"
        alt="City"
        className="absolute inset-0 w-full h-full object-cover rounded-lg transform transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-lg"></div>

      {/* Content */}
      <div className="relative text-center text-white max-w-2xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Discover Your Next Nomad Destination
        </h1>
        <p className="text-md mb-6">
          Find the perfect city to live and work remotely, tailored to your
          preferences and budget.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition">
          Explore Cities
        </button>
      </div>
    </div>
  );
};

export default Banner;
