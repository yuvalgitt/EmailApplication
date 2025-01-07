import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  Cog6ToothIcon,
  MagnifyingGlassCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import "./styles.css";

const Topheader = () => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const handleFocus = () => {
    setInputFocus(!inputFocus);
  };

  return (
    // hamburger menu
    <div className="flex w-full h-16 text-white border-solid items-center">
      <Bars3Icon className="bars w-10 h-10 text-gray-300 p-2 m-2 rounded-3xl"></Bars3Icon>
      <div className="bg-gradient-to-r from-red-500 to-violet-500 w-10 h-10 m-2 flex items-center justify-center rounded-full">
        <AcademicCapIcon className="stroke-current fill-none w-10 h-10  text-white" />
      </div>
      <span className="academy-cap text-3xl p-1 m-1">MasterMail</span>

      {/* search bar */}
      <div
        id="search-bar"
        className="bg-gmail-grey ml-10 h-5/6 w-4/12 m-2 rounded-3xl flex items-center"
      >
        <MagnifyingGlassCircleIcon className=" w-8 h-8 z-10 text-gray-200 m-1"></MagnifyingGlassCircleIcon>
        <input
          className="search-bar  bg-gmail-grey  h-5 w-full p-5 rounded-3xl"
          type="text"
          placeholder="Search mail"
          onFocus={handleFocus}
        />
        <XMarkIcon className="adjust rounded-full h-8 w-9 m-1 "></XMarkIcon>
        <AdjustmentsHorizontalIcon className="rounded-full adjust w-11 h-9 z-10 p-1  mr-3"></AdjustmentsHorizontalIcon>
      </div>
      {/* settings side on the right side*/}
      <div className="flex flex-row-reverse ml-auto w-4/12 h-full">
        <div
          style={{ paddingLeft: "0.7rem" }}
          className="bg-orange-400 rounded-full w-8 h-8 m-2 text-white pt-0.5 text-lg"
        >
          Y
        </div>
        <Cog6ToothIcon className="bars rounded-full p-1.5 w-10 h-10 text-gray-300 m-1"></Cog6ToothIcon>
      </div>
    </div>
  );
};

export default Topheader;
