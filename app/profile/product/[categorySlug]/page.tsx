"use client";
import { GOODS, ProductDetails } from "@/constants";
// import Category from "@/src/components/Category";
// import Journey from "@/src/components/Journey";
// import Pantry from "@/src/components/Pantry";
import { useRouter } from "next/navigation";
import { Card } from "~/Card";

const Category = ({ params }: { params: { categorySlug: string } }) => {
  const { categorySlug } = params;
  const router = useRouter();

  const productDetails = (item: { key: string; product: ProductDetails[] }) => {
    console.log("item", item);

    router.push(
      `/profile/product/${categorySlug}/${encodeURIComponent(
        item.key.toLowerCase(),
      )}`,
    );
  };

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

  // console.log("updateGoods product", updateGoods);
  const displayProducts = GOODS.filter(
    (good) => good.key.toLowerCase() === categorySlug,
  ).map((good) => good.value.map((v) => v.product[0]));

  console.log("updateGoods", updateGoods);
  console.log("displayProducts", displayProducts);

  return (
    <>
      <div className="text-left flex m-10 gap-4">
        <p className="icon">ICON</p>
        <div className="flex-col">
          <p className="">Status: {"journeyStatus"}</p>
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
