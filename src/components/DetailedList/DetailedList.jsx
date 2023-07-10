import { tagNames } from "../TrendingMovieSection/SectionData";
import { v4 as uuidv4 } from "uuid";
// import { Slide } from "react-slideshow-image";
// import SlideTiles from "../TrendingMovieSection/SlideTiles";
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import MovieGenreSlide from "./MovieGenreSlide";
// import { useNavigate } from "react-router-dom";
import ScrollToTopBtn from "../ScrollToTopBtn";
import TagSelectDropDown from "./TagSelectDropDown";

const DetailedList = () => {
  // const navigate = useNavigate();
  const handleClicked = (path) => {
    // navigate(`/#${path}`);
    const element = document.getElementById(path);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-6">
      {/* TAG CONTAINER */}
      <div className="col-span-1 hidden lg:block sticky top-0 bg-[#0d0d0d] h-[100vh] overflow-hidden py-10 px-4 border-r border-slate-700 ">
        <h1 className="font-semibold text-white text-xl mb-4 text-center">
          Filter Tags
        </h1>
        <div className="tags flex flex-wrap gap-5 justify-center">
          {tagNames.map((tagName) => (
            <span
              key={uuidv4()}
              onClick={() => handleClicked(tagName.name)}
              className={`px-3 py-1 rounded-xl border border-slate-700 transition-all bg-[rgba(20,20,20,1)] text-white text-sm cursor-pointer`}
            >
              {tagName.name}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-span-6 px-5 lg:px-0y lg:col-span-5 text-[#F2F2F2] flex flex-col gap-10 lg:pl-10 py-10">
        <div className="h-[400px]y space-y-5">
          {/* this div will be the div to show the movie been selected--or hovered on... */}
          <h1 className="Title font-semibold bg-red-800 text-2xl skew-y-6y py-4 px-6 w-fit">
            Movies
          </h1>
          <div className="lg:hidden">
            <TagSelectDropDown />
          </div>
        </div>
        <div className="space-y-10">
          {tagNames.map((tagname) => (
            <MovieGenreSlide
              key={uuidv4()}
              tagname={tagname.name}
              genreId={tagname.id}
            />
          ))}
          {/* slides container */}
          {/* <div className="movie-display-slide h-[400px] py-10 pl-12y pr-8y"></div> */}
        </div>
      </div>
      <ScrollToTopBtn />
    </div>
  );
};

export default DetailedList;
