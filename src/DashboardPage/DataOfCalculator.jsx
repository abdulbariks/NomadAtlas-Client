import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Save,
  Edit2,
  X,
  Search,
  AlertCircle,
} from "lucide-react";

const API_URL = "https://nomad-atlas-server-pi.vercel.app/cost-calculator";

const DataOfCalculator = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form states
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([
    { name: "", livingCost: "", luxuryScore: "" },
  ]);

  // Edit states
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load countries" });
    } finally {
      setLoading(false);
    }
  };

  const addCity = () => {
    setCities([...cities, { name: "", livingCost: "", luxuryScore: "" }]);
  };

  const removeCity = (index) => {
    if (cities.length > 1) {
      setCities(cities.filter((_, i) => i !== index));
    }
  };

  const updateCity = (index, field, value) => {
    const updatedCities = cities.map((city, i) =>
      i === index ? { ...city, [field]: value } : city
    );
    setCities(updatedCities);
  };

  const validateForm = () => {
    if (!country.trim()) {
      setMessage({ type: "error", text: "Country name is required" });
      return false;
    }

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      if (!city.name.trim()) {
        setMessage({ type: "error", text: `City ${i + 1}: Name is required` });
        return false;
      }
      if (!city.livingCost || city.livingCost <= 0) {
        setMessage({
          type: "error",
          text: `City ${i + 1}: Valid living cost is required`,
        });
        return false;
      }
      if (!city.luxuryScore || city.luxuryScore < 0 || city.luxuryScore > 100) {
        setMessage({
          type: "error",
          text: `City ${i + 1}: Luxury score must be between 0-100`,
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    setMessage({ type: "", text: "" });
    if (!validateForm()) return;

    setLoading(true);
    try {
      const method = editMode ? "PUT" : "POST";
      const url = editMode ? `${API_URL}/${editingId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: country.trim(),
          cities: cities.map((city) => ({
            name: city.name.trim(),
            livingCost: Number(city.livingCost),
            luxuryScore: Number(city.luxuryScore),
          })),
        }),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: editMode
            ? "Country updated successfully!"
            : "Country added successfully!",
        });
        resetForm();
        fetchCountries();
        setTimeout(() => setActiveTab("list"), 1500);
      } else {
        const error = await response.json();
        setMessage({
          type: "error",
          text: error.message || "Failed to save data",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (countryData) => {
    setEditMode(true);
    setEditingId(countryData._id);
    setCountry(countryData.country);
    setCities(
      countryData.cities.map((city) => ({
        name: city.name,
        livingCost: city.livingCost,
        luxuryScore: city.luxuryScore,
      }))
    );
    setActiveTab("add");
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Country deleted successfully!" });
        fetchCountries();
        setShowDeleteConfirm(null);
      } else {
        setMessage({ type: "error", text: "Failed to delete country" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCountry("");
    setCities([{ name: "", livingCost: "", luxuryScore: "" }]);
    setEditMode(false);
    setEditingId(null);
    setMessage({ type: "", text: "" });
  };

  const filteredCountries = countries.filter(
    (c) =>
      c.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cities.some((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Country & Cities Management
            </h1>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-4 px-6">
              <button
                onClick={() => {
                  setActiveTab("list");
                  resetForm();
                }}
                className={`py-3 px-4 font-medium border-b-2 transition ${
                  activeTab === "list"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                All Countries ({countries.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab("add");
                  if (editMode) resetForm();
                }}
                className={`py-3 px-4 font-medium border-b-2 transition ${
                  activeTab === "add"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {editMode ? "Edit Country" : "Add New Country"}
              </button>
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <div className="mx-6 mt-4">
              <div
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                <AlertCircle size={20} className="mt-0.5" />
                <span>{message.text}</span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {activeTab === "list" ? (
              <div>
                {/* Search */}
                <div className="mb-6">
                  <div className="relative max-w-md">
                    <Search
                      className="absolute left-3 top-3 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search countries or cities..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Countries List */}
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                  </div>
                ) : filteredCountries.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No countries found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCountries.map((countryData) => (
                      <div
                        key={countryData._id}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {countryData.country}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {countryData.cities.length} cities
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(countryData)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() =>
                                setShowDeleteConfirm(countryData._id)
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {countryData.cities.map((city) => (
                            <div
                              key={city._id}
                              className="bg-gray-50 p-3 rounded-lg"
                            >
                              <p className="font-semibold text-gray-800">
                                {city.name}
                              </p>
                              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                <span>💰 ${city.livingCost}</span>
                                <span>⭐ {city.luxuryScore}/100</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Delete Confirmation */}
                        {showDeleteConfirm === countryData._id && (
                          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 font-medium mb-3">
                              Are you sure you want to delete{" "}
                              {countryData.country}? This action cannot be
                              undone.
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDelete(countryData._id)}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400"
                              >
                                Yes, Delete
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* Add/Edit Form */}
                <div className="max-w-4xl">
                  {editMode && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                      <span className="text-blue-800 font-medium">
                        Editing: {country}
                      </span>
                      <button
                        onClick={resetForm}
                        className="text-blue-600 hover:text-blue-800"
                        title="Cancel editing"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}

                  {/* Country Input */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country Name *
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., Spain"
                    />
                  </div>

                  {/* Cities Section */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Cities
                      </h3>
                      <button
                        onClick={addCity}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <Plus size={18} />
                        Add City
                      </button>
                    </div>

                    <div className="space-y-4">
                      {cities.map((city, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium text-gray-700">
                              City {index + 1}
                            </h4>
                            {cities.length > 1 && (
                              <button
                                onClick={() => removeCity(index)}
                                className="text-red-600 hover:text-red-800 transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                City Name *
                              </label>
                              <input
                                type="text"
                                value={city.name}
                                onChange={(e) =>
                                  updateCity(index, "name", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="e.g., Barcelona"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Living Cost ($) *
                              </label>
                              <input
                                type="number"
                                value={city.livingCost}
                                onChange={(e) =>
                                  updateCity(
                                    index,
                                    "livingCost",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="e.g., 1300"
                                min="0"
                                step="1"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Luxury Score (0-100) *
                              </label>
                              <input
                                type="number"
                                value={city.luxuryScore}
                                onChange={(e) =>
                                  updateCity(
                                    index,
                                    "luxuryScore",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="e.g., 80"
                                min="0"
                                max="100"
                                step="1"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                    >
                      <Save size={18} />
                      {loading
                        ? "Saving..."
                        : editMode
                        ? "Update Country"
                        : "Save Country"}
                    </button>

                    <button
                      onClick={resetForm}
                      disabled={loading}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed font-medium"
                    >
                      {editMode ? "Cancel Edit" : "Reset Form"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataOfCalculator;
