"use client";
import { useContext, useEffect } from "react";
import { ShoppingBag } from "react-feather";
// import { PantryContext } from "@/src/context/context";
import { CATEGORY_STATUS, STATUS } from "@/constants";
import { CategoryStatusContext } from "@/src/context/context";
import Products from "@/src/components/Journey/Products";
import { Button } from "@/src/components/lib/Button";
import { indexCategory } from "@/src/database/productData";

const Category = ({ params }: { params: { categorySlug: string } }) => {
  const { categorySlug } = params;
  const { categoryStatus } = useContext(CategoryStatusContext);
  // const { subCategoryStatus } = useContext(ActionButtonContext);

  const categoryName = decodeURIComponent(categorySlug).includes(" ")
    ? decodeURIComponent(categorySlug)
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : decodeURIComponent(categorySlug);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("categoryName", categoryName);
        const result = await indexCategory(["Laundry"]);
        // setProductType(result);
        console.log("result", result);
        result;
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchData();
  }, [categoryName]);

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

  return (
    <div className="profile">
      <section className="flex m-10 gap-4 text-green-800">
        <Button.Back />
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
        <div className="flex flex-wrap gap-2">
          <Products displayProductCard={false} category={categoryName} />
        </div>
      </section>
      <section className="profile">
        <h3>Your Interest Selections</h3>
        {/* TODO: products are added from the left additionally on top of current sub selections*/}
        <hr className="my-2 mb-3 w-11/12 border-secondary-700" />
        <Products displayProductCard={true} category={categoryName} />
      </section>
    </div>
  );
};

export default Category;
