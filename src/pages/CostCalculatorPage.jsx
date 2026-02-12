import React, { useEffect, useState } from "react";
import CostCalclator from "./CostCalculator";
import CostCalculator2 from "../components/CostCalculator/CostCalculator2";

const CostCalculatorPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://nomad-atlas-server-one.vercel.app/api/cost-calculator")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  return (
    <div className="mt-16 pt-10">
      {/* Header for calculator 1 */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Budget based calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find cities that suits you with your budget and then make a plan and
          dicision
        </p>
      </div>
      <CostCalclator data={data}></CostCalclator>

      <CostCalculator2 data={data}></CostCalculator2>
    </div>
  );
};

export default CostCalculatorPage;
