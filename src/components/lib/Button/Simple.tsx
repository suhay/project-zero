import { ButtonHTMLAttributes } from "react";

import { buttonClass, variantClass } from ".";
import { Variant } from "../types";
import { CircularProgress } from "@mui/material";

export function Simple({
  label,
  isLoading,
  variant = "primary",
  type = "button",
  onClick,
  icon,
}: {
  label: string;
  isLoading?: boolean;
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
      disabled={isLoading}
    >
      {icon != null && !isLoading && (
        <span className="absolute left-4 top-[-2px] translate-y-[50%]">
          {icon}
        </span>
      )}
      {isLoading && (
        <span className="absolute left-4 top-[5px] translate-y-[50%]">
          <CircularProgress size={15} color="secondary" />
        </span>
      )}
      {label}
    </button>
  );
}
