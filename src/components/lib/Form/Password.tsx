import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

import { Eye, EyeOff } from "react-feather";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { Error } from "./Error";

export type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  errors?: FieldErrors;
  confirm?: {
    name: Path<T>;
    label: string;
    placeholder?: string;
  };
  placeholder?: string;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  includeCheckList?: boolean;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

const letterReg = new RegExp(/[a-zA-Z]/);
const numberReg = new RegExp(/[0-9]/);
// content: "\2022";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
//   color: red; /* Change the color */
//   font-weight: bold; /* If you want it to be bold */
//   display: inline-block; /* Needed to add space between the bullet and the text */
//   width: 1em; /* Also needed for space (tweak if needed) */
//   margin-left: -1em;
const bulletClass =
  'before:content-["•"] before:w-4 ' +
  "before:inline-block before:relative before:top-1 before:font before:text-[30px] before:leading-[0px]";

export function Password<T extends FieldValues>({
  name,
  label,
  errors,
  confirm,
  placeholder,
  register,
  watch,
  includeCheckList,
  ...rest
}: Props<T>) {
  const error = errors?.[name];
  const confirmName = confirm?.name;
  const confirmError = confirmName ? errors?.[confirmName] : undefined;
  const errorClass = "shadow-red-500 border-red-500";

  const [minLengthCheck, setMinLengthCheck] = useState(false);
  const [maxLengthCheck, setMaxLengthCheck] = useState(false);
  const [oneLetterCheck, setOneLetterCheck] = useState(false);
  const [oneNumberCheck, setOneNumberCheck] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const password = useRef({});
  password.current = watch(name);

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      const password = value[name] as string;
      setMinLengthCheck(password.length >= 8);
      setMaxLengthCheck(password.length < 20);
      setOneLetterCheck(letterReg.test(password));
      setOneNumberCheck(numberReg.test(password));
    });
    return () => unsubscribe();
  }, [name, watch]);

  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          {...rest}
          className={`w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm ${
            error ? errorClass : ""
          }`}
          type={passwordVisibility ? "text" : "password"}
          placeholder={placeholder}
          data-testid={name}
          {...register(name, {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
            maxLength: {
              value: 20,
              message:
                "We love your dedication, but we can only support up to 20 characters",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)/,
              message:
                "Your password must contain at least one letter and one number",
            },
          })}
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 text-gray-900 grid place-content-center px-4"
          onClick={handleTogglePasswordVisibility}
          aria-label="toggle hide or un-hide password"
        >
          {passwordVisibility ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      <Error error={error} />
      {includeCheckList && (
        <ul className="grid grid-cols-1 gap-1 md:grid-cols-2 px-1 pt-2">
          <li
            className={`${
              minLengthCheck
                ? "text-black-600 before:text-blue-500"
                : "text-gray-300"
            } ${bulletClass}`}
          >
            8 characters minimum
          </li>
          <li
            className={`${
              maxLengthCheck
                ? "text-black-600 before:text-blue-500"
                : "text-gray-300"
            } ${bulletClass}`}
          >
            20 characters maximum
          </li>
          <li
            className={`${
              oneLetterCheck
                ? "text-black-600 before:text-blue-500"
                : "text-gray-300"
            } ${bulletClass}`}
          >
            One character
          </li>
          <li
            className={`${
              oneNumberCheck
                ? "text-black-600 before:text-blue-500"
                : "text-gray-300"
            } ${bulletClass}`}
          >
            One number
          </li>
        </ul>
      )}
      {confirm != null && (
        <div className="mt-4">
          <label htmlFor={confirm.name} className="sr-only">
            {confirm.label}
          </label>
          <div className="relative">
            <input
              {...rest}
              className={`w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm ${
                confirmError ? errorClass : ""
              }`}
              type={confirmPasswordVisibility ? "text" : "password"}
              placeholder={confirm.placeholder}
              data-testid={confirm.name}
              autoComplete="new-password"
              {...register(confirm.name, {
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 text-gray-900 grid place-content-center px-4"
              onClick={handleToggleConfirmPasswordVisibility}
              aria-label="toggle hide or un-hide confirm password"
            >
              {confirmPasswordVisibility ? (
                <EyeOff size={15} />
              ) : (
                <Eye size={15} />
              )}
            </button>
          </div>
        </div>
      )}
      <Error error={confirmError} />
    </div>
  );
}
