"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "../utils/appwrite";

const verifyAndNavigate = async (
  userId: string | null,
  secret: string | null,
) => {
  try {
    if (userId && secret) {
      await account.updateVerification(userId, secret);
      return "login";
    }
  } catch (error) {
    console.log("Error during email verification", error);
  }
  return null;
};

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
