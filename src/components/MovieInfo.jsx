import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const MovieInfo = () => {
  const { id, title, filmtype } = useParams();

  //   alert(filmtype);

  //   const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/${id}`);

  //   alert(url);

  //   //   console.log(url);

  //   //   https://api.themoviedb.org/3/movie/44567?language=en-US

  //   useEffect(() => {
  //     console.log("run");
  //     if (filmtype === "movie") {
  //       return;
  //     } else if (filmtype === "tvSerie") {
  //       setUrl(`https://api.themoviedb.org/3/tv/${id}`);
  //     }
  //   }, []);

  const movieDetails =
    filmtype === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}`
      : `https://api.themoviedb.org/3/tv/${id}`;

  const videoUrl =
    filmtype === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
      : `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;

  const videoData = useQuery({
    queryKey: ["video" + uuidv4, id],
    queryFn: () =>
      axios.get(videoUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
        },
      }),
  });

  const fetchData = useQuery({
    queryKey: [`${title}${id}${filmtype}`],
    queryFn: () =>
      axios.get(movieDetails, {
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
        <div className="loader">
          <div data-glitch="Loading..." className="glitch">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (fetchData.isError) {
    return (
      <h1 className="text-white font-semibold text-2xl">
        Error Loading results
      </h1>
    );
  }

  //   console.log(fetchData.data.data);
  const {
    original_title,
    release_date,
    poster_path,
    overview,
    genres,
    status,
    spoken_languages,
    runtime,
    vote_average,
    imdb_id,
    first_air_date,
  } = fetchData.data.data;

  //   videoData.isLoading == false &&
  // console.log(videoData.data.data.results[0].key);

  return (
    // <div className="text-white font-semibold text-2xl">Movie don land</div>
    <div className="p-20 bg-[#0D0C0B] w-screen  flex justify-center  text-[#F2F2F2]">
      <div className="bg-[#0D0C0B] space-y-5 p-10y w-[600px]">
        <h1 className="text-[35px] font-semibold text-center">
          {original_title} (
          {release_date?.slice(0, 4) || first_air_date?.slice(0, 4)})
        </h1>

        <div className="lg:w-[600px] lg:h-[700px]">
          <img
            src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
            className="h-full w-full object-fit"
            alt=""
          />
        </div>

        <div className="space-y-5">
          <p className="font-semibold text-2xl ">{original_title}</p>
          {/* <p className="font-semibold text-lg italic">{overview}</p> */}
          <div className="ml-4 border-l-4 border-white p-2">
            <p className="font-semibold text-lg italic">{overview}</p>
          </div>
          {/* IFRAME CONTAINER */}
          <div className="">
            {videoData.isLoading && (
              <div className="w-full h-[400px] flex justify-center items-center">
                <div className="loader_fetch"></div>
              </div>
            )}
            {videoData.isError && <h1>Error Loading results</h1>}
            {videoData.isLoading == false &&
              videoData.data.data?.results.length > 0 && (
                <iframe
                  // src={videoData.data.data.results[0].key}
                  src={`https://www.youtube.com/embed/${videoData.data.data.results[0].key}`}
                  className="min-w-[300px]  lg:w-[700px] lg:h-[500px] max-w-2xl min-h-[250px] max-h-[500px] border  border-4-white"
                ></iframe>
              )}
          </div>
          <div className="genreList flex items-center gap-2">
            <p className="font-medium text-base border-b-4 border-transparent">
              Genre :
            </p>
            {genres.map((genre) => (
              <span
                key={uuidv4()}
                className="font-medium text-base border-b-4 border-red-800"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="ml-4 border-l-4 border-white p-2 space-y-2">
            <p className="font-medium text-base">Title : {original_title}</p>
            {/* status */}
            <p className="font-medium text-base  flex items-start">
              status :{" "}
              <span className="font-medium text-base border-b-2 border-red-800">
                {" "}
                {status}
              </span>
            </p>
            {/* Realease Date */}
            <p className="font-medium text-base">
              Release Date : {release_date}
            </p>
            {/* Spoken Language */}
            <div className="spoken_language flex items-center gap-2">
              <p className="font-medium text-base border-b-2 border-transparent">
                Spoken Language :
              </p>
              {spoken_languages.map((lang) => (
                <span
                  key={uuidv4()}
                  className="font-medium text-base border-b-2 border-red-800"
                >
                  {lang.name}
                </span>
              ))}
            </div>
            {/* Runtime */}
            <p className="font-medium text-base">Runtime : {runtime}</p>
            {/* Vote average */}
            <p className="font-medium text-base">
              Reviews : {vote_average} / 10
            </p>
            {/* Link to imbd */}
            <p className="font-medium text-base">
              IMBD :{" "}
              <a
                className="text-red-500 underline"
                href={`https://www.imbd.com.title/${imdb_id}`}
              >{`https://www.imbd.com.title/${imdb_id}`}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
