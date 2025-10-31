import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
import { Search, SlidersHorizontal, ArrowDownWideNarrow, List, MapPin, LocateFixed, Globe, Gauge, Send } from 'lucide-react';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CITY_COORDS = {
  "New York": [40.7128, -74.0060],
  "London": [51.5074, -0.1278],
  "Paris": [48.8566, 2.3522],
  "Berlin": [52.52, 13.405],
  "Dubai": [25.276987, 55.296249],
  "Mumbai": [19.0760, 72.8777],
  "Dhaka": [23.8103, 90.4125],
  "Singapore": [1.3521, 103.8198],
  "Shanghai": [31.2304, 121.4737],
  "Tokyo": [35.6895, 139.6917],
  "Sydney": [-33.8688, 151.2093],
  "Los Angeles": [34.0522, -118.2437],
  "Mexico City": [19.4326, -99.1332],
  "São Paulo": [-23.5505, -46.6333],
  "Johannesburg": [-26.2041, 28.0473],
  "Cairo": [30.0444, 31.2357],
  "Vancouver": [49.2827, -123.1207],
  "Lagos": [6.5244, 3.3792],
  "Hong Kong": [22.3193, 114.1694],
  "Auckland": [-36.8485, 174.7633],
  "Lisbon": [38.7223, -9.1393],
  "Barcelona": [41.3851, 2.1734],
  "Bangkok": [13.7563, 100.5018],
  "Chiang Mai": [18.7061, 98.9817],
  "Medellín": [6.2442, -75.5812],
  "Bali": [-8.4095, 115.1889],
  "Canggu (Bali)": [-8.6450, 115.1383],
  "Porto": [41.1579, -8.6291],
  "Buenos Aires": [-34.6037, -58.3816],
  "Jakarta": [-6.2088, 106.8456],
  "Kuala Lumpur": [3.1390, 101.6869],
  "Ho Chi Minh City": [10.8231, 106.6297],
  "Tbilisi": [41.7151, 44.8271],
  "Prague": [50.0755, 14.4378],
  "Cape Town": [-33.9249, 18.4241],
  "Da Nang": [16.0544, 108.2022],
  "Budapest": [47.4979, 19.0402],
  "Santiago": [-33.4489, -70.6693],
  "Istanbul": [41.0082, 28.9784]
};


function speedColorClass(mbps) {
  if (mbps >= 90) return "bg-teal-500 text-white shadow-lg shadow-teal-500/30";
  if (mbps >= 50) return "bg-green-400 text-slate-900 shadow-lg shadow-green-400/30";
  if (mbps >= 30) return "bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/30";
  return "bg-red-400 text-white shadow-lg shadow-red-400/30";
}

function MapFlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;

    map.flyTo(position, 10, { duration: 1.2 });
  }, [position, map]);
  return null;
}


