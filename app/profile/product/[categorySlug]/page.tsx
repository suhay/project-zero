"use client";
import { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Plus, ShoppingBag, Zap } from "react-feather";
import { sub } from "@/src/components/Journey/PageModal";
// import { PantryContext } from "@/src/context/context";
import { CATEGORY_STATUS, GOODS, ProductDetails, STATUS } from "@/constants";
import { Button } from "@/src/components/lib/Button";
import {
  ActionButtonContext,
  CategoryStatusContext,
} from "@/src/context/context";
import { Card } from "~/Card";
import ProductData from "@/src/database/productData";

const Category = ({ params }: { params: { categorySlug: string } }) => {
  const { categorySlug } = params;
  const router = useRouter();
  const dataFromDB = ProductData();
  console.log("ProducdataFromDBtData", dataFromDB);

  const { categoryStatus } = useContext(CategoryStatusContext);
  const { subCategoryStatus } = useContext(ActionButtonContext);

  const categoryName = decodeURIComponent(categorySlug).includes(" ")
    ? decodeURIComponent(categorySlug)
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : decodeURIComponent(categorySlug);

  useEffect(() => {
    CATEGORY_STATUS.forEach((item) => {
      const normalize =
        categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
      if (item.key === normalize) {
        item.status = STATUS.ACTIVE;
        //TODO: change profile/category css to change based on status change
      }
    });
  }, [categorySlug]);

  const updateGoods = GOODS.filter(
    (good) => good.key.toLowerCase() === categoryName.toLowerCase(),
  ).map((good) =>
    good.value.map((item, index) => {
      return (
        <>
          <button
            onClick={() => {
              onProductDetails(item);
            }}
            className="border-green-600 rounded-[25px] py-3 px-8 border flex"
            key={index}
          >
            <span className="my-auto">
              {item.key.toLowerCase() ===
              subCategoryStatus?.name.toLocaleLowerCase() ? (
                <Zap className="w-4 h-4" />
              ) : //delete from the section when current good's status is completed
              item.key === sub.value && item.status === STATUS.COMPLETED ? (
                good.value.splice(index, 1) && null
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </span>
            <span className="text-sm">{item.key}</span>
          </button>
        </>
      );
    }),
  );

  //TODO: tried to pass data to SubCategory page as part of params for syncing data
  //not sure if it's ideal
  const onProductDetails = (item: {
    key: string;
    product: ProductDetails[];
    status?: string;
  }) => {
    router.push(
      `/profile/product/${categorySlug}/${encodeURIComponent(
        item.key.toLowerCase(),
        //?data=${encodeURIComponent(JSON.stringify(updateGoods)}
      )}`,
    );
  };

  //display first goods in Selection section temp
  //TODO: seems like we need to display all as product carousel?
  const displayProducts = GOODS.filter(
    (good) => good.key.toLowerCase() === categoryName.toLowerCase(),
  ).map((good) => good.value.map((v) => v.product[0]));

  return (
    <div className="profile">
      <section className="flex m-10 gap-4 text-green-800">
        <p className="h-32 w-32 rounded-full bg-secondary-600 text-green-700 flex items-center my-auto">
          <ShoppingBag className="mx-auto h-8 w-8" />
        </p>
        <div className="flex-col ml-6">
          <p className="mt-10 ">Status: {categoryStatus?.status}</p>
          <h2>{categoryName}</h2>
        </div>
      </section>
      <section className="profile my-12">
        <h3>Improve Products</h3>
        {/* add/remove from this section based on status updates */}
        <hr className="my-2 mb-3 w-11/12 border-secondary-700" />
        <div className="flex flex-wrap gap-2">{updateGoods}</div>
      </section>
      <section className="profile">
        <h3>Your Interest Selections</h3>
        {/* TODO: products are added from the left additionally on top of current sub selections*/}
        <hr className="my-2 mb-3 w-11/12 border-secondary-700" />
        <div className="flex w-11/12">
          {updateGoods?.map((good, idx) => (
            <ul className="flex flex-wrap border-green-800 gap-2" key={idx}>
              {good.map((p, i) => (
                <span key={i}>
                  {p}
                  {displayProducts?.map((product, i) => (
                    <Card.Product
                      key={idx}
                      tag={<Button.Tag tag={product[i].tag} />}
                      img={{
                        src: "/assets/product-demo.png",
                        alt: `${product[i].title}`,
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
