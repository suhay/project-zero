"use client";
import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { PantryProductDocument, STATUS } from "@/constants";
import PageModal from "@/src/components/Journey/PageModal";
import { Button } from "@/src/components/lib/Button";
import {
  ActionButtonContext,
  CategoryStatusContext,
} from "@/src/context/context";
import { Card } from "~/Card";
import { Models } from "appwrite";
import { indexProductType } from "@/src/database/productData";

const SubCategory = ({ params }: { params: { subCategorySlug: string } }) => {
  const router = useRouter();
  const { subCategorySlug } = params;

  const [productType, setProductType] = useState<
    Models.Document[] | undefined
  >();
  const { categoryStatus } = useContext(CategoryStatusContext);
  const { setSubCategoryStatus } = useContext(ActionButtonContext);

  const decodeURL = decodeURIComponent(subCategorySlug).includes(" ")
    ? decodeURIComponent(subCategorySlug)
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : decodeURIComponent(subCategorySlug);

  //retrieve indexed product_type query data ("shampoo", toothpaste")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await indexProductType(decodeURL);
        setProductType(result);
        //  console.log("result", result);
        result;
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchData();
  }, [decodeURL]);

  let matchingSubCategory: PantryProductDocument | undefined;

  if (productType && productType.length > 0) {
    matchingSubCategory = {
      key: productType[0].Type,
      value: productType,
      status: "",
    };
  }

  const handleRemoveSubItem = () => {
    //change good's icon and status
    setSubCategoryStatus({
      name: decodeURL,
      status: STATUS.NONE,
    });
    router.back();
  };

  return (
    <section className="profile my-20">
      <div className="flex flex-wrap m-auto items-center profile sm:mb-3">
        <Button.Back />
        <h2 className="ml-6 my-auto">{decodeURL}</h2>
        <h3 className="ml-6 my-auto">Status: {categoryStatus?.status}</h3>
        <Button.Action
          tag="I don't need this product"
          onClick={handleRemoveSubItem}
        />
      </div>
      <hr className="profile" />
      <div className="flex flex-wrap gap-10 my-10 profile">
        {productType?.map((product: Models.Document, i) => (
          <div className="flex" key={i}>
            <Card.Product
              key={i}
              tag={<Button.Tag tag={product.Tag} />}
              img={{
                src: "/assets/product-demo.png",
                alt: `${product.Name}`,
              }}
              provider={product.Company}
              title={product.Name}
              environment={product.Impact}
              quality={product.Quality}
              modal={
                <PageModal
                  product={product}
                  subCategory={matchingSubCategory}
                />
              }
            />
          </div>
        ))}
      </div>
      <div></div>
    </section>
  );
};
export default SubCategory;
