"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/constants";
import { useUserData } from "@/src/hooks/useUserData";
import { getUserPantryDB } from "@/src/database/productData";
import { pantrySignal } from "@/src/components/Journey/PageModal";
import { Card } from "@/src/components/lib/Card";
import { Button } from "@/src/components/lib/Button";

const Profile = () => {
  const router = useRouter();
  const [, setSelectedCategory] = useState("");
  const [, setPantry] = useState<string[]>([]); //use updateDocument works
  const { userProfile, loading } = useUserData({});

  const chooseCategory = (category: string) => {
    setSelectedCategory(category);
    router.push(`/profile/product/${category.toLowerCase()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserPantryDB(userProfile?.$id || ""); //ID error
        if (result) {
          const pantryIds = result.map((doc) => doc.id);
          setPantry(pantryIds);
          // console.log("getUserPantryDB", result);
        } else {
          console.error("getUserPantryDB returned undefined");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchData();
  }, [userProfile?.$id]);

  // console.log("pantrySignal.value.document", pantrySignal.value.document);

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
        <div className="mx-auto py-6">
          <h2>
            {userProfile ? `Welcome, ${userProfile.name}!` : "Loading..."}
          </h2>
          <div className="flex flex-wrap justify-center my-20 py-auto gap-6 md:gap-3 sm:w-full ">
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
          {/* when added product, pantry displays synced good - TODO persist after router render */}
          Your Pantry
          <hr className="my-2 mb-3 w-11/12 border-secondary-700" />
          <div className="flex">
            {pantrySignal &&
              pantrySignal.value.document?.map((product, i) => (
                <span className="" key={i}>
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
      )}
    </div>
  );
};
export default Profile;
