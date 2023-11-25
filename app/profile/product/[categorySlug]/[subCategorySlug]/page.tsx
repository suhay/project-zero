import { GOODS } from "@/constants";
import { Layout } from "@/src/components/lib/Layout";
import Image from "next/image";

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

  console.log("updateSubGoods", matchingSubCategory);

  return (
    <div>
      <h2>{decodeURL}</h2>
      <Layout.Grid className="ml-4">
        {matchingSubCategory?.product.map((product) => (
          <div key={product.title}>
            <p>{product.tag}</p>
            <Image
              src="/assets/laundryDetergent.jpg"
              alt="sss"
              width={400}
              height={400}
            />
            <p>{product.provider}</p>
            <p>{product.title}</p>
            <p>{product.environment}</p>
            <p>{product.quality}</p>
          </div>
        ))}
      </Layout.Grid>
    </div>
  );
};

export default SubCategory;
