/* eslint-disable no-unused-vars */
import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import slide1 from "../../assets/slider-img-11.png";
import slide2 from "../../assets/slider-img-2.jpg";
import slide3 from "../../assets/slider-img-3.jpg";
import { BsFillPlayFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import SlideTiles from "./SlideTiles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMediaQuery } from "../../hooks/MediaQuery";

const HeroSection = () => {
  const images = [slide1, slide2, slide3];
  const indicators = (index) => (
    <div className="cursor-pointer w-5 top-[20px] relative indicator h-[2px] bg-white rounded-md mr-2"></div>
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["sliderData"],
    queryFn: () =>
      axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
          },
        }
      ),
  });

  // console.log(data.data.results);

  if (isLoading) {
    return <h1>Loading results</h1>;
  }

  if (isError) {
    return <h1>Error Loading results</h1>;
  }

  const slideData = data?.data.results?.slice(0, 3);

  console.log(slideData);

  return (
    <>
      <Slide arrows={false} duration={3000} indicators={indicators}>
        {slideData.map((slideDatum, i) => (
          <SlideTiles key={i} data={slideDatum} />
        ))}
      </Slide>
    </>
  );
};

export default HeroSection;
