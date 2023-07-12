/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { memo, useEffect, useState } from "react";

const Tags = (props) => {
  const { tagName, handleFilter } = props;
  const [isSelected, setIsSselected] = useState(false);
  const [check, setCheck] = useState([]); //new
  const handleClicked = () => {
    setIsSselected(!isSelected);
    // alert(tagName.id);
    // TODO: WRITE THE LOGIC FOR FILTERING OUT THE WRITE DATA USING THE SELECTED TAG
    // if (isSelected) {
    //   alert("clicked");
    //   handleFilter(tagName.id);
    // }
  };

  useEffect(() => {
    if (isSelected) {
      // alert("clicked");
      // storeFilter(tagName.id);
      handleFilter(tagName.id);
    }
  }, [isSelected]);

  // useEffect(() => {
  //   //new
  //   const check = JSON.parse(localStorage.getItem("tags"));
  //   if (check) {
  //     setCheck(check);
  //   }
  // }, []);

  return (
    <span
      onClick={handleClicked}
      className={`px-3 py-1 rounded-xl transition-all bg-[rgba(20,20,20,1)]y text-white text-sm cursor-pointer`}
    >
      {tagName.name}
    </span>
  );
};

export default Tags;

// return (
//   <span
//     onClick={handleClicked}
//     className={`px-3 py-1 rounded-xl transition-all bg-[rgba(20,20,20,1)] text-white text-sm cursor-pointer ${
//       isSelected || check.includes(tagName.id) //new
//         ? "bg-red-900 font-semibold"
//         : "bg-[rgba(20,20,20,1)]"
//     }`}
//   >
//     {tagName.name}
//   </span>
// );
