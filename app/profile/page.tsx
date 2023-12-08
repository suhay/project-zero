"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { CATEGORIES } from "@/constants";
import { useUserData } from "@/src/hooks/useUserData";
import { RadarChart } from "@/src/components/Graphs/RadarChart";
import { Card } from "@/src/components/lib/Card";

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
          <h2>
            {userProfile ? `Welcome, ${userProfile.name}!` : "Loading..."}
          </h2>
          <section className="flex gap-4">
            <div className="border border-gray-300  p-4 rounded-lg flex flex-col w-1/2">
              <h3 className="mb-4">
                How each area is doing (scores out of 10, higher is better)
              </h3>
              <RadarChart />
            </div>
            <div className="flex gap-4">
              <Card.Stat
                description="Plastics prevented in November"
                stat="10kg"
              />
              <Card.Stat
                description="Initiatives you're involved in"
                stat="6"
              />
              <Card.Stat description="Ranking" stat="Top 3%" />
            </div>
          </section>
          <div className="flex my-20 py-auto gap-6 flex-wrap">
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
