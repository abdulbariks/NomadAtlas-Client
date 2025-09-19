import React from "react";
import ComminityPosts from "./HomeComponents/ComminityPosts";
import CityDiscovery from "./HomeComponents/cityDiscovery";
import SmartCostPreview from "./HomeComponents/SmartCostPreview";

const Home = () => {
  return (
    <div>
      <h2>NomadAtlas Home Page</h2>

      {/* Community posts */}
      <ComminityPosts></ComminityPosts>
      {/* city discovery section */}
      <CityDiscovery></CityDiscovery>
      {/* Smart Const Preview section */}
      <SmartCostPreview></SmartCostPreview>
    </div>
  );
};

export default Home;
