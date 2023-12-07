import Link from "next/link";

export function Logo() {
  return (
    <Link
      className="ml-6 hover:text-secondary-500 hover:underline flex items-center"
      href="/"
    >
      ZeroIn
    </Link>
  );
}
