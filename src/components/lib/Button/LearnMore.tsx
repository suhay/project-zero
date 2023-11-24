import Link from "next/link";

export function LearnMore({
  href,
  label = "Learn More",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link href={href} className="group">
      {label}
      <span
        className="group-hover:translate-x-1 inline-block duration-300 ease-in-out ml-2"
        aria-hidden="true"
      >
        &rarr;
      </span>
    </Link>
  );
}
