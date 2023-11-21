"use client";
import React, { useState } from "react";
import { AppwriteException, ID } from "appwrite";
import { account } from "../../src/utils/appwrite";
import { googleAuth, login, verifyEmail } from "../../src/utils/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import AuthBackground from "@/src/components/image/authBackground";
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
      if (error instanceof AppwriteException) {
        setError("customError", {
          type: "appwrite server error",
          message:
            "Password must be at least 8 characters and should not be one of the commonly used password.",
        });
      } else {
        console.log("Signup Error: ", error);
      }
    }
  };

  const signWithGoogle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    googleAuth();
  };

  return (
    <div className="authContainer relative">
      {!isVerified ? (
        <div className="relative flex">
          <AuthBackground />
          <form className="formBox z-10" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="p-2">Welcome to ZeroIn</h2>
            <button
              type="button"
              className="btnDark"
              onClick={(e) => signWithGoogle(e)}
            >
              Continue with Google
            </button>
            <p>or</p>
            <input
              id="username"
              type="text"
              className="authInputBox"
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
              className="authInputBox"
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
              className="authInputBox"
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
            <button className="m-4 btnDark"> Verify Email </button>
            <div>
              Already have an account?
              <Link href="/login" className="text-green hover:font-bold">
                LogIn
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <h1>Signing Up...</h1>
      )}
    </div>
  );
};

export default SignUp;
