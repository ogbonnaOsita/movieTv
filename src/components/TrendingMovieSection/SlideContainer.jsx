/* eslint-disable no-unused-vars */
import { Slide } from "react-slideshow-image";
import { v4 as uuidv4 } from "uuid";
import { properties } from "./SectionData";
import SlideTiles from "./SlideTiles";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SlideContainer = () => {
  const [hashname, setHashname] = useState(`#${meunLinks[0].path}`);

  const [theUrl, setUrl] = useState(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US"
  );

  const location = useLocation();

  const fetchData = useQuery({
    queryKey: [theUrl],
    queryFn: () =>
      axios.get(theUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
        },
      }),
  });

  useEffect(() => {
    if (
      location.hash === "#movies" ||
      location.hash === "#series" ||
      location.hash === "#original-Series"
    ) {
      return undefined;
    }
    if (location.hash === "" || location.hash === "#trending-now") {
      setUrl("https://api.themoviedb.org/3/trending/movie/week?language=en-US");
    } else if (location.hash === "#popular") {
      setUrl("https://api.themoviedb.org/3/movie/popular");
    } else if (location.hash === "#topRated") {
      setUrl("https://api.themoviedb.org/3/movie/top_rated");
    } else if (location.hash === "#upcoming") {
      setUrl("https://api.themoviedb.org/3/movie/upcoming");
    }
  }, [location.hash]);

  useEffect(() => {
    if (
      location.hash === "" ||
      location.hash === "#movies" ||
      location.hash === "#series" ||
      location.hash === "#original-Series"
    ) {
      return undefined;
    } else {
      setHashname(location.hash);
    }
  }, [location]);

  if (fetchData.isLoading) {
    // return <h1 className="text-white text-center">Loading results</h1>;
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <div className="loader">
          <div data-glitch="Loading..." className="glitch">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (fetchData.isError) {
    return <h1>Error Loading results</h1>;
  }

  const queryfilters = [];

  const handleFilter = (id) => {
    console.log(id);
    queryfilters.push(id);
    const queryFilterString = queryfilters.join("&");
    alert(queryFilterString);
    setUrl(`https://api.themoviedb.org/3/genre/${queryFilterString}/movies`);
  };

  console.log(fetchData.data.data.results);

  const slideData = fetchData.data.data.results;
  return (
    <div className="movie-display-slide h-[400px] py-10 pl-12y pr-8y">
      <Slide
        {...properties}
        slidesToScroll={2}
        slidesToShow={7}
        indicators={true}
        autoplay={false}
      >
        {slideData.map((slideDatum) => (
          <SlideTiles key={uuidv4()} data={slideDatum} />
        ))}
      </Slide>
    </div>
  );
};

export default SlideContainer;
