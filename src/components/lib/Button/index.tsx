import { Link } from "./Link";
import { LearnMore } from "./LearnMore";
import { Variant } from "../types";
import { Simple } from "./Simple";
import { Tag } from "./Tag";
import { Back } from "./Back";
import { Action } from "./Action";

export const buttonClass =
  "rounded-lg px-4 py-3 text-sm shadow-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export const variantClass: Record<Variant, string> = {
  primary:
    "bg-primary-500 hover:bg-primary-300 focus-visible:outline-primary-300 text-white",
  secondary:
    "bg-secondary-500 hover:bg-secondary-600 focus-visible:outline-secondary-600 text-black",
  google: "bg-google text-white",
  action:
    "bg-secondary-600 focus-visible:outline-secondary-600 hover:bg-secondary-700 text-black rounded-[50px]",
  "no action":
    "bg-secondary-500 focus-visible:outline-secondary-600 text-black rounded-[50px]",
};

export const Button = {
  Link,
  LearnMore,
  Back,
  Simple,
  Tag,
  Action,
};
