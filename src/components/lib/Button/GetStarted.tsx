import Link from "next/link";
import { Variant } from "../types";

export function GetStarted({ variant }: { variant?: Variant }) {
  const variantClass =
    variant === Variant.primary
      ? "bg-primary-500 hover:bg-primary-300 focus-visible:outline-primary-300 text-white"
      : "bg-secondary-500 hover:bg-secondary-600 focus-visible:outline-secondary-600 text-black";

  return (
    <Link
      href="/"
      className={`${variantClass} inline-block mt-1 mr-2 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
    >
      Get Started
    </Link>
  );
}
