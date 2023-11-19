"use client";
import React, { useState } from "react";
import Logo from "./navbar/Logo";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/index";
import { useResize } from "@/src/utils/resize";

const Navigation = () => {
  const [isShown, setIsShown] = useState(false);
  const hideNavbar = useResize();
  const toggle = () => {
    setIsShown(!isShown);
  };

  return (
    <nav className="border flexBetween">
      <Logo />

      <ul className="">
        <Navbar hideNavbar={hideNavbar} />
      </ul>

      <div className="mr-10">
        <Sidebar isShown={isShown} toggle={toggle} />
      </div>
    </nav>
  );
};

export default Navigation;
