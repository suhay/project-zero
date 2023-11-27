"use client";
import { CATEGORY_STATUS, GOODS, ProductDetails } from "@/constants";
import { useRouter } from "next/navigation";
import { Card } from "~/Card";
import { ShoppingBag } from "react-feather";
import { useState } from "react";

const Category = ({ params }: { params: { categorySlug: string } }) => {
  const { categorySlug } = params;
  const router = useRouter();
  const [journeyStatus, setJourneyStatus] = useState("In Progress");

  const productDetails = (item: { key: string; product: ProductDetails[] }) => {
    router.push(
      `/profile/product/${categorySlug}/${encodeURIComponent(
        item.key.toLowerCase(),
      )}`,
    );
  };

  CATEGORY_STATUS.forEach((item) => {
    if (item.key === categorySlug) {
      item.status = "In Progress";
      setJourneyStatus("In Progress");
    }
  });
  console.log("CATEGORY_STATUS", CATEGORY_STATUS);

  const updateGoods = GOODS.filter(
    (good) => good.key.toLowerCase() === categorySlug,
  ).map((good) =>
    good.value.map((item, index) => (
      <button
        onClick={() => {
          productDetails(item);
        }}
        className="CategoryAndGoodList"
        key={index}
      >
        {item.key}
      </button>
    )),
  );

  const displayProducts = GOODS.filter(
    (good) => good.key.toLowerCase() === categorySlug,
  ).map((good) => good.value.map((v) => v.product[0]));

  // console.log("updateGoods", updateGoods);
  // console.log("displayProducts", displayProducts);

  return (
    <>
      <div className="text-left flex m-10 gap-4">
        <p className="icon h-24 w-24 rounded-full bg-secondary-500 text-primary flex items-center">
          <ShoppingBag className="mx-auto h-8 w-8" />
        </p>
        <div className="flex-col">
          <p className="">Status: {journeyStatus}</p>
          <h1>{categorySlug}</h1>
        </div>
      </div>
      <div className="ml-4 my-12 text-left">
        Improve Products
        <hr />
        <div>{updateGoods}</div>
      </div>
      <div className="ml-4 text-left">
        Your ZeroIn Pantry
        <hr />
        <div className="flex">
          {updateGoods?.map((good, idx) => (
            <ul className="flex" key={idx}>
              {good.map((p, i) => (
                <span className="mr-10" key={i}>
                  {p}
                  {displayProducts?.map((product, i) => (
                    <Card.Product
                      key={idx}
                      tag={product[i].tag}
                      img={{
                        src: "/assets/laundryDetergent.jpg",
                        alt: "",
                      }}
                      provider={product[i].provider}
                      title={product[i].title}
                      environment={product[i].environment}
                      quality={product[i].quality}
                    />
                  ))}
                </span>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
