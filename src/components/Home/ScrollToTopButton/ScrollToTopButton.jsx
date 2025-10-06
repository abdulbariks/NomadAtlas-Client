import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-17 bg-blue-600 border-2 border-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5  " />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
