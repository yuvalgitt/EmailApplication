import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-end  absolute z-10 w-full p-10 pointer-events-none">
      <div
        className="flex flex-col bg-gmail-black text-white p-[1.5rem] lg:w-[400px] rounded-3xl 
                  pointer-events-auto  items-center shadow-black shadow-2xl"
      >
        {localStorage.getItem("email")}
        <button
          onClick={handleLogOut}
          className="bars bg-gmail-grey rounded-full p-5 mt-5 xl:mt-[50px] flex items-center"
        >
          {" "}
           <ArrowRightStartOnRectangleIcon className="w-5 mr-5" ></ArrowRightStartOnRectangleIcon>  Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
