import React, { useState } from "react";

const OPTIONS = [
  { id: "barcelona", name: "Barcelona", cost: "$1,500/month", wifi: "50 Mbps", safety: "High", climate: "Mediterranean", coworking: "Available" },
  { id: "chiangmai", name: "Chiang Mai", cost: "$800/month", wifi: "30 Mbps", safety: "Medium", climate: "Tropical", coworking: "Available" },
  { id: "medellin", name: "Medellin", cost: "$1,200/month", wifi: "40 Mbps", safety: "Medium", climate: "Spring-like", coworking: "Available" },
  { id: "lisbon", name: "Lisbon", cost: "$1,100/month", wifi: "45 Mbps", safety: "High", climate: "Mediterranean", coworking: "Available" },
  { id: "bangkok", name: "Bangkok", cost: "$900/month", wifi: "35 Mbps", safety: "Medium", climate: "Tropical", coworking: "Available" },
];

const IconSearch = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconGlobe = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12h20M12 2c2.5 3 3 7 3 10s-.5 7-3 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Comparison() {
  const [query, setQuery] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [compare, setCompare] = useState([OPTIONS[0], OPTIONS[1], OPTIONS[2]]);

  const filtered = OPTIONS.filter(
    (o) => o.name.toLowerCase().includes(query.toLowerCase()) && !compare.find((c) => c.id === o.id)
  );

  const addCity = (city) => {
    setCompare((c) => [...c, city]);
    setQuery("");
    setOptionsVisible(false);
  };

  const removeCity = (id) => {
    setCompare((c) => c.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Comparison Planner</h1>
            <p className="mt-2 text-sm text-gray-500 max-w-2xl">
              Compare cities side-by-side to find your ideal nomad destination — view costs, connectivity, safety and local amenities at a glance.
            </p>
          </div>

          <div className="relative z-20">
            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl shadow-sm px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 text-indigo-600 rounded-full p-2">
                  <IconSearch className="w-5 h-5" />
                </div>
                <div className="text-sm text-gray-600">Add a city to compare</div>
              </div>

              <div className="flex-1 relative">
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setOptionsVisible(true); }}
                  onFocus={() => setOptionsVisible(true)}
                  onBlur={() => setTimeout(() => setOptionsVisible(false), 150)}
                  className="w-full pl-4 pr-28 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400 rounded-md"
                  placeholder="Search cities (e.g., Lisbon, Medellin)"
                />
              </div>
            </div>

            {optionsVisible && filtered.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                {filtered.map((o) => (
                  <li
                    key={o.id}
                    onMouseDown={() => addCity(o)}
                    className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-semibold">
                        {o.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{o.name}</div>
                        <div className="text-xs text-gray-400">{o.climate} · {o.wifi}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{o.cost}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">City</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Wi-Fi</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Safety</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Climate</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Coworking</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"> </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {compare.length === 0 && (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                          No cities added yet — use the search above to add cities.
                        </td>
                      </tr>
                    )}

                    {compare.map((row, idx) => (
                      <tr key={row.id} className="bg-white hover:shadow-sm transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-lg flex items-center justify-center font-semibold">
                              {row.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{row.name}</div>
                              <div className="text-xs text-gray-400">ID · {row.id}</div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap align-middle">
                          <div className="text-sm font-semibold text-indigo-600">{row.cost}</div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none"><path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            {row.wifi}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            row.safety === "High" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                          }`}>
                            {row.safety}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.climate}</td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm bg-indigo-50 text-indigo-600">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            {row.coworking}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => removeCity(row.id)}
                            className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 px-3 py-1 rounded-md border border-red-100 bg-red-50/40 hover:bg-red-50 transition"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Tip: Add or remove cities to see an updated side-by-side comparison.
          </div>
        </div>
      </main>
    </div>
  );
}
