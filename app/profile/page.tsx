"use client";
import { useEffect, useState, useContext } from "react";
import { account } from "../../src/utils/appwrite";
import { useRouter } from "next/navigation";
import { LoginContext } from "../../src/context/context";
import { CATEGORIES, GOODS } from "@/constants";

const Profile = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState("");
  //state for syncing navbar with logged in user name
  const { setProfileStatus } = useContext(LoginContext);
  const [, setSelectedCategory] = useState("");
  console.log(GOODS);
  //update and display current user's profile name
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await account.get();
        // console.log("User data:", userData);
        setUserProfile(userData.name);
        setProfileStatus(userData.name);
        router.push("/profile");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [router, setProfileStatus]);

  const chooseCategory = (category: string) => {
    setSelectedCategory(category);
    router.push(`/profile/product/${category.toLowerCase()}`);
  };

  return (
    <div className="profile relative">
      {userProfile && (
        <div className="mx-auto py-6">
          <h2>{userProfile ? `Welcome, ${userProfile}!` : "Loading..."}</h2>
          <div className="flex my-20 py-auto gap-6">
            {CATEGORIES.map((c) => (
              <button
                className="profile border-8 border-green-500/50 w-36 h-36 rounded-full hover:scale-105"
                onClick={() => {
                  chooseCategory(c.label);
                }}
                key={c.key}
              >
                {c.label}
              </button>
            ))}
          </div>
          {/* //TODO when in progress or active improving, show pantry */}
          Your Pantry
        </div>
      )}
    </div>
  );
};
export default Profile;
