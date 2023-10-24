"use client";
import React from "react";
import { useState, useEffect } from "react";
import { account } from "../../src/utils/appwrite";
import { useRouter } from "next/navigation";
import { login } from "../../src/utils/auth";
import { Preferences, User } from "../../src/types/User"

export default function LogIn() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loggedInUser, setLoggedInUser] = useState<User<Preferences> | null>(
    null,
  );

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
      router.push("/profile");
    } catch (error) {
      console.log("Login Error: ", error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email" //
          placeholder="Email address"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <hr />
        <input
          type="password" //
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <hr />
        <button> Login </button>
      </form>
    </>
  );
}
