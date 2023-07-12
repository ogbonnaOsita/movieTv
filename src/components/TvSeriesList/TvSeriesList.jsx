/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import TagSelectDropDown from "./TagSelectDropDown";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieGrid from "../MovieSection/MovieGrid";
import MovieCard from "../MovieSection/MovieCard";
import { v4 as uuidv4 } from "uuid";

const TvSeriesList = () => {
  const firstFilter = [
    {
      type: "Popular-desc",
      category: "popularity",
    },
    {
      type: "Popular-asc",
      category: "popularity",
    },
  ];
  const secondFilter = [
    {
      type: "Release-Date-desc",
      category: "releaseDate",
    },
    {
      type: "Release-Date-asc",
      category: "releaseDate",
    },
  ];

  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
  );

  // Any time the page state change then the useeffect runs and set the url using the updated page state.
  useEffect(() => {
    setUrl(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );
  }, [page]);

  //DATA FETCHING
  const fetchData = useQuery({
    queryKey: [url, page],
    queryFn: () =>
      axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
        },
      }),
  });

  if (fetchData.isLoading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <div className="loader_fetch"></div>
      </div>
    );
  }

  if (fetchData.isError) {
    return <h1>Error Loading results</h1>;
  }

  const gridData = fetchData.data.data.results;

  return (
    <div className="space-y-5 py-10 px-5 md:px-20">
      {/* TITLE */}
      <div className="title">
        <h1 className="Title font-semibold bg-red-800 text-2xl py-4 px-6 w-fit">
          Tv Series
        </h1>
      </div>
      {/* FILTERS */}
      <div className="filters flex items-center justify-start gap-5">
        <div className="flex items-center gap-3">
          <span className="font-meduim text-[#f2f2f2] text-sm">Filters</span>
          <TagSelectDropDown
            values1={firstFilter}
            values2={secondFilter}
            filter={"Popularity"}
            setUrl={setUrl}
          />
        </div>
      </div>
      {/* MOVIE GRID */}
      <div>
        <MovieGrid>
          {gridData.map((gridDatum) => (
            <MovieCard key={uuidv4()} data={gridDatum} section={"tvserie"} />
          ))}
        </MovieGrid>
      </div>
      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[10%] ">
        <button
          className="border border-slate-600 py-1 px-2 text-white bg bg-transparent disabled:border-gray-700 disabled:text-gray-500"
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
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
      </div>
    </div>
  );
};

export default TvSeriesList;
