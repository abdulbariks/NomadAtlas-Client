import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../customHook/useAxiosSecure";
import Spinner from "../../components/Spinner/Spinner";
import { FaSearch } from "react-icons/fa";

const DestinationsPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("query") || "";

  const [continent, setContinent] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [wifiSpeed, setWifiSpeed] = useState("All");
  const [searchText, setSearchText] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const limit = 8;

  const axiosSecure = useAxiosSecure();

  const { data: allDestinations = {}, isLoading, isError } = useQuery({
    queryKey: ["destinations", { continent, priceRange, wifiSpeed, searchQuery, page }],
    queryFn: async () => {
      const params = {
        page,
        limit,
        continent: continent !== "All" ? continent : undefined,
        priceRange: priceRange !== "All" ? priceRange : undefined,
        wifiSpeed: wifiSpeed !== "All" ? wifiSpeed : undefined,
        search: searchQuery || undefined,
      };
      const { data } = await axiosSecure.get(
        "https://nomad-atlas-server-one.vercel.app/api/destinations/",
        { params }
      );
      return data;
    },
  });

  if (isLoading) return <h3><Spinner /></h3>;
  if (isError) return <h3>Error...</h3>;

  const destinations = allDestinations?.data || [];
  const totalPages = allDestinations?.totalPages || 1;

  return (
    <div className="px-5 md:px-8 lg:px-10 pb-12 pt-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Explore Destinations
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Discover the best cities for remote work. Filter by cost, internet speed, and location to find your perfect digital nomad destination.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center bg-gray-100 border border-gray-200 hover:border-cyan-200 rounded-xl px-4 py-3">
          <FaSearch className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search by city, country, or continent..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-transparent flex-1 outline-none text-xs md:text-lg text-gray-700 placeholder-gray-500"
          />
          <button
            onClick={() => {
              setSearchQuery(searchText);
              setPage(1);
            }}
            className="bg-[#11c3c0] hover:bg-[#0ea5a2] text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
        <select
          value={continent}
          onChange={(e) => {
            setContinent(e.target.value);
            setPage(1);
          }}
          className="bg-gray-100 text-gray-700 border border-gray-200 px-4 text-sm md:text-base py-2.5 rounded-md outline-none focus:ring-1 focus:ring-cyan-400 focus:ring-offset-0 transition"
        >
          <option value="All">All Continents</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Africa">Africa</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => {
            setPriceRange(e.target.value);
            setPage(1);
          }}
          className="bg-gray-100 text-gray-700 border border-gray-200 text-sm md:text-base px-4 py-2.5 rounded-md outline-none focus:ring-1 focus:ring-cyan-400 focus:ring-offset-0 transition"
        >
          <option value="All">All Prices</option>
          <option value="Low">Low (under $500)</option>
          <option value="Medium">Medium ($500–1000)</option>
          <option value="High">High (1000+)</option>
        </select>

        <select
          value={wifiSpeed}
          onChange={(e) => {
            setWifiSpeed(e.target.value);
            setPage(1);
          }}
          className="bg-gray-100 text-gray-700 border border-gray-200 text-sm md:text-base px-4 py-2.5 rounded-md outline-none focus:ring-1 focus:ring-cyan-400 focus:ring-offset-0 transition"
        >
          <option value="All">Any Wi-Fi</option>
          <option value="50">50 Mbps+</option>
          <option value="80">80 Mbps+</option>
          <option value="100">100 Mbps+</option>
        </select>
      </div>


      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.length > 0 ? (
          destinations.map((dest) => (
            <div
              key={dest._id}
              className="bg-white rounded-lg overflow-hidden border border-transparent hover:border-cyan-200 transition duration-300 hover:scale-105 flex flex-col"
            >
              {/* Image Section with Hover Overlay */}
              <div className="relative group overflow-hidden">
                <img
                  src={dest.images[0]}
                  alt={dest.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* <div className="absolute top-0 left-0 w-full flex justify-between px-4 py-2 bg-black/50 text-white text-xs md:text-sm">
                  <span>{dest.country}</span>
                  <span>{dest.totalSeat} Seats</span>
                </div> */}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex flex-col justify-center items-center text-center p-4 transition-opacity duration-500">
                  <Link
                    to={`/destinations/${dest._id}`}
                    className="bg-[#11c3c0] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0c9c99] transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Card Info Section */}
              <div className="flex flex-col justify-between flex-1 px-5 py-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {dest.title || "Perfect place for remote work and exploration."}
                  </p>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-700 mt-auto">
                  <span className="font-medium text-[#11c3c0]">
                    {dest.country || "N/A"}
                  </span>
                  <span className="text-gray-500">
                    {dest.totalSeat ? `${dest.totalSeat} Seats` : "Seats N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">
            No destinations match your filters.
          </p>
        )}
      </div>

      {/* Pagination (unchanged) */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 bg-[#11c3c0] text-white rounded-lg font-semibold">
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
