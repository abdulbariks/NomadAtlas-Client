import React from "react";

const Newsletter = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10 bg-gray-50">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
                Newsletter Subscription
            </h2>
            <div className="flex items-center w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
                />
                <button className="bg-blue-500 text-white px-6 py-3 font-semibold hover:bg-blue-600 transition duration-200">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
