"use client";
import React from "react";
import { account } from "../../src/utils/appwrite";
import { useRouter } from "next/navigation";
import { login } from "../../src/utils/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppwriteException } from "appwrite";
import Link from "next/link";
import AuthBackground from "@/src/components/image/authBackground";

type Inputs = {
  email: string;
  password: string;
  credentialError: string;
};

const LogIn = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await login(data.email, data.password);
      await account.get();
      router.push("/profile");
    } catch (error) {
      if (error instanceof AppwriteException) {
        setError("credentialError", {
          type: "appwrite server error",
          message: "Invalid credentials. Please check the email and password.",
        });
      } else {
        console.log("Other error", error);
      }
    }
  };

  return (
    <div className="authContainer">
      <div className="relative z-10 flex justify-center py-20">
        <AuthBackground />
        <form className="formBox z-10" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="p-4">Welcome to ZeroIn</h2>
          <input
            type="email"
            className="authInputBox"
            placeholder="Email address"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">This field is required</p>
          )}
          <br />
          <input
            type="password"
            className="authInputBox"
            placeholder="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500">This field is required</p>
          )}
          {errors.credentialError && (
            <p className="text-red-500 ml-4">
              {errors.credentialError.message}
            </p>
          )}
          <br />
          <button className="btnDark"> Login </button>
          <br />
          <div className="my-3">
            <Link href="/password" className=" text-gray hover:font-bold">
              Forgot Password?
            </Link>
          </div>
          <div className="my-3">
            Does not have an account?
            <Link
              href="/signup"
              className="text-green-300 ml-2 hover:font-bold"
            >
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
