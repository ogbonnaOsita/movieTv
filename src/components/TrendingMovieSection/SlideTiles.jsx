/* eslint-disable react/prop-types */
// import React from 'react'

import { useState } from "react";
import { AiFillLike, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

// import { BsFillPlayFill } from "react-icons/bs";
// import { HiPlus } from "react-icons/hi";

const SlideTiles = (props) => {
  const { data } = props;
  const [isLiked, setIsLiked] = useState(false);

  // console.log(data);

  const {
    // backdrop_path,
    // overview,
    original_title,
    vote_average,
    id,
    poster_path,
  } = data;

  // const voteAverageRoundUp = vote_average.toString().slice(0, 3);

  const handleLiked = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleDetails = () => {
    // Route to the details page for this specific movie
  };

  return (
    <div
      className="each-slide-effect px-2 cursor-pointer"
      onClick={handleDetails}
    >
      <Link
        to={`/${id}/movie/${original_title.split(" ").join("-")}`}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0, 0.1), rgba(0,0,0, 0.2)), url(http://image.tmdb.org/t/p/w500/${poster_path})`,
        }}
        className="flex items-end justify-start bg-cover h-[300px] rounded-md"
      >
        <div className="flex gap-y-3 flex-col py-2 bg-[rgba(0,0,0,0.7)] w-full px-1">
          <p className="title font-semibold text-sm text-white ">
            {/* Lorem ipsum dolor */}
            {original_title}
          </p>
          <div className="year-ratings flex gap-3 items-center text-gray-700 text-xs font-semibold ">
            <span className="text-slate-500">2020</span>
            <span
              className={`ml-auto cursor-pointer ${
                isLiked ? "text-red-700" : "text-slate-500"
              }`}
              onClick={handleLiked}
            >
              <AiFillLike />
            </span>
            <span className=" flex items-center gap-2 text-yellow-600">
              <AiFillStar /> {vote_average.toString().slice(0, 3)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SlideTiles;
