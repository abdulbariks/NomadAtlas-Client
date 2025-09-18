import React from "react";
import Banner from "../Component/Banner/Banner";
import Reviews from "../components/Home/Reviews";
import Milestones from "../components/Home/Milestones";
import Newsletter from "../components/Home/Newsletter";
import CityDiscovery from "../components/Home/CityDiscovery";
import ComminityPosts from "../components/Home/ComminityPosts";
import PopularDestination from "../kousar/components/popularDestination/popularDestination";
import NomadFavouriteDestination from "../kousar/components/nomadFavouriteDestination/nomadFavouriteDestination";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularDestination></PopularDestination>
      <NomadFavouriteDestination></NomadFavouriteDestination>
      <CityDiscovery />
      <ComminityPosts />
      <Reviews />
      <Milestones />
      <Newsletter />
    </div>
  );
};

export default Home;
