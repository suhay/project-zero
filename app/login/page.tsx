"use client";
import React from "react";
import { account } from "../../src/utils/appwrite";
import { useRouter } from "next/navigation";
import { login } from "../../src/utils/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};

const LogIn = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await login(data.email, data.password);
      await account.get();
      router.push("/profile");
    } catch (error) {
      console.log("Login Error: ", error);
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
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <br />
        <input
          type="password"
          className="border border-gray-300 m-4"
          placeholder="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <br />
        <Link href="/password">Forgot Password?</Link>
        <button className="m-4"> Login </button>
      </form>
    </>
  );
};

export default LogIn;
