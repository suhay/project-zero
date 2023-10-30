import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="navbar hidden sm:block">
      <Link href="signup" className="mr-10">
        Sign Up
      </Link>
      <Link href="login">Sign In</Link>
    </div>
  );
};

export default Navbar;
