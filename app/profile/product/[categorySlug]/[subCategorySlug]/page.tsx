"use client";
import { useRouter } from "next/navigation";
import { GOODS, STATUS } from "@/constants";
import { Button } from "@/src/components/lib/Button";
import { Card } from "~/Card";
import PageModal from "@/src/components/Journey/PageModal";
import { Key, useContext } from "react";
import {
  ActionButtonContext,
  CategoryStatusContext,
} from "@/src/context/context";

const SubCategory = ({ params }: { params: { subCategorySlug: string } }) => {
  const router = useRouter();
  const { subCategorySlug } = params;
  const decodeURL = decodeURIComponent(subCategorySlug);
  // const subcategoryName = decodeURL.split(' ').map(word =>
  //   word.charAt(0).toUpperCase() + word.slice(1) + ' ')

  const { categoryStatus } = useContext(CategoryStatusContext);
  const { setSubCategoryStatus } = useContext(ActionButtonContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let matchingSubCategory: any;
  for (const good of GOODS) {
    for (const subCategory of good.value) {
      if (subCategory.key.toLowerCase() === decodeURL) {
        matchingSubCategory = subCategory;
        break;
      }
    }
    if (matchingSubCategory) {
      break;
    }
  }

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
        <h3 className="ml-6 my-auto">Status: {categoryStatus.status}</h3>
        <Button.Action
          tag="I don't need this product"
          onClick={handleRemoveSubItem}
        />
      </div>
      <hr className="profile" />
      <div className="border-red-400 flex gap-10 my-10 profile">
        {matchingSubCategory?.product.map(
          (
            product: {
              title: string | undefined;
              tag: string | undefined;
              provider: string | undefined;
              environment: string | number | undefined;
              quality: string | number | undefined;
            },
            idx: Key | null | undefined,
          ) => (
            <div className="flex" key={product.title}>
              <Card.Product
                key={idx}
                tag={<Button.Tag tag={product.tag} />}
                img={{
                  src: "/assets/product-demo.png",
                  alt: `product.title`,
                }}
                provider={product.provider}
                title={product.title}
                environment={product.environment}
                quality={product.quality}
                modal={
                  <PageModal
                    product={product}
                    subCategory={matchingSubCategory}
                  />
                }
              />
            </div>
          ),
        )}
      </div>
      <div></div>
    </section>
  );
};
export default SubCategory;
