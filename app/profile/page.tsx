"use client";
import { useEffect, useState, useContext } from "react";
import { account } from "../../src/utils/appwrite";
import { useRouter } from "next/navigation";
import { profileData } from "../../src/context/context";
import { CATEGORIES, CATEGORY_STATUS } from "@/constants";

const Profile = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState("");
  //state for syncing navbar with logged in user name
  const { setProfileStatus } = useContext(profileData);
  const [, setSelectedCategory] = useState("");
  const [, setJourneyStatus] = useState("In Progress");

  const handleLogout = async () => {
    await account.deleteSession("current");
    router.push("/");
  };

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
    // router.push(`/dashboard/${category}`);
    router.push(`/profile/product/${category.toLowerCase()}`);

    const updatedStatus = CATEGORY_STATUS.map((item) => {
      const key = Object.keys(item)[0] as keyof typeof item;
      setJourneyStatus("In Progress");
      return { [key]: key === category ? "In Progress" : item[key] };
    });
    console.log("updatedStatus", updatedStatus);
  };

  return (
    <div className="authContainer relative">
      {userProfile && (
        <div className="mx-auto py-6">
          <h2>{userProfile ? `Welcome, ${userProfile}!` : "Loading..."}</h2>
          <button
            className="bg-dark text-white rounded-sm py-3 px-6 absolute top-0 right-1"
            onClick={handleLogout}
          >
            Logout
          </button>
          {CATEGORIES.map((c) => (
            <button
              className="CategoryAndGoodList"
              onClick={() => {
                chooseCategory(c.label);
              }}
              key={c.key}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default Profile;
