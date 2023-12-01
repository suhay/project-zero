import { ButtonHTMLAttributes } from "react";
import { buttonClass, variantClass } from ".";
import { Variant } from "../types";

export function Action({
  tag,
  variant = "action",
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
      className={`${buttonClass} ${variantClass[variant]} w-auto ml-auto mr-4`}
      onClick={onClick}
    >
      {tag}
    </button>
  );
}