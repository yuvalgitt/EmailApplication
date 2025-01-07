import React from "react";
import Topheader from "./components/Topheader";
import SideHeader from "./components/SideHeader";
import ContentFeed from "./components/ContentFeed";

const App = () => {
  return (
    <div className=" bg-gmail-black w-screen h-screen flex flex-col">
      <>
        <Topheader></Topheader>
      </>
      <div className="flex flex-grow">
        <SideHeader></SideHeader>
        <ContentFeed></ContentFeed>
      </div>
    </div>
  );
};

export default App;
