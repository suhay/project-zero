"use client";
import React from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import AccountMenu from "../../Account/Account";
interface NavbarProps {
  hideNavbar: boolean;
  profileStatus: string;
}

const Navbar: React.FC<NavbarProps> = ({ hideNavbar, profileStatus }) => {
  return (
    <div
      className={`${hideNavbar ? "hidden sm:block" : "navbar"}`}
      data-testid="navbar"
    >
      {NAV_LINKS.map((link) =>
        profileStatus && (link.key === "signin" || link.key === "sigup") ? (
          <AccountMenu key={link.key} userName={profileStatus} />
        ) : profileStatus && link.key === "signup" ? null : (
          <Link
            href={link.href}
            key={link.key}
            className="cursor-pointer hover:font-bold mr-4"
          >
            {link.label}
          </Link>
        ),
      )}
    </div>
  );
};

export default Navbar;
