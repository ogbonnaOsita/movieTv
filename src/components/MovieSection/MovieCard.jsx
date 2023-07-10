/* eslint-disable react/prop-types */
// import React from "react";
import { useState } from "react";
import { AiFillLike, AiFillStar } from "react-icons/ai";

const MovieCard = (props) => {
  const { data } = props;

  const {
    // backdrop_path,
    // overview,
    original_title,
    original_name,
    vote_average,
    // id,
    poster_path,
  } = data;

  const [isLiked, setIsLiked] = useState(false);

  const handleLiked = () => {
    setIsLiked(!isLiked);
  };

  const handleDetails = () => {
    // TODO: Route to the detail page of this movie card
  };

  return (
    <div className="cursor-pointer" onClick={handleDetails}>
      <div className="img-container h-[200px] w-[200px]y w-full rounded-md ">
        <img
          src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
          alt=""
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      <div className="description-img space-y-2 bg-blacky py-2">
        <p className="title font-semibold text-sm text-white ">
          {/* Lorem ipsum dolor */}
          {original_name || original_title}
        </p>
        <div className="year-ratings flex gap-3 items-center text-gray-700 text-xs font-semibold ">
          <span>2020</span>
          <span
            className={`ml-auto ${isLiked ? "text-red-700" : ""}`}
            onClick={handleLiked}
          >
            <AiFillLike />
          </span>
          <span className=" flex items-center gap-2 text-yellow-600">
            <AiFillStar /> {vote_average && vote_average.toString().slice(0, 3)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
