/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BsFillPlayFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { useMediaQuery } from "../../hooks/MediaQuery";

const SlideTiles = (props) => {
  const { data, handleChangeBgImg } = props;
  const backgroundSwitch = useMediaQuery("(min-width: 760px)");

  const {
    backdrop_path,
    overview,
    original_title,
    vote_average,
    id,
    poster_path,
  } = data;
  // url(http://image.tmdb.org/t/p/w500/${backdrop_path})
  // https://api.themoviedb.org/3/movie/603692?language=en-US

  const backgroundStyle = {
    style: (backgroundSwitch) => ({
      backgroundImage: backgroundSwitch
        ? `linear-gradient(to bottom, rgba(0,0,0, 0.62), rgba(0,0,0, 0.83)), 
          url(http://image.tmdb.org/t/p/w500/${backdrop_path})`
        : `linear-gradient(to bottom, rgba(0,0,0, 0.62), rgba(0,0,0, 0.83)), 
          url(http://image.tmdb.org/t/p/w500/${poster_path})
          `,
    }),
  };

  const {
    data: movieData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [original_title],
    queryFn: () =>
      axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
        },
      }),
  });

  if (isLoading) {
    return <h1>Loading results</h1>;
  }

  if (isError) {
    return <h1>Error Loading results</h1>;
  }

  console.log(movieData.data);

  return (
    <div className="each-slide-effect">
      <div
        // style={{
        //   backgroundImage: `linear-gradient(to bottom, rgba(0,0,0, 0.62), rgba(0,0,0, 0.83)),
        //   url(http://image.tmdb.org/t/p/w500/${poster_path})
        //   `,
        // }}
        style={backgroundStyle.style(backgroundSwitch)}
        className="flex items-center justify-start md:pl-20 bg-cover bg-center bg-no-repeat h-[90vh] relative"
      >
        {/* <img
          src={`http://image.tmdb.org/t/p/w500/${backdrop_path}`}
          alt=""
          className="absolute top-0 left-0 z-0 h-full object-cover
          "
        /> */}
        <div className="p-10 text-xl bg-[#efefef]y space-y-7 z-10y">
          <p className="font-medium text-sm text-[#efefef] leading-loose">
            Duration : 1hr 30mins
          </p>
          <p className="rating font-medium text-sm text-gray-400">
            <span className="text-[#efefef] ">{vote_average}</span>{" "}
            {movieData.data.genres[0].name + " "} |{" "}
            {movieData.data.genres[1].name}
          </p>
          <h2 className="title text-4xl font-bold text-[#efefef]">
            {original_title}
          </h2>
          <p className="font-medium text-sm text-[#efefef] leading-loose w-[300px] ">
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            eligendi amet obcaecati, ipsum reprehenderit ex! */}
            {/* {overview.slice(0, 200)}........ */}
            {movieData.data.tagline}
          </p>
          <div className="btn-cta flex gap-4 text-sm font-semibold">
            <button className="rounded-xl py-2 px-5 bg-red-700 text-[#efefef] flex items-center gap-2">
              <BsFillPlayFill />
              Watch
            </button>
            <button className="rounded-xl py-2 px-5 bg-black text-[#efefef] flex items-center gap-2">
              <HiPlus />
              Add List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideTiles;
