"use client";
import React from "react";
import { account } from "@/src/utils/appwrite";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppwriteException } from "appwrite";

type Input = {
  email: string;
  customError: string;
};

const Password = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    console.log("submit email", data);
    try {
      await account.createRecovery(data.email, "http://localhost:3000/resetpw");
      localStorage.setItem("email", data.email.toString());
    } catch (error) {
      if (
        (error as AppwriteException).message ===
        "User with the requested ID could not be found."
      ) {
        setError("customError", {
          type: "appwrite server error",
          message: "Email doesn't exist",
        });
      } else {
        console.log("Rest Password Error: ", error);
      }
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
        {errors.customError && (
          <p className="text-red-500">{errors.customError.message}</p>
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Password;
