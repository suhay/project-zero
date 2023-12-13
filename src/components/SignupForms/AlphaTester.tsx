"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "~/Form/Input";
import { Button } from "~/Button";
import { executeFunction } from "@/src/utils/functions";
import { Layout } from "../lib/Layout";

type Input = {
  email: string;
  b_2de017cc5896a770dd4853b99_6c0ae287ae: string;
};

export function AlphaTesterForm() {
  const { register, handleSubmit } = useForm<Input>();

  const [alreadySignedUp, setAlreadySignedUp] = useState(true);
  const [justSignup, setJustSignedUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const alphatester = localStorage.getItem("alphatester");
    if (alphatester !== "true") {
      setAlreadySignedUp(false);
    }
  }, []);

  const onSubmit: SubmitHandler<Input> = async (data) => {
    setIsLoading(true);
    executeFunction("6578f61cea56839c8b62", { message: data })
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
                <input
                  type="text"
                  name="b_2de017cc5896a770dd4853b99_6c0ae287ae"
                  tabIndex={-1}
                  value=""
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
