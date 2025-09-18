import React from "react";

import Milestones from "../components/Milestones";
import Reviews from "../components/Reviews";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <h2>NomadAtlas Home Page</h2>
      <Reviews />
      <Milestones />
      <Newsletter />
    </div>
  );
};

export default Home;
