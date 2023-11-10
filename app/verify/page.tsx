"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getWindowUserIdSecret, verifyAndNavigate } from "@/src/utils/auth";

const VerifyPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { secret, userId } = getWindowUserIdSecret();

    const performVerificationAndNavigate = async () => {
      const destination = await verifyAndNavigate(userId, secret);
      if (destination) {
        router.push(destination);
      }
    };
    performVerificationAndNavigate();
  }, [router]);

  return <div>Verifying...</div>;
};

export default VerifyPage;
