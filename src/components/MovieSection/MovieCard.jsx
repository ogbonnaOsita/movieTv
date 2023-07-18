/* eslint-disable react/prop-types */
// import React from "react";
import { useEffect, useState } from "react";
import { AiFillLike, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MovieCard = (props) => {
  const { data, section, index } = props;

  const {
    backdrop_path,
    // overview,
    original_title,
    original_name,
    vote_average,
    id,
    poster_path,
  } = data;

  const [isLiked, setIsLiked] = useState(false);

  const [filmType, setFilmType] = useState("movie");

  useEffect(() => {
    if (section === "movie") {
      return setFilmType("movie");
    } else {
      return setFilmType("tvSerie");
    }
  }, []);

  const handleLiked = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50, translateY: -50 }}
      animate={{ opacity: 1, translateX: 0, translateY: 0 }}
      transition={{ duration: 0.3, delay: index * 0.2 }}
    >
      <Link
        className="cursor-pointer"
        to={`/${id}/${filmType}/${original_title || original_name}`}
      >
        <div className="img-container h-[200px] w-[200px]y w-full rounded-md ">
          <img
            src={`http://image.tmdb.org/t/p/w500/${
              poster_path || backdrop_path
            }`}
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
              <AiFillStar />{" "}
              {vote_average && vote_average.toString().slice(0, 3)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
