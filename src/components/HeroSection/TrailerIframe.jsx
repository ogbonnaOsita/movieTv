/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

const TrailerIframe = ({ id, closeModal }) => {
  const handleCloseModal = () => {
    closeModal(false);
    document.body.style.overflow = "unset";
  };
  // const url = 'https://api.themoviedb.org/3/movie/{id}/videos?language=en-US'
  const {
    data: videoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["video" + uuidv4, id],
    queryFn: () =>
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjY0YzkyYmJkNTllMjQ0ODA4NTFlMjg5MGVjYzcwNCIsInN1YiI6IjY0YTExYmFlZDUxOTFmMDBlMjY0MjhkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9M9zvrR5_1b9jomPkdNdCRe3ePbXML8BOiVOgzE_Uxw",
          },
        }
      ),
  });

  if (isLoading) {
    return (
      <div className="fixed z-[99999] top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center">
        <div className="loader_fetch"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <h1 className="text-3xl font-semibold text-white">
        Error Loading results
      </h1>
    );
  }

  const videoKey = videoData.data.results[0].key;
  //   console.log(videoData.data.results[0].key);

  const videosrc = `https://www.youtube.com/embed/${videoKey}`;
  //   const videosrc2 =
  //     "https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1";
  return (
    <div
      className="fixed z-[99999] top-0 left-0 w-full h-screen bg-[rgba(0,0,0,1)] pt-20 flex flex-col lg:justify-center gap-3 items-center overflow-hidden"
      onClick={handleCloseModal}
    >
      {/* <div className="text-3xl font-semibold text-white">.....done</div> */}
      <div onClick={(e) => e.stopPropagation()}>
        <iframe
          src={videosrc}
          className="min-w-[300px]  lg:w-[700px] lg:h-[500px] max-w-2xl min-h-[250px] max-h-[500px] border  border-4-white"
        ></iframe>
      </div>
      <button
        type="button"
        onClick={handleCloseModal}
        className="font-semibold px-3 py-2 border border-2-white w-fit text-white flex items-center gap-1"
      >
        <IoMdClose />
        Close
      </button>
    </div>
  );
};

export default TrailerIframe;
