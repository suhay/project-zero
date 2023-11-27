import { GOODS } from "@/constants";
import { Card } from "~/Card";
// import { Layout } from "@/src/components/lib/Layout";

const SubCategory = ({ params }: { params: { subCategorySlug: string } }) => {
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

  return (
    <div>
      <h2>{decodeURL}</h2>
      {matchingSubCategory?.product.map((product, idx) => (
        <div className="border" key={product.title}>
          <Card.Product
            key={idx}
            tag={product.tag}
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
  );
};

export default SubCategory;
