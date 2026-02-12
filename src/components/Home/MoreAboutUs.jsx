import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const MoreAboutUs = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-10 px-5 md:px-8 lg:px-10 py-16 mt-8 md:mt-12 lg:mt-14 bg-gradient-to-b from-[#edf7f7] to-[#d6f7f7] overflow-hidden">
      {/* ==== LEFT IMAGE GROUP ==== */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-4"
      >
        {/* Tall Rounded Image */}
        <motion.img
          whileHover={{ scale: 1.05 }}
          src="https://i.ibb.co.com/S4m1gBcY/asian-woman-working-laptop-vacation-1.jpg"
          alt="Traveler on cliff"
          className=" h-[380px] md:h-[440px] w-[240px] md:w-[290px] object-cover rounded-[160px] rounded-br-[0px]"
        />

        <div className="flex flex-col gap-6">
          {/* Circle Image */}
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="https://i.ibb.co.com/PsctGdrb/people-inspiration-modern-lifestyle-electronic-devices-concept-1.jpg"
            alt="Plane over island"
            className="w-[190px] md:w-[220px] h-[190px] md:h-[220px] object-cover rounded-full rounded-bl-[0px]"
          />
          {/* Rounded Rectangle Image */}
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="https://i.ibb.co.com/gLnZf0cq/tourist-with-baggage-map-fuji-mountain-kawaguchiko-japan-1.jpg"
            alt="image-3"
            className="w-[240px] h-[180px] md:w-[260px] md:h-[200px] object-cover rounded-full rounded-tr-[0px]"
          />
        </div>
      </motion.div>

      {/* ==== RIGHT TEXT CONTENT ==== */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-lg text-center lg:text-left space-y-5"
      >
        <p className="text-lg font-medium italic" style={{ color: "#11c3c0" }}>
          Discover NomadAtlas
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          More About Us <br /> & Our Travel Mission
        </h2>

        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          At <span className="font-semibold" style={{ color: "#11c3c0" }}>NomadAtlas</span>,
          we believe travel is more than just reaching a destination — it’s about
          the journey, the stories, and the people you meet along the way. Our team
          curates experiences that inspire connection, adventure, and discovery.
          From mountain peaks to ocean views, we make travel simple, memorable, and meaningful.
        </p>

        {/* ==== STATS SECTION ==== */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-10 pt-4">
          {/* 1️⃣ Countries Covered */}
          <motion.div
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-2xl font-bold text-gray-900">
              <CountUp start={0} end={30} duration={10}>
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
              +
            </h3>
            <p className="text-sm text-gray-600 font-semibold">Countries Covered</p>
          </motion.div>

          {/* 2️⃣ Professional Guides */}
          <motion.div
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-2xl font-bold" style={{ color: "#11c3c0" }}>
              <CountUp start={0} end={120} duration={10}>
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
              +
            </h3>
            <p className="text-sm text-gray-600 font-semibold">Professional Guides</p>
          </motion.div>

          {/* 3️⃣ Happy Travelers */}
          <motion.div
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-2xl font-bold text-gray-900">
              <CountUp start={0} end={75} duration={10}>
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
              k+
            </h3>
            <p className="text-sm text-gray-600 font-semibold">Happy Travelers</p>
          </motion.div>
        </div>

        {/* ==== BUTTON ==== */}

        <Link to="/about-us"><motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="mt-5 inline-flex items-center gap-2 font-semibold py-3 px-6 rounded-full text-white transition"
          style={{ backgroundColor: "#11c3c0" }}
        >
          More About Us <ArrowRight size={18} />
        </motion.button></Link>
        
      </motion.div>
    </section>
  );
};

export default MoreAboutUs;
