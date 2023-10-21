"use client";
import React, { useEffect, useState } from "react";
import { account } from "../appwrite";
import { useLocation, useRouter } from "wouter";

export default function Profile() {
  const router = useRouter();
  const [, navigate] = useLocation();
  const [userProfile, setUserProfile] = useState("");
  const [sessionDeleted, setSessionDeleted] = useState(false);

  async function handleLogout() {
    try {
      const data = await account.deleteSession("current");
      console.log("session delete resolved?", data);
      setSessionDeleted(true);
      setUserProfile("");
    } catch (error) {
      console.log("Error during logout:", (error as Error).message);
    }
  }

  useEffect(() => {
    if (sessionDeleted) {
      console.log("log out and direct to home");
      navigate("");
    }
  }, [sessionDeleted, userProfile]);

  //update and display current user's profile name
  useEffect(() => {
    //console.log("profile/ get user session useEffect");
    const fetchData = async () => {
      try {
        const userData = await account.get();
        console.log("User data:", userData);
        setUserProfile(userData.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [router]);

  return (
    <>
      {userProfile ? (
        <div>
          <h1>{userProfile ? `${userProfile} is logged in` : "Loading..."}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <h1>User Profile</h1>
      )}
    </>
  );
}
