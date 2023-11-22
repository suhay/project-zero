import { CATEGORIES, CATEGORY_STATUS, GOODS } from "@/constants";
import { Layout } from "../lib/Layout";
import { useState } from "react";

const Journey = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const chooseCategory = (category: string) => {
    setSelectedCategory(category);

    const updatedStatus = CATEGORY_STATUS.map((item) => {
      const key = Object.keys(item)[0] as keyof typeof item;
      return { [key]: key === category ? "In Progress" : item[key] };
    });
    console.log("updatedStatus", updatedStatus);
  };

  return (
    <div className="">
      <h3>Your ZeroIn Journey</h3>
      <Layout.Grid>
        {CATEGORIES.map((c) => (
          <button
            className="CategoryAndGoodList"
            onClick={() => chooseCategory(c.label)}
            key={c.key}
          >
            {c.label}
          </button>
        ))}
      </Layout.Grid>

      {selectedCategory && (
        <div className="">
          <h4>Goods for {selectedCategory}</h4>
          <Layout.Grid>
            {GOODS.filter(
              (g: { key: string }) => g.key === selectedCategory,
            ).map((good: { value: string[] }) =>
              good.value.map((item, index) => (
                <button className="CategoryAndGoodList" key={index}>
                  {item}
                </button>
              )),
            )}
          </Layout.Grid>
        </div>
      )}
    </div>
  );
};

export default Journey;
