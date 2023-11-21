import { NAV_LINKS } from "@/constants";
import { useResize } from "@/src/utils/resize";
import Link from "next/link";
import Image from "next/image";

interface SidebarParams {
  isShown: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarParams> = ({ isShown, toggle }) => {
  const isSmallScreen = useResize();

  const menu = (
    <Image
      src="/assets/menu.svg"
      alt="menu"
      width={30}
      height={30}
      className="cursor-pointer"
    />
  );

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
      <button onClick={toggle}>{isShown ? "✕" : menu}</button>
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
