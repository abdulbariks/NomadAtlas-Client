import React from 'react';
import { Link } from 'react-router';
import NomadAtlasLogo from '../../Header/NomadAtlasLogo'

const Error = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-50 to-yellow-50 text-center p-6'>
            <NomadAtlasLogo />
            <h1 className='text-7xl md:text-9xl font-extrabold bg-gradient-to-tr from-blue-500 to-yellow-400 bg-clip-text text-transparent mt-8'>
                404
            </h1>

            <p className='text-lg md:text-xl text-gray-600 mt-4'>
                Oops! The page you're looking for doesn't exist.
            </p>

            <Link to="/"
                className='mt-8 inline-block bg-gradient-to-tr from-blue-500 to-yellow-400 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300'>
                Go Back Home
            </Link>

            <div className="mt-12 animate-bounce">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 mx-auto text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

export default Error;