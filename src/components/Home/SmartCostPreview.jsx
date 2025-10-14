import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import CostCalclator from "../../pages/CostCalculator";

const SmartCostPreview = () => {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Smart Cost Calculator Preview
        </h1>
        <p className="text-lg text-gray-600">
          Calculate your expenses based on your budget and lifestyle — or the
          kind of city you dream to live in.
        </p>
      </div>

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
