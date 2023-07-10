/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { v4 as uuidv4 } from "uuid";

const SelectDemo = ({ values1, values2, setUrl }) => {
  const handleClicked = (value) => {
    if (value === "Popular-desc_popularity") {
      alert(value);
      setUrl(
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc"
      );
    } else if (value === "Popular-asc_popularity") {
      setUrl(
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.asc"
      );
    } else if (value === "Release-Date-desc_releaseDate") {
      setUrl(
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=primary_release_date.desc"
      );
    } else if (value === "Release-Date-asc_releaseDate") {
      setUrl(
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=primary_release_date.asc"
      );
    }
  };
  return (
    <Select.Root onValueChange={(value) => handleClicked(value)}>
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] font-semibold bg-white text-black shadow-[0,2px,10px]y shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px]y focus:shadow-black data-[placeholder]:text-black outline-none"
        aria-label="Food"
      >
        <Select.Value placeholder="Order" />
        <Select.Icon className="text-black">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Label className="px-[25px] text-xs leading-[25px] text-white bg-black ">
                By Popularity
              </Select.Label>
              {values1.map((item) => (
                <SelectItem
                  key={uuidv4()}
                  value={`${item.type}_${item.category}`}
                >
                  {item.type}
                </SelectItem>
              ))}
            </Select.Group>
            <Select.Separator className="h-[1px] bg-black m-[5px]" />
            <Select.Group>
              <Select.Label className="px-[25px] text-xs leading-[25px] text-white bg-black ">
                By Release Date
              </Select.Label>
              {values2.map((item) => (
                <SelectItem
                  key={uuidv4()}
                  value={`${item.type}_${item.category}`}
                >
                  {item.type}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={` text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1
          ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectDemo;
