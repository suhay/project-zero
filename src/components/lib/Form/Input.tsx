import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

import { FieldErrors } from "react-hook-form";
import { Error } from "./Error";

export type InputProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  errors?: FieldErrors;
  icon?: React.ReactElement;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { name, label, errors, icon, ...rest },
  ref,
) {
  const error = errors?.[name];
  const errorClass = error != null ? "shadow-red-500 border-red-500" : "";

  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          className={`w-full rounded-lg border border-gray-200 p-4 
          ${icon != null ? "pe-12" : ""} 
          text-sm shadow-sm ${errorClass}`}
          name={name}
          ref={ref}
          {...rest}
        />
        {icon != null ? (
          <span className="absolute inset-y-0 end-0 text-gray-300 grid place-content-center px-4">
            {icon}
          </span>
        ) : null}
      </div>
      <Error error={error} />
    </div>
  );
});
