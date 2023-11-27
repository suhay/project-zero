"use client";
import { CATEGORY_STATUS, GOODS, ProductDetails } from "@/constants";
import { useRouter } from "next/navigation";
import { Card } from "~/Card";
import { useEffect, useState } from "react";
import JourneyStatus from "@/src/components/Journey/JourneyStatus";
import { Plus } from "react-feather";
import { Button } from "@/src/components/lib/Button";

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
      <>
        <button
          onClick={() => {
            productDetails(item);
          }}
          className="border-green-800 rounded-[25px] py-3 px-10 border-2 flex gap-2"
          key={index}
        >
          <span>
            <Plus />
          </span>
          {item.key}
        </button>
      </>
    )),
  );

  const displayProducts = GOODS.filter(
    (good) => good.key.toLowerCase() === categorySlug,
  ).map((good) => good.value.map((v) => v.product[0]));

  return (
    <div className="profile">
      <JourneyStatus category={categorySlug} />
      <section className="profile my-12">
        <h3>Improve Products</h3>
        <hr className="my-2" />
        <div className="border flex gap-2">{updateGoods}</div>
      </section>
      <section className="profile">
        <h3>Your ZeroIn Pantry</h3>
        <hr className="my-2" />
        <div className="flex">
          {updateGoods?.map((good, idx) => (
            <ul className="flex border-green-800" key={idx}>
              {good.map((p, i) => (
                <span className="mr-10" key={i}>
                  {p}
                  {displayProducts?.map((product, i) => (
                    <Card.Product
                      key={idx}
                      tag={<Button.Tag tag={product[i].tag} />}
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
