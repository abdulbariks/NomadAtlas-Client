import React from "react";
import CostCalclator from "./CostCalculator";
import CostCalculator2 from "../components/CostCalculator/CostCalculator2";

const CostCalculatorPage = () => {
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
      <CostCalclator></CostCalclator>

      <CostCalculator2></CostCalculator2>
    </div>
  );
};

export default CostCalculatorPage;
