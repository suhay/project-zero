"use client";
import { useEffect, useState } from "react";
import React from "react";
import { account } from "../utils/appwrite";
import { ID, Models } from "appwrite";
import { verifyEmail, googleAuth, login } from "../utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const newAccount: Promise<Models.User<Models.Preferences>> =
        account.create(ID.unique(), user.email, user.password, user.username);

      await newAccount;
      await login(user.email, user.password);
      await verifyEmail();
      setIsVerified(true);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const signWithGoogle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    googleAuth();
  };

  return (
    <>
      <Link href={"/"}>Home</Link>
      {!isVerified ? (
        <>
          <h2>Sign up</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              id='username'
              type='text' //
              placeholder='username'
              value={user.username}
              data-testid='username'
              required
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <hr />
            <input
              id='email'
              type='email' //
              placeholder='Email address'
              value={user.email}
              data-testid='email'
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <hr />
            <input
              id='password'
              type='password' //
              placeholder='password'
              value={user.password}
              data-testid='password'
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <hr />
            <button> Verify Email </button>
            <br />
            <h2>or</h2>
            <button type='button' onClick={(e) => signWithGoogle(e)}>
              {" "}
              Continue with Google{" "}
            </button>
          </form>
        </>
      ) : (
        <h1>Signing Up...</h1>
      )}
    </>
  );
}
