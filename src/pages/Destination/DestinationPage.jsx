import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../customHook/useAxiosSecure";
import Spinner from "../../components/Spinner/Spinner";

const DestinationsPage = () => {
  const [continent, setContinent] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [wifiSpeed, setWifiSpeed] = useState("All");

  //  pagination state
  const [page, setPage] = useState(1);
  const limit = 8; // number of items per page

  const axiosSecure = useAxiosSecure();

  //  dynamic query based on filters & pagination
  const { data: allDestinations = {}, isLoading, isError } = useQuery({
    queryKey: ["destinations", { continent, priceRange, wifiSpeed, page }],
    queryFn: async () => {
      const params = {
        page,
        limit,
        continent: continent !== "All" ? continent : undefined,
        priceRange: priceRange !== "All" ? priceRange : undefined,
        wifiSpeed: wifiSpeed !== "All" ? wifiSpeed : undefined,
      };
      const { data } = await axiosSecure.get("/destinations", { params }); //  UPDATED
      return data;
    },
  });

  if (isLoading) return <h3><Spinner></Spinner></h3>;
  if (isError) return <h3>Error...</h3>;

  const destinations = allDestinations?.data || [];
  const totalPages = allDestinations?.totalPages || 1;

  return (
    <div className="px-6 lg:px-20 pb-12 pt-30">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Explore Destinations
        </h2>
        <p className="text-center w-9/12 mx-auto text-sm text-gray-700">
          Discover the best cities for remote work. Filter by cost, internet speed,
          and location to find your perfect digital nomad destination.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
        {/* Continent Filter */}
        <select
          value={continent}
          onChange={(e) => { setContinent(e.target.value); setPage(1); }} //  RESET PAGE
          className="border px-4 py-2 rounded-lg shadow-sm focus:ring focus:ring-yellow-300"
        >
          <option value="All">🌍 All Continents</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Africa">Africa</option>
        </select>

        {/* Price Filter */}
        <select
          value={priceRange}
          onChange={(e) => { setPriceRange(e.target.value); setPage(1); }} //  RESET PAGE
          className="border px-4 py-2 rounded-lg shadow-sm focus:ring focus:ring-yellow-300"
        >
          <option value="All">💰 All Prices</option>
          <option value="Low">Low (under $500)</option>
          <option value="Medium">Medium ($500–1000)</option>
          <option value="High">High (1000+)</option>
        </select>

        {/* Wi-Fi Speed Filter */}
        <select
          value={wifiSpeed}
          onChange={(e) => { setWifiSpeed(e.target.value); setPage(1); }} // RESET PAGE
          className="border px-4 py-2 rounded-lg shadow-sm focus:ring focus:ring-yellow-300"
        >
          <option value="All">📶 Any Wi-Fi</option>
          <option value="50">50 Mbps+</option>
          <option value="80">80 Mbps+</option>
          <option value="100">100 Mbps+</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.length > 0 ? (
          destinations.map((dest) => (
            <div
              key={dest._id}
              className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={dest.images[0]}
                alt={dest.name}
                className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-0 left-0 w-full flex justify-between px-4 py-2 bg-black/50 text-white text-sm">
                <span>{dest.country}</span>
                <span>{dest.totalSeat} Seats</span>
              </div>
              <div className="absolute inset-0 bg-black/70 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex flex-col justify-center items-center text-center p-4 transition-opacity duration-500">
                <Link
                  to={`/destinations/${dest._id}`} // FIXED id reference
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                  View Details
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white px-4 py-3">
                <h3 className="text-lg font-semibold">{dest.name}</h3>
                <p className="text-sm">{dest.title}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">
            No destinations match your filters.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 bg-yellow-300 rounded-lg font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DestinationsPage;
