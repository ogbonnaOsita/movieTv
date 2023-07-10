// IMAGES FOR THE IMAGES ARRAY
import slide1 from "../../assets/slider-img-11.png";
import slide2 from "../../assets/slider-img-2.jpg";
import slide3 from "../../assets/slider-img-3.jpg";
// ICONS FOR THE MENULINKS
import { AiFillStar } from "react-icons/ai";
import { HiPlus, HiTrendingUp } from "react-icons/hi";
import { IoIosFlame } from "react-icons/io";

export const hoverEffect2 =
  'before:absolute before:h-1 before:w-1 before:rounded-full before:bg-red-700 before:hidden before:bottom-[-5px] before:content-[""] hover:before:flex before:left-[60%]';

// export const tagNames = [
//   "Action",
//   "Adventure",
//   "Animation",
//   "Comedy",
//   "Crime",
//   "Documentary",
//   "Drama",
//   "Family",
//   "Fantasy",
//   "History",
//   "Horror",
//   "Music",
//   "Mystery",
//   "Romance",
//   "Science Fiction",
//   "TV Movie",
//   "Thriller",
//   "War",
//   "Western",
// ];

export const tagNames = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const images = [
  slide1,
  slide2,
  slide3,
  slide1,
  slide2,
  slide3,
  slide1,
  slide2,
  slide3,
  slide1,
  slide2,
  slide3,
];

export const responsiveSettings = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 760,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
];

export const meunLinks = [
  {
    id: 48,
    menu: "Trending Now",
    icon: <HiTrendingUp />,
    path: "trending-now",
  },
  {
    id: 86,
    menu: "Popular",
    icon: <IoIosFlame />,
    path: "popular",
  },
  {
    id: 59,
    menu: "Top Rated",
    icon: <AiFillStar />,
    path: "topRated",
  },
  {
    id: 25,
    menu: "Upcoming",
    icon: <HiPlus />,
    path: "upcoming",
  },
];

export const buttonStyle = {
  width: "20px",
  background: "none",
  border: "0px",
  position: "relative",
};

export const btnStyle1 = {
  left: "50px",
};

export const btnStyle2 = {
  right: "50px",
};

export const properties = {
  prevArrow: (
    <button
      style={{ ...buttonStyle, ...btnStyle1 }}
      // className="left-0 right-0 md:left-[50px]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button
      style={{ ...buttonStyle, ...btnStyle2 }}
      // className="left-0 right-0 md:right-[50px]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
      </svg>
    </button>
  ),
};
