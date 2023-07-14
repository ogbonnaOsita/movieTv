import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import SlideTiles from "./SlideTiles";
import TagContainer from "./TagContainer";
import HeaderLinks from "./HeaderLinks";
import {
  properties,
  hoverEffect2,
  tagNames,
  meunLinks,
  responsiveSettings,
} from "./SectionData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TMSection = () => {
  const [hashname, setHashname] = useState(`#${meunLinks[0].path}`);

  const [genreDisplayname, setGenreDisplayname] = useState(""); // used to display the genre that is been displayed after selecting the tags.The jsx is to be written after the TagContainer.

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
    refetchIntervalInBackground: true,
    refetchInterval: 3000,
    // retryDelay: 5000,
    retry: false,
  });

  const removeTagFromLocalStorage = () => {
    // alert(55566);
    localStorage.removeItem("tags");
  };

  useEffect(() => {
    if (
      location.hash === "#movies" ||
      location.hash === "#series" ||
      location.hash === "#original-Series"
    ) {
      return undefined;
    }

    setGenreDisplayname("");

    // removeTagFromLocalStorage();

    if (location.hash === "" || location.hash === "#trending-now") {
      setUrl("https://api.themoviedb.org/3/trending/movie/week?language=en-US");
      return removeTagFromLocalStorage();
    } else if (location.hash === "#popular") {
      setUrl("https://api.themoviedb.org/3/movie/popular");
      return removeTagFromLocalStorage();
    } else if (location.hash === "#topRated") {
      setUrl("https://api.themoviedb.org/3/movie/top_rated");
      return removeTagFromLocalStorage();
    } else if (location.hash === "#upcoming") {
      setUrl("https://api.themoviedb.org/3/movie/upcoming");
      return removeTagFromLocalStorage();
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

  const handleFilter = (id) => {
    const queryfilters = [];

    // console.log(id);
    queryfilters.push(id);
    const queryFilterString = queryfilters.join("&");
    // alert(queryFilterString);
    const genreSectionName = tagNames.filter((tagname) => tagname.id === id);
    setGenreDisplayname(genreSectionName[0].name);
    // setGenreDisplayname((prev)=> prev = )
    setUrl(`https://api.themoviedb.org/3/genre/${queryFilterString}/movies`);
  };

  // const children = useMemo(
  //   () => (
  //     <TagContainer
  //       tagNames={tagNames}
  //       handleFilter={handleFilter}
  //       storageKey={"tmtags"}
  //     />
  //   ),
  //   [tagNames]
  // );

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

  // console.log(fetchData.data.data.results);

  const slideData = fetchData.data.data.results;

  return (
    <section>
      <header className="px-4 md:px-[10%] space-y-6">
        <HeaderLinks>
          {meunLinks.map((menu) => {
            return (
              <NavLink
                key={uuidv4()}
                to={`/#${menu.path}`}
                className={` ${
                  hashname === "#" + menu.path
                    ? "text-sm md:text-[18px] text-[#efefefee]"
                    : "text-xs md:text-base text-gray-700"
                }  text-[#efefefee] transition-all font-medium capitalize relative flex items-center gap-[2px] md:gap-2  ${hoverEffect2}`}
              >
                {menu.icon}
                {menu.menu}
              </NavLink>
            );
          })}
        </HeaderLinks>

        <hr />

        {/* <TagContainer tagNames={tagNames} handleFilter={handleFilter} /> */}
        {/* {children} */}
        <TagContainer
          tagNames={tagNames}
          handleFilter={handleFilter}
          storageKey={"tmtags"}
        />
        <h3 className="font-semibold underline underline-offset-2 text-xl text-white">
          {genreDisplayname}
        </h3>
      </header>

      <div className="movie-display-slide h-[400px] py-10 pl-12y pr-8y">
        <Slide
          {...properties}
          slidesToScroll={2}
          slidesToShow={2}
          indicators={true}
          autoplay={false}
          responsive={responsiveSettings}
        >
          {slideData.map((slideDatum) => (
            <SlideTiles key={uuidv4()} data={slideDatum} />
          ))}
        </Slide>
      </div>
    </section>
  );
};

export default TMSection;
