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

  const getActiveFilters = () => {
    const filters = [];

    if (internetSpeed !== "any") {
      const speedLabels = {
        average: "Average Internet (30-50 Mbps)",
        good: "Good Internet (50-100 Mbps)",
        excellent: "Excellent Internet (100+ Mbps)",
      };
      filters.push(speedLabels[internetSpeed]);
    }

    if (beachAccess === "yes") filters.push("Beach Access");

    if (weather !== "any") {
      const weatherLabels = {
        tropical: "Tropical Weather",
        moderate: "Moderate Weather",
        cold: "Cold Weather",
      };
      filters.push(weatherLabels[weather]);
    }

    if (lifestyle !== "any") {
      const lifestyleLabels = {
        tech: "Tech Hub",
        nature: "Nature & Mountains",
        cultural: "Cultural & Historical",
        nightlife: "Nightlife & Party",
      };
      filters.push(lifestyleLabels[lifestyle]);
    }

    if (safety !== "any") {
      const safetyLabels = {
        verySafe: "Very Safe (90-100)",
        safe: "Safe (70-90)",
        moderate: "Moderate Safety (50-70)",
      };
      filters.push(safetyLabels[safety]);
    }

    if (minLuxury > 0) filters.push(`Luxury ${minLuxury}+`);

    return filters;
  };

  const calculateOptions = () => {
    let options = [];

    data.forEach((country) => {
      country.cities.forEach((city) => {
        const costPerDay = city.livingCost / 30;
        const totalCost = costPerDay * days;

        if (totalCost <= maxBudget && city.luxuryScore >= minLuxury) {
          const possibleDays = Math.floor(maxBudget / costPerDay);
          let passOptionalFilters = true;

          if (internetSpeed !== "any" && city.internetSpeed) {
            if (internetSpeed === "average" && city.internetSpeed < 30)
              passOptionalFilters = false;
            if (internetSpeed === "good" && city.internetSpeed < 50)
              passOptionalFilters = false;
            if (internetSpeed === "excellent" && city.internetSpeed < 100)
              passOptionalFilters = false;
          }

          if (beachAccess === "yes" && city.beachAccess !== true) {
            passOptionalFilters = false;
          }

          if (weather !== "any" && city.weather && city.weather !== weather) {
            passOptionalFilters = false;
          }

          if (
            lifestyle !== "any" &&
            city.lifestyle &&
            city.lifestyle !== lifestyle
          ) {
            passOptionalFilters = false;
          }

          if (safety !== "any" && city.safetyScore) {
            if (safety === "verySafe" && city.safetyScore < 90)
              passOptionalFilters = false;
            if (safety === "safe" && city.safetyScore < 70)
              passOptionalFilters = false;
            if (safety === "moderate" && city.safetyScore < 50)
              passOptionalFilters = false;
          }

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
      });
    });

    const sorted = options.sort((a, b) => b.possibleDays - a.possibleDays);
    setResults(sorted);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Advanced Cost Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find cities that match your travel duration, budget and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-cyan-100 rounded-2xl p-6 sticky top-4 transition duration-300 hover:scale-105 hover:border-cyan-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Your Preferences
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How many days will you travel? 
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-cyan-100 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-lg font-semibold"
                placeholder="e.g., 30"
                min="1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter number of days you want to travel
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Maximum Budget ($) 
              </label>
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-cyan-100 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-lg font-semibold"
                placeholder="e.g., 2000"
                min="0"
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum amount you can spend
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minimum Luxury Level 
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
                <span className="text-2xl font-bold text-cyan-600 w-16 text-center">
                  {minLuxury}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Basic</span>
                <span>Luxury</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-cyan-50 border-2 border-cyan-100 rounded-xl p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span></span> Others (Optional)
                </h3>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Internet Speed 
                  </label>
                  <select
                    value={internetSpeed}
                    onChange={(e) => setInternetSpeed(e.target.value)}
                    className="w-full px-3 py-2 border border-cyan-100 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
                  >
                    <option value="any">Any Speed</option>
                    <option value="average">Average (30-50 Mbps)</option>
                    <option value="good">Good (50-100 Mbps)</option>
                    <option value="excellent">Excellent (100+ Mbps)</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Beach Access 
                  </label>
                  <select
                    value={beachAccess}
                    onChange={(e) => setBeachAccess(e.target.value)}
                    className="w-full px-3 py-2 border border-cyan-100 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
                  >
                    <option value="any">Any</option>
                    <option value="yes">Must have beach</option>
                    <option value="no">No preference</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weather Preference 
                  </label>
                  <select
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)}
                    className="w-full px-3 py-2 border border-cyan-100 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
                  >
                    <option value="any">Any Weather</option>
                    <option value="tropical">Tropical (Hot)</option>
                    <option value="moderate">Moderate</option>
                    <option value="cold">Cold</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lifestyle Type 
                  </label>
                  <select
                    value={lifestyle}
                    onChange={(e) => setLifestyle(e.target.value)}
                    className="w-full px-3 py-2 border border-cyan-100 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
                  >
                    <option value="any">Any</option>
                    <option value="tech">Tech Hub</option>
                    <option value="nature">Nature & Mountains</option>
                    <option value="cultural">Cultural & Historical</option>
                    <option value="nightlife">Nightlife & Party</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Safety Level 
                  </label>
                  <select
                    value={safety}
                    onChange={(e) => setSafety(e.target.value)}
                    className="w-full px-3 py-2 border border-cyan-100 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
                  >
                    <option value="any">Any</option>
                    <option value="verySafe">Very Safe (90-100)</option>
                    <option value="safe">Safe (70-90)</option>
                    <option value="moderate">Moderate (50-70)</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={calculateOptions}
              className="w-full bg-cyan-600 text-white py-4 rounded-lg font-bold text-lg transition duration-300 hover:scale-105 border border-cyan-100 hover:border-cyan-300"
            >
              Find Perfect Cities 
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {results.length === 0 ? (
            <div className="bg-cyan-50 border-2 border-dashed border-cyan-100 rounded-2xl p-12 text-center">
              <div className="text-7xl mb-4">🗺️</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                Ready to Explore?
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                Set your travel preferences on the left and discover amazing
                cities that fit your budget!
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  Best Matches for You
                </h2>

                {getActiveFilters().length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-gray-600 text-sm">Filtered by:</span>
                    {getActiveFilters().map((filter, index) => (
                      <span
                        key={index}
                        className="bg-cyan-200 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                )}

                <span className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full font-semibold inline-block w-fit">
                  {results.length} Cities Found
                </span>
              </div>

              <div className="space-y-4">
                {results.map((city, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-cyan-100 rounded-xl p-6 transition duration-300 hover:scale-105 hover:border-cyan-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {city.name}
                        </h3>
                        <p className="text-gray-500">{city.country}</p>
                      </div>
                      <div className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full font-bold">
                        #{index + 1}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-cyan-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Total Cost</p>
                        <p className="text-xl font-bold text-cyan-600">
                          ${city.totalCost}
                        </p>
                      </div>
                      <div className="bg-cyan-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Possible Days
                        </p>
                        <p className="text-xl font-bold text-cyan-600">
                          {city.possibleDays}
                        </p>
                      </div>
                      <div className="bg-cyan-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Luxury Score</p>
                        <p className="text-xl font-bold text-cyan-600">
                          {city.luxuryScore}/100
                        </p>
                      </div>
                      <div className="bg-cyan-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Cost/Month</p>
                        <p className="text-xl font-bold text-cyan-600">
                          ${city.livingCost}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                         ${(city.livingCost / 30).toFixed(2)}/day
                      </span>
                      {city.internetSpeed && (
                        <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                           {city.internetSpeed} Mbps
                        </span>
                      )}
                      {city.beachAccess && (
                        <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                           Beach Access
                        </span>
                      )}
                      {city.weather && (
                        <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                          {city.weather === "tropical" && " Tropical"}
                          {city.weather === "moderate" && " Moderate"}
                          {city.weather === "cold" && " Cold"}
                        </span>
                      )}
                      {city.lifestyle && (
                        <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                          {city.lifestyle === "tech" && " Tech Hub"}
                          {city.lifestyle === "nature" && " Nature"}
                          {city.lifestyle === "cultural" && "Cultural"}
                          {city.lifestyle === "nightlife" && " Nightlife"}
                        </span>
                      )}
                      {city.safetyScore && (
                        <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                           Safety {city.safetyScore}/100
                        </span>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-cyan-100 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Daily Cost</p>
                        <p className="text-sm font-semibold text-gray-700">
                          ${(city.livingCost / 30).toFixed(2)} per day
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Monthly Cost</p>
                        <p className="text-sm font-semibold text-gray-700">
                          ${city.livingCost} per month
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-cyan-100 bg-cyan-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                       <span className="font-semibold">Value Insight:</span>{" "}
                        With your ${maxBudget} budget, you can stay{" "}
                        <span className="font-bold text-cyan-600">
                          {city.possibleDays} days
                        </span>{" "}
                        in {city.name}
                        {city.possibleDays > days && (
                          <span className="text-blue-600 font-semibold">
                            {" "}
                            ({city.possibleDays - days} extra days!)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-8 bg-cyan-50 border-2 border-cyan-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Quick Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Cities Found</p>
                  <p className="text-2xl font-bold text-cyan-600">
                    {results.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Cost</p>
                  <p className="text-2xl font-bold text-cyan-600">
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
                  <p className="text-2xl font-bold text-cyan-600">
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
