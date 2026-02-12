import React, { useEffect, useState } from "react";
import axios from "axios";

const PopularDestination = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Fetch destinations from backend
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(
          "https://nomad-atlas-server-delta.vercel.app/api/destinations/"
        );
        if (res.data.success) {
          // Wrap single object in array for mapping
          setDestinations([res.data.data]);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  if (destinations.length === 0) {
    return <p className="text-center mt-10">Loading destinations...</p>;
  }

  return (
    <section className="pt-10">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Popular Destinations
        </h2>
        <p className="text-sm w-10/12 mx-auto mb-8 text-gray-700">
          Discover some of the world’s most loved cities for digital nomads.
          Explore destinations that offer affordable living, reliable internet,
          and a welcoming community to support your remote lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((item, index) => (
          <div
            key={item._id || index}
            className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />

            {/* Tag */}
            <span className="absolute top-3 right-3 bg-[#14b8a6] text-white text-xs font-semibold px-2 py-1 rounded">
              Popular
            </span>

            {/* ---- Desktop Hover Details ---- */}
            <div className="hidden sm:flex absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex-col justify-end p-4 text-white">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-xs mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">⭐ {item.wifiSpeed ?? "N/A"} Mbps</span>
                <div className="text-right">
                  <p className="text-gray-400 line-through text-xs">
                    ${item.avgLivingCost ?? "N/A"}
                  </p>
                  <p className="text-lg font-bold text-red-400">
                    ${item.pricePerMonth ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* ---- Mobile Always Visible Details ---- */}
            <div className="block sm:hidden p-4 text-gray-800 bg-white">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-xs mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">⭐ {item.wifiSpeed ?? "N/A"} Mbps</span>
                <div className="text-right">
                  <p className="text-gray-500 line-through text-xs">
                    ${item.avgLivingCost ?? "N/A"}
                  </p>
                  <p className="text-lg font-bold text-red-500">
                    ${item.pricePerMonth ?? "N/A"}
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
