import { ButtonHTMLAttributes } from "react";
import { buttonClass, variantClass } from ".";
import { Variant } from "../types";

export function Simple({
  label,
  variant = "primary",
  type = "button",
  onClick,
}: {
  label: string;
  variant?: Variant;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      className={`${buttonClass} ${variantClass[variant]} block w-full`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
