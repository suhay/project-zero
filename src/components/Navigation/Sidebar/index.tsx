import { NAV_LINKS } from "@/constants";
import { useResize } from "@/src/utils/resize";
import Link from "next/link";
import { Menu } from "react-feather";

interface SidebarParams {
  isShown: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarParams> = ({ isShown, toggle }) => {
  const isSmallScreen = useResize();

  const menu = <Menu size={20} className="absolute ml-auto right-2 top-0" />;

  return (
    <div
      className={`sidebar relative ${
        isShown
          ? "w-full opacity-100 transition-opacity top-0"
          : isSmallScreen
          ? "w-full opacity-100 transition-opacity top-0"
          : "hidden"
      }`}
      data-testid="sidebar"
    >
      <button onClick={toggle} className="absolute ml-auto right-7">
        {isShown ? "✕" : menu}
      </button>
      <ul className={`ml-28 w-2/3 ${isShown ? "" : "hidden"}`}>
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="flex py-1 cursor-pointer hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
