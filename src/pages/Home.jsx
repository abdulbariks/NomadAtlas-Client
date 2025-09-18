import React from "react";
import Banner from "../Component/Banner/Banner";
import FavouriteDestination from "../components/Home/FavouriteDestination";
import PopularDestination from "../components/Home/PopularDestination";
import Reviews from "../components/Home/Reviews";
import Milestones from "../components/Home/Milestones";
import Newsletter from "../components/Home/Newsletter";
import CityDiscovery from "../components/Home/CityDiscovery";
import ComminityPosts from "../components/Home/ComminityPosts";

const Home = () => {
  return (
    <div>
     <Banner />

      <FavouriteDestination />
      <PopularDestination />
      <CityDiscovery />
      <ComminityPosts />
      <Reviews />
      <Milestones />
      <Newsletter />
    </div>
  );
};

export default Home;
