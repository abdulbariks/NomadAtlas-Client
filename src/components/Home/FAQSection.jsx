import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/faqs")
      .then((res) => setFaqs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 70 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
      }}
      className="mt-16 mx-5 md:mx-8 lg:mx-10"
      id="faq"
    >
      {/* Section Title */}
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#11c3c0] uppercase font-semibold tracking-wide mb-2"
        >
          Have a Question?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white"
        >
          Frequently Asked Questions
        </motion.h2>
      </div>

      {/* FAQ + Image Section */}
      <div className="  grid md:grid-cols-2 gap-10  items-start">
        <div className="space-y-5">
  {faqs.slice(0, 5).map((faq, index) => (  // <-- show only first 5
    <motion.div
      key={faq._id}
      whileHover={{ scale: 1.02 }}
      onClick={() => toggleFAQ(index)}
      className={`border border-gray-500  rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
        activeIndex === index
          ? "bg-[#11c3c0]/10 border-[#11c3c0]"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-700 dark:text-white">
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
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  ))}
</div>
        {/* Right: Image Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-2xl overflow-hidden "
        >
          <img
            src="https://i.ibb.co.com/RpBLLskn/asian-woman-working-laptop-vacation-2-1.jpg"
            alt="Remote Work Destination"
            className="w-full h-[470px] object-cover rounded-2xl"
          />
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-8"
          >
            <h3 className="text-3xl font-bold mb-4">Do you have more questions?</h3>
            <Link to="/faqs">
            <motion.button
              whileHover="hover"
              className="flex items-center gap-2 bg-[#11c3c0] text-white px-6 py-3 rounded-full shadow-md transition-all"
              style={{ overflow: "hidden" }}
               >
       <motion.span
            variants={{
            hover: { x: 4 }, // move the arrow 4px to the right
            initial: { x: 0 },
            }}
            transition={{ type: "tween", duration: 0.3 }}
             >
           <ArrowRight size={18} />
  </motion.span>
  <motion.span
    variants={{
      hover: { scale: 1.05 },
      initial: { scale: 1 },
    }}
    transition={{ duration: 0.3 }}
  >
    More Questions
  </motion.span>
</motion.button>
            </Link>

          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQSection;
