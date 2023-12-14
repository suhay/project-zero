"use client";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { SubmitHandler, useForm } from "react-hook-form";

import { executeFunction } from "@/src/utils/functions";
import { Button } from "~/Button";
import { Input } from "~/Form/Input";
import { Layout } from "../lib/Layout";

type Input = {
  email: string;
};

export function AlphaTesterForm() {
  const { register, handleSubmit } = useForm<Input>();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [alreadySignedUp, setAlreadySignedUp] = useState(true);
  const [justSignup, setJustSignedUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const alphatester = localStorage.getItem("alphatester");
    if (alphatester !== "true") {
      setAlreadySignedUp(false);
    }
  }, []);

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    return await executeRecaptcha("alphaSubmit");
  }, [executeRecaptcha]);

  const onSubmit: SubmitHandler<Input> = async (data) => {
    setIsLoading(true);
    const token = await handleReCaptchaVerify();
    executeFunction(process.env.NEXT_PUBLIC_APPWRITE_MAILCHIMP_FUNCTION ?? "", {
      message: {
        ...data,
        token,
      },
    })
      .then(() => {
        setJustSignedUp(true);
        localStorage.setItem("alphatester", "true");
        setIsLoading(false);
      })
      .catch(() => {
        setJustSignedUp(true);
        localStorage.setItem("alphatester", "true");
        setIsLoading(false);
      });
  };

  if (alreadySignedUp) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <Layout.Grid className="items-center snap-start h-[512px] my-8">
        <section>
          {!justSignup && (
            <>
              <h2>Become an Alpha tester!</h2>
              <form
                className="mb-0 mt-6 space-y-4 p-4 sm:p-6 lg:p-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <p className="text-center text-lg font-medium">
                  Let's break some things and earn points doing it!
                </p>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  {...register("email", { required: "Email is required" })}
                />
                <Button.Simple
                  type="submit"
                  label="Sign up"
                  isLoading={isLoading}
                />
              </form>
            </>
          )}
          {justSignup && (
            <div className="text-center">
              <p className="text-center text-lg font-medium">
                Thanks for signing up! We’ll be in touch soon.
              </p>
            </div>
          )}
        </section>
        <section className="flex justify-center">
          <Image
            src="/assets/local-scoop.jpg"
            alt={""}
            width={512}
            height={512}
          />
        </section>
      </Layout.Grid>
      <div className="flex border border-gray-600" />
    </div>
  );
}
