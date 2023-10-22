"use client";
import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { account } from "../appwrite";

export const verifyAndNavigate = async (
  userId: string | null,
  secret: string | null
) => {
  try {
    if (userId && secret) {
      await account.updateVerification(userId, secret);
      return "profile";
    }
  } catch (error) {
    console.log("Error during email verification", error);
  }
  return null;
};

export default function VerifyPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");

    const performVerification = async () => {
      const destination = await verifyAndNavigate(userId, secret);

      if (destination) {
        navigate(destination);
      }
    };
    performVerification();
  }, []);

  return <div>Signing Up...</div>;
}
