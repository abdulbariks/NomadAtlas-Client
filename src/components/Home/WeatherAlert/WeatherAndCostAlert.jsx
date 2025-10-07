import React, { useState } from "react";
import NotificationToast from "./NotificationToast";
import DestinationCard from "./DestinationCard";



const destinations = [
  { id: 1, city: "Bangkok", price: 450 },
  { id: 2, city: "Lisbon", price: 600 },
  { id: 3, city: "Bali", price: 500 }
];

export default function WeatherAndCostAlert() {
  const [notifications, setNotifications] = useState([]);

  const handleAlert = (message) => {
    setNotifications((prev) => [...prev, message]);
  };

  return (
    <div className="mx-5 md:mx-10 lg:mx-20 flex gap-7 mt-10 items-center justify-center">

        
      {/* <h1 className="text-2xl font-bold mb-4">NomadAtlas - Alerts</h1> */}
      {destinations.map((d) => (
        <DestinationCard key={d.id} destination={d} onAlert={handleAlert} />
      ))}
      <NotificationToast
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </div>
  );
}
