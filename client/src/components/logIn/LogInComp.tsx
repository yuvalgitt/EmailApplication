import { AcademicCapIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import "../styles/styles.css";
import { User } from "../../types/types";
import axios from "axios";
import serverUrl from "../../config/config";

const LogInComp = () => {
  const [userObj, setUserObj] = useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.name;
    if (e.target.value && type)
      setUserObj({ ...userObj, [type]: e.target.value });
  };

  const handleLogin = async () => {
    if (userObj && userObj.password && userObj.email) {
      try {
        const response = await axios.post(`${serverUrl}/user/login`, userObj);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="bg-opacity-70 absolute w-screen h-screen z-20 bg-gmail-black backdrop-blur-lg flex items-center justify-center text-white">
      <div className="bg-gmail-black w-6/12 h-3/6 flex p-5 border-2 rounded-3xl">
        <div className="overflow-hidden w-6/12 h-full p-5">
          <div className=" bg-gradient-to-r from-red-500 to-violet-500 w-16 h-16  m-2 flex items-center justify-center rounded-full">
            <AcademicCapIcon className="stroke-current fill-none w-16 h-16  text-white" />
          </div>
          <span style={{ fontSize: `clamp(0.5rem ,2vw , 3rem )` }}>
            Sign in
          </span>{" "}
          <br />
          <br />& continue to MasterMail
        </div>
        <div className="flex flex-col w-full items-start overflow-hidden">
          <div className="flex flex-row-reverse justify-center w-full  h-3/6  ">
            <div className=" flex flex-col justify-center flex-gorw w-3/6">
              <span className="">Email</span>
              <input
                onChange={handleChange}
                type="text"
                className="bg-gmail-black border-2 border-gmail-lightgrey rounded-lg p-2 w-full"
                placeholder="email"
                name="email"
              />
              <span className="mt-5">Password</span>
              <input
                onChange={handleChange}
                type="text"
                className="bg-gmail-black border-2 border-gmail-lightgrey rounded-lg p-2 w-full"
                placeholder="password"
                name="password"
              />
            </div>
          </div>
          <div className=" flex-grow w-full flex items-end justify-end">
            <button className="bars rounded-3xl flex-grow h-10 mr-5 text-gmail-lightblue">
              sign in as guest{" "}
              <span className="text-red-600">
                *only for viewing application
              </span>
            </button>
            <button className="bars w-32 h-10 mr-5 rounded-3xl  text-gmail-lightblue">
              Create Account
            </button>
            <button
              onClick={handleLogin}
              className="sign bg-gmail-lightblue text-gmail-blue w-20 h-10 rounded-3xl justify-end "
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInComp;
