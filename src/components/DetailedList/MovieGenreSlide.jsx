/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Slide } from "react-slideshow-image";
import {
  // properties,
  responsiveSettings,
} from "../TrendingMovieSection/SectionData";
import { properties } from "./SlideData";
import SlideTiles from "./SlideTiles";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { tagNames, images } from "../TrendingMovieSection/SectionData";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Import Swiper styles
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const MovieGenreSlide = ({ genreId, tagname }) => {
  const [bgImg, setBgImg] = useState("none");

  const handleChangeBgImg = (img) => {
    setBgImg(img);
  };
  // GETTING THE DATA LOGIC
  const [theUrl, setTheUrl] = useState(
    `https://api.themoviedb.org/3/genre/${genreId}/movies`
  );
  const fetchData = useQuery({
    queryKey: [theUrl],
    queryFn: () =>
      axios.get(theUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
        },
      }),
  });

  if (fetchData.isLoading) {
    // return <h1 className="text-white text-center">Loading results</h1>;
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <div className="loader_fetch"></div>
        {/* <div className="loader">
          <div data-glitch="Loading..." className="glitch">
            Loading...
          </div>
        </div> */}
      </div>
    );
  }

  if (fetchData.isError) {
    return <h1>Error Loading results</h1>;
  }

  //   console.log(fetchData.data.data.results);

  const slideData = fetchData.data.data.results;

  // const [bgImg, setBgImg] = useState(slideData[0].poster_path);

  // useEffect(()=>{
  //   setBgImg(slideData[0].poster_image)
  // },[])

  //   console.log(slideData);

  return (
    <div className=" py-5 space-y-2 " id={tagname}>
      {/* MOVIE GENRE SLIDE TITLE */}
      <p className="genre-title text-white font-semibold text-lg capitalize px-2">
        {tagname}
      </p>

      {/* SLIDER CONTAINER */}
      <div
        className="movie-display-slide bg-no-repeat bg-cover bg-center h-[400px]y py-20 px-5 pl-12y pr-8y transition-all ease-in-out "
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0, 0.62), rgba(0,0,0, 0.83)),
          url(http://image.tmdb.org/t/p/w500/${bgImg})
          `,
        }}
      >
        <Slide
          {...properties}
          duration={1000}
          transitionDuration={0}
          slidesToScroll={1}
          slidesToShow={1}
          indicators={true}
          autoplay={false}
          responsive={responsiveSettings}
          onChange={(from, to) => {
            const imgValue = slideData[to].poster_path;
            handleChangeBgImg(imgValue);
          }}
        >
          {slideData.map((slideDatum) => (
            <SlideTiles
              key={uuidv4()}
              data={slideDatum}
              handleChangeBgImg={handleChangeBgImg}
            />
          ))}
        </Slide>
        {/* <Swiper
          slidesPerView={5}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {images.map((slideDatum) => (
            <SwiperSlide key={uuidv4()}>
              <SlideTiles
                data={slideDatum}
                handleChangeBgImg={handleChangeBgImg}
              />
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
    </div>
  );
};

export default MovieGenreSlide;
