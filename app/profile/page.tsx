"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { CATEGORIES } from "@/constants";
import { useUserData } from "@/src/hooks/useUserData";
// import { PantryContext } from "@/src/context/context";
// import { Card } from "@/src/components/lib/Card";
// import { Button } from "@/src/components/lib/Button";

const Profile = () => {
  const router = useRouter();
  const [, setSelectedCategory] = useState("");
  const { userProfile, loading } = useUserData({});
  // const { pantryProducts } = useContext(PantryContext);

  const chooseCategory = (category: string) => {
    setSelectedCategory(category);
    router.push(`/profile/product/${category.toLowerCase()}`);
  };

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
          {/* {pantryProducts ? (
            <section className="profile">
              <div className="flex flex-wrap justify-center">
                {pantryProducts.value.map((product, i) => (
                  <ul className="flex border-green-800" key={i}>
                    <span className="text-sm w-full">
                      <button
                        onClick={() => {
                          // onProductDetails(product.key);
                        }}
                        className="border-green-600 rounded-[25px] py-3 px-8 border flex gap-1"
                        key={i}
                      >
                        {product.key.key}
                      </button>
                      <Card.Product
                        key={product.value.title}
                        tag={<Button.Tag tag={product.value.tag} />}
                        img={{
                          src: "/assets/product-demo.png",
                          alt: `${product.value.title}`,
                        }}
                        provider={product.value.provider}
                        title={product.value.title}
                        environment={product.value.environment}
                        quality={product.value.quality}
                      />
                    </span>
                  </ul>
                ))}
              </div>
            </section>
          ) : null} */}
        </div>
      )}
    </div>
  );
};
export default Profile;
