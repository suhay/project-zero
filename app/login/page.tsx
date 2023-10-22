"use client";
import React from "react";
import { useState, useEffect } from "react";
import { account } from "../appwrite";
import { useLocation } from "wouter";
import Profile from "../profile/page";
import { login } from "../auth";

const LogIn = () => {
  const [, navigate] = useLocation();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await account.get();
        console.log("current user", userData);
        navigate("profile");
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchData();
  }, [isSession]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
      setIsSession(true);
    } catch (error) {
      console.log("Login Error: ", error);
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
        <h1>
          <Profile />
        </h1>
      )}
    </>
  );
};

export default LogIn;
