import React, { useState } from "react";

const cities = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "https://etimg.etb2bimg.com/photo/115997634.cms",
    description:
      "Bali is a tropical paradise famous for its beaches, rice terraces, and vibrant culture – perfect for digital nomads.",
  },
  {
    id: 2,
    name: "Lisbon",
    country: "Portugal",
    image:
      "https://en.kampaoh.com/wp-content/uploads/2024/06/SPAIN-2024-06-20T134315.647.jpg",
    description:
      "Lisbon offers beautiful coastal views, rich history, and a thriving remote work community with cafes and coworking spaces.",
  },
  {
    id: 3,
    name: "Chiang Mai",
    country: "Thailand",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/03/1c/60/caption.jpg?w=600&h=-1&s=1",
    description:
      "Chiang Mai is a peaceful city surrounded by mountains, with affordable living and a popular hub for digital nomads.",
  },
  {
    id: 4,
    name: "Barcelona",
    country: "Spain",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtT5DSgEEG4zvsjaUcJhWomlM8W_IkxP7Ed08rXNw6B-JOb3XVBtP1oPKzbuUIvh61Ss&usqp=CAU",
    description:
      "Barcelona combines vibrant city life, stunning architecture, and Mediterranean beaches – a great spot for remote work and leisure.",
  },
  {
    id: 5,
    name: "Tbilisi",
    country: "Georgia",
    image:
      "https://rodinistanbul.com/wp-content/uploads/2023/04/day-trips-from-istanbul-copy-1024x576.jpg",
    description:
      "Tbilisi is known for its charming old town, affordable living, and growing coworking community for digital nomads.",
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
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                selectedCity?.id === city.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-blue-100"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* Preview Card */}
        {selectedCity && (
          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
            <img
              src={selectedCity.image}
              alt={selectedCity.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{selectedCity.name}</h3>
              <p className="text-gray-600">{selectedCity.country}</p>
              <p className="mt-2 text-gray-700 text-sm">
                {selectedCity.description}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CityDiscovery;
