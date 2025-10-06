import React from "react";
import { Link } from "react-router";

const WeatherAlertsPage = () => {
  return (
    <section className="bg-blue-50 min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Weather Alerts
        </h1>
        <p className="text-gray-600 mb-8">
          Here you can view all real-time weather alerts, notifications, and
          seasonal updates for your selected destinations. Stay safe and plan
          your trips effectively.
        </p>
        <ul className="text-left space-y-4 text-gray-700">
          <li>🌡️ Heatwave warning in Bali (May - June)</li>
          <li>🌧️ Monsoon alert in India (July - September)</li>
          <li>❄️ Snowstorm warning in Alps (December - February)</li>
          <li>⚡ Thunderstorm alert in Thailand (April)</li>
        </ul>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
        >
          Back to Info
        </Link>
      </div>
    </section>
  );
};

export default WeatherAlertsPage;
