import NextLink from "next/link";
import { Variant } from "../types";
import { buttonClass, variantClass } from ".";

export function Link({
  variant = "secondary",
  href,
  label,
}: {
  variant?: Variant;
  href: string;
  label: string;
}) {
  return (
    <NextLink
      href={href}
      className={`${variantClass[variant]} inline-block mt-1 mr-2 ${buttonClass}`}
    >
      {label}
    </NextLink>
  );
}
