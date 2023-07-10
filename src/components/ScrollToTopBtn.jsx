import { useEffect, useState } from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const ScrollToTopBtn = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className="text-3xl fixed right-10 bottom-10 text-white animate-bounce"
      onClick={handleClick}
    >
      {show && <BsFillArrowUpSquareFill />}
    </div>
  );
};

export default ScrollToTopBtn;
