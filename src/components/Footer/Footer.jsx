import React from "react";
import { Link } from "react-router";
import logoImage from "../../assets/Logo/Logo4.png";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-8 py-12 grid md:grid-cols-4 gap-10">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logoImage} alt="NomadAtlas Logo" className="w-8 h-8" />
            <h2 className="text-2xl font-semibold text-gray-800">NomadAtlas</h2>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Empowering remote workers with the best destinations, communities,
            and resources to live and work anywhere.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-gray-500">
            <a href="#" aria-label="Facebook" className="hover:text-[#3ea1f1] transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.27V12h2.2l-.35 3h-1.85v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#11c3c0] transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 5.92c-.66.3-1.38.5-2.13.58.77-.46 1.36-1.18 1.64-2.04-.72.43-1.52.74-2.36.91A4.04 4.04 0 0 0 12.5 9.5c0 .32.04.63.11.93-3.36-.17-6.34-1.78-8.34-4.22-.35.6-.55 1.3-.55 2.05 0 1.41.72 2.66 1.82 3.4-.67-.02-1.3-.2-1.85-.5v.05c0 1.98 1.41 3.63 3.27 4.01-.34.1-.69.15-1.06.15-.26 0-.51-.03-.76-.07.51 1.6 1.98 2.76 3.72 2.79A8.1 8.1 0 0 1 3 19.54 11.4 11.4 0 0 0 8.1 21c7.3 0 11.3-6.13 11.3-11.44v-.52c.76-.54 1.42-1.2 1.94-1.96-.7.32-1.45.54-2.23.64z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#3ea1f1] transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.51 4.51 0 0 0 12 8.5zM18.5 6a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#11c3c0] transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v12h-4zM8.5 8h3.8v1.7h.1c.5-.9 1.8-1.9 3.8-1.9 4.1 0 4.9 2.7 4.9 6.2V20h-4v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V20h-4V8z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Destinations */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Destinations</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/asia" className="hover:text-[#3ea1f1]">Asia</Link></li>
            <li><Link to="/europe" className="hover:text-[#3ea1f1]">Europe</Link></li>
            <li><Link to="/americas" className="hover:text-[#3ea1f1]">Americas</Link></li>
            <li><Link to="/africa" className="hover:text-[#3ea1f1]">Africa</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/cost-calculator" className="hover:text-[#11c3c0]">Cost Calculator</Link></li>
            <li><Link to="/visa-guide" className="hover:text-[#11c3c0]">Visa Guide</Link></li>
            <li><Link to="/blogs" className="hover:text-[#11c3c0]">Blog</Link></li>
            <li><Link to="/community" className="hover:text-[#11c3c0]">Community</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about-us" className="hover:text-[#3ea1f1]">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#3ea1f1]">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-[#3ea1f1]">Privacy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-[#3ea1f1]">Terms</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} NomadAtlas. All rights reserved. Made with <span className="text-[#11c3c0]">💙</span> for digital nomads.
      </div>
    </footer>
  );
};

export default Footer;
