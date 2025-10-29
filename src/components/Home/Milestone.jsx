import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import axios from "axios";
import { MapPin, Users, Building2, TrendingUp } from "lucide-react";

const iconMap = {
  MapPin: <MapPin className="w-10 h-10 text-[#06aba8]" />,
  Users: <Users className="w-10 h-10 text-[#06aba8]" />,
  Building2: <Building2 className="w-10 h-10 text-[#06aba8]" />,
  TrendingUp: <TrendingUp className="w-10 h-10 text-[#06aba8]" />,
};


const Milestones = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <section className="w-full bg-white text-gray-800  ">
      <div className="mx-5 md:mx-8 lg:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 ">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-center justify-center p-5 md:p-8 lg:p-10 text-center space-y-3"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {iconMap[item.icon]}
            </motion.div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              <CountUp end={item.value} duration={2.5} enableScrollSpy scrollSpyOnce />
              {item.suffix}
            </h3>
            <p className="text-gray-600 font-medium text-lg">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Milestones;
