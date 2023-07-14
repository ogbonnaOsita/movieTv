import { useNavigate } from "react-router-dom";
import errorImg from "../assets/404.png";

const ErrorComponent = () => {
  const navigation = useNavigate();
  return (
    <div className="h-screen grid place-content-center text-white">
      <div className="flex flex-col items-center gap-5">
        <div className="w-full px-2 h-[300px] md:h-fit">
          <img
            src={errorImg}
            className="w-full md:w-[500px] aspect-square object-fill"
          />
        </div>
        <p className="font-semibold text-xl">
          Error Loading Resources--Incorrect URL{" "}
        </p>
        <button
          className="font-semibold p-2 border"
          onClick={() => navigation("/")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
