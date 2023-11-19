import React from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
interface NavbarProps {
  hideNavbar: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hideNavbar }) => {
  return (
    <div
      className={`border-red ${
        hideNavbar ? "hidden md:block" : "navbar justify-end"
      }`}
      data-testid="navbar"
    >
      {NAV_LINKS.map((link) => (
        <Link
          href={link.href}
          key={link.key}
          className="cursor-pointer hover:font-bold"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
