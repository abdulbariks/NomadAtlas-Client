import React from "react";
import PopularDestination from "../kousar/components/popularDestination/popularDestination";
import NomadFavouriteDestination from "../kousar/components/nomadFavouriteDestination/nomadFavouriteDestination";

const Home = () => {
  return (
    <div>
      <h2>NomadAtlas Home Page</h2>
      <PopularDestination></PopularDestination>
      <NomadFavouriteDestination></NomadFavouriteDestination>
    </div>
  );
};

export default Home;
