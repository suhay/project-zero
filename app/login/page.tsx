"use client";
import React from "react";
import { useState } from "react";
import { account } from "../../src/utils/appwrite";
import { useRouter } from "next/navigation";
import { login } from "../../src/utils/auth";
import { Preferences, User } from "../../src/types/user";
import Link from "next/link";

const LogIn = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [, setLoggedInUser] = useState<User<Preferences> | null>(null);

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
          className="border border-gray-300 m-4"
          placeholder="Email address"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />
        <input
          type="password" //
          className="border border-gray-300 m-4"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />
        <Link href="/password">Forgot Password?</Link>
        <button className="m-4"> Login </button>
      </form>
    </>
  );
};

export default LogIn;
