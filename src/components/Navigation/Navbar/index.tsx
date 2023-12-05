"use client";
import React from "react";

import { Models } from "appwrite";
import Link from "next/link";

import { NAV_LINKS } from "@/constants";
import AccountMenu from "@/src/components/Account/Account";

interface NavbarProps {
  hideNavbar: boolean;
  profileStatus: Models.User<Models.Preferences> | null;
}

const Navbar: React.FC<NavbarProps> = ({ hideNavbar, profileStatus }) => {
  return (
    <div
      className={`${hideNavbar ? "hidden sm:block" : "navbar"} ml-auto right-0`}
      data-testid="navbar"
    >
      {NAV_LINKS.map((link) =>
        profileStatus && (link.key === "signin" || link.key === "sigup") ? (
          <AccountMenu key={link.key} userName={profileStatus.name} />
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
