import React from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
interface NavbarProps {
  hideNavbar: boolean;
  profileStatus: string;
}

const Navbar: React.FC<NavbarProps> = ({ hideNavbar, profileStatus }) => {
  console.log("in Navbar profileStatus?", profileStatus);
  return (
    <div
      className={`border-red ${
        hideNavbar ? "hidden md:block" : "navbar justify-end"
      }`}
      data-testid="navbar"
    >
      {NAV_LINKS.map((link) =>
        profileStatus && link.key === "signin" ? (
          <Link className="userNameNav" href={link.href} key={profileStatus}>
            {profileStatus}
          </Link>
        ) : (
          <Link
            href={link.href}
            key={link.key}
            className="cursor-pointer hover:font-bold"
          >
            {link.label}
          </Link>
        ),
      )}
    </div>
  );
};

export default Navbar;
