import React from "react";

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
  return (
    <div>
      <h1>Hi it's from smart cost calculator</h1>

      {/* Budget input */}
      <div>
        <label>Enter your full budget</label>
        <input type="number" name="budget" id="" />
      </div>
    </div>
  );
};

export default SmartCostPreview;
