"use client";
import { useState } from "react";

import { useResize } from "@/src/utils/resize";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useUserData } from "@/src/hooks/useUserData";
import { Logo } from "../Logo";

const Navigation = () => {
  const [isShown, setIsShown] = useState(false);
  const hideNavbar = useResize();
  const toggle = () => {
    setIsShown(!isShown);
  };
  const { userProfile } = useUserData({ cacheOnly: true });

  return (
    <nav className="flex z-1000 text-white bg-cover py-6 my-auto bg-primary-800">
      <Logo />
      <Navbar hideNavbar={hideNavbar} profileStatus={userProfile} />
      <Sidebar isShown={isShown} toggle={toggle} />
    </nav>
  );
};

export default Navigation;
