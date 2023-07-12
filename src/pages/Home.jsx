// import { useEffect } from "react";
import { createPortal } from "react-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import FilterByCategory from "../components/MovieSection/FilterByCategory";
import Navbar from "../components/Navbar";
import TMSection from "../components/TrendingMovieSection/TMSection";
import TrailerIframe from "../components/HeroSection/TrailerIframe";
import { useState } from "react";

const Home = () => {
  // useEffect(() => {
  //   localStorage.removeItem("tags");
  // }, []);
  // const [watchTrailer, setWatchTrailer] = useState(false);
  return (
    <>
      <Header>
        <Navbar />
        <HeroSection />
      </Header>
      <TMSection />
      <FilterByCategory />
      {/* <TrailerIframe id={447365} closeModal={setWatchTrailer} /> */}
      {/* {
        // watchTrailer &&
        createPortal(
          <TrailerIframe id={447365} closeModal={setWatchTrailer} />,
          document.getElementById("iframe_modal")
        )
      } */}
    </>
  );
};

export default Home;
