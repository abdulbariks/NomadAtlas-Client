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
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const selectedCountryData = data.find(
    (countryData) => countryData.country == selectedCountry
  );
  // console.log(selectedCountryData);
  const citiesOfCountry = selectedCountryData?.cities || [];
  // console.log(citiesOfCountry);

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
          placeholder="e.g. 5000"
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Country Select */}
      <div className="mb-4">
        <p className="block text-2xl font-bold text-center text-gray-700 mb-1">
          Select a country
        </p>

        {/* Option to select a country */}
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

        {/* Option to select a City */}
        <p className="block text-2xl font-bold text-center text-gray-700 mb-1">
          Select a City of{" "}
          <span className="text-blue-500">{selectedCountry}</span>
        </p>

        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {citiesOfCountry.map((city) => (
            <button
              key={city.name}
              onClick={() => setSelectedCity(city.name)}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                selectedCity === city.name
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
  );
};

export default SmartCostPreview;
