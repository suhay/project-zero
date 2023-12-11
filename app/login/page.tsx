"use client";
import React from "react";

import { AppwriteException } from "appwrite";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AtSign } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";

import { Google } from "@/src/components/image/google";
import { Password } from "@/src/components/lib/Form/Password";
import { account } from "@/src/utils/appwrite";
import { googleAuth, login } from "@/src/utils/auth";
import { Button } from "~/Button";
import { Error } from "~/Form/Error";
import { Input } from "~/Form/Input";
import { saveUserToDB } from "@/src/database/productData";

type Inputs = {
  email: string;
  password: string;
};

const LogIn = () => {
  const router = useRouter();
  const [loginError, setLoginError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [userDoc, setUserDoc] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      const currentUser = await account.get(); //print out
      setUserDoc(currentUser.$id);
      router.push("/profile");
    } catch (e) {
      if (e instanceof AppwriteException) {
        console.error(e);
        setLoginError("Invalid credentials");
      } else {
        console.log("Other error", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // error while appwrite updating document
  // useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await saveUserToDB(userDoc);
      // console.log("userDoc", result);
      result;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  fetchData();
  // }, [userDoc]);

  const signWithGoogle = () => {
    googleAuth();
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-primary-600 sm:text-3xl">
          Welcome Back!
        </h1>
        <form
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center text-lg font-medium">
            Sign in to your account
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
          <Password<Inputs>
            label="Password"
            name="password"
            errors={errors}
            autoComplete="password"
            placeholder="Password"
            register={register}
            watch={watch}
          />
          <Button.Simple type="submit" label="Sign in" isLoading={isLoading} />
          <Error message={loginError} />
          <div
            className="border-t border-t-gray-300 pt-4 before:content-['or'] 
            relative before:absolute before:top-0 before:bg-white before:px-2 text-gray-500 
            before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:text-sm"
          >
            <Button.Simple
              variant="google"
              icon={<Google />}
              label="Sign in with Google"
              onClick={signWithGoogle}
            />
          </div>
          <p className="text-center text-sm text-gray-500">
            No account?{" "}
            <Link className="underline" href="/signup">
              Sign up
            </Link>
          </p>
          <p className="text-center text-sm text-gray-500">
            <Link href="/password" className="underline">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
