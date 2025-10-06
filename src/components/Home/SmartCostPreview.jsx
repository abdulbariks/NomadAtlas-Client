import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import CostCalclator from "../../pages/CostCalculator";

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
    <div>
      <CostCalclator></CostCalclator>

      {/* CTA Button */}
      <div className="flex justify-center">
        <Link
          to="/cost-calculator"
          className="bg-blue-600 text-white py-3 px-6 rounded-full flex items-center gap-3 text-lg font-medium shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          Explore More Options <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default SmartCostPreview;
