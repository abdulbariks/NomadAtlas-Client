import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import axios from "axios";

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/faqs")
      .then((res) => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 dark:text-white">
        Loading FAQs...
      </div>
    );
  }

  return (
    <section className="min-h-screen px-5 md:px-10 lg:px-20 py-20 dark:bg-gray-900">
      {/* Page Header */}
      <div className="text-center mb-16">
        <p className="text-[#11c3c0] font-semibold uppercase tracking-wide mb-2">
          FAQs
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Your Questions Answered
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
          Browse through the most frequently asked questions and find answers instantly.
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            onClick={() => toggleFAQ(index)}
            className={`border rounded-xl p-5  cursor-pointer transition-all duration-300 ${
              activeIndex === index
                ? "bg-[#11c3c0]/10 border-[#11c3c0]"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {faq.question}
              </h3>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180 text-[#11c3c0]" : ""
                }`}
              />
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                activeIndex === index
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-4"
            >
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 flex justify-center">
        <motion.a
          href="/contact-us"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-[#11c3c0] text-white px-8 py-4 rounded-full text-lg font-semibold"
        >
          Contact Us
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronDown size={20} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
};

export default FAQPage;
