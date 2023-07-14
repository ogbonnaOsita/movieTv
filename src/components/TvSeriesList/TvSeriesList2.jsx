/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import TagSelectDropDown from "./TagSelectDropDown";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieGrid from "../MovieSection/MovieGrid";
import MovieCard from "../MovieSection/MovieCard";
import { v4 as uuidv4 } from "uuid";

const TvSeriesList2 = () => {
  const Filterdata = [
    {
      type: "Popular",
      category: "popular",
    },
    {
      type: "On Air",
      category: "On_Air",
    },
    {
      type: "Top Rated",
      category: "Top_Rated",
    },
    {
      type: "Airing Today",
      category: "Airing_Today",
    },
  ];
  //   const secondFilter = [
  //     {
  //       type: "Top Rated",
  //       category: "Top_Rated",
  //     },
  //     {
  //       type: "Airing Today",
  //       category: "Airing_Today",
  //     },
  //   ];

  const [popularUrl, setPopularUrl] = useState(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`
  );

  const [onAirUrl, setOnAirUrl] = useState(
    `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1`
  );

  const [topRatedUrl, setTopRatedUrl] = useState(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`
  );

  const [airingUrl, setAiringUrl] = useState(
    `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1`
  );
  const [pageData, setPageData] = useState([]);

  //   console.log(pageData);

  const [filterName, setFilterName] = useState("");

  const [page, setPage] = useState(1);

  //   console.log(page);

  //   console.log(topRatedUrl);
  //   const [url, setUrl] = useState(
  //     `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
  //   );

  //   // Any time the page state change then the useeffect runs and set the url using the updated page state.
  //   useEffect(() => {
  //     setUrl(
  //       `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
  //     );
  //   }, [page]);

  //DATA FETCHING
  const popularTvData = useQuery({
    queryKey: ["popularTvData", page],
    queryFn: () =>
      axios.get(popularUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
        },
      }),
    keepPreviousData: true,
  });

  const onAirTvData = useQuery({
    queryKey: ["onairtvpage", page],
    queryFn: () =>
      axios.get(onAirUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
        },
      }),
    keepPreviousData: true,
  });

  const topRatedTvData = useQuery({
    queryKey: [`${page}topRatedTvList${topRatedUrl}`, page],
    queryFn: () =>
      axios.get(topRatedUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
        },
      }),
    keepPreviousData: true,
  });

  const airingTodayTvData = useQuery({
    queryKey: ["airingTodayTv", page],
    queryFn: () =>
      axios.get(airingUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
        },
      }),
    keepPreviousData: true,
  });

  const isLoading =
    popularTvData.isLoading ||
    onAirTvData.isLoading ||
    topRatedTvData.isLoading ||
    airingTodayTvData.isLoading;

  const isError =
    popularTvData.isError ||
    onAirTvData.isError ||
    topRatedTvData.isError ||
    airingTodayTvData.isError;

  useEffect(() => {
    if (isLoading === false) {
      setPageData(popularTvData.data.data.results);
    }
  }, [isLoading]);

  useEffect(() => {
    if (filterName === "") {
      return;
    } else if (filterName === "popular") {
      setPageData(popularTvData.data.data.results);
    } else if (filterName === "onAir") {
      setPageData(airingTodayTvData.data.data.results);
    } else if (filterName === "topRated") {
      setPageData(topRatedTvData.data.data.results);
    } else if (filterName === "airingToday") {
      setPageData(airingTodayTvData.data.data.results);
    }
  }, [filterName]);

  //   useEffect(() => {
  //     if (filterName === "") {
  //       return;
  //     } else if (filterName === "popular") {
  //       setPopularUrl(
  //         `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`
  //       );
  //     } else if (filterName === "onAir") {
  //       setOnAirUrl(
  //         `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${page}`
  //       );
  //       //   setPageData(onAirTvData.data.data.results);
  //     } else if (filterName === "topRated") {
  //       setTopRatedUrl(
  //         `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`
  //       );
  //     } else if (filterName === "airingToday") {
  //       setAiringUrl(
  //         `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}`
  //       );
  //     }
  //   }, [page]);

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <div className="loader_fetch"></div>
      </div>
    );
  }

  if (isError) {
    return <h1>Error Loading results</h1>;
  }

  //   const gridData = fetchData.data.data.results;

  return (
    <div className="space-y-5 py-10 px-5 md:px-20">
      {/* TITLE */}
      <div className="title">
        <h1 className="Title font-semibold bg-red-800 text-2xl py-4 px-6 w-fit">
          Tv Series
        </h1>
      </div>
      {/* FILTERS */}
      <div className="filters flex flex-col items-centery justify-starty gap-5">
        <div className="flex items-center gap-3">
          <span className="font-meduim text-[#f2f2f2] text-sm">Filters</span>
          <TagSelectDropDown
            // values1={Filterdata}
            // values2={secondFilter}
            setFilterName={setFilterName}
          />
        </div>

        {/* <span className="font-semibold text-[#f2f2f2] text-sm">
          {filterName}
        </span> */}
      </div>
      {/* MOVIE GRID */}
      <div>
        <MovieGrid>
          {pageData.map((gridDatum) => (
            <MovieCard key={uuidv4()} data={gridDatum} section={"tvserie"} />
          ))}
        </MovieGrid>
      </div>
      {/* Pagination */}
      {/* <div className="flex justify-end items-center gap-2 px-[10%] ">
        <button
          className="border border-slate-600 py-1 px-2 text-white bg bg-transparent disabled:border-gray-700 disabled:text-gray-500"
          //   onClick={() => setPage((old) => Math.max(old - 1, 0))}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
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
        </button>
      </div> */}
    </div>
  );
};

export default TvSeriesList2;
