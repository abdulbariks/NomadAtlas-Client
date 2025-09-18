import React from "react";
import ComminityPosts from "./HomeComponents/ComminityPosts";
import CityDiscovery from "./HomeComponents/cityDiscovery";

const Home = () => {
  return (
    <div>
      <h2>NomadAtlas Home Page</h2>

      {/* Community posts */}
      <ComminityPosts></ComminityPosts>
      {/* city discovery section */}
      <CityDiscovery></CityDiscovery>
    </div>
  );
};

export default Home;
