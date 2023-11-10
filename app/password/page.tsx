"use client";
import React from "react";
import { account } from "@/src/utils/appwrite";
import { SubmitHandler, useForm } from "react-hook-form";

type Input = {
  email: string;
  customError: string;
};

const Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      await account.createRecovery(data.email, "http://localhost:3000/resetpw");
      localStorage.setItem("email", data.email.toString());
    } catch (error) {
      console.log("Reset Password Error: ", error);
    }
  };

  return (
    <>
      <p className="my-6">
        Please provide email address when signed up for your account.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email Address</label>
        <input
          className="border border-gray-300 m-4 w-60"
          {...register("email", { required: true })}
          placeholder="email"
        />
        {errors.email && <p>This field is required</p>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Password;
