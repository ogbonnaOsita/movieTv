import React from "react";
import { Slide } from "react-slideshow-image";
import { properties, images } from "./SectionData";
import SlideTiles from "./SlideTiles";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

const MovieSlide = () => {
  //'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'---popular movies url
  return (
    <div className="movie-display-slide h-[400px] py-10 pl-12y pr-8y">
      <Slide
        {...properties}
        slidesToScroll={2}
        slidesToShow={7}
        indicators={true}
        autoplay={false}
      >
        {images.map((image) => (
          <SlideTiles key={uuidv4()} image={image} />
        ))}
      </Slide>
    </div>
  );
};

export default MovieSlide;
