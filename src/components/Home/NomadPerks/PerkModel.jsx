import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PerkModal = ({ perk, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 flex items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${perk.color}20`, color: perk.color }}
          >
            {/* Use fallback emoji if icon missing */}
            <span className="text-2xl">✨</span>
          </div>
          <div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: perk.color, color: "#fff" }}
            >
              {perk.discount}
            </span>
            <h2 className="text-xl font-bold text-gray-800">{perk.title}</h2>
            <p className="text-gray-500">{perk.provider}</p>
          </div>
        </div>

        {/* Details */}
        <h3 className="font-semibold text-gray-800 mb-2">About This Deal</h3>
        <p className="text-gray-600 text-sm mb-4">{perk.details}</p>

        {/* Features */}
        {perk.features?.length > 0 && (
          <>
            <h4 className="font-semibold text-gray-800 mb-2">Features</h4>
            <ul className="space-y-1 mb-4">
              {perk.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Pricing */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <p className="text-gray-700 text-sm">
            <strong>Pricing:</strong> Starting at {perk.startPrice}
          </p>
        </div>

        {/* Visit link */}
        <a
          href={perk.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-[#11c3c0] text-white py-2 rounded-lg font-medium hover:bg-[#0ea7a4] transition"
        >
          Get This Deal ↗
        </a>
      </motion.div>
    </div>
  );
};

export default PerkModal;
