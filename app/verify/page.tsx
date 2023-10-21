"use client";
import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { account } from "../appwrite";

export default function VerifyPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    console.log("VerifyPage work?");
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams", urlParams);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");

    if (typeof userId !== "string" || typeof secret !== "string") {
      navigate("signup");
      return;
    }

    const promise = account.updateVerification(userId, secret);
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return <div>Signing Up</div>;
}
