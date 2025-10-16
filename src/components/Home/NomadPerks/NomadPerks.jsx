// import React from "react";
// import { motion } from "framer-motion";
// import { FaWifi, FaCloud, FaShieldAlt, FaBriefcase } from "react-icons/fa";
// import { GiAirplaneDeparture } from "react-icons/gi"; // new icon for 4th card

// const perks = [
//   {
//     icon: <FaBriefcase className="text-blue-600 text-3xl" />,
//     title: "Coworking Discounts",
//     description:
//       "Save on memberships at top coworking spaces around the world. Perfect for productivity and networking.",
//   },
//   {
//     icon: <FaCloud className="text-blue-600 text-3xl" />,
//     title: "VPN & Cloud Storage",
//     description:
//       "Get exclusive offers on essential digital tools like secure VPNs and cloud storage to work safely anywhere.",
//   },
//   {
//     icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
//     title: "Travel Insurance",
//     description:
//       "Access affordable, remote-worker-friendly insurance packages for health, gear, and trips abroad.",
//   },
//   {
//     icon: <GiAirplaneDeparture className="text-blue-600 text-3xl" />,
//     title: "Flight & Travel Deals",
//     description:
//       "Special discounts on flights, accommodation, and travel gear to make exploring new cities easier and cheaper.",
//   },
// ];

// const NomadPerks = () => {
//   return (
//     <section className="py-16 px-5 md:px-8 lg:px-10">
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//           Nomad Perks & Discounts
//         </h2>
//         <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
//           Exclusive deals for NomadAtlas members to make remote work easier,
//           safer, and more affordable.
//         </p>
//       </div>

//       {/* Features Grid */}
//       <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
//         {perks.map((perk, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.2 }}
//             className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
//           >
//             <div className="mb-4">{perk.icon}</div>
//             <h3 className="text-xl font-semibold text-gray-800">
//               {perk.title}
//             </h3>
//             <p className="text-gray-600 mt-2">{perk.description}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };
// export default NomadPerks;



import { motion } from "framer-motion";
import { Percent, Plane, CreditCard, Headphones } from "lucide-react";

const perks = [
  {
    icon: Plane,
    title: "Travel Insurance",
    discount: "20% OFF",
    provider: "SafetyWing",
    description: "Comprehensive coverage for digital nomads",
    color: "text-primary",
  },
  {
    icon: CreditCard,
    title: "Banking Services",
    discount: "No Fees",
    provider: "Wise",
    description: "Multi-currency accounts for travelers",
    color: "text-secondary",
  },
  {
    icon: Headphones,
    title: "Coworking Passes",
    discount: "15% OFF",
    provider: "Selina",
    description: "Access to global coworking network",
    color: "text-accent",
  },
  {
    icon: Percent,
    title: "SIM & eSIM",
    discount: "$10 OFF",
    provider: "Airalo",
    description: "Stay connected worldwide",
    color: "text-primary",
  },
];

const NomadPerks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl text-gray-800 font-bold mb-4">Nomad Perks & Discounts</h2>
          <p className="text-xl text-gray-600 text-muted-foreground max-w-2xl mx-auto">
            Exclusive deals for NomadAtlas members to make remote work easier, safer, and more affordable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all h-full flex flex-col">
                <div className={`inline-flex items-center bg-gray-100 justify-center w-14 h-14 rounded-2xl bg-muted mb-4 ${perk.color}`}>
                  <perk.icon className="h-7 w-7" />
                </div>

                <span className="self-start text-xs bg-[#f97316] text-white font-semibold  px-2 py-0.5 rounded-full mb-3 shadow-md">
                  {perk.discount}
                </span>

                <h3 className="font-semibold text-lg mb-2">{perk.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{perk.provider}</p>
                <p className="text-sm text-muted-foreground mb-4 flex-1 text-gray-500 font-semibold">{perk.description}</p>

                <button className="w-full bg-gray-200  text-gray-500 font-medium py-2 rounded-lg hover:bg-[#14b8a6] hover:text-white transition-all">
                  Get Deal
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NomadPerks;
