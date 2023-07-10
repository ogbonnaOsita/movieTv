/* eslint-disable react/prop-types */
import { NavLink, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "react-slideshow-image/dist/styles.css";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import MovieCard from "./MovieCard";
import HeaderLinks from "../TrendingMovieSection/HeaderLinks";
import TagContainer from "../TrendingMovieSection/TagContainer";
import MovieGrid from "./MovieGrid";
import { tagNames } from "./SectionData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MovieSection = (props) => {
  const { meunLinks } = props;

  const [page, setPage] = useState(1);

  const [queryName, setQueryName] = useState("movieDataQuery");

  const [hashname, setHashname] = useState(`#${meunLinks[0].path}`);

  const localStorageKey = "mstags";

  console.log(hashname);

  const [theUrl, setUrl] = useState(
    // "https://api.themoviedb.org/3/trending/movie/week?language=en-US"
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`
  );

  // let queryUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  // let queryUrl = ;

  console.log(theUrl, page);

  const location = useLocation();

  const fetchData = useQuery({
    queryKey: [queryName, page, theUrl],
    queryFn: () =>
      axios.get(theUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
        },
      }),
    keepPreviousData: true,
  });

  const removeTagFromLocalStorage = () => {
    // alert(55566);
    localStorage.removeItem(localStorageKey);
  };

  useEffect(() => {
    if (
      location.hash === "#trending-now" ||
      location.hash === "#popular" ||
      location.hash === "#topRated" ||
      location.hash === "#upcoming"
    ) {
      return undefined;
    }

    // removeTagFromLocalStorage();

    if (location.hash === "" || location.hash === "#movies") {
      // setUrl("https://api.themoviedb.org/3/trending/movie/week?language=en-US");
      // setPage(1);//
      setUrl(
        () =>
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`
      );
      setQueryName("movieDataQuery");
      return removeTagFromLocalStorage();
    } else if (location.hash === "#series") {
      // setPage(1);
      // setUrl("https://api.themoviedb.org/3/tv/popular?language=en-US&page=2");
      setQueryName("seriesDataQuery");

      setUrl(
        () =>
          `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
      );
      return removeTagFromLocalStorage();
    } else if (location.hash === "#original-Series") {
      setQueryName("originalSeriesDataQuery");
      setUrl("https://api.themoviedb.org/3/trending/tv/week?language=en-US");
      return removeTagFromLocalStorage();
    }
  }, [location.hash, page]);

  const hoverEffect2 =
    'before:absolute before:h-1 before:w-1 before:rounded-full before:bg-red-700 before:hidden before:bottom-[-5px] before:content-[""] hover:before:flex before:left-[60%]';

  const handleFilter = (id) => {
    const queryfilters = [];

    // console.log(id);
    queryfilters.push(id);
    const queryFilterString = queryfilters.join("&");
    alert(queryFilterString);
    // setUrl(`https://api.themoviedb.org/3/genre/${queryFilterString}/movies`);
  };

  useEffect(() => {
    if (
      location.hash === "" ||
      location.hash === "#trending-now" ||
      location.hash === "#popular" ||
      location.hash === "#topRated" ||
      location.hash === "#upcoming"
    ) {
      return undefined;
    } else {
      setHashname(location.hash);
    }
  }, [location]);

  if (fetchData.isLoading) {
    // return <h1 className="text-white text-center">Loading results</h1>;
    return (
      <div className="space-y-4 px-4 md:px-[20vw]">
        <HeaderLinks>
          {meunLinks.map((menu) => {
            // console.log("#" + menu.path);
            return (
              <NavLink
                key={uuidv4()}
                to={`/#${menu.path}`}
                className={` ${
                  hashname === "#" + menu.path
                    ? "text-sm  md:text-[18px] text-[#efefefee]"
                    : "text-xs  md:text-base text-gray-700"
                }  text-[#efefefee] transition-all font-medium capitalize relative flex items-center gap-[2px] md:gap-2  ${hoverEffect2}`}
              >
                {menu.icon}
                {menu.menu}
              </NavLink>
            );
          })}
          <NavLink
            className={`text-[#efefefee] text-base text-gray-700 transition-all font-medium capitalize relative flex items-center gap-2  ${hoverEffect2}`}
          >
            <IoMdSearch />
            Search
          </NavLink>
        </HeaderLinks>
        <div className="w-full h-[400px] flex justify-center items-center">
          <div className="loader">
            <div data-glitch="Loading..." className="glitch">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (fetchData.isFetching) {
    return (
      <div className="h-[1470px] flex justify-center items-center bg-[rgba(0,0,0,0.1)]">
        <div className="loader_fetch"></div>
      </div>
    );
  }

  if (fetchData.isError) {
    return <h1>Error Loading results</h1>;
  }

  const gridData = fetchData.data.data.results;

  // console.log(fetchData.isPreviousData);

  // fetchData.isPreviousData

  return (
    <section>
      <header className="px-4 md:px-[10%] space-y-6">
        <HeaderLinks>
          {meunLinks.map((menu) => {
            // console.log("#" + menu.path);
            return (
              <NavLink
                key={uuidv4()}
                to={`/#${menu.path}`}
                className={` ${
                  hashname === "#" + menu.path
                    ? "text-sm  md:text-[18px] text-[#efefefee]"
                    : "text-xs  md:text-base text-gray-700"
                }  text-[#efefefee] transition-all font-medium capitalize relative flex items-center gap-[2px] md:gap-2  ${hoverEffect2}`}
              >
                {menu.icon}
                {menu.menu}
              </NavLink>
            );
          })}
          <NavLink
            className={`text-[#efefefee] text-base text-gray-700 transition-all font-medium capitalize relative flex items-center gap-2  ${hoverEffect2}`}
          >
            <IoMdSearch />
            Search
          </NavLink>
        </HeaderLinks>
        <hr />
        <TagContainer
          tagNames={tagNames}
          handleFilter={handleFilter}
          storageKey={localStorageKey}
        />
      </header>
      <MovieGrid>
        {gridData.map((gridDatum) => (
          <MovieCard key={uuidv4()} data={gridDatum} />
        ))}
      </MovieGrid>
      <div className="flex justify-end items-center gap-2 px-[10%] ">
        <button
          className="border border-slate-600 py-1 px-2 text-white bg bg-transparent disabled:border-gray-700 disabled:text-gray-500"
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}
        >
          {/* <FaLessThan /> */}
          Prev
        </button>
        <span className="border border-slate-400 text-sm py-1 px-2 font-semibold text-white bg bg-transparent">
          {page}
        </span>
        <button
          className="border border-slate-600 py-1 px-2 text-white bg bg-transparent disabled:border-gray-700 disabled:text-gray-500"
          onClick={() => {
            // if (fetchData.data.data.results.hasMore) {
            setPage((old) => old + 1);
            // }
          }}
          // Disable the Next Page button until we know a next page is available
          // disabled={!fetchData.data?.hasMore}
        >
          Next
          {/* <FaGreaterThan /> */}
        </button>
      </div>
    </section>
  );
};

export default MovieSection;
