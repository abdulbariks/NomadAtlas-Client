import React from "react";

const Newsletter = () => {  
  return (
    <div className="relative z-5  mb-10 mt-10 flex flex-col items-center justify-center px-6">
      <div className="bg-white  border-1 border-[#8eeeec] rounded-2xl px-8 py-10 max-w-4xl w-full text-center -mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          Subscribe to Our Newsletter 
        </h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Get travel insights, remote work tips, and NomadAtlas updates every week.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Your Email"
            className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4fdfb]"
          />
          <button className="bg-[#11c3c0] hover:bg-[#0a9391] text-white font-semibold px-6 py-3 rounded-lg transition duration-200 w-full md:w-auto">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
