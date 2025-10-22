import React from "react";
import { Link } from "react-router";
import logo from "../assets/Logo/Logo4.png";

const NomadAtlasLogo = () => {
  return (
    <Link to="/" className="group">
      <div className="flex gap-2 items-center">
        {/* Logo */}
        <div className="  group-hover:scale-110 transition-transform duration-300">
          <img src={logo} alt="NomadAtlas Logo" className="w-7 h-6 md:w-7 md:h-7 " />
        </div>
       

       
        {/* Text */}
        <h2 className="text-xl md:text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-[#11c3c0] to-[#3ea1f1] bg-clip-text text-transparent  transition-colors duration-300">
          Nomad Atlas
        </h2> </div>
   
    </Link>
  );
};

export default NomadAtlasLogo;

// import React from "react";
// import { Link } from "react-router";
// import logo from "../assets/Logo/NomadLogo.png";

// const NomadAtlasLogo = () => {
//   return (
//     <Link to="/" className="group">
//       <div className="flex gap-2 items-center">
//         {/* Logo */}
//         <div className="  group-hover:scale-110 transition-transform duration-300">
//           <img src={logo} alt="NomadAtlas Logo" className="w-5 h-5 md:w-7 md:h-7 " />
//         </div>

//         {/* Text */}
//         <h2 className="text-xl md:text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-[#11c3c0] to-[#3ea1f1] bg-clip-text text-transparent  transition-colors duration-300">
//           Nomad Atlas
//         </h2>
//       </div>
//     </Link>
//   );
// };

// export default NomadAtlasLogo;