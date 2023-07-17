import { tagNames } from "../TrendingMovieSection/SectionData";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";

const SelectGenre = () => {
  const [showGenre, setShowGenre] = useState(false);
  const handleOpenModal = () => {
    setShowGenre(true);
    document.body.style.overflow = "hidden";
  };

  const handleClicked = (path) => {
    document.body.style.overflow = "unset";
    const element = document.getElementById(path);
    if (element) {
      //  Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        className="border bg-[#f2f2f2] text-black font-semibold text-base shadow-xl px-2 py-1"
        onClick={handleOpenModal}
      >
        Select Genre
      </button>
      {showGenre && (
        <div className="fixed z-[1000] pt-[300px]  pb-10 top-0 left-0 h-[100dvh] overflow-auto w-screen bg-[rgba(0,0,0,0.8)] flex flex-col justify-center items-center gap-4">
          <span
            className="text-2xl text-[#f2f2f2] "
            onClick={(e) => {
              e.stopPropagation();
              setShowGenre(false);
            }}
          >
            <AiOutlineCloseCircle />
          </span>
          {tagNames.map((tagname) => (
            <span
              onClick={() => {
                handleClicked(tagname.name);
                setShowGenre(false);
              }}
              key={uuidv4()}
              className="font-semibold text-xl text-[#f2f2f2] capitalize"
            >
              {tagname.name}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default SelectGenre;
