import React, { useState } from "react";

const cities = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "https://etimg.etb2bimg.com/photo/115997634.cms",
  },
  {
    id: 2,
    name: "Lisbon",
    country: "Portugal",
    image:
      "https://en.kampaoh.com/wp-content/uploads/2024/06/SPAIN-2024-06-20T134315.647.jpg",
  },
  {
    id: 3,
    name: "Chiang Mai",
    country: "Thailand",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/03/1c/60/caption.jpg?w=600&h=-1&s=1",
  },
  {
    id: 4,
    name: "Barcelona",
    country: "Spain",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtT5DSgEEG4zvsjaUcJhWomlM8W_IkxP7Ed08rXNw6B-JOb3XVBtP1oPKzbuUIvh61Ss&usqp=CAU",
  },
  {
    id: 5,
    name: "Tbilisi",
    country: "Georgia",
    image:
      "https://rodinistanbul.com/wp-content/uploads/2023/04/day-trips-from-istanbul-copy-1024x576.jpg",
  },
];

const CityDiscovery = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="max-w-7xl mx-auto">
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Discover Cities for Remote Work
        </h2>

        {/* Filter / City Buttons */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full border transition-all ${
                selectedCity?.id === city.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-blue-100"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CityDiscovery;
