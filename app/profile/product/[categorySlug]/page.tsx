"use client";
import { useContext } from "react";
import { ShoppingBag } from "react-feather";
import { CategoryStatusContext } from "@/src/context/context";
import Products from "@/src/components/Journey/Products";
import { Button } from "@/src/components/lib/Button";

const Category = ({ params }: { params: { categorySlug: string } }) => {
  const { categorySlug } = params;
  const { categoryStatus } = useContext(CategoryStatusContext);

  const categoryName = decodeURIComponent(categorySlug).includes(" ")
    ? decodeURIComponent(categorySlug)
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : decodeURIComponent(categorySlug).charAt(0).toUpperCase() +
      decodeURIComponent(categorySlug).slice(1);

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
        <h4>Improve Products</h4>
        <hr className="my-2 mb-3 border-secondary-700" />
        <div className="flex flex-wrap gap-2">
          <Products displayProductCard={false} category={categoryName} />
        </div>
      </section>
      <section className="profile">
        <h4>Your Interest Selections</h4>
        <hr className="my-2 mb-3 border-secondary-700" />
        <Products displayProductCard={true} category={categoryName} />
      </section>
    </div>
  );
};

export default Category;
