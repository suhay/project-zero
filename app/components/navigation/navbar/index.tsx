import React from "react";
import Link from "next/link";
interface NavbarProps {
  hideNavbar: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hideNavbar }) => {
  return (
    <div
      className={`${hideNavbar ? "hidden sm:block" : "navbar"}`}
      data-testid="navbar"
    >
      <Link href="signup" className="mr-10">
        Sign Up
      </Link>
      <Link href="login">Sign In</Link>
    </div>
  );
};

export default Navbar;
