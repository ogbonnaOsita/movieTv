// import React from 'react'

import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
// import { RiAccountPinBoxLine } from "react-icons/ri";
import { useState } from "react";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  const hoverEffect =
    'before:absolute before:h-1 before:w-1 before:rounded-full before:bg-red-700 before:hidden before:bottom-[-5px] before:content-[""] --- hover:bg-slate-400 transition-all ease-out py-2 px-4 lg:hover:bg-transparent--- md:hover:before:flex before:left-[50%] before:-ml-[2px] ';

  const hoverEffect2 =
    'before:absolute before:h-1 before:w-1 before:rounded-full before:bg-red-700 before:hidden before:bottom-[-5px] before:content-[""] md:hover:before:flex before:left-[60%] --- py-2 px-4 hover:bg-slate-400 transition-all ease-out  ';
  return (
    <div className="absolute w-full px-4 lg:px-20  top-0 z-40">
      <nav className="flex items-center justify-between py-5 border-b border-slate-600 relative">
        <div className="logo flex items-center gap-2">
          <Link to={"/"} className="text-xl order-1 font-bold text-red-800">
            RayPower Tv
          </Link>
          <div className="toggle-btn md:hidden">
            <input
              hidden
              className="check-icon"
              id="check-icon"
              name="check-icon"
              type="checkbox"
              value={toggleMenu}
              onChange={handleMenu}
            />
            <label className="icon-menu" htmlFor="check-icon">
              <div className="bar bar--1"></div>
              <div className="bar bar--2"></div>
              <div className="bar bar--3"></div>
            </label>
          </div>
        </div>
        <div
          className={`menuLinks ${
            toggleMenu
              ? " absolute bg-white text-slate-900 top-[100%]  w-full flex flex-col py-4  "
              : " hidden md:flex md:gap-10 md:text-white"
          }  `}
        >
          <Link
            to={"/"}
            className={`text-sm font-medium capitalize relative lg:hover:bg-transparent ${hoverEffect} `}
          >
            Home
          </Link>
          <Link
            to={"/movies"}
            className={`text-sm font-medium capitalize relative lg:hover:bg-transparent ${hoverEffect} `}
          >
            Movies
          </Link>
          <Link
            to={"/series"}
            className={`text-sm font-medium capitalize relative lg:hover:bg-transparent ${hoverEffect} `}
          >
            Series
          </Link>
          {/* <Link
            className={`text-sm font-medium capitalize relative lg:hover:bg-transparent ${hoverEffect} `}
          >
            Anime
          </Link> */}
          <Link
            to={"/search"}
            className={` text-sm font-medium capitalize relative flex items-center gap-2 lg:hover:bg-transparent  ${hoverEffect2}`}
          >
            <AiOutlineSearch />
            Search
          </Link>
          {/* <Link
            className={` text-sm font-medium capitalize relative flex items-center gap-2 lg:hover:bg-transparent  ${hoverEffect2}`}
          >
            <RiAccountPinBoxLine />
            Account
          </Link> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
