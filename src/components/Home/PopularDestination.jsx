import React, { useEffect, useState } from "react";

const destinationsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
    title: "Urban Hubs",
    description:
      "Experience the vibrant energy of bustling cities with coworking spaces, cultural events, and thriving communities.",
  },
  {
    id: 2,
    image: "https://i.postimg.cc/ZnvgR4G9/dan-gold-qgv-FR8-Vk-Pss-unsplash.jpg",
    title: "Tropical Escapes",
    description:
      "Relax on pristine beaches, enjoy water sports, and embrace a laid-back lifestyle surrounded by palm trees and sunshine.",
  },
  {
    id: 3,
    image:
      "https://i.postimg.cc/hPWHfqhx/igor-sporynin-QIGnn-LEUfu-U-unsplash.jpg",
    title: "Cultural Gems",
    description:
      "Immerse yourself in rich history, explore ancient sites, and connect with local traditions and heritage.",
  },
  {
    id: 4,
    image: "https://i.postimg.cc/Wprm8dwD/youssef-Zfeb-Bvs-PA-unsplash.jpg",
    title: "Nature Retreats",
    description:
      "Escape to the mountains, forests, or lakes for fresh air, scenic views, and a peaceful environment for deep work.",
  },
];

const PopularDestination = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    setDestinations(destinationsData);
  }, []);
  return (
    <section className="px-5 md:px-10 lg:px-20 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        Popular Destinations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestination;
