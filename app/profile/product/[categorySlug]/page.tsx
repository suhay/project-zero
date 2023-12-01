"use client";
import { CATEGORY_STATUS, GOODS, ProductDetails } from "@/constants";
import { useRouter } from "next/navigation";
import { Card } from "~/Card";
import { useContext, useEffect, useState } from "react";
// import JourneyStatus from "@/src/components/Journey/JourneyStatus";
import { Plus, ShoppingBag } from "react-feather";
import { Button } from "@/src/components/lib/Button";
import { CategoryStatusContext } from "@/src/context/context";

const Category = ({ params }: { params: { categorySlug: string } }) => {
  const { categorySlug } = params;
  const router = useRouter();
  const [, setJourneyStatus] = useState("In Progress");
  const { categoryStatus, setCategoryStatus } = useContext(
    CategoryStatusContext,
  );

  const productDetails = (item: {
    key: string;
    product: ProductDetails[];
    status?: string;
  }) => {
    // console.log("item", item);
    // const checkCompleteStatus = () => {
    //   return item.status === "In Progress";
    // };
    // const checkActiveStatus = () => {
    //   return item.status === "In Progress";
    // };
    // const isComplete = item.product.every(checkCompleteStatus);
    // const isActive = item.product.some(checkActiveStatus);

    // if (isComplete) {
    //   item.status = "Hit all the basics";
    //   setCategoryStatus({
    //     category: item.key,
    //     status: `Completed all ${item.key}`,
    //   });
    // } else {
    //   item.status = "Not Started";
    //   setCategoryStatus({
    //     category: item.key,
    //     status: `${item.key} not started`,
    //   });
    // }
    // if (isActive) {
    //   item.status = "Making progress";
    //   setCategoryStatus({
    //     category: item.key,
    //     status: `Actively improving ${item.key} `,
    //   });
    // }
    console.log("in Category", item);
    setCategoryStatus({ category: item.key, status: "In progress" });
    router.push(
      `/profile/product/${categorySlug}/${encodeURIComponent(
        item.key.toLowerCase(),
      )}`,
    );
  };
  // console.log(categoryStatus);

  useEffect(() => {
    CATEGORY_STATUS.forEach((item) => {
      const normalize =
        categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
      if (item.key === normalize) {
        item.status = "In Progress";
        setJourneyStatus("In Progress");
        //TODO: change profile/category css to change based on status change
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
    (good) => good.key.toLowerCase() === decodeURIComponent(categorySlug),
  ).map((good) => good.value.map((v) => v.product[0]));

  const categoryName =
    decodeURIComponent(categorySlug).charAt(0).toUpperCase() +
    decodeURIComponent(categorySlug).slice(1);

  return (
    <div className="profile">
      <section className="border flex m-10 gap-4 text-green-800">
        <p className="h-32 w-32 rounded-full bg-secondary-600 text-green-700 flex items-center my-auto">
          <ShoppingBag className="mx-auto h-8 w-8" />
        </p>
        <div className="flex-col ml-6">
          <p className="mt-10 ">Status: {categoryStatus.status}</p>
          <h2>{categoryName}</h2>
        </div>
      </section>
      <section className="profile my-12">
        <h3>Improve Products</h3>
        <hr className="my-2" />
        <div className="border flex gap-2">{updateGoods}</div>
      </section>
      <section className="profile">
        <h3>Your Interest Selections</h3>
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
