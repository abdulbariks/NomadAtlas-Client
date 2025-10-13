import React, { useState } from "react";

const CostCalculator2 = ({ data }) => {
  const [days, setDays] = useState(30);
  const [maxBudget, setMaxBudget] = useState(2000);
  const [minLuxury, setMinLuxury] = useState(50);
  const [internetSpeed, setInternetSpeed] = useState("any");
  const [beachAccess, setBeachAccess] = useState("any");
  const [weather, setWeather] = useState("any");
  const [lifestyle, setLifestyle] = useState("any");
  const [safety, setSafety] = useState("any");
  const [results, setResults] = useState([]);

  // Calculate options based on user preferences
  const calculateOptions = () => {
    let options = [];

    // Loop through all countries and cities
    data.forEach((country) => {
      country.cities.forEach((city) => {
        // Calculate cost per day
        const costPerDay = city.livingCost / 30;

        // Calculate total cost for given days
        const totalCost = costPerDay * days;

        // Check if within budget
        if (totalCost <= maxBudget) {
          // Check luxury requirement
          if (city.luxuryScore >= minLuxury) {
            // Calculate how many days possible with max budget
            const possibleDays = Math.floor(maxBudget / costPerDay);

            // Optional filters (future features - ekhon skip korbe if data nai)
            let passOptionalFilters = true;

            // Internet speed filter
            if (internetSpeed !== "any" && city.internetSpeed) {
              if (internetSpeed === "average" && city.internetSpeed < 30)
                passOptionalFilters = false;
              if (internetSpeed === "good" && city.internetSpeed < 50)
                passOptionalFilters = false;
              if (internetSpeed === "excellent" && city.internetSpeed < 100)
                passOptionalFilters = false;
            }

            // Beach access filter
            if (beachAccess === "yes" && city.beachAccess !== true) {
              passOptionalFilters = false;
            }

            // Weather filter
            if (weather !== "any" && city.weather && city.weather !== weather) {
              passOptionalFilters = false;
            }

            // Lifestyle filter
            if (
              lifestyle !== "any" &&
              city.lifestyle &&
              city.lifestyle !== lifestyle
            ) {
              passOptionalFilters = false;
            }

            // Safety filter
            if (safety !== "any" && city.safetyScore) {
              if (safety === "verySafe" && city.safetyScore < 90)
                passOptionalFilters = false;
              if (safety === "safe" && city.safetyScore < 70)
                passOptionalFilters = false;
              if (safety === "moderate" && city.safetyScore < 50)
                passOptionalFilters = false;
            }

            // If passes all filters, add to options
            if (passOptionalFilters) {
              options.push({
                ...city,
                country: country.country,
                totalCost: Math.round(totalCost),
                possibleDays: possibleDays,
                costPerDay: Math.round(costPerDay),
              });
            }
          }
        }
      });
    });

    // Sort by possible days (highest first)
    const sorted = options.sort((a, b) => b.possibleDays - a.possibleDays);

    // Update results state
    setResults(sorted);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Advanced Cost Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find cities that match your travel duration, budget and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-blue-300 rounded-2xl p-6 shadow-lg sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Your Preferences
            </h2>

            {/* Days Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How many days will you travel? 🗓️
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg font-semibold"
                placeholder="e.g., 30"
                min="1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter number of days you want to travel
              </p>
            </div>

            {/* Budget Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Maximum Budget ($) 💰
              </label>
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg font-semibold"
                placeholder="e.g., 2000"
                min="0"
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum amount you can spend
              </p>
            </div>

            {/* Minimum Luxury Score */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minimum Luxury Level ⭐
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  value={minLuxury}
                  onChange={(e) => setMinLuxury(Number(e.target.value))}
                  className="flex-1"
                  min="0"
                  max="100"
                  step="5"
                />
                <span className="text-2xl font-bold text-blue-600 w-16 text-center">
                  {minLuxury}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Basic</span>
                <span>Luxury</span>
              </div>
            </div>

            {/* Optional Preferences */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>✨</span> Others (Optional)
                </h3>

                {/* Internet Speed */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Internet Speed 🌐
                  </label>
                  <select
                    value={internetSpeed}
                    onChange={(e) => setInternetSpeed(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                  >
                    <option value="any">Any Speed</option>
                    <option value="average">Average (30-50 Mbps)</option>
                    <option value="good">Good (50-100 Mbps)</option>
                    <option value="excellent">Excellent (100+ Mbps)</option>
                  </select>
                </div>

                {/* Beach Access */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Beach Access 🏖️
                  </label>
                  <select
                    value={beachAccess}
                    onChange={(e) => setBeachAccess(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                  >
                    <option value="any">Any</option>
                    <option value="yes">Must have beach</option>
                    <option value="no">No preference</option>
                  </select>
                </div>

                {/* Weather Preference */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weather Preference ☀️
                  </label>
                  <select
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                  >
                    <option value="any">Any Weather</option>
                    <option value="tropical">Tropical (Hot)</option>
                    <option value="moderate">Moderate</option>
                    <option value="cold">Cold</option>
                  </select>
                </div>

                {/* Lifestyle Type */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lifestyle Type 🎯
                  </label>
                  <select
                    value={lifestyle}
                    onChange={(e) => setLifestyle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                  >
                    <option value="any">Any</option>
                    <option value="tech">Tech Hub</option>
                    <option value="nature">Nature & Mountains</option>
                    <option value="cultural">Cultural & Historical</option>
                    <option value="nightlife">Nightlife & Party</option>
                  </select>
                </div>

                {/* Safety Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Safety Level 🛡️
                  </label>
                  <select
                    value={safety}
                    onChange={(e) => setSafety(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                  >
                    <option value="any">Any</option>
                    <option value="verySafe">Very Safe (90-100)</option>
                    <option value="safe">Safe (70-90)</option>
                    <option value="moderate">Moderate (50-70)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateOptions}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
            >
              Find Perfect Cities 🔍
            </button>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="lg:col-span-2">
          {results.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No Results Yet
              </h3>
              <p className="text-gray-500">
                Set your preferences and click "Find Perfect Cities" to see
                results
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  Best Matches for You
                </h2>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                  {results.length} Cities Found
                </span>
              </div>

              {/* Results Grid */}
              <div className="space-y-4">
                {results.map((city, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 hover:border-blue-400"
                  >
                    {/* City Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {city.name}
                        </h3>
                        <p className="text-gray-500">{city.country}</p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
                        #{index + 1}
                      </div>
                    </div>

                    {/* City Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Total Cost</p>
                        <p className="text-xl font-bold text-blue-600">
                          ${city.totalCost}
                        </p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Possible Days
                        </p>
                        <p className="text-xl font-bold text-green-600">
                          {city.possibleDays}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Luxury Score
                        </p>
                        <p className="text-xl font-bold text-purple-600">
                          {city.luxuryScore}/100
                        </p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Cost/Month</p>
                        <p className="text-xl font-bold text-orange-600">
                          ${city.livingCost}
                        </p>
                      </div>
                    </div>

                    {/* Extra Info */}
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        💰 ${(city.livingCost / 30).toFixed(2)}/day
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        ⭐ Luxury {city.luxuryScore}
                      </span>
                      {city.beachAccess && (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          🏖️ Beach Access
                        </span>
                      )}
                    </div>

                    {/* Insight */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        💡 <span className="font-semibold">Insight:</span> With
                        your ${maxBudget} budget for {days} days, you can
                        actually stay{" "}
                        <span className="font-bold text-green-600">
                          {city.possibleDays} days
                        </span>{" "}
                        in {city.name}!
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary Card */}
          {results.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                📊 Quick Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Cities Found</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {results.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Cost</p>
                  <p className="text-2xl font-bold text-green-600">
                    $
                    {results.length > 0
                      ? Math.round(
                          results.reduce((a, b) => a + b.totalCost, 0) /
                            results.length
                        )
                      : 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Max Possible Days</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {results.length > 0
                      ? Math.max(...results.map((r) => r.possibleDays))
                      : 0}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostCalculator2;
