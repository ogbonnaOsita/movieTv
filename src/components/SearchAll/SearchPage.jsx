/* eslint-disable no-undef */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import MovieGrid from "../MovieSection/MovieGrid";
import MovieCard from "../MovieSection/MovieCard";
import { v4 as uuidv4 } from "uuid";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1`
  );

  // Any time the searchQuery state change then the useeffect runs and set the url using the updated searchQuery state.
  useEffect(() => {
    // alert(process.env.VITE_REACT_APP_BEARER);
    setUrl(
      `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1`
    );
  }, [searchQuery]);

  //DATA FETCHING
  const fetchData = useQuery({
    queryKey: [url],
    queryFn: () =>
      axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
          //   process.env.VITE_REACT_APP_BEARER,
        },
      }),
  });

  console.log(fetchData.data);
  return (
    <div className="space-y-5 py-10 px-5 md:px-20">
      {/* Header */}
      <div className="space-y-3">
        <div className="title flex w-full items-center gap-3 justify-center text-[#f2f2f2] text-3xl">
          <AiOutlineSearch />
          Search
        </div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            name="searchquery"
            id=""
            className="text-lg px-4 py-2 min-w-[250px] w-[350px] max-w-[500px] rounded-md"
            placeholder="Enter the title of the movie or series"
            value={searchQuery}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      {/* grid display */}
      {fetchData.isLoading && searchQuery !== "" && (
        <div className="w-full h-[400px] flex justify-center items-center">
          <div className="loader_fetch"></div>
        </div>
      )}
      {fetchData.isError && <h1>Error Loading results</h1>}
      {fetchData.data && searchQuery !== "" && (
        <div>
          <MovieGrid>
            {fetchData.data.data.results.map((gridDatum) => (
              <MovieCard
                key={uuidv4()}
                data={gridDatum}
                section={gridDatum.media_type}
              />
            ))}
          </MovieGrid>
        </div>
      )}
    </div>
  );
};

export default Search;
