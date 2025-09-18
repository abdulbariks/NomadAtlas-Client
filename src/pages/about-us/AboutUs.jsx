import React from 'react';
import { FaGlobe, FaUsers, FaShieldAlt, FaDollarSign } from "react-icons/fa";


const AboutUs = () => {
    return (
        <div className="w-10/12 mx-auto px-3 py-12">
            {/* Title */}
            <h2 className="text-4xl font-bold mb-8 text-gray-900">About NomadAtlas</h2>

            {/* Story */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">Our Story</h3>
                <p className="text-gray-600 leading-relaxed">
                    NomadAtlas was born from a simple idea: to make it easier for digital
                    nomads to find their perfect city. As nomads ourselves, we experienced
                    the challenges of researching and comparing cities across the globe.
                    We wanted a platform that could provide comprehensive, up-to-date
                    information in one place, helping nomads make informed decisions about
                    where to live and work remotely.
                </p>
            </div>

            {/* Mission */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                    Our mission is to empower digital nomads with the knowledge and tools
                    they need to discover and compare cities worldwide. We strive to be
                    the most trusted and comprehensive resource for nomads, providing
                    detailed insights into cost of living, internet speed, safety,
                    community, and more.
                </p>
            </div>

            {/* Team */}
            <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6">Our Team</h3>
                <p className="text-gray-600 mb-8">
                    Meet the passionate team behind NomadAtlas. We are a diverse group of
                    digital nomads, developers, and travel enthusiasts dedicated to making
                    the nomadic lifestyle more accessible and enjoyable for everyone.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    <div>
                        <img
                            src='https://res.cloudinary.com/drogaimmk/image/upload/v1758224396/androgynous-avatar-non-binary-queer-person_uiq1lx.jpg'
                            alt="Sophia Lin"
                            className="w-32 h-32 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold">Sophia Lin</h4>
                        <p className="text-gray-500 text-sm">Co-founder & CEO</p>
                    </div>
                    <div>
                        <img
                            src="https://res.cloudinary.com/drogaimmk/image/upload/v1758225308/ceo2_bgrw5y.jpg"
                            alt="Ethan Ramirez"
                            className="w-32 h-32 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold">Ethan Ramirez</h4>
                        <p className="text-gray-500 text-sm">Co-founder & CTO</p>
                    </div>
                    <div>
                        <img
                            src="https://res.cloudinary.com/drogaimmk/image/upload/v1758225755/ceo4_iordxn.jpg"
                            alt="Olivia Bennett"
                            className="w-32 h-32 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold">Olivia Bennett</h4>
                        <p className="text-gray-500 text-sm">Head of Community</p>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div>
                <h3 className="text-2xl font-semibold mb-6">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                        <FaGlobe className="text-3xl text-blue-500 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Global Perspective</h4>
                        <p className="text-gray-600 text-sm">
                            We embrace a global mindset, understanding the diverse needs of
                            nomads from all corners of the world.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                        <FaUsers className="text-3xl text-green-500 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Community Focus</h4>
                        <p className="text-gray-600 text-sm">
                            We foster a strong community of nomads, encouraging collaboration,
                            support, and shared experiences.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                        <FaShieldAlt className="text-3xl text-purple-500 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Trust & Transparency</h4>
                        <p className="text-gray-600 text-sm">
                            We are committed to providing accurate, reliable, and transparent
                            information to build trust with our users.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                        <FaDollarSign className="text-3xl text-yellow-500 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Value for Nomads</h4>
                        <p className="text-gray-600 text-sm">
                            We strive to offer exceptional value, helping nomads save time and
                            money while making informed decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;