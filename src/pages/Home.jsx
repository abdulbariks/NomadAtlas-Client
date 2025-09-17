import React from "react";
import ComminityPosts from "./HomeComponents/ComminityPosts";

const Home = () => {
  return (
    <div>
      <h2>NomadAtlas Home Page</h2>

      {/* Community posts */}
      <ComminityPosts></ComminityPosts>
    </div>
  );
};

export default Home;