const Button = ({ children, className = "", onClick, type = "button", disabled = false, variant = "primary" }) => {
  const baseStyle = "flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition duration-200 ease-in-out shadow-lg transform active:scale-[0.98] focus:outline-none focus:ring-4 min-h-0 h-10 normal-case";
  let variantStyle = "";

  if (variant === "primary") {
    variantStyle = "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/50 focus:ring-indigo-500/50";
  } else if (variant === "secondary") {
    variantStyle = "bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200 shadow-slate-300/30 focus:ring-slate-400/50";
  } else if (variant === "ghost") {
    variantStyle = "bg-transparent text-indigo-600 hover:bg-indigo-50 shadow-none";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${className} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};


export default function App() {
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

  useEffect(() => {
    fetchAvg();

  }, []);


  const fetchAvg = async () => {
    setLoading(true);
    setError(null);
    try {

      const base = API?.toString?.() || "https://nomad-atlas-server-delta.vercel.app";
      const url = base.replace(/\/$/, "") + "/api/internet-speed/average";

      let res;
      for (let i = 0; i < 3; i++) {
        try {
          res = await axios.get(url);
          break;
        } catch (e) {
          if (i < 2) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
          } else {
            throw e;
          }
        }
      }


      const rawData = Array.isArray(res.data) ? res.data : (res.data.data || []);

      const processedData = rawData
        .map(d => {
          const name = d._id || d.location || d.city;
          const coords = CITY_COORDS[name];
          if (!coords) return null;
          return {
            id: name,
            name,
            avgSpeed: Number(d.avgSpeed || d.avg_speed || 0),
            count: Number(d.count || 1),
            coords,
          };
        })
        .filter(Boolean);

      setData(processedData);
    } catch (err) {
      console.error("Failed to fetch average speeds:", err);
      setError("Failed to load data. The backend API might be unavailable.");
      toast.error("Failed to load speed data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;

    const key = Object.keys(CITY_COORDS).find((k) => k.toLowerCase() === q.toLowerCase());
    if (key) {
      setFlyToPos(CITY_COORDS[key]);
      return;
    }

    const found = data.find((d) => (d.name || "").toLowerCase().includes(q.toLowerCase()));
    if (found) {
      setFlyToPos(found.coords);
    } else {
      toast.info(`Could not find coordinates for "${q}". Try checking the list.`);
    }
  };

  const submitReport = async (e) => {
    e.preventDefault();
    const city = reportCity.trim();
    const speedNum = Number(reportSpeed);
    if (!city || Number.isNaN(speedNum) || speedNum <= 0) {
      toast.error("Please provide a valid city and a numeric speed (Mbps) greater than 0.");
      return;
    }


    try {
      setSubmitting(true);
      const base = API?.toString?.() || "https://nomad-atlas-server-delta.vercel.app";
      const url = base.replace(/\/$/, "") + "/api/internet-speed/report";

      let res;
      for (let i = 0; i < 3; i++) {
        try {
          res = await axios.post(url, { city, speedMbps: speedNum });
          break;
        } catch (e) {
          if (i < 2) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
          } else {
            throw e;
          }
        }
      }

      if (res.status === 200 || res.status === 201) {
        toast.success(`Report for ${city} submitted successfully!`);
        setReportSpeed("");
        setReportCity("");

        await fetchAvg();

        const foundCityKey = Object.keys(CITY_COORDS).find(k => k.toLowerCase() === city.toLowerCase());
        if (foundCityKey) setFlyToPos(CITY_COORDS[foundCityKey]);
      } else {
        throw new Error("Report submission failed with unexpected status.");
      }

    } catch (err) {
      console.error("Error submitting report:", err);

      const errMsg = err.response?.data?.message || "Please check your network connection or the server status.";
      toast.error(`Failed to submit report. ${errMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFlyToPos([latitude, longitude]);
        toast.info("Map centered on your location.");
      },
      (err) => {
        console.error("Geolocation error:", err);
        toast.error("Could not get location. Ensure location services are enabled.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const filteredAndSorted = data
    .filter((c) => {
      const q = search.trim().toLowerCase();
      const matches = !q || c.name.toLowerCase().includes(q);
      const meetsSpeed = c.avgSpeed >= (Number(minSpeed) || 0);
      return matches && meetsSpeed;
    })
    .sort((a, b) => {
      const dir = sortOrder === "asc" ? 1 : -1;

      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "count") {
        comparison = a.count - b.count;
      } else {
        comparison = a.avgSpeed - b.avgSpeed;
      }

      return comparison * dir;
    });

  return (

    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div className="min-h-screen bg-slate-50 text-slate-800 font-inter">
        <header className="fixed top-0 left-0 w-full z-30 bg-white/80 backdrop-blur-sm shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">NomadNet</h2>
            </div>
            <p className="text-sm text-slate-600 hidden sm:block">Real-time speed data for remote work hubs</p>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Global Internet Speed Map</h1>
            <p className="mt-3 max-w-3xl mx-auto text-base text-slate-600">Search a city to focus the map, filter by minimum Mbps, sort results, and optionally contribute your own speed report to help other remote workers.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <aside className="lg:col-span-4 xl:col-span-3 space-y-6">

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                <div className="flex items-center text-lg font-bold text-slate-900 mb-4">
                  <SlidersHorizontal className="w-5 h-5 mr-2 text-indigo-500" /> Filters
                </div>
                <form onSubmit={handleSearch} className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Search City & Locate</label>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-slate-800 placeholder-slate-500 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner transition"
                        placeholder="e.g., Bali or Porto"
                        list="city-suggestions-search"
                      />

                      <datalist id="city-suggestions-search">
                        {Object.keys(CITY_COORDS).map(city => (
                          <option key={`search-${city}`} value={city} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600">
                      Min Speed: <span className="font-bold text-indigo-600">{minSpeed} Mbps</span>
                    </label>
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="5"
                        value={minSpeed}
                        onChange={(e) => setMinSpeed(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer range-lg"
                        style={{ accentColor: '#4f46e5' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Sort by</label>
                      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:ring-indigo-500 focus:border-indigo-500 transition">
                        <option value="speed">Avg. Speed</option>
                        <option value="name">City Name</option>
                        <option value="count">Reports Count</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Order</label>
                      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:ring-indigo-500 focus:border-indigo-500 transition">
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="submit" className="flex-1">
                      <MapPin className="w-4 h-4" /> Locate City
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => { setSearch(""); setMinSpeed(0); setSortBy("speed"); setSortOrder("desc"); }}
                      className="flex-1"
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                <div className="flex items-center justify-between text-lg font-bold text-slate-900 mb-4">
                  <div className="flex items-center">
                    <List className="w-5 h-5 mr-2 text-indigo-500" /> City Data
                  </div>
                  <div className="text-sm font-medium text-indigo-600 px-2 py-1 rounded-full bg-indigo-100">{filteredAndSorted.length} found</div>
                </div>
                <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3">
                  {loading && (
                    <div className="text-center text-indigo-500 py-4 flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Loading speed data...
                    </div>
                  )}
                  {error && (
                    <div className="text-center text-red-500 py-4">Error fetching data.</div>
                  )}
                  {!loading && filteredAndSorted.length === 0 && (
                    <div className="text-sm text-slate-500 text-center py-4">No cities match your current filters or data has not been reported yet.</div>
                  )}
                  {filteredAndSorted.map((c) => (
                    <Button
                      key={c.id}
                      variant="secondary"
                      onClick={() => setFlyToPos(c.coords)}
                      className="w-full p-3 h-auto justify-between items-center transition duration-150 ease-in-out hover:shadow-indigo-500/30 group"
                    >
                      <div className="flex flex-col items-start">
                        <div className="font-semibold text-base text-slate-900 group-hover:text-indigo-600">{c.name}</div>
                        <div className="mt-1 flex items-center text-sm text-slate-600">
                          <Gauge className="w-4 h-4 mr-1 text-teal-500" />
                          {c.avgSpeed.toFixed(1)} Mbps
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-xs font-medium px-3 py-1 rounded-full bg-slate-200 text-slate-600">
                          {c.count} reports
                        </div>
                        <MapPin className="w-4 h-4 mt-1 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                <div className="flex items-center text-lg font-bold text-slate-900 mb-4">
                  <Send className="w-5 h-5 mr-2 text-indigo-500" /> Report Your Speed
                </div>
                <form onSubmit={submitReport} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">City Name</label>
                    <input
                      value={reportCity}
                      onChange={(e) => setReportCity(e.target.value)}
                      placeholder="e.g., Bangkok"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner transition"
                      list="city-suggestions"
                    />

                    <datalist id="city-suggestions">
                      {Object.keys(CITY_COORDS).map(city => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Speed (Mbps)</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={reportSpeed}
                      onChange={(e) => setReportSpeed(e.target.value)}
                      placeholder="e.g., 150"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner transition"
                    />
                  </div>
                  <Button disabled={submitting} type="submit" className="w-full">
                    {submitting ? "Submitting..." : "Contribute Speed Data"}
                  </Button>
                  <div className="text-xs text-slate-500 text-center pt-2">Your report helps the digital nomad community. Thank you!</div>
                </form>
              </div>
            </aside>

            {/* Map Area */}
            <div className="lg:col-span-8 xl:col-span-9">

              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-700/30 w-full" style={{ height: "min(75vh, 600px)", zIndex: 20 }}>


                <div className="absolute top-4 right-4 z-[40] flex flex-col gap-2 items-end">

                  <div className="flex flex-col rounded-xl shadow-xl bg-white/90 backdrop-blur-md border border-slate-200 overflow-hidden">
                    <button
                      title="Zoom In"
                      onClick={() => {
                        const map = mapRef.current;
                        if (map) map.setZoom(Math.min(map.getZoom() + 1, 18));
                      }}
                      className="p-3 text-slate-700 hover:bg-indigo-100 transition-colors"
                    >
                      <span className="material-symbols-outlined w-5 h-5 block">+</span>
                    </button>
                    <div className="h-px bg-slate-200"></div>
                    <button
                      title="Zoom Out"
                      onClick={() => {
                        const map = mapRef.current;
                        if (map) map.setZoom(Math.max(map.getZoom() - 1, 1));
                      }}
                      className="p-3 text-slate-700 hover:bg-indigo-100 transition-colors"
                    >
                      <span className="material-symbols-outlined w-5 h-5 block">-</span>
                    </button>
                  </div>


                  <button
                    title="Center to my location"
                    onClick={handleLocateMe}
                    className="p-3 rounded-xl shadow-xl bg-white/90 backdrop-blur-md text-indigo-600 hover:bg-indigo-100 transition-colors border border-slate-200"
                  >
                    <LocateFixed className="w-5 h-5" />
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

                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CartoDB</a>'
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
                    />

                    <MapFlyTo position={flyToPos} />

                    {filteredAndSorted.map((c) => {
                      const colorClass = speedColorClass(c.avgSpeed);
                      return (
                        <Marker key={c.id} position={c.coords}>
                          <Popup>
                            <div className="max-w-xs p-2">
                              <div className="font-extrabold text-xl text-indigo-600">{c.name}</div>
                              <div className="mt-2 text-md text-slate-700 flex items-center gap-1">
                                <Gauge className="w-4 h-4 text-teal-500" /> Avg Speed: <span className="font-bold text-lg">{c.avgSpeed.toFixed(1)} Mbps</span>
                              </div>
                              <div className="text-sm text-slate-500 flex items-center gap-1">
                                <List className="w-4 h-4" /> Reports: <span className="font-medium">{c.count}</span>
                              </div>

                              <div className="mt-3 pt-3 border-t border-slate-200">
                                <div className="text-xs text-slate-500 mb-1 font-medium">Remote Work Score (5/5 = Excellent)</div>
                                <div className="flex gap-1">

                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-5 h-4 rounded-sm transition-colors duration-300 ${i < Math.min(5, Math.round(c.avgSpeed / 25)) ? "bg-indigo-600" : "bg-gray-200"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Popup>

                          <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                            <div className={`px-3 py-1.5 rounded-full text-xs font-bold transition duration-300 ${colorClass}`}>
                              {c.avgSpeed.toFixed(0)} Mbps
                            </div>
                          </Tooltip>
                        </Marker>
                      );
                    })}
                  </MapContainer>
                </div>
              </div>


              <div className="mt-10 max-w-5xl mx-auto p-4 rounded-xl bg-white shadow-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Speed Legend</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-teal-500 shadow-lg shadow-teal-500/30" /> <span className="text-sm font-medium text-slate-700">90+ Mbps (Excellent)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-400 shadow-lg shadow-green-400/30" /> <span className="text-sm font-medium text-slate-700">50-89 Mbps (Great)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/30" /> <span className="text-sm font-medium text-slate-700">30-49 Mbps (Fair)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-400 shadow-lg shadow-red-400/30" /> <span className="text-sm font-medium text-slate-700">Below 30 Mbps (Poor)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-8 text-sm text-slate-500 text-center">
            Data is crowd-sourced and aggregated. Locations without coordinates are not displayed on the map.
          </div>
        </main>
      </div>
    </>
  );
}