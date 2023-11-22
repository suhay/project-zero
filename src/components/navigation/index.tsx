"use client";
import React, { useState, useContext } from "react";
import Logo from "./navbar/Logo";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/index";
import { useResize } from "@/src/utils/resize";
import { profileData } from "../../context/context";

const Navigation = () => {
  const [isShown, setIsShown] = useState(false);
  const hideNavbar = useResize();
  const toggle = () => {
    setIsShown(!isShown);
  };
  const { profileStatus } = useContext(profileData);

  return (
    <nav className="flex z-10">
      <Logo />
      <ul className="ml-auto">
        <Navbar hideNavbar={hideNavbar} profileStatus={profileStatus} />
      </ul>

      <div className="mr-10">
        <Sidebar isShown={isShown} toggle={toggle} />
      </div>
    </nav>
  );
};

export default Navigation;
