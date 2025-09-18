import React from "react";
import Reviews from "../components/Home/Reviews";
import Milestones from "../components/Home/Milestones";
import Newsletter from "../components/Home/Newsletter";
import CityDiscovery from "../components/Home/CityDiscovery";
import ComminityPosts from "../components/Home/ComminityPosts";
import PopularDestination from "../components/Home/PopularDestination/popularDestination";
import NomadFavouriteDestination from "../components/Home/NomadFavouriteDestination/nomadFavouriteDestination";
import Banner from "../Component/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
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
