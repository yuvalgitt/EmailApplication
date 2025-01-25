import { ArrowLeftIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

const Mailheader = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/feed")
  }

  return (
    <div className="flex items-center h-10 p-4 border-solid border-b-2 border-gmail-grey">
      <ArrowLeftIcon onClick={handleClick} className="content-header-svg"></ArrowLeftIcon>
      <ExclamationCircleIcon  className='content-header-svg ml-10 ' ></ExclamationCircleIcon>
      <TrashIcon  className='content-header-svg  ml-7' ></TrashIcon>
    </div>
  );
};

export default Mailheader;
