import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export function Error({
  error,
  message,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  message?: string;
}) {
  if (error == null && message == null) {
    return null;
  }

  let errorMessage = "";
  if (error) {
    errorMessage = error.message?.toString() ?? "";
  } else if (message) {
    errorMessage = message;
  }

  return <div className="text-red-500 text-sm pl-4">{errorMessage}</div>;
}
