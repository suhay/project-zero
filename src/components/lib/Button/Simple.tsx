import { ButtonHTMLAttributes } from "react";

import { buttonClass, variantClass } from ".";
import { Variant } from "../types";

export function Simple({
  label,
  variant = "primary",
  type = "button",
  onClick,
  icon,
}: {
  label: string;
  icon?: React.ReactElement;
  variant?: Variant;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      className={`${buttonClass} ${variantClass[variant]} block w-full relative`}
      onClick={onClick}
    >
      {icon != null && (
        <span className="absolute left-4 top-[-2px] translate-y-[50%]">
          {icon}
        </span>
      )}
      {label}
    </button>
  );
}
