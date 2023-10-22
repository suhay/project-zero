"use client";
import React, { useEffect, useState } from "react";
import { account } from "../appwrite";
import { useLocation, useRouter } from "wouter";

export default function Profile() {
  const [, navigate] = useLocation();
  const [userProfile, setUserProfile] = useState("");
  const [sessionDeleted, setSessionDeleted] = useState(false);

  const handleLogout = async () => {
    const data = await account.deleteSession("current");
    console.log("session delete resolved?", data);
    setSessionDeleted(true);
  };

  useEffect(() => {
    console.log("log out and direct to home");
    navigate("/");
  }, [sessionDeleted]);

  //update and display current user's profile name
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await account.get();
        console.log("User data:", userData);
        setUserProfile(userData.name);
        navigate("profile");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {userProfile && !sessionDeleted && (
        <div>
          <h1>{userProfile ? `Welcome, ${userProfile}!` : "Loading..."}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
}
