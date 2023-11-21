"use client";
import AuthBackground from "@/src/components/image/authBackground";
import { account } from "@/src/utils/appwrite";
import { getWindowUserIdSecret, login } from "@/src/utils/auth";
import { AppwriteException } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  customError: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const { secret, userId } = getWindowUserIdSecret();
    setSecret(secret || "");
    setUserId(userId || "");
  }, [router]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
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
        setError("customError", {
          type: "appwrite server error",
          message: "Passwords do not match.",
        });
      } else {
        console.log("Other Error: ", error);
      }
    }
  };

  return (
    <div className="authContainer">
      <div className="relative flex justify-center py-20">
        <AuthBackground />
        <form className="formBox z-10" onSubmit={handleSubmit(onSubmit)}>
          <p className="p-6">New password must be at least 8 chars.</p>
          {/* <label htmlFor="password">New Password</label> */}
          <input
            className="authInputBox"
            type="password"
            placeholder="New Password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
          <br />
          {/* <label htmlFor="confirmPassword">Confirm New Password</label> */}
          <input
            className="authInputBox"
            type="password"
            placeholder="Confirm New Password"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && <span>This field is required</span>}
          {errors.customError && (
            <p className="text-red-500">{errors.customError.message}</p>
          )}
          <br />
          <button className="reset btnDark" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
