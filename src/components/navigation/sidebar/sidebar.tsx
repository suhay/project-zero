import { useResize } from "@/src/utils/resize";
import Link from "next/link";
import React from "react";
interface SidebarParams {
  isShown: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarParams> = ({ isShown, toggle }) => {
  const isSmallScreen = useResize();

  return (
    <div
      className={`sidebar ${
        isShown
          ? "w-full opacity-100 transition-opacity top-0"
          : isSmallScreen
          ? "w-full opacity-100 transition-opacity top-0"
          : "hidden"
      }`}
      data-testid="sidebar"
    >
      <button onClick={toggle}>{isShown ? "✕" : "⪙"}</button>
      <ul className={`mr-4 ${isShown ? "" : "hidden"}`}>
        <li className="mb-2">
          <Link href="signup">Sign Up</Link>
        </li>
        <li className="mb-2">
          <Link href="login">Sign In</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
