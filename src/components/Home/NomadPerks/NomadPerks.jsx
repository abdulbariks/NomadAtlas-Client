import { motion } from "framer-motion";
import { Percent, Plane, CreditCard, Headphones } from "lucide-react";

const perks = [
  {
    icon: Plane,
    title: "Travel Insurance",
    discount: "20% OFF",
    provider: "SafetyWing",
    description: "Comprehensive coverage for digital nomads",
    color: "#11c3c0",
  },
  {
    icon: CreditCard,
    title: "Banking Services",
    discount: "No Fees",
    provider: "Wise",
    description: "Multi-currency accounts for travelers",
    color: "#3ea1f1",
  },
  {
    icon: Headphones,
    title: "Coworking Passes",
    discount: "15% OFF",
    provider: "Selina",
    description: "Access to global coworking network",
    color: "#11c3c0",
  },
  {
    icon: Percent,
    title: "SIM & eSIM",
    discount: "$10 OFF",
    provider: "Airalo",
    description: "Stay connected worldwide",
    color: "#3ea1f1",
  },
];

const NomadPerks = () => {
  return (
    <section className="mt-15 pb-10 ">
      <div className="px-5 md:px-8 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-700">
            Nomad Perks & Discounts
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Exclusive deals for NomadAtlas members to make remote work easier, safer, and more affordable.
          </p>
        </motion.div>

        {/* Perk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-gray-200">
                
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                  style={{ backgroundColor: `${perk.color}20`, color: perk.color }}
                >
                  <perk.icon className="h-7 w-7" />
                </div>

                {/* Discount Tag */}
                <span
                  className="self-start text-xs font-semibold px-2 py-0.5 rounded-full mb-3 shadow-md"
                  style={{ backgroundColor: perk.color, color: "white" }}
                >
                  {perk.discount}
                </span>

                {/* Content */}
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{perk.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{perk.provider}</p>
                <p className="text-sm text-gray-600 mb-4 flex-1 font-medium">
                  {perk.description}
                </p>

                {/* Animated Button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: perk.color,
                    color: "#fff",
                    borderColor: perk.color,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-full py-2 rounded-lg border border-gray-300 text-gray-600 font-medium transition-all duration-300"
                >
                  Get Deal
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NomadPerks;

