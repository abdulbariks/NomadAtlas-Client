import React from "react";
import { Link } from "react-router";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" relative bg-gradient-to-br from-blue-600 to-indigo-500 text-white text-relative rounded-t-3xl overflow-hidden border-t-2 border-yellow-500 ">
      <div className=" px-20 py-16 grid md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">NomadAtlas</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            Empowering remote workers with the best destinations, communities,
            and resources to live and work anywhere.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a href="#" aria-label="Twitter" className="hover:text-teal-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 5.92c-.66.3-1.38.5-2.13.58.77-.46 1.36-1.18 1.64-2.04-.72.43-1.52.74-2.36.91A4.04 4.04 0 0 0 12.5 9.5c0 .32.04.63.11.93-3.36-.17-6.34-1.78-8.34-4.22-.35.6-.55 1.3-.55 2.05 0 1.41.72 2.66 1.82 3.4-.67-.02-1.3-.2-1.85-.5v.05c0 1.98 1.41 3.63 3.27 4.01-.34.1-.69.15-1.06.15-.26 0-.51-.03-.76-.07.51 1.6 1.98 2.76 3.72 2.79A8.1 8.1 0 0 1 3 19.54 11.4 11.4 0 0 0 8.1 21c7.3 0 11.3-6.13 11.3-11.44v-.52c.76-.54 1.42-1.2 1.94-1.96-.7.32-1.45.54-2.23.64z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-teal-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v12h-4zM8.5 8h3.8v1.7h.1c.5-.9 1.8-1.9 3.8-1.9 4.1 0 4.9 2.7 4.9 6.2V20h-4v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V20h-4V8z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-teal-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.51 4.51 0 0 0 12 8.5zM18.5 6a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-teal-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.27V12h2.2l-.35 3h-1.85v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
          </div>

          {/* Back to Top
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 flex items-center gap-2 border border-gray-600 hover:border-teal-400 text-sm px-4 py-2 rounded-md hover:text-teal-400 transition"
          >
            <ArrowUp className="h-4 w-4" /> BACK TO TOP
          </button> */}
        </div>

        {/* Middle - Site Map */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Site Map</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link to="/" className="hover:text-teal-400">Homepage</Link></li>
            <li><Link to="/destinations" className="hover:text-teal-400">Destinations</Link></li>
            <li><Link to="/community" className="hover:text-teal-400">Community</Link></li>
            <li><Link to="/resources" className="hover:text-teal-400">Resources</Link></li>
            <li><Link to="/about-us" className="hover:text-teal-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-teal-400">Contact Us</Link></li>
          </ul>
        </div>

        {/* Right - Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link to="/privacy-policy" className="hover:text-teal-400">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-teal-400">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="hover:text-teal-400">Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="bg-yellow-400 text-center text-[#0D3B3E] text-sm py-3 font-medium">
        © {new Date().getFullYear()} NomadAtlas. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
