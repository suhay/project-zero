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
    <nav className="flex sticky top-0">
      <Logo />
      <ul className="ml-auto right-0">
        <Navbar hideNavbar={hideNavbar} profileStatus={profileStatus} />
      </ul>

      <div className="mr-10">
        <Sidebar isShown={isShown} toggle={toggle} />
      </div>
    </nav>
  );
};

export default Navigation;
