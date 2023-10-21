"use client";
import React from "react";
import { useState, useEffect } from "react";
import { account } from "../appwrite";
import { useRouter, useLocation } from "wouter";
import Profile from "../profile/page";

export default function LogIn() {
  const [, navigate] = useLocation();
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await account.get();
        console.log("User data:", userData);
        navigate("profile");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [isSession]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = await account.createEmailSession(user.email, user.password);
    console.log("success? createEmailSession", data);
    setIsSession(true);

    if (data !== null || data !== undefined) {
      navigate("profile");
    }
  };

  return (
    <>
      {!isSession ? (
        <>
          <h2>Login</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type='email' //
              placeholder='Email address'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <hr />
            <input
              type='password' //
              placeholder='password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <hr />
            <button> Login </button>
          </form>
        </>
      ) : (
        <h1><Profile /></h1>
      )}
    </>
  );
}
