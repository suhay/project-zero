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
    <div className="authContainer">
      <h2>Welcome to ZeroIn</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          className="authInputBox"
          placeholder="Email address"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500">This field is required</p>}
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
          <p className="text-red-500 ml-4">{errors.credentialError.message}</p>
        )}
        <br />
        <Link href="/password" className=" text-gray hover:font-bold">
          Forgot Password?
        </Link>
        <button className="m-4 btn_green"> Login </button>
      </form>
    </div>
  );
};

export default LogIn;
