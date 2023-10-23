"use client";
import React from "react";
import { useState, useEffect } from "react";
import { account } from "../utils/appwrite";
import { useRouter } from "next/navigation";
import { login } from "../utils/auth";
import { Preferences, User } from "../type/User";

const LogIn = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loggedInUser, setLoggedInUser] = useState<User<Preferences> | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await account.get();
        const userWithPreferences: User<Preferences> = {
          email: user.email,
          password: user.password || "",
        };

        setLoggedInUser(userWithPreferences);
        router.push("/profile");
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchData();
  }, [loggedInUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
      await account.get();
      const userWithPreferences: User<Preferences> = {
        email: user.email,
        password: user.password || "",
      };

      setLoggedInUser(userWithPreferences);
    } catch (error) {
      console.log("Login Error: ", error);
    }
  };

  return (
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
  );
};
