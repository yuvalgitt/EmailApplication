import React, { useState } from "react";
import Topheader from "./components/headers/Topheader";
import SideHeader from "./components/headers/SideHeader";
import ContentFeed from "./components/ContentFeed/ContentFeed";
import { Route, Routes } from "react-router-dom";
import LogInComp from "./components/logIn/LogInComp";

const App = () => {
  const [hamburgerToggle, setHamburgerToggle] = useState<boolean>(true);

  return (
    <div className=" bg-gmail-black w-screen h-screen flex flex-col overflow-hidden">
      <>
      <LogInComp></LogInComp>
        <Topheader
          hamburgerToggle={hamburgerToggle}
          setHamburgerToggle={setHamburgerToggle}
        ></Topheader>
      </>
      <div className="flex flex-grow  overflow-hidden">
        <SideHeader hamburgerToggle={hamburgerToggle}></SideHeader>
        <Routes>
          <Route path="/feed" element={<ContentFeed />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
