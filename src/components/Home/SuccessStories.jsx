import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    tag: "",
    color: "#11c3c0",
    image: "",
    text: "",
  });

  // Fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      const res = await axios.get("https://nomad-atlas-server-one.vercel.app/api/success-stories");
      setStories(res.data);
    };
    fetchStories();
  }, []);

  // Auto slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [stories]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://nomad-atlas-server-one.vercel.app/api/success-stories", formData);
    setFormData({
      name: "",
      role: "",
      location: "",
      tag: "",
      color: "#11c3c0",
      image: "",
      text: "",
    });
    setShowModal(false);
    const res = await axios.get("https://nomad-atlas-server-one.vercel.app/api/success-stories");
    setStories(res.data);
    toast.success(" Success story added successfully!");
  };

  // Handle navigation
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % stories.length);

  // Responsive card count
  const getVisibleCount = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const visibleCount = getVisibleCount();

  return (
    <div className="mt-16 px-5 md:px-8 lg:px-10 relative pb-7  bg-gradient-to-b from-[#edf7f7] to-[#d6f7f7]">
      {/* Header Section */}
      <div className="text-center mb-12">
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-5">
          Inspiring Journeys with NomadAtlas
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Discover how digital nomads, remote professionals, and wanderers from
          around the world found freedom, balance, and purpose through
          <span className="text-[#11c3c0] font-semibold"> NomadAtlas.</span>
        </p>
      </div>

      {/* Add Story Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#11c3c0] hover:bg-[#0fa7a4] text-white px-4 py-2 rounded-full shadow-md transition"
        >
          <PlusCircle size={18} /> Add Success Story
        </button>
      </div>

      {/* Carousel Section */}
      <div className="relative overflow-hidden flex flex-col items-center">
        <div className="flex items-center justify-center space-x-6">
          <AnimatePresence mode="wait">
            {stories.length > 0 && (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="w-full flex justify-center gap-6 flex-wrap"
              >
                {stories
                  .slice(current, current + visibleCount)
                  .concat(
                    stories.slice(
                      0,
                      Math.max(0, visibleCount - (stories.length - current))
                    )
                  )
                  .map((item, i) => (
                    <div
                      key={i}
                      className="w-full sm:w-[90%] md:w-[45%] lg:w-[30%] bg-white rounded-2xl p-8  border border-gray-100 hover:border-[#85f5f3] transition-transform"
                    >
                      <div>
                        <div className="text-[#11c3c0] text-3xl mb-3">❝</div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                          {item.text}
                        </p>
                        <span
                          className="inline-block text-white text-xs font-semibold rounded-full px-3 py-1 mb-6"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      <div className="flex items-center pt-3 border-t border-gray-100 mt-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-[#11c3c0] mr-3"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500">{item.role}</p>
                          <p className="text-xs text-[#11c3c0]">
                            {item.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons under cards */}
        {stories.length > visibleCount && (
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={prevSlide}
              className="bg-white p-2 rounded-full  hover:bg-[#11c3c0] hover:text-white transition"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white p-2 rounded-full  hover:bg-[#11c3c0] hover:text-white transition"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-[450px] shadow-lg relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Share Your Story with NomadAtlas
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Tag (e.g., 'Remote Success')"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
                <textarea
                 placeholder="Your Journey or Experience (max 30 words)"
                 className="w-full border border-gray-300 p-2 rounded-md"
                value={formData.text}
                onChange={(e) => {
                const words = e.target.value.trim().split(/\s+/);
               if (words.length <= 30) {
                    setFormData({ ...formData, text: e.target.value });
                   }
                     }}
              required
               ></textarea>
              <p className="text-xs text-gray-500 mt-1">
  {formData.text.trim().split(/\s+/).filter(Boolean).length}/30 words
              </p>

                <button
                  type="submit"
                  className="w-full bg-[#11c3c0] hover:bg-[#0fa7a4] text-white py-2 rounded-full transition font-semibold"
                >
                  Submit Story
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuccessStories;
