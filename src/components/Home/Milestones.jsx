import React from "react";
import CountUp from "react-countup";
import { MapPin, Users, Building2, TrendingUp } from "lucide-react";

const Milestones = () => {
  const stats = [
    {
      icon: <MapPin className="w-10 h-10 text-[#06aba8]" />,
      value: 200,
      suffix: "+",
      label: "Cities Worldwide",
    },
    {
      icon: <Users className="w-10 h-10 text-[#06aba8]" />,
      value: 50,
      suffix: "K+",
      label: "Active Nomads",
    },
    {
      icon: <Building2 className="w-10 h-10 text-[#06aba8]" />,
      value: 5000,
      suffix: "+",
      label: "Coworking Spaces",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#06aba8]" />,
      value: 98,
      suffix: "%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="w-full py-15 mt-15 bg-gradient-to-r from-[#9af8f6] to-[#92f9f7] text-gray-700 text-center">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Trusted by Digital Nomads
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          Join thousands of remote workers exploring the world
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-3"
            >
              <div className="bg-white/20 backdrop-blur-sm 
               p-4 rounded-2xl flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold">
                <CountUp
                  end={item.value}
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce
                />
                {item.suffix}
              </h3>
              <p className="text-gray-500 text-sm md:text-base font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Milestones;
