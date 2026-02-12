import React, { useState } from "react";

const CostCalculator = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState("Germany");
  const [selectedCity, setSelectedCity] = useState(null);
  const [budget, setBudget] = useState(0);

  const selectedCountryData = data.find(
    (countryData) => countryData.country === selectedCountry
  );
  const citiesOfCountry = selectedCountryData?.cities || [];

  const days = selectedCity
    ? Math.floor(budget / (selectedCity.livingCost / 30))
    : 0;

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

  const betterLuxuryCities = data.flatMap((country) =>
    country.cities
      .map((city) => {
        const cityDays = Math.floor(budget / (city.livingCost / 30));
        return { ...city, country: country.country, days: cityDays };
      })
      .filter(
        (city) =>
          city.luxuryScore > selectedCity?.luxuryScore && city.days >= days
      )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10 -mt-5">
      {/* Budget Input */}
      <div className="mb-8 max-w-md mx-auto">
        <label className="block font-bold text-2xl text-gray-800 mb-3">
          Enter your travel <span className="text-cyan-600">budget ($)</span>
        </label>
        <input
          type="number"
          name="budgetInput"
          onChange={(e) => setBudget(Number(e.target.value))}
          placeholder="Example: 5000"
          className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
        />
      </div>

      {/* Country & City Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Country Selection */}
        <div className="bg-white border-2 border-cyan-100 rounded-3xl p-8 transition duration-300 hover:scale-105 hover:border-cyan-300">
          <p className="text-2xl font-bold text-center mb-6 text-gray-800">
             Select a Country
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.map((country) => (
              <button
                key={country.country}
                onClick={() => setSelectedCountry(country.country)}
                className={`px-6 py-3 rounded-full border-2 transition duration-300 font-semibold cursor-pointer hover:scale-105 ${selectedCountry === country.country
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-cyan-400"
                  }`}
              >
                {country.country}
              </button>
            ))}
          </div>
        </div>

        {/* City Selection */}
        <div className="bg-white border-2 border-cyan-100 rounded-3xl p-8 transition duration-300 hover:scale-105 hover:border-cyan-300">
          <p className="text-2xl font-bold text-center mb-6 text-gray-800">
            Select a City in{" "}
            <span className="text-cyan-600">{selectedCountry}</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {citiesOfCountry.map((city) => (
              <button
                key={city.name}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-3 rounded-full border-2 transition duration-300 font-semibold cursor-pointer hover:scale-105 ${selectedCity?.name === city.name
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-cyan-400"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Result Card */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-200 p-8 rounded-3xl transition duration-300 hover:scale-105 hover:border-cyan-300">
            <h3 className="text-3xl font-bold mb-4 text-center text-gray-800">
              Result for{" "}
              <span className="text-cyan-600">{selectedCity?.name}</span>,{" "}
              <span className="text-cyan-600">{selectedCountry}</span>
            </h3>
            <p className="text-gray-700 text-center text-xl mb-6 leading-relaxed">
              With a budget of{" "}
              <span className="font-bold text-cyan-600 text-2xl">${budget}</span>
              , you can stay about{" "}
              <span className="font-bold text-cyan-600 text-2xl">{days} days</span>{" "}
              in {selectedCity?.name}.
            </p>

            {/* Selected City Details */}
            {selectedCity && (
              <div className="bg-white border-2 border-cyan-200 rounded-2xl p-6 transition duration-300 hover:scale-105 hover:border-cyan-300">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl"></span> City Details
                </h4>
                <div className="space-y-2">
                  <p className="text-gray-700 font-medium">
                    <span className="text-gray-500">Name:</span>{" "}
                    <span className="text-gray-900">{selectedCity.name}</span>
                  </p>
                  <p className="text-gray-700 font-medium">
                    <span className="text-gray-500">Living Cost:</span>{" "}
                    <span className="text-cyan-600 font-bold">
                      ${selectedCity.livingCost}
                    </span>{" "}
                    / month
                  </p>
                  <p className="text-gray-700 font-medium">
                    <span className="text-gray-500">Approx. Daily Cost:</span>{" "}
                    <span className="text-cyan-600 font-bold">
                      ${(selectedCity.livingCost / 30).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions Card */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 p-8 rounded-3xl transition duration-300 hover:scale-105 hover:border-cyan-300">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="text-3xl"></span> Suggestions for You
            </h2>
            <div className="space-y-6">
              <div className="bg-white border-2 border-cyan-200 rounded-2xl p-6 transition duration-300 hover:scale-105 hover:border-cyan-300">
                <h3 className="font-bold text-xl mb-3 text-gray-800">
                  Stay Longer in{" "}
                  <span className="text-cyan-600">{lowCostCity.length}</span>{" "}
                  cities!
                </h3>
                <p className="text-gray-600 mb-4">
                  You can stay more than{" "}
                  <span className="text-cyan-600 font-bold">{days} days</span>{" "}
                  with your current budget of{" "}
                  <span className="text-cyan-600 font-bold">${budget}</span>:
                </p>
                <ul className="space-y-3">
                  {lowCostCity.map((city) => (
                    <li
                      key={city.name}
                      className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-cyan-100 hover:border-cyan-300 transition duration-300 hover:scale-105"
                    >
                      <span className="text-xl"></span>
                      <div className="flex-1">
                        <span className="font-bold text-gray-800">
                          {city.name}
                        </span>{" "}
                        <span className="text-gray-500">({city.country})</span>
                      </div>
                      <span className="text-cyan-600 font-bold text-lg">
                        {city.days} days
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Better Luxury Options */}
              {betterLuxuryCities.length > 0 && (
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-6 transition duration-300 hover:scale-105 hover:border-cyan-300">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <span className="text-2xl"></span> Affordable Luxury Upgrade
                  </h3>
                  <p className="font-semibold text-lg mb-4 text-gray-700 leading-relaxed">
                    With your current budget of{" "}
                    <span className="font-bold text-cyan-600">${budget}</span>, you
                    can stay in these{" "}
                    <span className="text-cyan-700 font-bold">
                      more luxurious cities
                    </span>{" "}
                    for the same{" "}
                    <span className="text-cyan-600 font-bold">{days}</span> days or
                    even longer than{" "}
                    <span className="text-cyan-600 font-bold">{days}</span> days you
                    could stay in{" "}
                    <span className="text-cyan-600 font-bold">
                      {selectedCity?.name}
                    </span>
                    .
                  </p>

                  <ul className="space-y-4">
                    {betterLuxuryCities.map((city) => (
                      <li
                        key={city.name}
                        className="bg-white border-2 border-cyan-200 rounded-xl p-4 transition duration-300 hover:scale-105 hover:border-cyan-300"
                      >
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-xl"></span>
                          <span className="font-bold text-gray-800 text-lg">
                            {city.name}
                          </span>
                          <span className="text-gray-500">
                            ({city.country})
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="text-cyan-600 font-bold text-lg">
                            {city.days} days
                          </span>
                        </div>
                        <div className="ml-8 text-gray-700">
                          <span className="font-semibold">Status:</span> more
                          luxurious than{" "}
                          <span className="text-cyan-600 font-bold">
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
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-3xl p-8 transition duration-300 hover:scale-105 hover:border-cyan-300">
          <p className="text-2xl text-center font-bold text-cyan-600 flex items-center justify-center gap-3">
            <span className="text-3xl"></span>
            Enter a budget, select a country, and select a city to see results
          </p>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;
