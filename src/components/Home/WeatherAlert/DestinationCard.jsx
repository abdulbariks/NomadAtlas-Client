import React, { useState } from "react";
import { Bell } from "lucide-react";

export default function DestinationCard({ destination, onAlert }) {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
    if (!active) {
      onAlert(`Alert set for ${destination.city}: Flight price drop`);
    } else {
      onAlert(`Alert removed for ${destination.city}`);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm flex justify-between items-center bg-white ">
      <div>
        <h3 className="font-semibold">{destination.city}</h3>
        <p className="text-sm text-gray-500">Flights from ${destination.price}</p>
      </div>
      <button
        onClick={handleToggle}
        className={`p-2 rounded-full ${
          active ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-600"
        }`}
      >
        <Bell className="w-5 h-5" />
      </button>
    </div>
  );
}
