"use client";
import { useEffect, useState } from "react";
import React from "react";
import { account } from "../appwrite";
import { ID } from "appwrite";
import { verifyEmail, googleAuth } from "../auth";
import { useRouter, useLocation } from "wouter";
import Link from "next/link";
import router from "next/router";

export default function SignUp() {
  const [, navigate] = useLocation();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // await account.create(ID.unique(), user.email, user.username, user.password);
    const newAccount = account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );

    newAccount
      .then((response) => {
        console.log("User created", response);
      })
      .catch((error) => {
        console.log(error);
      });
      
    try {
      const data = await verifyEmail();
      console.log("verify email data", data);
    } catch (error) {
      console.log("Error", (error as Error).message);
    }

    navigate("verify");
  };

  useEffect(() => {
    //console.log("signup/ useEffect");
    async function fetchData() {
      try {
        const user = await account.get();
        console.log("signup get user", user);
        setIsLoaded(true);
        navigate("verify");
      } catch (error) {
        //setIsLoaded(true);
        console.log("Error", (error as Error).message);
      }
    }

    fetchData();
  }, [router]);

  const signWithGoogle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    googleAuth();
  };

  return (
    <>
      <Link href={"/"}>Link to Home</Link>
      {!isLoaded ? (
        <>
          <h2>Sign up</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              id="username"
              type='text' //
              placeholder='username'
              value={user.username}
              data-testid="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <hr />
            <input
              id="email"
              type='email' //
              placeholder='Email address'
              value={user.email}
              data-testid="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <hr />
            <input
              id="password"
              type='password' //
              placeholder='password'
              value={user.password}
              data-testid="password"
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
        <h1>Loading</h1>
      )}
    </>
  );
}
