import {
  PaperAirplaneIcon,
  StarIcon,
  StopIcon,
} from "@heroicons/react/16/solid";
import React from "react";

const ContentItem = () => {
  return (
    <div className="content-item border-t-2 p-3 h-10 w-full cursor-pointer border-gmail-grey flex items-center ">
      {/* mail classification options */}
      <StopIcon className="content-header-svg"></StopIcon>
      <StarIcon className="content-header-svg ml-5"></StarIcon>
      <PaperAirplaneIcon className="content-header-svg ml-5"></PaperAirplaneIcon>

      <div className="ml-8 w-10/12 text-gmail-lightgrey  whitespace-nowrap overflow-hidden text-ellipsis">
        {/* Sent from */}
        <span className="text-white">Lorem Incorporated</span>
        {/* mail title */}
        <span className="text-white ml-20">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritat
        </span>
        {/* mail contents */}
        <span className="text-gmail-lightgrey">
          {" "}
          - aspernatur amet error, explicabo earum cumque voluptate voluptas
          quaerat ex.dolor sit amet consectetur adipisicing elit
        </span>
      </div>
      <div className="flex flex-grow flex-row-reverse ">
        <span className="text-sm mr-2">Jan 7</span>
      </div>
    </div>
  );
};

export default ContentItem;
