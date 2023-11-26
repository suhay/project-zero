import { Link } from "./Link";
import { LearnMore } from "./LearnMore";
import { Variant } from "../types";
import { Simple } from "./Simple";

export const buttonClass =
  "rounded-lg px-4 py-3 text-sm shadow-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export const variantClass: Record<Variant, string> = {
  primary:
    "bg-primary-500 hover:bg-primary-300 focus-visible:outline-primary-300 text-white",
  secondary:
    "bg-secondary-500 hover:bg-secondary-600 focus-visible:outline-secondary-600 text-black",
  google: "bg-google text-white",
};

export const Button = {
  Link,
  LearnMore,
  Simple,
};
