"use client";
import { useEffect, useState } from "react";

import { AppwriteException } from "appwrite";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { account } from "@/src/utils/appwrite";
import { getWindowUserIdSecret, login } from "@/src/utils/auth";
import { Button } from "~/Button";
import { Error } from "~/Form/Error";
import { Password } from "@/src/components/lib/Form/Password";

export type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [lost, setLost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { secret, userId } = getWindowUserIdSecret();
    setSecret(secret || "");
    setUserId(userId || "");
    setLost(secret == null && userId == null);
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      await account.updateRecovery(
        userId,
        secret,
        data.password,
        data.confirmPassword,
      );

      const email = localStorage.getItem("email");
      if (email) {
        const loginData = await login(email, data.password);
        if (loginData) {
          router.push("/profile");
        }
      }
    } catch (error) {
      if (error instanceof AppwriteException) {
        setError("Passwords do not match.");
      } else {
        console.log("Other Error: ", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (lost) {
    return (
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary-600 sm:text-3xl">
            Hi!
          </h1>
          <p className="text-center text-lg font-medium">
            It looks like you might be lost. Please return to the{" "}
            <Button.LearnMore href="/" label="homepage" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-primary-600 sm:text-3xl">
          Password Reset
        </h1>
        <form
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center text-lg font-medium">
            Let’s get you back in there.
          </p>
          <Password<Inputs>
            name="password"
            label="New password"
            errors={errors}
            autoComplete="new-password"
            confirm={{
              name: "confirmPassword",
              label: "Confirm password",
              placeholder: "Confirm password",
            }}
            placeholder="Password"
            register={register}
            watch={watch}
            includeCheckList
          />
          <Button.Simple type="submit" label="Submit" isLoading={isLoading} />
          <Error message={error} />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
