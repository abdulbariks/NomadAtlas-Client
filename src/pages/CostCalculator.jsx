import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const CostCalclator = ({ data }) => {
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
  let allCities = [];
  for (const country of data) {
    for (const city of country.cities) {
      allCities.push({
        ...city,
        country: country.country,
      });
    }
  }

  const lowCostCity = allCities
    .map((city) => {
      const daysInCity = Math.floor(budget / (city.livingCost / 30));
      return { ...city, days: daysInCity };
    })
    .filter((city) => city.days > days);

  // with same budget if there any luxury city.
  const betterLuxuryCities = data.flatMap((country) =>
    country.cities
      .map((city) => {
        // how many days can stay with the same budget
        const cityDays = Math.floor(budget / (city.livingCost / 30));
        return { ...city, country: country.country, days: cityDays };
      })
      .filter(
        (city) =>
          city.luxuryScore > selectedCity?.luxuryScore && // Luxury score higher
          city.days >= days // Same or more days than selected city
      )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10 -mt-5">
      {/* Budget Input */}
      <div className="mb-8 max-w-md mx-auto">
        <label className="block font-semibold text-xl text-gray-800 mb-2">
          Enter your travel <span className="text-blue-500">budget ($)</span>
        </label>
        <input
          type="number"
          name="budgetInput"
          onChange={(e) => setBudget(Number(e.target.value))}
          placeholder="Example: 5000"
          className="w-full border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Country & City Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Country Selection */}
        <div className="bg-white border border-blue-300 rounded-2xl p-6 shadow-md">
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
        <div className="bg-white border border-blue-300 rounded-2xl p-6 shadow-md">
          <p className="text-xl font-semibold text-center mb-4 text-gray-800">
            Select a City in{" "}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Result Card */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-3 text-center">
              Result for{" "}
              <span className="text-green-600">{selectedCity?.name}</span>,{" "}
              <span className="text-blue-600">{selectedCountry}</span>
            </h3>
            <p className="text-gray-700 text-center text-lg mb-4">
              With a budget of{" "}
              <span className="font-semibold text-green-600">${budget}</span>,
              you can stay about{" "}
              <span className="font-semibold text-blue-600">{days} days</span>{" "}
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
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Suggestions for You
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-700">
                  You can stay more than{" "}
                  <span className="text-green-600">{days}</span> days with your
                  current budget{" "}
                  <span className="text-blue-500">
                    ($
                    {budget})
                  </span>{" "}
                  in{" "}
                  <span className="text-green-600">{lowCostCity.length}</span>{" "}
                  cities:
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {lowCostCity.map((city) => (
                    <li key={city.name}>
                      <span className="font-medium text-gray-800">
                        {city.name}
                      </span>{" "}
                      ({city.country}) →{" "}
                      <span className="text-blue-600 font-semibold">
                        {city.days} days
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Better Luxury Options */}
              {betterLuxuryCities.length > 0 && (
                <div className="bg-gray-50 border border-blue-300 rounded-xl p-4 mt-4">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Affordable Luxury Upgrade ✨
                  </h3>
                  <p className="font-semibold text-lg mb-2 text-gray-700">
                    With your current budget of{" "}
                    <span className="font-semibold text-green-600">
                      ${budget}
                    </span>
                    , you can stay in these{" "}
                    <span className="text-blue-600 font-medium">
                      more luxurious cities
                    </span>{" "}
                    for the same <span className="text-blue-500">{days}</span>{" "}
                    days or even longer than{" "}
                    <span className="text-blue-500">{days}</span> days you could
                    stay in{" "}
                    <span className="text-green-600">{selectedCity?.name}</span>
                    .
                  </p>

                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    {betterLuxuryCities.map((city) => (
                      <li key={city.name}>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-gray-800">
                            {city.name} ({city.country})
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="text-blue-600 font-semibold">
                            {city.days} days
                          </span>
                        </div>
                        <div className="mt-1 text-gray-700 ml-6">
                          <span className="font-medium">Status:</span> more
                          luxurious than{" "}
                          <span className="text-green-600">
                            {selectedCity?.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-2xl text-center font-bold text-red-500 mt-3">
          Enter a budget, select a country, and select a city to see results
        </p>
      )}
    </div>
  );
};

export default CostCalclator;
