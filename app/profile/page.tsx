"use client";
import React, { useEffect, useState } from "react";
import { account } from "../../src/utils/appwrite";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState("");

  const handleLogout = async () => {
    await account.deleteSession("current");
    router.push("/");
  };

  //update and display current user's profile name
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await account.get();
        console.log("User data:", userData);
        setUserProfile(userData.name);
        router.push("/profile");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [router]);

  return (
    <>
      {userProfile && (
        <div>
          <h1>{userProfile ? `Welcome, ${userProfile}!` : "Loading..."}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};
export default Profile;
