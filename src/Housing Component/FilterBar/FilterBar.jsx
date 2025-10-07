import React from "react";
import destinations from "../../pages/Destination/Destination.json";

export default function FilterBar({ filters, setFilters }) {
  // 🔹 Extract unique filter values dynamically from JSON
  const continents = [...new Set(destinations.map(d => d.continent))];
  const priceRanges = [...new Set(destinations.map(d => d.priceRange))];
  const wifiSpeeds = [...new Set(destinations.map(d => d.wifiSpeed))];
  const types = [...new Set(destinations.map(d => d.type))];

  return (
    <div className="flex flex-wrap gap-3 mb-8 items-center justify-center">
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by destination or country..."
        value={filters.q || ""}
        onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        className="input input-bordered w-64"
      />

      {/* 🌍 Continent Filter
      <select
        value={filters.continent || "All"}
        onChange={(e) => setFilters((f) => ({ ...f, continent: e.target.value }))}
        className="select select-bordered"
      >
        <option value="All">All Continents</option>
        {continents.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select> */}

      {/* 🏠 Type Filter */}
      <select
        value={filters.type || "All"}
        onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
        className="select select-bordered"
      >
        <option value="All">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* 💰 Price Range Filter */}
      <select
        value={filters.priceRange || "All"}
        onChange={(e) => setFilters((f) => ({ ...f, priceRange: e.target.value }))}
        className="select select-bordered"
      >
        <option value="All">All Prices</option>
        {priceRanges.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      {/* ⚡ Wi-Fi Speed Filter */}
      {/* <select
        value={filters.wifiSpeed || "All"}
        onChange={(e) => setFilters((f) => ({ ...f, wifiSpeed: e.target.value }))}
        className="select select-bordered"
      >
        <option value="All">All Wi-Fi Speeds</option>
        {wifiSpeeds.map((w) => (
          <option key={w} value={w}>
            {w}
          </option>
        ))}
      </select> */}

      {/* 🔢 Max Price Input */}
      <input
        type="number"
        placeholder="Max monthly $"
        value={filters.maxPrice || ""}
        onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
        className="input input-bordered w-40"
      />

      {/* ❌ Clear Button */}
      <button
        onClick={() => setFilters({})}
        className="btn btn-ghost"
        title="Clear filters"
      >
        Clear
      </button>
    </div>
  );
}
