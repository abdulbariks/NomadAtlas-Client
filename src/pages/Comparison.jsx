import React, { useEffect, useState } from "react";

const IconSearch = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function Comparison() {
  const [query, setQuery] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [compare, setCompare] = useState([]);
  const [cities, setCities] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    cost: "",
    wifi: "",
    safety: "Medium",
    climate: "",
    coworking: "Available",
    
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/cities");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        if (mounted) {
          setCities(data);
          setCompare(data.slice(0, 3));
          setError(null);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Unknown error");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const filtered = cities.filter(
    (o) => o.name.toLowerCase().includes(query.toLowerCase()) && !compare.find((c) => c.id === o.id)
  );

  const addCityLocal = (city) => {
    setCompare((c) => {
      if (c.find((x) => x.id === city.id)) return c;
      return [...c, city];
    });
    setQuery("");
    setOptionsVisible(false);
  };

  const removeCity = (id) => {
    setCompare((c) => c.filter((x) => x.id !== id));
  };

  
  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.status === 409) {
        const body = await res.json();
        throw new Error(body.message || "Duplicate id");
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Server returned ${res.status}`);
      }
      const created = await res.json();
      // refresh city list locally (prepend)
      setCities((prev) => [created, ...prev]);
      // add to compare
      addCityLocal(created);
      setShowModal(false);
      // reset form
      setForm({
        id: "",
        name: "",
        cost: "",
        wifi: "",
        safety: "Medium",
        climate: "",
        coworking: "Available",
        experience: ""
      });
    } catch (err) {
      alert("Failed to add city: " + err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-10">
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Comparison Planner</h1>
              <p className="mt-2 text-sm text-gray-500 max-w-2xl">
                Compare cities side-by-side. Share your real experience in the Add City form!
              </p>
            </div>
            <div>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
              >
                Add City
              </button>
            </div>
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
                  placeholder={loading ? "Loading cities..." : "Search cities (e.g., Lisbon, Medellin)"}
                  disabled={loading}
                />
              </div>
            </div>

            {optionsVisible && filtered.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                {filtered.map((o) => (
                  <li
                    key={o.id}
                    onMouseDown={() => addCityLocal(o)}
                    className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-semibold">
                        {o.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{o.name}</div>
                        <div className="text-xs text-gray-400">{o.climate} · {o.wifi}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{o.cost}</div>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-4 py-3 text-sm text-gray-400">No cities match</li>
                )}
              </ul>
            )}

            {error && (
              <div className="mt-2 text-sm text-red-600">Error loading cities: {error}</div>
            )}
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">City</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cost ($)</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Wi-Fi (Mbps)</th>
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

                    {compare.map((row) => (
                      <tr key={row.id} className="bg-white hover:shadow-sm transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-lg flex items-center justify-center font-semibold">
                              {row.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.safety === "High" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                            {row.safety}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.climate}</td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm bg-indigo-50 text-indigo-600">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                            {row.coworking}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => removeCity(row.id)}
                            className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 px-3 py-1 rounded-md border border-red-100 bg-red-50/40 hover:bg-red-50 transition"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
            Tip: Add your real experience in the Add City form — cost, connectivity, and safety are most helpful.
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <form onSubmit={submitForm} className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add city & share your experience</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-gray-500 cursor-pointer">Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block">
                <div className="text-xs text-gray-600">City name *</div>
                <input required name="name" value={form.name} onChange={onFormChange} className="w-full px-3 py-2 border rounded" />
              </label>

              <label className="block">
                <div className="text-xs text-gray-600">Climate</div>
                <select name="climate" value={form.climate} onChange={onFormChange} className="w-full px-3 py-2 border rounded">
                  <option value="">Select climate</option>
                  <option>Spring-like</option>
                  <option>Tropical</option>
                  <option>Mediterranean</option>
                  <option>Arid</option>
                  <option>Continental</option>
                  <option>Polar</option>
                </select>
              </label>

              <label className="block">
                <div className="text-xs text-gray-600">Cost ($)</div>
                <input name="cost" value={form.cost} onChange={onFormChange} className="w-full px-3 py-2 border rounded" />
              </label>

              <label className="block">
                <div className="text-xs text-gray-600">Wi-Fi (Mbps)</div>
                <input name="wifi" value={form.wifi} onChange={onFormChange} className="w-full px-3 py-2 border rounded" />
              </label>

              <label className="block">
                <div className="text-xs text-gray-600">Safety</div>
                <select name="safety" value={form.safety} onChange={onFormChange} className="w-full px-3 py-2 border rounded">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </label>

              <label className="block">
                <div className="text-xs text-gray-600">Coworking</div>
                <input name="coworking" value={form.coworking} onChange={onFormChange} className="w-full px-3 py-2 border rounded" />
              </label>

              <label className="col-span-1 md:col-span-2 block">

              </label>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded border cursor-pointer">Cancel</button>
              <button type="submit" disabled={submitting} className="px-4 py-2 rounded bg-indigo-600 cursor-pointer text-white">
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
