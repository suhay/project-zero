"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/constants";
import { useUserData } from "@/src/hooks/useUserData";
import { getUserPantryDB } from "@/src/database/productData";
import { pantrySignal } from "@/src/components/Journey/PageModal";
import { Card } from "@/src/components/lib/Card";
import { Button } from "@/src/components/lib/Button";
import { Models } from "appwrite";
import { RadarChart } from "@/src/components/Graphs/RadarChart";

const Profile = () => {
  const router = useRouter();
  const [, setSelectedCategory] = useState("");
  const [pantry, setPantry] = useState<Models.Document[]>([]); //use updateDocument works
  const { userProfile, loading } = useUserData({});

  const chooseCategory = (category: string) => {
    setSelectedCategory(category);
    router.push(`/profile/product/${category.toLowerCase()}`);
  };

  //get user's pantry collection by (pantry product ids) and retrieve attributes from pantry array
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserPantryDB(userProfile?.$id || ""); //ID error
        if (result) {
          setPantry(result);
        } else {
          console.error("getUserPantryDB returned undefined");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchData();
  }, [userProfile?.$id]);

  //workaround: format pantries id from a single string to render multiple data
  const pantriesID = pantry[0]?.pantries.split(",");
  const updatedPantries = pantrySignal.value.document?.filter(
    (product) => pantriesID?.includes(product.$id),
  );

  if (loading) {
    return (
      <div className="mx-auto py-6">
        <h2 className="profile">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="profile relative">
      {userProfile && (
        <div className="profile mx-auto py-6">
          <h2>
            {userProfile ? `Welcome, ${userProfile.name}!` : "Loading..."}
          </h2>
          <div className="text-left mb-2">Your Progress Overview </div>
          <hr className="w-11/12 mb-4 border-secondary-700" />
          <div className="flex flex-wrap justify-around py-auto gap-6 md:gap-3 sm:w-full ">
            <div className="border border-gray-200 p-6 rounded-lg flex flex-col w-1/2">
              <RadarChart />
              <p className="text-gray-500">
                * scores out of 10, the higher the better
              </p>
            </div>
            <div className="flex flex-col gap-4">
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
          </div>
          <div className="mt-10">
            Your Journey
            <hr className="w-11/12 mt-2 border-secondary-700" />
            <div className="flex my-20 py-auto gap-6 flex-wrap justify-around">
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
          </div>
          <div>
            Your Pantry
            <hr className="my-2 mb-3 w-11/12 border-secondary-700" />
            <div className="flex flex-wrap gap-3 justify-around">
              {updatedPantries &&
                updatedPantries.map((product, i) => (
                  <span key={i}>
                    <Card.Product
                      key={product.Name}
                      tag={<Button.Tag tag={product.Tag} />}
                      img={{
                        src: "/assets/product-demo.png",
                        alt: `${product.Name}`,
                      }}
                      provider={product.Company}
                      title={product.Name}
                      environment={product.Impact}
                      quality={product.Quality}
                    />
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
