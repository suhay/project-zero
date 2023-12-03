import { ButtonHTMLAttributes } from "react";
import { buttonClass, variantClass } from ".";
import { Variant } from "../types";

export function Tag({
  tag,
  variant = "no action",
  type = "button",
  onClick,
}: {
  tag: string | undefined;
  variant?: Variant;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      className={`${buttonClass} ${variantClass[variant]} block w-auto`}
      onClick={onClick}
    >
      {tag}
    </button>
  );
}
