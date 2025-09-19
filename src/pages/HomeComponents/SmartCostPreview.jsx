import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

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

  const selectedCountryData = data.find(
    (countryData) => countryData.country === selectedCountry
  );
  const citiesOfCountry = selectedCountryData?.cities || [];

  // Days in selected city
  const days = selectedCity
    ? Math.floor(budget / (selectedCity.livingCost / 30))
    : 0;

  // Days in other cities
  const otherCitiesDays = [];
  data.forEach((country) => {
    country.cities.forEach((city) => {
      const daysInCity = Math.floor(budget / (city.livingCost / 30));
      otherCitiesDays.push({
        city: city.name,
        country: country.country,
        days: daysInCity,
      });
    });
  });

  // Budget increase scenarios
  const budgetPlus10 = budget * 1.1;
  const budgetPlus20 = budget * 1.2;

  const luxuryOptions = [];
  data.forEach((country) => {
    country.cities.forEach((city) => {
      const days10 = Math.floor(budgetPlus10 / (city.livingCost / 30));
      const days20 = Math.floor(budgetPlus20 / (city.livingCost / 30));
      if (days10 > 0 || days20 > 0) {
        luxuryOptions.push({
          city: city.name,
          country: country.country,
          luxuryPoint: city.luxuryPoint,
          days10,
          days20,
        });
      }
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 ">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Smart Cost Calculator Preview
      </h1>

      <p className="text-3xl font-bold text-blue-500 text-center">
        Budget Based calculation
      </p>
      {/* Budget Input */}
      <div className="mb-6">
        <label className="block font-semibold text-lg text-gray-700 mb-2">
          Enter your travel budget ($)
        </label>
        <input
          type="number"
          name="budgetInput"
          onChange={(e) => setBudget(Number(e.target.value))}
          placeholder="Example: 5000"
          className="w-full border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Country and City Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Country Selection */}
        <div className="bg-white border border-blue-300 rounded-2xl p-6 shadow-sm">
          <p className="text-xl font-semibold text-center mb-4 text-gray-800">
            Select a Country
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.map((country) => (
              <button
                key={country.country}
                onClick={() => setSelectedCountry(country.country)}
                className={`px-5 py-2.5 rounded-full border transition-all duration-200 font-medium shadow-sm hover:shadow-md cursor-pointer ${
                  selectedCountry === country.country
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                }`}
              >
                {country.country}
              </button>
            ))}
          </div>
        </div>

        {/* City Selection */}
        <div className="bg-white border border-blue-300 rounded-2xl p-6 shadow-sm">
          <p className="text-xl font-semibold text-center mb-4 text-gray-800">
            Select a City of{" "}
            <span className="text-blue-600">{selectedCountry}</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {citiesOfCountry.map((city) => (
              <button
                key={city.name}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2.5 rounded-full border transition-all duration-200 font-medium shadow-sm hover:shadow-md cursor-pointer ${
                  selectedCity?.name === city.name
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result & Suggestions */}
      {selectedCountry && selectedCity && budget ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Result Card */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold mb-3 text-center">
              Result for{" "}
              <span className="text-green-600">{selectedCity?.name}</span>,
              <span className="text-blue-600"> {selectedCountry}</span>
            </h3>
            <p className="text-gray-700 text-center text-lg mb-4">
              With a budget of{" "}
              <span className="font-semibold text-green-600">${budget}</span>,
              you can stay about
              <span className="font-semibold text-blue-600"> {days} days </span>
              in {selectedCity?.name}.
            </p>

            {/* Selected City Details */}
            {selectedCity && (
              <div className="bg-white border border-blue-300 rounded-xl p-4 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  City Details
                </h4>
                <p className="text-gray-600">Name: {selectedCity.name}</p>
                <p className="text-gray-600">
                  Living Cost: ${selectedCity.livingCost} / month
                </p>
                <p className="text-gray-600">
                  Approx. Daily Cost: $
                  {(selectedCity.livingCost / 30).toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Suggestions Card */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Suggestions for You
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-700">
                  Other cities you can check out:
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {otherCitiesDays.map((c) => (
                    <li key={c.city}>
                      <span className="font-medium text-gray-800">
                        {c.city}
                      </span>{" "}
                      ({c.country}) →{" "}
                      <span className="text-blue-600 font-semibold">
                        {c.days} days
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Budget Increase Options */}
              <div className="bg-gray-50 border border-blue-300 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  If you increase your budget:
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-600 mb-1">
                      +10% Budget
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {luxuryOptions.map((c) => (
                        <li key={c.city}>
                          <span className="text-green-600 font-medium">
                            {c.city}
                          </span>{" "}
                          ({c.country}) →
                          <span className="text-blue-600 font-semibold">
                            {" "}
                            {c.days10} days
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600 mb-1">
                      +20% Budget
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {luxuryOptions.map((c) => (
                        <li key={c.city}>
                          <span className="text-green-600 font-medium">
                            {c.city}
                          </span>{" "}
                          ({c.country}) →
                          <span className="text-blue-600 font-semibold">
                            {" "}
                            {c.days20} days
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-2xl text-center font-bold text-red-500 mt-3">
          Enter Budget, Select country and select city to see result
        </p>
      )}

      {/* CTA Button */}
      <div className="flex justify-center mt-10">
        <Link
          to="/explore"
          className="bg-blue-600 text-white py-3 px-6 rounded-full flex items-center gap-3 text-lg font-medium shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          Explore More Options <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default SmartCostPreview;
