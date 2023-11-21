"use client";
import React from "react";
import { account } from "@/src/utils/appwrite";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthBackground from "@/src/components/image/authBackground";

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
    <div className="authContainer">
      <div className="relative z-10 flex justify-center py-20">
        <AuthBackground />
        <form className="formBox z-10" onSubmit={handleSubmit(onSubmit)}>
          <p className="p-6">
            Please provide email address <br /> when signed up for your account.
          </p>
          {/* <label htmlFor="email">Email Address</label> */}
          <input
            className="authInputBox"
            {...register("email", { required: true })}
            placeholder="email"
          />
          {errors.email && <p>This field is required</p>}
          <br />
          <button className="btnDark" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;
