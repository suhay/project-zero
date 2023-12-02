"use client";
import React, { useState, useContext } from "react";

import { useResize } from "@/src/utils/resize";
import { LoginContext } from "../../context/context";
import Logo from "./Navbar/Logo";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Navigation = () => {
  const [isShown, setIsShown] = useState(false);
  const hideNavbar = useResize();
  const toggle = () => {
    setIsShown(!isShown);
  };
  const { profileStatus } = useContext(LoginContext);

  return (
    <nav className="flex z-10 p-4 text-primary-300">
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
