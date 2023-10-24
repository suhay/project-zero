"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyAndNavigate } from "@/src/utils/auth";

export default function VerifyPage() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");

    const performVerification = async () => {
      const destination = await verifyAndNavigate(userId, secret);

      if (destination) {
        router.push(destination);
      }
    };
    performVerification();
  }, [router]);

  return <div>Verifying...</div>;
}
