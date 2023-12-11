"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Map } from "react-feather";

const navClasses = "py-2 px-4 text-gray-700 hover:bg-gray-300";

export function JourneySidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "bg-white" : "";
  };

  return (
    <div className="flex flex-col w-64 bg-gray-200 h-full">
      <div className="flex flex-col py-4 pl-4">
        <Link
          href="/profile"
          className={`${isActive("/profile")} ${navClasses}`}
        >
          <Map className="inline-block mr-4" size={15} />
          Your Journey
        </Link>
        <Link
          href="/profile/path"
          className={`${isActive("/profile/path")} ${navClasses}`}
        >
          <Compass className="inline-block mr-4" size={15} />
          Choose a Path
        </Link>
      </div>
    </div>
  );
}
