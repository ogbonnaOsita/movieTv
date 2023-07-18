/* eslint-disable react/prop-types */
import { NavLink, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "react-slideshow-image/dist/styles.css";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
// import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import MovieCard from "./MovieCard";
import HeaderLinks from "../TrendingMovieSection/HeaderLinks";
import TagContainer from "../TrendingMovieSection/TagContainer";
import MovieGrid from "./MovieGrid";
import { tagNames } from "./SectionData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { motion, useScroll } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// import SelectDemo from "../DetailedList/TagSelectDropDown";

const MovieSection = (props) => {
  // const { ref, inView } = useInView();

  const { meunLinks } = props;
  // STATE THAT IS USED TO CONTROL THE PAGE AND PAGINATION
  const [page, setPage] = useState(1);

  // USED TO SET THE QUERYNAME IN THE USEQUERY FUNCTION EACT TIME THE USEQUERY FUNCTION MAKES A NEW DATA QUERY. IT IS IMPORTANT AND A REQUIREMENT TO USE A DIFFERENT QUERYNAME FOR EACH AND ANY DIFFERENT DATA QUERY CALL. IF NOT ERRORS WILL OCCURR.
  const [queryName, setQueryName] = useState("movieDataQuery");

  // THIS STATE IS USED TO GIVE A DIFFERENT STYLE TO THE MENULINKS DEPENDING ON THE ONE THAT WAS CLICKED.
  // const [hashname, setHashname] = useState(`#${meunLinks[0].path}`);

  // used to display the genre that is been displayed after selecting the tags.The jsx is to be written after the TagContainer.
  const [genreDisplayname, setGenreDisplayname] = useState("");

  const localStorageKey = "mstags"; // LOCALSTORAGE KEY NAME.

  // console.log(hashname);

  //!!! IMPORTANT STATE
  // THIS STATE IS USED TO CHANGE THE URL THAT THE USEQUERY FUNCTION WOULD MAKE A GET FETCH REQUEST TO. THE INITIAL VALUE OF THE STATE IS THE URL THAT CORRESPONSES TO THE DEFAULT SECTION WHICH IS MOVIES!
  const [theUrl, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`
  );

  // let queryUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  // let queryUrl = ;

  // console.log(theUrl, page);
  // THIS STATE IS USED TO KNOW THE SECTION THAT IS ON DISPLAY(CURRENT SECTION)
  // IT IS ALSO USED TO REPLACE THE hashname STATE. SO THE hashname STATE IS NO LONGER USED TO GIVE A DIFFERENT STYLE TO THE MENULINKS DEPENDING ON THE ONE THAT WAS CLICKED BUT NOW THE section STATE IS RESPONSIBLE FOR THAT.
  // THE REASON IS THAT THE section STATE NOW SERVES TWO PURPOSE, ONE IS THE FUNCTION hashname STATE DID BEFORE AND IN ADDITION TO THAT IT PASSSES THE VALUE OF SECTION IN DISPLAY(CURRENT SECTION) TO THE MOVIECARD.
  const [sections, setSection] = useState("movie");

  //FUNCTION IS USED TO SET THE section STATE. IT ACCEPTS AN ARGUMENTS AND PASSES IT ON TO THE setSection FUNCTION.
  const handleSectionChange = (section) => {
    setSection(section);
  };

  const location = useLocation();
  // USEQUERY FUNCTION USED TO FETCH THE DATA USED IN THIS COMPONENT.
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

  // const removeTagFromLocalStorage = () => {
  //   localStorage.removeItem(localStorageKey);
  // };

  // THIS USEEFFECT RUNS ANYTIME THE page STATE OR sections STATE UPDATE. IT SET THE theUrl STATE TO MATCH THE CURRENT SECTION.

  useEffect(() => {
    // if (
    //   location.hash === "#trending-now" ||
    //   location.hash === "#popular" ||
    //   location.hash === "#topRated" ||
    //   location.hash === "#upcoming"
    // ) {
    //   return undefined;
    // }
    // removeTagFromLocalStorage();

    if (sections === "" || sections === "movie") {
      // setUrl("https://api.themoviedb.org/3/trending/movie/week?language=en-US");
      // setPage(1);//
      setUrl(
        () =>
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`
      );
      setQueryName("movieDataQuery");
      // return removeTagFromLocalStorage();
    } else if (sections === "series") {
      // setPage(1);
      // setUrl("https://api.themoviedb.org/3/tv/popular?language=en-US&page=2");
      setQueryName("seriesDataQuery");

      setUrl(
        () =>
          `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
      );
      // return removeTagFromLocalStorage();
    } else if (sections === "original-Series") {
      setQueryName("originalSeriesDataQuery");
      setUrl("https://api.themoviedb.org/3/trending/tv/week?language=en-US");
      // return removeTagFromLocalStorage();
    }
  }, [sections, page]);

  // HOVER EFFECT STYLES FOR THE MENULINKS
  const hoverEffect2 =
    'before:absolute before:h-1 before:w-1 before:rounded-full before:bg-red-700 before:hidden before:bottom-[-5px] before:content-[""] hover:before:flex before:left-[60%]';

  // THIS FUNCTION UPDATES THE genreDisplayname STATE TO REFLECT WITHEVER FILTER TAG WAS CLICKED.
  // THE FUNCTION IS PASSED TO THE TAGCONTAINER ---> PASSED ALSO TO THE ---> TAGS COMPONENT( IT IS CALLED HERE WHENEVER THE TAG COMPONENT IS CLICKED)
  // IT ALSO UPDATES THE theUrl STATE SO THAT ONLY THE FILTERED DATA IS DISPLAYED ----> EACH TAG FILTER HAS A DIFFERENT URL.
  const handleFilter = (id) => {
    const queryfilters = [];
    queryfilters.push(id);
    const queryFilterString = queryfilters.join("&");
    const genreSectionName = tagNames.filter((tagname) => tagname.id === id);
    setGenreDisplayname(genreSectionName[0].name);
    // alert(queryFilterString);
    setUrl(`https://api.themoviedb.org/3/genre/${queryFilterString}/movies`);
  };

  // useEffect(() => {
  //   if (
  //     location.hash === "" ||
  //     location.hash === "#trending-now" ||
  //     location.hash === "#popular" ||
  //     location.hash === "#topRated" ||
  //     location.hash === "#upcoming"
  //   ) {
  //     return undefined;
  //   } else {
  //     setHashname(location.hash);
  //   }
  // }, [location]);

  if (fetchData.isLoading) {
    return (
      <div className="space-y-4 px-4 md:px-[20vw]">
        <HeaderLinks>
          {meunLinks.map((menu) => {
            return (
              <NavLink
                key={uuidv4()}
                // to={`/#${menu.path}`}
                className={` text-[#efefefee] text-xs transition-all font-medium capitalize relative flex items-center gap-[2px] md:gap-2  ${hoverEffect2}`}
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
      <div className="h-[1470px] flex justify-center pt-[500px] items-centery bg-[rgba(0,0,0,0.1)]">
        <div className="loader_fetch"></div>
      </div>
    );
  }

  if (fetchData.isError) {
    return <h1>Error Loading results</h1>;
  }

  const gridData = fetchData.data.data.results;

  return (
    <section className="mt-10">
      <header className="px-4 md:px-[10%] space-y-6">
        <HeaderLinks>
          {meunLinks.map((menu) => {
            // console.log("#" + menu.path);
            return (
              <div
                key={uuidv4()}
                // to={`/#${menu.path}`}
                onClick={() => handleSectionChange(menu.path)}
                className={` ${
                  sections === menu.path
                    ? "text-sm  md:text-[18px] text-[#efefefee]"
                    : "text-xs  md:text-base text-gray-700"
                }  text-[#efefefee] transition-all font-medium capitalize cursor-pointer relative flex items-center gap-[2px] md:gap-2  ${hoverEffect2}`}
              >
                {menu.icon}
                {menu.menu}
              </div>
            );
          })}
          <NavLink
            to={"/search"}
            className={`text-[#efefefee] text-base text-gray-700 transition-all font-medium capitalize relative flex items-center gap-2  ${hoverEffect2}`}
          >
            <IoMdSearch />
            Search
          </NavLink>
        </HeaderLinks>
        <hr />
        {location.hash === "#movies" && (
          <TagContainer
            tagNames={tagNames}
            handleFilter={handleFilter}
            storageKey={localStorageKey}
          />
        )}
        {location.hash === "#movies" && (
          <h3 className="font-semibold underline underline-offset-2 text-xl text-white">
            {genreDisplayname}
          </h3>
        )}
        {/* <SelectDemo /> */}
      </header>
      <MovieGrid>
        {gridData.map((gridDatum, i) => (
          <MovieCard
            key={uuidv4()}
            data={gridDatum}
            section={sections}
            index={i}
          />
        ))}
      </MovieGrid>
      {sections !== "original-Series" && (
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
      )}
    </section>
  );
};

export default MovieSection;
