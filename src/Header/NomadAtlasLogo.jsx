import React from 'react';
import Lottie from "lottie-react";
import { Link } from 'react-router';
import logo from "../assets/Lottie/Logo.json"

const NomadAtlasLogo = () => {
    return (
        <Link>
        <div className='flex gap-0 items-center'>
    {/* Lottie Animation */}
            <Lottie
            animationData={logo}
            loop={true}
            className='w-6 md:w-9 mx-auto gap-0'
            >
                {/* Text Animation */}
           <h2 className='text-2xl font-extrabold '>
            NomadAtlas
           </h2>
            </Lottie>
            
        </div>
        </Link>
       
    );
};

export default NomadAtlasLogo;