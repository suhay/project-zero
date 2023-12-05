"use client";
import { useState } from "react";

import { AtSign } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";

import { account } from "@/src/utils/appwrite";
import { Button } from "~/Button";
import { Input } from "~/Form/Input";
import { paths } from "@/src/utils/env";

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
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      setIsLoading(true);
      await account.createRecovery(data.email, paths.RESET_PASSWORD);
      localStorage.setItem("email", data.email.toString());
      setMessage("Help is on the way!");
    } catch (e) {
      console.log("Reset Password Error: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-primary-600 sm:text-3xl">
          Forgot your password?
        </h1>
        <form
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center text-lg font-medium">
            It happens! Enter the email address you used to sign up below and
            we’ll send you instructions on how to reset it.
          </p>
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            errors={errors}
            autoComplete="username email"
            icon={<AtSign size={15} />}
            {...register("email", { required: "Email is required" })}
          />
          <Button.Simple
            type="submit"
            label="Send help"
            isLoading={isLoading}
          />
          {message != null && (
            <div className="text-green-500 text-sm text-center">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Password;
