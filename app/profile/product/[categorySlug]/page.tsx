"use client";
import { CATEGORY_STATUS, GOODS, ProductDetails } from "@/constants";
import { useRouter } from "next/navigation";
import { Card } from "~/Card";
import { useEffect, useState } from "react";
import JourneyStatus from "@/src/components/Journey/JourneyStatus";

const Category = ({ params }: { params: { categorySlug: string } }) => {
  const { categorySlug } = params;
  const router = useRouter();
  const [, setJourneyStatus] = useState("In Progress");

  const productDetails = (item: { key: string; product: ProductDetails[] }) => {
    router.push(
      `/profile/product/${categorySlug}/${encodeURIComponent(
        item.key.toLowerCase(),
      )}`,
    );
  };

  useEffect(() => {
    CATEGORY_STATUS.forEach((item) => {
      const normalize =
        categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
      if (item.key === normalize) {
        item.status = "In Progress";
        setJourneyStatus("In Progress");
      }
    });
  }, [categorySlug]);

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

  return (
    <div className="profile">
      <JourneyStatus category={categorySlug} />
      <section className="profile my-12">
        Improve Products
        <hr />
        <div>{updateGoods}</div>
      </section>
      <section className="profile">
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
      </section>
    </div>
  );
};

export default Category;
