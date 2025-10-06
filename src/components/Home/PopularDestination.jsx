import React, { useEffect, useState } from "react";

const destinationsData = [
  {
    id: 1,
    image: "https://i.postimg.cc/8zZxwg7j/elena-soroka-AOIRbye-iwk-unsplash.jpg",
    title: "Urban Hubs",
    description:
      "Experience the vibrant energy of bustling cities with coworking spaces, cultural events, and thriving communities.",
    rating: 7.8,
    price: 960,
    discountPrice: 780,
    tag: "Last Minute",
  },
  {
    id: 2,
    image: "https://i.postimg.cc/ZnvgR4G9/dan-gold-qgv-FR8-Vk-Pss-unsplash.jpg",
    title: "Tropical Escapes",
    description:
      "Relax on pristine beaches, enjoy water sports, and embrace a laid-back lifestyle surrounded by palm trees and sunshine.",
    rating: 8.2,
    price: 1100,
    discountPrice: 935,
    tag: "Save 15%",
  },
  {
    id: 3,
    image:
      "https://i.postimg.cc/hPWHfqhx/igor-sporynin-QIGnn-LEUfu-U-unsplash.jpg",
    title: "Cultural Gems",
    description:
      "Immerse yourself in rich history, explore ancient sites, and connect with local traditions and heritage.",
    rating: 7.5,
    price: 720,
    discountPrice: 650,
    tag: "Special Offer",
  },
  {
    id: 4,
    image: "https://i.postimg.cc/Wprm8dwD/youssef-Zfeb-Bvs-PA-unsplash.jpg",
    title: "Nature Retreats",
    description:
      "Escape to the mountains, forests, or lakes for fresh air, scenic views, and a peaceful environment for deep work.",
    rating: 8.0,
    price: 850,
    discountPrice: 720,
    tag: "Last Minute",
  },
];

const PopularDestination = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    setDestinations(destinationsData);
  }, []);

  return (
    <section className="px-5 md:px-10 lg:px-20 pt-10">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Popular Destinations
        </h2>
        <p className="text-sm w-10/12 mx-auto mb-8 text-gray-700">
          Discover some of the world’s most loved cities for digital nomads. From
          sunny beaches to vibrant urban hubs, explore destinations that offer
          affordable living, reliable internet, and a welcoming community to
          support your remote lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((item) => (
          <div
            key={item.id}
            className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />

            {/* Tag */}
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {item.tag}
            </span>

            {/* ---- Desktop Hover Details ---- */}
            <div className="hidden sm:flex absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex-col justify-end p-4 text-white">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-xs mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">⭐ {item.rating} Superb</span>
                <div className="text-right">
                  <p className="text-green-400 line-through text-xs">
                    ${item.price}
                  </p>
                  <p className="text-lg font-bold text-red-400">
                    ${item.discountPrice}
                  </p>
                </div>
              </div>
            </div>

            {/* ---- Mobile Always Visible Details ---- */}
            <div className="block sm:hidden p-4 text-gray-800 bg-white">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-xs mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">⭐ {item.rating} Superb</span>
                <div className="text-right">
                  <p className="text-gray-500 line-through text-xs">
                    ${item.price}
                  </p>
                  <p className="text-lg font-bold text-red-500">
                    ${item.discountPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestination;
