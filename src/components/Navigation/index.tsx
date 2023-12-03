"use client";
import React, { useState, useContext } from "react";

import { useResize } from "@/src/utils/resize";
import { LoginContext } from "../../context/context";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Link from "next/link";

const Navigation = () => {
  const [isShown, setIsShown] = useState(false);
  const hideNavbar = useResize();
  const toggle = () => {
    setIsShown(!isShown);
  };
  const { profileStatus } = useContext(LoginContext);

  return (
    <nav className="flex z-1000 text-white bg-cover py-6 my-auto bg-primary-800">
      <Link className="ml-6 hover:font-bold" href="/">
        ZeroIn
      </Link>
      <Navbar hideNavbar={hideNavbar} profileStatus={profileStatus} />
      <Sidebar isShown={isShown} toggle={toggle} />
    </nav>
  );
};

export default Navigation;
