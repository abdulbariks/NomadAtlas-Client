import React from 'react';

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center">
      <input
        type="text"
        placeholder="Search title or city..."
        value={filters.q || ''}
        onChange={(e) => setFilters(f => ({ ...f, q: e.target.value }))}
        className="input input-bordered w-64"
      />

      <select
        value={filters.type || ''}
        onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
        className="select select-bordered"
      >
        <option value="">All Types</option>
        <option value="Apartment">Apartment</option>
        <option value="Hostel">Hostel</option>
        <option value="Co-working">Co-working</option>
      </select>

      <select
        value={filters.priceRange || ''}
        onChange={(e) => setFilters(f => ({ ...f, priceRange: e.target.value }))}
        className="select select-bordered"
      >
        <option value="">Any Price</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="number"
        placeholder="Max monthly $"
        value={filters.maxPrice || ''}
        onChange={(e) => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
        className="input input-bordered w-40"
      />

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
