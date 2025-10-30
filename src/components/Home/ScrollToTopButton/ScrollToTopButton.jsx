import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll visibility + border animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      setScrollProgress(scrolled);
      setShowButton(scrollTop > 200); // Show button after 200px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top smoothly
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
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
                     w-10 h-10 rounded-full bg-transparent border-2 border-[#11c3c0]
                     text-[#11c3c0] shadow-md backdrop-blur-sm
                     hover:bg-[#11c3c0] hover:text-white transition-all duration-300"
          style={{
            boxShadow: `0 0 0 ${Math.min(scrollProgress / 5, 6)}px rgba(17,195,192,0.3)`,
          }}
        >
          <FaArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
