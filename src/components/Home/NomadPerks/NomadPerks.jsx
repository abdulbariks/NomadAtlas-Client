import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Plane, CreditCard, Headphones, Percent } from "lucide-react";
import PerkModal from "./PerkModel";


const iconMap = {
  Plane,
  CreditCard,
  Headphones,
  Percent,
};

const NomadPerks = () => {
  const [perks, setPerks] = useState([]);
  const [selectedPerk, setSelectedPerk] = useState(null);

  useEffect(() => {
    axios
      .get("https://nomad-atlas-server-delta.vercel.app/api/perks")
      .then((res) => setPerks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="mt-15 px-5 md:px-8 lg:px-10  ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
         <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-3 md:mb-4 text-gray-800"
      >
        Nomad Perks & Discounts
      </motion.h2>
        <p className="text-sm font-light text-gray-600 max-w-2xl mx-auto">
          Exclusive deals for NomadAtlas members to make remote work easier, safer, and more affordable.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {perks.map((perk, index) => {
          const Icon = iconMap[perk.icon] || Plane;
          return (
            <motion.div
              key={perk._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6 bg-white rounded-2xl border border-transparent hover:border-[#c0fffe] hover:scale-105 transition-all h-full flex flex-col">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                  style={{ backgroundColor: `${perk.color}20`, color: perk.color }}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <span
                  className="self-start text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
                  style={{ backgroundColor: perk.color, color: "white" }}
                >
                  {perk.discount}
                </span>

                <h3 className="font-semibold text-lg mb-2 text-gray-800">{perk.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{perk.provider}</p>
                <p className="text-sm text-gray-600 mb-4 flex-1 font-medium">{perk.description}</p>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: perk.color,
                    color: "#fff",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  onClick={() => setSelectedPerk(perk)}
                  className="w-full py-2 rounded-lg font-medium border transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    color: perk.color,
                    border: `1px solid ${perk.color}`,
                  }}
                >
                  Get Deal
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedPerk && (
        <PerkModal perk={selectedPerk} onClose={() => setSelectedPerk(null)} />
      )}
    </section>
  );
};

export default NomadPerks;
