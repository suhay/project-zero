"use client";
import { CATEGORY_STATUS, GOODS, ProductDetails, STATUS } from "@/constants";
import { useRouter } from "next/navigation";
import { Card } from "~/Card";
import { useContext, useEffect } from "react";
import { Plus, ShoppingBag, Zap } from "react-feather";
import { Button } from "@/src/components/lib/Button";
import {
  ActionButtonContext,
  CategoryStatusContext,
  PantryContext,
} from "@/src/context/context";

const Category = ({ params }: { params: { categorySlug: string } }) => {
  const { categorySlug } = params;
  const router = useRouter();
  const { categoryStatus } = useContext(CategoryStatusContext);
  const { subCategoryStatus } = useContext(ActionButtonContext);
  const { pantryProducts } = useContext(PantryContext);

  const onProductDetails = (item: {
    key: string;
    product: ProductDetails[];
    status?: string;
  }) => {
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
        item.status = STATUS.ACTIVE;
        //TODO: change profile/category css to change based on status change
      }
    });
  }, [categorySlug]);

  console.log("in category", subCategoryStatus.status);
  const updateGoods = GOODS.filter(
    (good) => good.key.toLowerCase() === categorySlug,
  ).map((good) =>
    good.value.map((item, index) => (
      <>
        <button
          onClick={() => {
            onProductDetails(item);
          }}
          className="border-green-600 rounded-[25px] py-3 px-8 border flex gap-1"
          key={index}
        >
          <span className="my-auto">
            {item.key.toLowerCase() === subCategoryStatus.name ? (
              <Zap className="w-4 h-4" />
            ) : subCategoryStatus.status === STATUS.COMPLETED ? (
              good.value.splice(index, 1) && null
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </span>
          <span className="text-sm">{item.key}</span>
        </button>
      </>
    )),
  );

  // console.log("update goods", updateGoods);

  //display first goods in Selection section temp
  //TODO: seems like we need to display all as product carousel?
  const displayProducts = GOODS.filter(
    (good) => good.key.toLowerCase() === decodeURIComponent(categorySlug),
  ).map((good) => good.value.map((v) => v.product[0]));

  const categoryName =
    decodeURIComponent(categorySlug).charAt(0).toUpperCase() +
    decodeURIComponent(categorySlug).slice(1);

  return (
    <div className="profile">
      <section className="flex m-10 gap-4 text-green-800">
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
        {/* add/remove from this section based on status updates */}
        <hr className="my-2 mb-3 w-11/12 border-secondary-700" />
        <div className="flex gap-2">{updateGoods}</div>
      </section>
      <section className="profile">
        <h3>Your Interest Selections</h3>
        {/* TODO: Clarify, added(interested) products are updated here and in pantry*/}
        <hr className="my-2 mb-3 w-11/12 border-secondary-700" />
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
      <section className="profile">
        <h3>Pantry</h3>
        {pantryProducts.map((product, i) => (
          <div className="flex border-green-800" key={i}>
            <li className="list-none w-[300px] border">
              <button
                onClick={() => {
                  onProductDetails(product.key);
                }}
                className="border-green-600 rounded-[25px] py-3 px-8 border flex gap-1"
                key={i}
              >
                <span className="my-auto">
                  {product.key.key.toLowerCase() === subCategoryStatus.name ? (
                    <Zap className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </span>
                <span className="text-sm">{product.key.key}</span>
              </button>
              <Card.Product
                key={product.value}
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
            </li>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Category;
