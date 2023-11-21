import Link from "next/link";

export function GetStarted() {
  return (
    <Link
      href="/"
      className="inline-block mt-1 mr-2 rounded-md bg-secondary-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600"
    >
      Get Started
    </Link>
  );
}
