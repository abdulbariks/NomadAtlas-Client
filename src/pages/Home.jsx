import React from "react";
import Reviews from "../components/Home/SuccessStories";

import Newsletter from "../components/Home/Newsletter";
import CityDiscovery from "../components/Home/CityDiscovery";
import ComminityPosts from "../components/Home/ComminityPosts";
import Banner from "../Header/Banner";
import PopularDestination from "../components/Home/PopularDestination";
import NomadFavouriteDestination from "../components/Home/FavouriteDestination/FavouriteDestination";
import SmartCostPreview from "../components/Home/SmartCostPreview";
import HousingList from "../Housing Component/HousingList/HousingList";
import WeatherAndCostAlert from "../components/Home/WeatherAlert/WeatherAndCostAlert";
import Banner1 from "../components/Home/Banner/Banner1";
import DestinationFeatures from "../components/Home/DestinationFetures/DestinationFeatures";
import NomadPerks from "../components/Home/NomadPerks/NomadPerks";
import LocalServices from "../components/Home/LocalServices/LocalServices";
import WeatherSeasonalInfo from "../components/Home/WeatherSeasonalInfo/WeatherSeasonalInfo";
import ScrollToTopButton from "../components/Home/ScrollToTopButton/ScrollToTopButton";
import FeaturedOpportunities from "../components/Home/FeaturedOpportunities/FeaturedOpportunities";
import CommunityFeatures from "../components/Home/CommunityFeatures/CommunityFeatures";
import MoreAboutUs from "../components/Home/MoreAboutUs";
import Milestones from "../components/Home/Milestone"
import SuccessStories from "../components/Home/SuccessStories";

import FAQSection from "../components/Home/FAQSection";
import HomeBlogs from "../components/Home/HomeBlog";


const Home = () => {
  return (
    <div className="">
      {/* <Banner /> */}

      <Banner1/>

    <div className="mx-5 md:mx-8 lg:mx-10 ">
      {/* <PopularDestination />  */}
       {/* <HousingList/> */}

     </div>
      <NomadFavouriteDestination />
      <MoreAboutUs/>

     {/* <DestinationFeatures/> */}

    
      
      
      {/* <CityDiscovery /> */}
  
      <NomadPerks/>
      
     

      <FeaturedOpportunities/>
      <FAQSection/>
       <LocalServices/>
      


      {/* <WeatherSeasonalInfo/> */}
     
      
      {/* <ComminityPosts /> */}

      <HomeBlogs/>
      <CommunityFeatures/>

      {/* <SmartCostPreview /> */}
      

      <SuccessStories/>
       <Milestones/>
       
       
      <Newsletter />

      
      
      <ScrollToTopButton/>
      
       {/* <WeatherAndCostAlert/> */}
       
    </div>
  );
};

export default Home;
