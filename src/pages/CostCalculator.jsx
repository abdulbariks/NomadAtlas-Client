import React, { useState } from "react";

const CostCalculator = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState("Germany");
  const [selectedCity, setSelectedCity] = useState(null);
  const [budget, setBudget] = useState(0);
  const [showMoreLowCost, setShowMoreLowCost] = useState(6);
  const [showMoreLuxury, setShowMoreLuxury] = useState(5);

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
          Enter your travel <span className="text-[#11c3c0]">budget ($)</span>
        </label>
        <input
          type="number"
          name="budgetInput"
          onChange={(e) => setBudget(Number(e.target.value))}
          placeholder="Example: 5000"
          className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-lg shadow-sm focus:ring-2 focus:ring-[#3ea1f1] focus:border-[#3ea1f1] outline-none transition-all"
        />
      </div>

      {/* Country & City Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Country Selection */}
        <div className="bg-white border-2 border-[#11c3c0]/40 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-2xl font-bold text-center mb-6 text-gray-800">
            🌍 Select a Country
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.map((country) => (
              <button
                key={country.country}
                onClick={() => setSelectedCountry(country.country)}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-semibold shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 ${
                  selectedCountry === country.country
                    ? "bg-[#11c3c0] text-white border-[#11c3c0] shadow-[#3ea1f1]/50"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#3ea1f1]"
                }`}
              >
                {country.country}
              </button>
            ))}
          </div>
        </div>

        {/* City Selection */}
        <div className="bg-white border-2 border-[#3ea1f1]/40 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-2xl font-bold text-center mb-6 text-gray-800">
            🏙️ Select a City in{" "}
            <span className="text-[#3ea1f1]">{selectedCountry}</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {citiesOfCountry.map((city) => (
              <button
                key={city.name}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-semibold shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 ${
                  selectedCity?.name === city.name
                    ? "bg-[#3ea1f1] text-white border-[#3ea1f1] shadow-[#11c3c0]/40"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#11c3c0]"
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
          <div className="bg-gradient-to-br from-[#3ea1f1]/10 to-[#11c3c0]/10 border-2 border-[#11c3c0]/50 p-8 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-center text-gray-800">
              ✈️ Result for{" "}
              <span className="text-[#3ea1f1]">{selectedCity?.name}</span>,{" "}
              <span className="text-[#11c3c0]">{selectedCountry}</span>
            </h3>
            <p className="text-gray-700 text-center text-xl mb-6 leading-relaxed">
              With a budget of{" "}
              <span className="font-bold text-[#11c3c0] text-2xl">
                ${budget}
              </span>
              , you can stay about{" "}
              <span className="font-bold text-[#3ea1f1] text-2xl">
                {days} days
              </span>{" "}
              in {selectedCity?.name}.
            </p>

            {/* Selected City Details */}
            {selectedCity && (
              <div className="bg-white border-2 border-[#11c3c0]/50 rounded-2xl p-6 shadow-md">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏘️</span> City Details
                </h4>
                <div className="space-y-2">
                  <p className="text-gray-700 font-medium">
                    <span className="text-gray-500">Name:</span>{" "}
                    <span className="text-gray-900">{selectedCity.name}</span>
                  </p>
                  <p className="text-gray-700 font-medium">
                    <span className="text-gray-500">Living Cost:</span>{" "}
                    <span className="text-[#11c3c0] font-bold">
                      ${selectedCity.livingCost}
                    </span>{" "}
                    / month
                  </p>
                  <p className="text-gray-700 font-medium">
                    <span className="text-gray-500">Approx. Daily Cost:</span>{" "}
                    <span className="text-[#3ea1f1] font-bold">
                      ${(selectedCity.livingCost / 30).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions Card */}
          <div className="bg-gradient-to-br from-[#3ea1f1]/10 to-[#11c3c0]/10 border-2 border-[#3ea1f1]/40 p-8 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="text-3xl">💡</span> Suggestions for You
            </h2>
            <div className="space-y-6">
              <div className="bg-white border-2 border-[#3ea1f1]/40 rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-xl mb-3 text-gray-800">
                  🌟 Stay Longer in{" "}
                  <span className="text-[#11c3c0]">{lowCostCity.length}</span>{" "}
                  cities!
                </h3>
                <p className="text-gray-600 mb-4">
                  You can stay more than{" "}
                  <span className="text-[#3ea1f1] font-bold">{days} days</span>{" "}
                  with your current budget of{" "}
                  <span className="text-[#11c3c0] font-bold">${budget}</span>:
                </p>
                <ul className="space-y-3">
                  {lowCostCity.slice(0, showMoreLowCost).map((city) => (
                    <li
                      key={city.name}
                      className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200"
                    >
                      <span className="text-xl">📍</span>
                      <div className="flex-1">
                        <span className="font-bold text-gray-800">
                          {city.name}
                        </span>{" "}
                        <span className="text-gray-500">({city.country})</span>
                      </div>
                      <span className="text-[#3ea1f1] font-bold text-lg">
                        {city.days} days
                      </span>
                    </li>
                  ))}
                </ul>
                {lowCostCity.length > showMoreLowCost && (
                  <button
                    onClick={() => setShowMoreLowCost((prev) => prev + 5)}
                    className="mt-4 w-full bg-[#11c3c0] hover:bg-[#3ea1f1] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
                  >
                    See More ({lowCostCity.length - showMoreLowCost} more
                    cities)
                  </button>
                )}
              </div>

              {/* Better Luxury Options */}
              {betterLuxuryCities.length > 0 && (
                <div className="bg-gradient-to-br from-[#3ea1f1]/10 to-[#11c3c0]/10 border-2 border-[#3ea1f1]/40 rounded-2xl p-6 shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">✨</span> Affordable Luxury
                    Upgrade
                  </h3>
                  <p className="font-semibold text-lg mb-4 text-gray-700 leading-relaxed">
                    With your current budget of{" "}
                    <span className="font-bold text-[#11c3c0]">${budget}</span>,
                    you can stay in these{" "}
                    <span className="text-[#3ea1f1] font-bold">
                      more luxurious cities
                    </span>{" "}
                    for the same{" "}
                    <span className="text-[#3ea1f1] font-bold">{days}</span>{" "}
                    days or even longer than{" "}
                    <span className="text-[#3ea1f1] font-bold">{days}</span>{" "}
                    days you could stay in{" "}
                    <span className="text-[#11c3c0] font-bold">
                      {selectedCity?.name}
                    </span>
                    .
                  </p>

                  <ul className="space-y-4">
                    {betterLuxuryCities.slice(0, showMoreLuxury).map((city) => (
                      <li
                        key={city.name}
                        className="bg-white border-2 border-[#11c3c0]/40 rounded-xl p-4 shadow-sm"
                      >
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-xl">🌆</span>
                          <span className="font-bold text-gray-800 text-lg">
                            {city.name}
                          </span>
                          <span className="text-gray-500">
                            ({city.country})
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="text-[#3ea1f1] font-bold text-lg">
                            {city.days} days
                          </span>
                        </div>
                        <div className="ml-8 text-gray-700">
                          <span className="font-semibold">Status:</span> more
                          luxurious than{" "}
                          <span className="text-[#11c3c0] font-bold">
                            {selectedCity?.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {betterLuxuryCities.length > showMoreLuxury && (
                    <button
                      onClick={() => setShowMoreLuxury((prev) => prev + 5)}
                      className="mt-4 w-full bg-[#3ea1f1] hover:bg-[#11c3c0] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
                    >
                      See More ({betterLuxuryCities.length - showMoreLuxury}{" "}
                      more cities)
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-[#3ea1f1]/10 to-[#11c3c0]/10 border-2 border-[#11c3c0]/60 rounded-3xl p-8 shadow-xl">
          <p className="text-2xl text-center font-bold text-[#3ea1f1] flex items-center justify-center gap-3">
            <span className="text-3xl">⚠️</span>
            Enter a budget, select a country, and select a city to see results
          </p>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;
