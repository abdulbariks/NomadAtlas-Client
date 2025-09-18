import React, { useEffect, useState } from "react";

const destinationsData = [
  {
    id: 1,
    image:
      "https://i.postimg.cc/jdv09Fd7/jose-mizrahi-o-O37-OTL7-H-4-unsplash.jpg",
    title: "Affordable Living",
    description:
      "Discover budget-friendly cities with a low cost of living and a welcoming atmosphere for remote workers.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    title: "Adventure Awaits",
    description:
      "Embark on thrilling adventures, explore breathtaking landscapes, and challenge yourself with new experiences.",
  },
  {
    id: 3,
    image:
      "https://i.postimg.cc/bvyDxJNt/dipanwita-chanda-Z7sl-FOwt-WQ-unsplash.jpg",
    title: "Digital Nomad Hubs",
    description:
      "Connect with a thriving community of digital nomads, find coworking spaces, and network with like-minded individuals.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
    title: "Scenic Escapes",
    description:
      "Work while enjoying stunning natural surroundings, from mountain retreats to lakeside cottages.",
  },
];
const NomadFavouriteDestination = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    setDestinations(destinationsData);
  }, []);

  return (
    <section className="px-5 md:px-10 lg:px-20 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        Nomads’ Favourite Destinations
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

export default NomadFavouriteDestination;
