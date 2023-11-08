"use client";
import React from "react";
import { account } from "../../src/utils/appwrite";
import { useRouter } from "next/navigation";
import { login } from "../../src/utils/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppwriteException } from "appwrite";
import Link from "next/link";

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
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          className="border border-gray-300 m-4"
          placeholder="Email address"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500">This field is required</p>}
        <br />
        <input
          type="password"
          className="border border-gray-300 m-4"
          placeholder="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500">This field is required</p>
        )}
        {errors.credentialError && (
          <p className="text-red-500 ml-4">{errors.credentialError.message}</p>
        )}
        <br />
        <Link href="/password">Forgot Password?</Link>
        <button className="m-4"> Login </button>
      </form>
    </>
  );
};

export default LogIn;
