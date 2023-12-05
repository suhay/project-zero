"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { CATEGORIES } from "@/constants";
import { useUserData } from "@/src/hooks/useUserData";

const Profile = () => {
  const router = useRouter();
  const [, setSelectedCategory] = useState("");
  const { userProfile, loading } = useUserData({});

  const chooseCategory = (category: string) => {
    setSelectedCategory(category);
    router.push(`/profile/product/${category.toLowerCase()}`);
  };

  if (loading) {
    return (
      <div className="mx-auto py-6">
        <h2>Loading...</h2>
      </div>
    );
  }

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
