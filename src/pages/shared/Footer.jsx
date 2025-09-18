import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-8 text-center">
                {/* Links */}
                <div className="flex flex-wrap justify-center gap-8 mb-6 text-slate-600 text-sm">
                    <a href="#" className="hover:text-slate-900">About</a>
                    <a href="#" className="hover:text-slate-900">Contact Info</a>
                    <a href="#" className="hover:text-slate-900">Terms of Service</a>
                    <a href="#" className="hover:text-slate-900">Privacy Policy</a>
                </div>


                {/* Social Icons */}
                <div className="flex justify-center gap-6 mb-6 text-slate-500">
                    <a href="#" aria-label="Twitter" className="hover:text-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 5.92c-.66.3-1.38.5-2.13.58.77-.46 1.36-1.18 1.64-2.04-.72.43-1.52.74-2.36.91A4.04 4.04 0 0 0 12.5 9.5c0 .32.04.63.11.93-3.36-.17-6.34-1.78-8.34-4.22-.35.6-.55 1.3-.55 2.05 0 1.41.72 2.66 1.82 3.4-.67-.02-1.3-.2-1.85-.5v.05c0 1.98 1.41 3.63 3.27 4.01-.34.1-.69.15-1.06.15-.26 0-.51-.03-.76-.07.51 1.6 1.98 2.76 3.72 2.79A8.1 8.1 0 0 1 3 19.54 11.4 11.4 0 0 0 8.1 21c7.3 0 11.3-6.13 11.3-11.44v-.52c.76-.54 1.42-1.2 1.94-1.96-.7.32-1.45.54-2.23.64z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Instagram" className="hover:text-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.51 4.51 0 0 0 12 8.5zM18.5 6a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Facebook" className="hover:text-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.27V12h2.2l-.35 3h-1.85v7A10 10 0 0 0 22 12z" />
                        </svg>
                    </a>
                </div>


                {/* Copyright */}
                <p className="text-slate-500 text-sm">© {new Date().getFullYear()} NomadAtlas. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;