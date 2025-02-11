import { useState } from "react";
import Topheader from "./components/headers/Topheader";
import SideHeader from "./components/headers/SideHeader";
import ContentFeed from "./components/ContentFeed/ContentFeed";
import { Route, Routes } from "react-router-dom";
import LogInComp from "./components/logIn/LogInComp";
import MailContent from "./components/MailContents/MailContent";
import ProfileMenu from "./components/logIn/ProfileMenu";

const App = () => {
  const [hamburgerToggle, setHamburgerToggle] = useState<boolean>(true);
  const [profileMenuToggle, setProfileMenuToggle] = useState<boolean>(false)

  return (
    <div className=" bg-gmail-black w-screen h-screen flex flex-col overflow-hidden">
      <>
        <Topheader
          setProfileMenuToggle={setProfileMenuToggle}
          profileMenuToggle={profileMenuToggle}
          hamburgerToggle={hamburgerToggle}
          setHamburgerToggle={setHamburgerToggle}
        ></Topheader>
        <Routes>
          <Route path="/" element={<LogInComp />}></Route>
        </Routes>
      </>
      <div className="flex flex-grow  overflow-hidden">
        <SideHeader hamburgerToggle={hamburgerToggle}></SideHeader>
        {profileMenuToggle &&  <ProfileMenu setProfileMenuToggle={setProfileMenuToggle}></ProfileMenu>}
        <Routes>
          <Route path="/feed" element={<ContentFeed />}></Route>
          <Route path="/mail" element={<MailContent />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
