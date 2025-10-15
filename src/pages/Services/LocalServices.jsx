import React, { useState } from "react";
import localServicesData from "../Services/localServicesData";

const LocalServices = () => {
  const [activeTab, setActiveTab] = useState("visaRequirements");

  const sections = {
    visaRequirements: "Visa Requirements",
    simCardsInternet: "SIM Cards & Internet",
    healthcareEmergency: "Healthcare & Emergency",
    transportation: "Transportation",
  };

  return (
    <div className="p-6 mt-15 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        🌍 Local Services & Guides
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Object.entries(sections).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === key
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-gray-300 hover:bg-blue-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localServicesData[activeTab].map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-5 border hover:shadow-lg transition-all"
          >
            <h2 className="font-semibold text-lg text-blue-700 mb-2">
              {item.country || item.name || item.type}
            </h2>
            <div className="text-sm text-gray-700 space-y-1">
              {Object.entries(item).map(([key, value]) => {
                if (["id", "country", "name"].includes(key)) return null;
                return (
                  <p key={key}>
                    <span className="font-medium capitalize">{key}: </span>
                    {Array.isArray(value) ? value.join(", ") : value}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalServices;
