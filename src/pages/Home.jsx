import React from "react";
import Reviews from "../components/Home/Reviews";
import Milestones from "../components/Home/Milestones";
import Newsletter from "../components/Home/Newsletter";
import CityDiscovery from "../components/Home/CityDiscovery";
import ComminityPosts from "../components/Home/ComminityPosts";
import Banner from "../Header/Banner";
import PopularDestination from "../components/Home/PopularDestination";
import NomadFavouriteDestination from "../components/Home/FavouriteDestination";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularDestination />
      <NomadFavouriteDestination />
      <CityDiscovery />
      <ComminityPosts />
      <Reviews />
      <Milestones />
      <Newsletter />
    </div>
  );
};

export default Home;
