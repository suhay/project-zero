"use client";
import { useRouter } from "next/navigation";
import { GOODS } from "@/constants";
import { Button } from "@/src/components/lib/Button";
import { Card } from "~/Card";

const SubCategory = ({ params }: { params: { subCategorySlug: string } }) => {
  const router = useRouter();
  const { subCategorySlug } = params;
  const decodeURL = decodeURIComponent(subCategorySlug);

  let matchingSubCategory;
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
    console.log("do not need this product, subcategory", decodeURL);
    router.back();
    // {GOODS.map((product, idx) => ({

    // }

    // ))
  };

  return (
    <section className="profile my-20">
      <div className="flex m-auto items-center profile">
        <Button.Back />
        <h2 className="ml-6 my-auto">{decodeURL}</h2>

        <Button.Action
          tag="I don't need this product"
          onClick={handleRemoveSubItem}
        />
      </div>
      <hr className="profile" />
      <div className="border-red-400 flex gap-10 my-10 profile">
        {matchingSubCategory?.product.map((product, idx) => (
          <div className="flex " key={product.title}>
            <Card.Product
              key={idx}
              tag={<Button.Tag tag={product.tag} />}
              img={{
                src: "/assets/laundryDetergent.jpg",
                alt: "",
              }}
              provider={product.provider}
              title={product.title}
              environment={product.environment}
              quality={product.quality}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubCategory;
