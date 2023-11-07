"use client";
import React, { useState } from "react";
import { AppwriteException, ID } from "appwrite";
import { account } from "../../src/utils/appwrite";
import { googleAuth, login, verifyEmail } from "../../src/utils/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

type Inputs = {
  email: string;
  username: string;
  password: string;
  customError: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

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
    } catch (error) {
      if (error as AppwriteException) {
        setError("customError", {
          type: "appwrite server error",
          message:
            "Password must be at least 8 characters and should not be one of the commonly used password.",
        });
        console.log("Error", error);
      }
    }
  };

  const signWithGoogle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    googleAuth();
  };

  return (
    <>
      <Link href={"/"}>Home</Link>
      {!isVerified ? (
        <>
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              id="username"
              type="text"
              className="border border-gray-300 m-4"
              placeholder="username"
              data-testid="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 ml-4">{errors.username.message}</p>
            )}
            <br />
            <input
              id="email"
              type="email"
              className="border border-gray-300 m-4"
              placeholder="Email address"
              data-testid="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 ml-4">{errors.email.message}</p>
            )}
            <br />
            <input
              id="password"
              type="password"
              autoComplete="false"
              className="border border-gray-300 m-4"
              placeholder="password"
              data-testid="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 ml-4">{errors.password.message}</p>
            )}
            {errors.customError && (
              <p className="text-red-500 ml-4">{errors.customError.message}</p>
            )}
            <br />
            <button className="m-4"> Verify Email </button>
            <br />
            <h2>or</h2>
            <button
              type="button"
              className="m-4"
              onClick={(e) => signWithGoogle(e)}
            >
              Continue with Google
            </button>
          </form>
        </>
      ) : (
        <h1>Signing Up...</h1>
      )}
    </>
  );
};

export default SignUp;
