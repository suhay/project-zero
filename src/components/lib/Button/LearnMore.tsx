import Link from "next/link";

export function LearnMore() {
  return (
    <Link href="/" className="group">
      Learn more
      <span
        className="group-hover:translate-x-1 inline-block duration-300 ease-in-out ml-2"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}
