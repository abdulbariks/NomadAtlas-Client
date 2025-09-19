import React, { useState } from "react";

const data = [
  {
    country: "Germany",
    cities: [
      { name: "Berlin", livingCost: 1500 },
      { name: "Munich", livingCost: 1800 },
      { name: "Hamburg", livingCost: 1400 },
    ],
  },
  {
    country: "Spain",
    cities: [
      { name: "Barcelona", livingCost: 1300 },
      { name: "Madrid", livingCost: 1200 },
    ],
  },
  {
    country: "Thailand",
    cities: [
      { name: "Bangkok", livingCost: 800 },
      { name: "Chiang Mai", livingCost: 600 },
    ],
  },
];

const SmartCostPreview = () => {
  const [selectedCountry, setSelectedCountry] = useState("Germany");
  const [selectedCity, setSelectedCity] = useState(null);

  const [budget, setBudget] = useState(0);
  // console.log(budget);

  const selectedCountryData = data.find(
    (countryData) => countryData.country == selectedCountry
  );
  // console.log(selectedCountryData);
  const citiesOfCountry = selectedCountryData?.cities || [];
  // console.log(citiesOfCountry);

  // how may days he can stay.
  const days = selectedCity
    ? Math.floor(budget / (selectedCity.livingCost / 30))
    : 0;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center">
        Smar Cost Calculator preview
      </h1>

      {/* Budget Input */}
      <div className="mb-4">
        <label className="block font-medium text-lg text-gray-700 mb-1 ">
          Enter your budget jawa ashar koroch. ($)
        </label>
        <input
          type="number"
          name="budgetInput"
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Example: 5000"
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Country Select */}
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Option to select a country */}
          <div className="border rounded-2xl p-5">
            <p className="block text-2xl font-bold text-center text-gray-700 mb-1">
              Select a country
            </p>
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              {data.map((country) => (
                <button
                  key={country.country}
                  onClick={() => setSelectedCountry(country.country)}
                  className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    selectedCountry === country.country
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                  }`}
                >
                  {country.country}
                </button>
              ))}
            </div>
          </div>

          {/* Option to select a City */}
          <div className="border rounded-2xl p-5">
            <p className="block text-2xl font-bold text-center text-gray-700 mb-1">
              Select a City of{" "}
              <span className="text-blue-500">{selectedCountry}</span>
            </p>

            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              {citiesOfCountry.map((city) => (
                <button
                  key={city.name}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    selectedCity?.name === city.name
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result or feedbact to user */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border rounded-2xl p-5 mt-5">
          {/* result */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">
              Result for{" "}
              <span className="text-green-600">{selectedCity?.name}</span> ,{" "}
              <span className="text-blue-600">{selectedCountry}</span>
            </h3>
            <p className="text-gray-700">
              With a budget of{" "}
              <span className="font-bold text-green-600">${budget}</span>{" "}
              dollers, you can stay about{" "}
              <span className="font-bold text-blue-600">{days} days</span> in{" "}
              {selectedCity?.name}.
            </p>
          </div>

          {/* Suggestions */}
          <div>
            <h1 className="text-2xl font-bold">Suggestion for you</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCostPreview;
