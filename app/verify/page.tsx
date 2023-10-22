"use client";
import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { account } from "../appwrite";

export default function VerifyPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");

    const verifyConfirmation = async () => {
      try {
        if (userId && secret) {
          await account.updateVerification(userId, secret);
          navigate("profile");
        }
      } catch (error) {
        console.log("Error during email verification", error);
      }
    };

    if (userId && secret) {
      verifyConfirmation();
    }
  }, []);

  return <div>Signing Up...</div>;
}
