import Link from "next/link";
import { LogoWhite } from "./LogoWhite";

export function Logo() {
  return (
    <Link
      className="ml-6 hover:text-secondary-500 hover:underline flex items-center h-2 pt-2"
      href="/"
      aria-label="ZeroIn Homepage"
    >
      <LogoWhite />
    </Link>
  );
}
