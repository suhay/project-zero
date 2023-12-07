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
import { dbData } from "@/src/database/productData";

const SubCategory = ({ params }: { params: { subCategorySlug: string } }) => {
  const router = useRouter();
  const { subCategorySlug } = params;
  const decodeURL = decodeURIComponent(subCategorySlug);
  const [documents, setDocuments] = useState<Models.Document[] | undefined>();
  const { categoryStatus } = useContext(CategoryStatusContext);
  const { setSubCategoryStatus } = useContext(ActionButtonContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dbData();
        setDocuments(data);
      } catch (error) {
        console.log("DB Fetch Error", error);
      }
    };
    fetchData();
  }, [router]);

  let matchingSubCategory: PantryProductDocument | undefined;
  const updateData = documents?.filter(
    (good) => good.Type.toLowerCase() === decodeURL.toLowerCase(),
  );

  if (updateData && updateData.length > 0) {
    matchingSubCategory = {
      key: updateData[0].Type,
      value: updateData,
      status: "",
    };
  }

  console.log("in subpage updateData", updateData);

  const handleRemoveSubItem = () => {
    console.log("decodeURL", decodeURL);
    //change good's icon and status
    //TODO: sync/update categorySlug page status
    setSubCategoryStatus({
      name: decodeURL,
      status: STATUS.NONE,
    });
    router.back();
  };

  return (
    <section className="profile my-20">
      <div className="flex m-auto items-center profile">
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
        {updateData?.map((product: Models.Document, i) => (
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
