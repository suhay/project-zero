"use client";
import { useState } from "react";

import { AppwriteException, ID } from "appwrite";
import Link from "next/link";
import { AtSign, Eye, User } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";

import { account } from "@/src/utils/appwrite";
import { googleAuth, login, verifyEmail } from "@/src/utils/auth";
import { Button } from "~/Button";
import { Input } from "~/Form/Input";
import { Error } from "~/Form/Error";

type Inputs = {
  email: string;
  username: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.username,
      );
      await login(data.email, data.password);
      await verifyEmail();
      setIsVerified(true);
    } catch (e) {
      if (e instanceof AppwriteException) {
        console.error(e);
        setError("Password must not be a commonly used password");
      } else {
        console.log("Sign up Error: ", e);
      }
    }
  };

  const signWithGoogle = () => {
    googleAuth();
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-primary-600 sm:text-3xl">
          Welcome to ZeroIn!
        </h1>
        {!isVerified ? (
          <form
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-center text-lg font-medium">
              Create your account
            </p>
            <Input
              type="text"
              label="Your full name"
              placeholder="Full name"
              data-testid="username"
              errors={errors}
              autoComplete="name"
              icon={<User size={15} />}
              {...register("username", {
                required: "Your name is required",
              })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              errors={errors}
              autoComplete="username email"
              icon={<AtSign size={15} />}
              data-testid="email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <Input
              type="password"
              label="New password"
              placeholder="Password"
              data-testid="password"
              errors={errors}
              autoComplete="new-password"
              icon={<Eye size={15} />}
              {...register("password", {
                required: "Password is required",
                minLength: 8,
              })}
            />
            <Button.Simple type="submit" label="Sign up" />
            <Error message={error} />
            <div
              className="border-t border-t-gray-300 pt-4 before:content-['or'] 
            relative before:absolute before:top-0 before:bg-white before:px-2 text-gray-500 
            before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:text-sm"
            >
              <Button.Simple
                variant="google"
                label="Sign up with Google"
                onClick={signWithGoogle}
              />
            </div>
            <p className="text-center text-sm text-gray-500">
              <Link className="underline" href="/login">
                Already have an account?
              </Link>
            </p>
          </form>
        ) : (
          <p className="text-center text-lg font-medium">
            Verifying your account... please check you email.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
