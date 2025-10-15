import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


const CITY_COORDS = {
  "Lisbon": [38.7223, -9.1393],
  "Barcelona": [41.3851, 2.1734],
  "Bangkok": [13.7563, 100.5018],
  "Chiang Mai": [18.7061, 98.9817],
  "Medellín": [6.2442, -75.5812],
  "Bali": [-8.4095, 115.1889],
  "Canggu (Bali)": [-8.6450, 115.1383],
  "Porto": [41.1579, -8.6291],
  "Buenos Aires": [-34.6037, -58.3816],
  "Dhaka": [23.8103, 90.4125],
  "Jakarta": [-6.2088, 106.8456],
  "Kuala Lumpur": [3.1390, 101.6869],
  "Ho Chi Minh City": [10.8231, 106.6297],
  "Mexico City": [19.4326, -99.1332],
  "Berlin": [52.52, 13.405],

};


function speedColorClass(mbps) {
  if (mbps >= 90) return "bg-green-600 text-white";
  if (mbps >= 50) return "bg-green-300 text-black";
  if (mbps >= 30) return "bg-yellow-300 text-black";
  return "bg-red-300 text-black";
}

function MapFlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    map.flyTo(position, 10, { duration: 1.2 });
  }, [position, map]);
  return null;
}

export default function InternetSpeed() {

  const API = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API) || "";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [flyToPos, setFlyToPos] = useState(null);
  const mapRef = useRef(null);
  const [minSpeed, setMinSpeed] = useState(0);
  const [sortBy, setSortBy] = useState("speed");
  const [sortOrder, setSortOrder] = useState("desc");
  const [reportCity, setReportCity] = useState("");
  const [reportSpeed, setReportSpeed] = useState("");
  const [submitting, setSubmitting] = useState(false);

  console.log(error,loading)
  useEffect(() => {
    fetchAvg();
    // eslint-disable-next-line
  }, []);

  const fetchAvg = async () => {
    setLoading(true);
    setError(null);
    try {

      const base = API?.toString?.() || "";
      const url = base.replace(/\/$/, "") + "/api/internet-speed/average";
      const res = await axios.get(url);

      setData(Array.isArray(res.data) ? res.data : (res.data.data || []));
    } catch (err) {
      console.error("Failed to fetch average speeds:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;

    const key = Object.keys(CITY_COORDS).find((k) => k.toLowerCase().includes(q.toLowerCase()));
    if (key) {
      setFlyToPos(CITY_COORDS[key]);
      return;
    }

    const found = data.find((d) => (d._id || "").toLowerCase().includes(q.toLowerCase()));
    if (found) {
      const coords = CITY_COORDS[found._id] || null;
      if (coords) setFlyToPos(coords);
      else alert("Found data but no coords available for this location.");
    } else {
      alert("Location not found in dataset.");
    }
  };

  const submitReport = async (e) => {
    e.preventDefault();
    const city = reportCity.trim();
    const speedNum = Number(reportSpeed);
    if (!city || Number.isNaN(speedNum)) {
      toast.error("Provide a valid city and numeric speed (Mbps)");
      return;
    }
    try {
      setSubmitting(true);
      const base = API?.toString?.() || "";
      const url = base.replace(/\/$/, "") + "/api/internet-speed/report";
      await axios.post(url, { city, speedMbps: speedNum });
      toast.success("Thanks! Report submitted.");
      setReportSpeed("");

      await fetchAvg();

      if (CITY_COORDS[city]) setFlyToPos(CITY_COORDS[city]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit. Try again");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFlyToPos([latitude, longitude]);

      },
      (err) => {
        alert("Could not get location: " + err.message);
      }
    );
  };


  const dataWithCoords = data
    .map((d) => {
      const name = d._id || d.location || d.city;
      const coords = CITY_COORDS[name];
      if (!coords) return null;
      return {
        id: name,
        name,
        avgSpeed: Number(d.avgSpeed || d.avgSpeed === 0 ? d.avgSpeed : (d.avg_speed || d.avg_speed_mbps || 0)),
        count: d.count || 1,
        coords,
      };
    })
    .filter(Boolean);

  const filteredAndSorted = [...dataWithCoords]
    .filter((c) => {
      const q = search.trim().toLowerCase();
      const matches = !q || c.name.toLowerCase().includes(q);
      const meetsSpeed = c.avgSpeed >= (Number(minSpeed) || 0);
      return matches && meetsSpeed;
    })
    .sort((a, b) => {
      const dir = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
      if (sortBy === "count") return (a.count - b.count) * dir;

      return (a.avgSpeed - b.avgSpeed) * dir;
    });

  return (
    <div className="text-slate-800 dark:text-slate-200">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Global Internet Speed Map</h1>
          <p className="mt-3 max-w-3xl mx-auto text-base text-slate-600 dark:text-slate-400">Search a city to focus the map, filter by minimum Mbps, sort results, and optionally contribute your own speed report to help other remote workers.</p>
        </div>

        {/* Layout: Sidebar + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Search & Filters</div>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg pl-10 pr-3 py-2 text-slate-800 dark:text-slate-200 placeholder-slate-500"
                    placeholder="Search city..."
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400">Minimum speed (Mbps)</label>
                  <div className="mt-1 flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="5"
                      value={minSpeed}
                      onChange={(e) => setMinSpeed(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm w-12 text-right">{minSpeed}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-slate-600 dark:text-slate-400">Sort by</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="mt-1 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg py-2 px-2">
                      <option value="speed">Speed</option>
                      <option value="name">Name</option>
                      <option value="count">Reports</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 dark:text-slate-400">Order</label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="mt-1 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg py-2 px-2">
                      <option value="desc">Desc</option>
                      <option value="asc">Asc</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 btn btn-primary min-h-0 h-9 normal-case">Find</button>
                  <button
                    type="button"
                    onClick={() => { setSearch(""); setMinSpeed(0); setSortBy("speed"); setSortOrder("desc"); }}
                    className="flex-1 btn btn-ghost border border-slate-200 dark:border-slate-700 min-h-0 h-9 normal-case"
                  >Reset</button>
                </div>
              </form>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Cities ({filteredAndSorted.length})</div>
              <div className="max-h-[420px] overflow-auto pr-1 space-y-2">
                {filteredAndSorted.length === 0 && (
                  <div className="text-sm text-slate-500">No cities match filters.</div>
                )}
                {filteredAndSorted.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setFlyToPos(c.coords)}
                    className="w-full text-left p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{c.name}</div>
                      <div className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">{c.count} reports</div>
                    </div>
                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{c.avgSpeed.toFixed(1)} Mbps</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Report a Speed</div>
              <form onSubmit={submitReport} className="space-y-3">
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400">City</label>
                  <input
                    value={reportCity}
                    onChange={(e) => setReportCity(e.target.value)}
                    placeholder="e.g., Lisbon"
                    className="mt-1 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg py-2 px-3"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-400">Speed (Mbps)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={reportSpeed}
                    onChange={(e) => setReportSpeed(e.target.value)}
                    placeholder="e.g., 85"
                    className="mt-1 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg py-2 px-3"
                  />
                </div>
                <button disabled={submitting} type="submit" className="btn btn-primary w-full min-h-0 h-10 normal-case">
                  {submitting ? "Submitting..." : "Submit report"}
                </button>
                <div className="text-xs text-slate-500">Reporting helps keep averages up to date for the community.</div>
              </form>
            </div>
          </aside>

          {/* Map */}
          <div className="lg:col-span-8 xl:col-span-9">

            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video" style={{ minHeight: 420, zIndex: 20 }}>

              <div className="absolute top-4 right-4 z-40 flex flex-col gap-2 items-end">
                <div className="flex flex-col rounded-lg shadow-lg bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm">
                  <button
                    title="Zoom in"
                    onClick={() => {
                      const map = mapRef.current;
                      if (map) map.setZoom(Math.min(map.getZoom() + 1, 18));
                    }}
                    className="p-2 text-slate-700 dark:text-slate-300 hover:bg-primary/20 dark:hover:bg-primary/30 rounded-t-lg transition-colors"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
                  <button
                    title="Zoom out"
                    onClick={() => {
                      const map = mapRef.current;
                      if (map) map.setZoom(Math.max(map.getZoom() - 1, 1));
                    }}
                    className="p-2 text-slate-700 dark:text-slate-300 hover:bg-primary/20 dark:hover:bg-primary/30 rounded-b-lg transition-colors"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                </div>

                <button
                  title="Center to my location"
                  onClick={handleLocateMe}
                  className="p-2 rounded-lg shadow-lg bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                >
                  <span className="material-symbols-outlined">near_me</span>
                </button>
              </div>


              <div className="absolute inset-0">
                <MapContainer
                  center={[20, 0]}
                  zoom={2}
                  scrollWheelZoom={true}
                  style={{ height: "100%", width: "100%" }}
                  whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <MapFlyTo position={flyToPos} />

                  {dataWithCoords.map((c) => {
                    const colorClass = speedColorClass(c.avgSpeed);
                    return (
                      <Marker key={c.id} position={c.coords}>
                        <Popup>
                          <div className="max-w-xs">
                            <div className="font-semibold text-lg">{c.name}</div>
                            <div className="text-sm text-gray-500">Avg Speed: <span className="font-bold">{c.avgSpeed.toFixed(1)} Mbps</span></div>
                            <div className="text-sm text-gray-500">Reports: <span className="font-medium">{c.count}</span></div>
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-1">Coworking (estimate)</div>
                              <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <div key={i} className={`w-6 h-2 rounded ${i < Math.min(5, Math.round(c.avgSpeed / 25)) ? "bg-indigo-600" : "bg-gray-200"}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </Popup>
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                            {c.avgSpeed.toFixed(0)} Mbps
                          </div>
                        </Tooltip>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-4xl mx-auto">

          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-600" /> <span className="text-sm text-black">90+ Mbps</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-300" /> <span className="text-sm text-black">50-89 Mbps</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-300" /> <span className="text-sm text-black">30-49 Mbps</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-300" /> <span className="text-sm text-black">Below 30 Mbps</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center">
          Data is crowd-sourced and aggregated. For production use, seed with verified metrics.
        </div>
      </main>
    </div>
  );
}