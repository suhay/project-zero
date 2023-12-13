"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Map } from "react-feather";

const navClasses = "py-2 px-4 text-gray-700 hover:bg-gray-300";

export function JourneySidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "bg-secondary-400" : "";
  };

  return (
    <div className="flex flex-col w-64 bg-gray-200 h-full">
      <div className="flex flex-col py-10 mx-auto">
        <Link
          href="/profile"
          className={`${isActive("/profile")} ${navClasses}`}
        >
          <div className="flex">
            <Map
              className="inline-block mr-4 text-secondary-900 my-auto"
              size={15}
            />
            <p className="text-secondary-900 my-auto">Your Journey</p>
          </div>
        </Link>
        <Link
          href="/profile/path"
          className={`${isActive("/profile/path")} ${navClasses}`}
        >
          <div className="flex">
            <Compass
              className="inline-block mr-4 text-secondary-900 my-auto"
              size={15}
            />
            <p className="text-secondary-900 my-auto">Choose a Path</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
