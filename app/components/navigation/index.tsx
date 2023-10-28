"use client";
import React, { useState } from "react";
import Logo from "./navbar/Logo";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/index";

const Navigation = () => {
  const [isShown, setIsShown] = useState(false);

  const toggle = () => {
    setIsShown(!isShown);
  };

  return (
    <div>
      <ul className="flex justify-between items-center">
        <li className="mr-10">
          <Logo />
        </li>
        <li className="flex-1 text-center">
          <Navbar />
        </li>
        <li className="mr-10">
          <Sidebar isShown={isShown} toggle={toggle} />
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
