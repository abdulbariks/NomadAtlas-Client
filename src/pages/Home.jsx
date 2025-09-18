import React from "react";

import Milestones from "../components/Milestones";
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <div>
      <h2>NomadAtlas Home Page</h2>
      <Reviews/>
      <Milestones/>
    </div>
  );
};

export default Home;
