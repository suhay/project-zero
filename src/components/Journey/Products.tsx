import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { sub } from "@/src/components/Journey/PageModal";
import { Card } from "@/src/components/lib/Card";
import { Button } from "@/src/components/lib/Button";
import { Plus, Zap } from "react-feather";
import { ActionButtonContext } from "@/src/context/context";
import { Models } from "appwrite";
import { indexCategory } from "@/src/database/productData";
import { STATUS } from "@/constants";

const Products = ({
  displayProductCard,
  category,
}: {
  displayProductCard: boolean;
  category: string;
}) => {
  const router = useRouter();

  const [documents, setDocuments] = useState<Models.Document[] | undefined>();
  const { subCategoryStatus } = useContext(ActionButtonContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await indexCategory(category);
        setDocuments(result);
        result;
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchData();
  }, [category]);

  const onProductDetails = (productType: string) => {
    router.push(
      `/profile/product/${category.toLowerCase()}/${encodeURIComponent(
        productType?.toLowerCase(),
      )}`,
    );
  };

  const productDetails = documents?.map((product, i) => (
    <div className="w-4/5" key={i}>
      <Card.Product
        key={product.Name}
        tag={<Button.Tag tag={product.Tag} />}
        img={{
          src: "/assets/product-demo.png",
          alt: `${product.Name}`,
        }}
        provider={product.Company}
        title={product.Name}
        environment={product.Impact}
        quality={product.Quality}
      />
    </div>
  ));

  const filteredDocuments = documents?.filter(
    (product) =>
      !(
        product.Type.toLowerCase() === sub.value.name.toLowerCase() &&
        sub.value.status === STATUS.COMPLETED
      ),
  );

  const productButtons =
    (
      filteredDocuments?.reduce(
        (
          buttonComponents: {
            buttons: JSX.Element[];
            uniqueProductNames: Set<string>;
          },
          product,
        ) => {
          const productName = product.Type.toLowerCase();

          // Check if the product name is not in the set to avoid duplicating display
          if (!buttonComponents.uniqueProductNames.has(productName)) {
            buttonComponents.uniqueProductNames.add(productName);

            const buttonComponent = (
              <button
                onClick={() => onProductDetails(product.Type)}
                className="border-green-600 rounded-[25px] py-3 px-8 border flex mr-3 mb-3 mt-3"
                key={product.$id}
              >
                <span className="my-auto">
                  {productName === subCategoryStatus?.name.toLowerCase() ? (
                    <Zap className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {productName === subCategoryStatus?.name.toLowerCase()}
                </span>
                <span className="text-sm">{product.Type}</span>
              </button>
            );

            buttonComponents.buttons.push(buttonComponent);
          }

          return buttonComponents;
        },
        { buttons: [], uniqueProductNames: new Set<string>() },
      ) as { buttons: JSX.Element[]; uniqueProductNames: Set<string> }
    )?.buttons ?? [];

  return (
    <div className="flex flex-wrap w-full">
      {filteredDocuments?.map((product, index) => (
        <div key={index}>
          {!displayProductCard && productButtons[index]}
          {displayProductCard && productDetails && productDetails[index]}
        </div>
      ))}
    </div>
  );
};
export default Products;
