import { NAV_LINKS } from "@/constants";
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
          ? "w-16 opacity-100 transition-opacity top-0"
          : isSmallScreen
          ? "w-full opacity-100 transition-opacity top-0"
          : "hidden"
      }`}
      data-testid="sidebar"
    >
      <button onClick={toggle}>{isShown ? "✕" : "⪙"}</button>
      <ul className={`mr-4 ${isShown ? "" : "hidden"}`}>
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="flex cursor-pointer hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
