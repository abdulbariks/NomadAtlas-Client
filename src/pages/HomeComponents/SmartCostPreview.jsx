import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const data = [
  {
    country: "Germany",
    cities: [
      { name: "Berlin", livingCost: 1500, luxuryScore: 80 },
      { name: "Munich", livingCost: 1800, luxuryScore: 90 },
      { name: "Hamburg", livingCost: 1400, luxuryScore: 70 },
      { name: "Frankfurt", livingCost: 1600, luxuryScore: 85 },
      { name: "Cologne", livingCost: 1500, luxuryScore: 75 },
    ],
  },
  {
    country: "Spain",
    cities: [
      { name: "Barcelona", livingCost: 1300, luxuryScore: 80 },
      { name: "Madrid", livingCost: 1200, luxuryScore: 70 },
      { name: "Seville", livingCost: 1100, luxuryScore: 65 },
      { name: "Valencia", livingCost: 1150, luxuryScore: 68 },
      { name: "Granada", livingCost: 1000, luxuryScore: 60 },
    ],
  },
  {
    country: "Thailand",
    cities: [
      { name: "Bangkok", livingCost: 800, luxuryScore: 60 },
      { name: "Chiang Mai", livingCost: 600, luxuryScore: 50 },
      { name: "Phuket", livingCost: 900, luxuryScore: 70 },
      { name: "Pattaya", livingCost: 850, luxuryScore: 65 },
    ],
  },
  {
    country: "USA",
    cities: [
      { name: "New York", livingCost: 3000, luxuryScore: 95 },
      { name: "Los Angeles", livingCost: 2800, luxuryScore: 90 },
      { name: "Miami", livingCost: 2500, luxuryScore: 85 },
      { name: "Chicago", livingCost: 2200, luxuryScore: 80 },
      { name: "San Francisco", livingCost: 3200, luxuryScore: 92 },
    ],
  },
  {
    country: "Japan",
    cities: [
      { name: "Tokyo", livingCost: 2500, luxuryScore: 90 },
      { name: "Osaka", livingCost: 2000, luxuryScore: 85 },
      { name: "Kyoto", livingCost: 1800, luxuryScore: 80 },
      { name: "Sapporo", livingCost: 1700, luxuryScore: 75 },
    ],
  },
  {
    country: "Australia",
    cities: [
      { name: "Sydney", livingCost: 2400, luxuryScore: 88 },
      { name: "Melbourne", livingCost: 2200, luxuryScore: 85 },
      { name: "Brisbane", livingCost: 1800, luxuryScore: 80 },
      { name: "Perth", livingCost: 1900, luxuryScore: 82 },
    ],
  },
  {
    country: "Canada",
    cities: [
      { name: "Toronto", livingCost: 2000, luxuryScore: 85 },
      { name: "Vancouver", livingCost: 2100, luxuryScore: 88 },
      { name: "Montreal", livingCost: 1800, luxuryScore: 80 },
      { name: "Calgary", livingCost: 1700, luxuryScore: 78 },
    ],
  },
  {
    country: "France",
    cities: [
      { name: "Paris", livingCost: 2500, luxuryScore: 95 },
      { name: "Lyon", livingCost: 1800, luxuryScore: 80 },
      { name: "Marseille", livingCost: 1700, luxuryScore: 78 },
      { name: "Nice", livingCost: 1900, luxuryScore: 82 },
    ],
  },
  {
    country: "Italy",
    cities: [
      { name: "Rome", livingCost: 2200, luxuryScore: 90 },
      { name: "Milan", livingCost: 2300, luxuryScore: 92 },
      { name: "Venice", livingCost: 2000, luxuryScore: 88 },
      { name: "Florence", livingCost: 1800, luxuryScore: 85 },
    ],
  },
  {
    country: "UK",
    cities: [
      { name: "London", livingCost: 2700, luxuryScore: 95 },
      { name: "Manchester", livingCost: 1800, luxuryScore: 80 },
      { name: "Edinburgh", livingCost: 1900, luxuryScore: 82 },
    ],
  },
  {
    country: "UAE",
    cities: [
      { name: "Dubai", livingCost: 2600, luxuryScore: 95 },
      { name: "Abu Dhabi", livingCost: 2500, luxuryScore: 92 },
      { name: "Sharjah", livingCost: 1800, luxuryScore: 80 },
    ],
  },
  {
    country: "Singapore",
    cities: [
      { name: "Singapore City", livingCost: 2800, luxuryScore: 95 },
      { name: "Sentosa", livingCost: 2600, luxuryScore: 90 },
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Smart Cost Calculator Preview
      </h1>

      <p className="text-2xl font-semibold text-blue-600 text-center mb-6">
        Budget-Based Calculation
      </p>

      {/* Budget Input */}
      <div className="mb-8 max-w-md mx-auto">
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
                  current budget (${budget}) in{" "}
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
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Affordable Luxury Upgrade ✨
                  </h3>
                  <p className="text-gray-600 mb-3">
                    With your current budget of{" "}
                    <span className="font-semibold text-green-600">
                      ${budget}
                    </span>
                    , you can stay in these{" "}
                    <span className="text-blue-600 font-medium">
                      more luxurious cities
                    </span>{" "}
                    for the same or even more days than in{" "}
                    <span className="text-green-600">{selectedCity?.name}</span>
                    :
                  </p>

                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {betterLuxuryCities.map((city) => (
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
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-2xl text-center font-bold text-red-500 mt-3">
          Enter a budget, select a country, and select a city to see results
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
