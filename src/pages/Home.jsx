// import { useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import FilterByCategory from "../components/MovieSection/FilterByCategory";
import Navbar from "../components/Navbar";
import TMSection from "../components/TrendingMovieSection/TMSection";

const Home = () => {
  // useEffect(() => {
  //   localStorage.removeItem("tags");
  // }, []);
  return (
    <>
      <Header>
        <Navbar />
        <HeroSection />
      </Header>
      <TMSection />
      <FilterByCategory />
    </>
  );
};

export default Home;
