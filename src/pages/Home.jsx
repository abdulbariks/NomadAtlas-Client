import React from "react";
import Reviews from "../components/Home/Reviews";
import Milestones from "../components/Home/Milestones";
import Newsletter from "../components/Home/Newsletter";
import CityDiscovery from "../components/Home/CityDiscovery";
import ComminityPosts from "../components/Home/ComminityPosts";
import Banner from "../Header/Banner";
import PopularDestination from "../components/Home/PopularDestination";
import NomadFavouriteDestination from "../components/Home/FavouriteDestination";
import SmartCostPreview from "../components/Home/SmartCostPreview";
import HousingList from "../Housing Component/HousingList/HousingList";
import WeatherAndCostAlert from "../components/Home/WeatherAlert/WeatherAndCostAlert";
import Banner1 from "../components/Home/Banner/Banner1";
import DestinationFeatures from "../components/Home/DestinationFetures/DestinationFeatures";
import NomadPerks from "../components/Home/NomadPerks/NomadPerks";
import LocalServices from "../components/Home/LocalServices/LocalServices";
import WeatherSeasonalInfo from "../components/Home/WeatherSeasonalInfo/WeatherSeasonalInfo";

const Home = () => {
  return (
    <div className="">
      {/* <Banner /> */}

      <Banner1/>

    
      <PopularDestination /> 
       <HousingList/>


      

     {/* <DestinationFeatures/> */}

    
      
      <NomadFavouriteDestination />
      <CityDiscovery />

      
  
    

      <NomadPerks/>
      
      <LocalServices/>
      <WeatherSeasonalInfo/>
     
      
      <ComminityPosts />

      <SmartCostPreview />
      <Reviews />
      <Milestones />
      <Newsletter /> 
      
      
      
       {/* <WeatherAndCostAlert/> */}
    </div>
  );
};

export default Home;
