"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

import { STATUS } from "@/constants";

type CategoryStatus = {
  category: string;
  status: string;
};

type CategoryContextType = {
  categoryStatus: CategoryStatus | null;
  setCategoryStatus: Dispatch<SetStateAction<CategoryStatus | null>>;
};

export const CategoryStatusContext = createContext<CategoryContextType>({
  categoryStatus: null,
  setCategoryStatus: () => {
    console.log("in context status", status);
  },
});

export const CategoryStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categoryStatus, setCategoryStatus] = useState<CategoryStatus | null>(
    null,
  );

  return (
    <CategoryStatusContext.Provider
      value={{ categoryStatus, setCategoryStatus }}
    >
      {children}
    </CategoryStatusContext.Provider>
  );
};

type SubCategoryStatus = {
  name: string;
  status: STATUS;
};

type SubCategoryContextType = {
  subCategoryStatus: SubCategoryStatus | null;
  setSubCategoryStatus: Dispatch<SetStateAction<SubCategoryStatus | null>>;
};

export const ActionButtonContext = createContext<SubCategoryContextType>({
  subCategoryStatus: { name: "", status: STATUS.NONE },
  setSubCategoryStatus: (status) => {
    console.log("in context status", status);
  },
});

export const SubCategoryStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [subCategoryStatus, setSubCategoryStatus] =
    useState<SubCategoryStatus | null>(null);

  return (
    <ActionButtonContext.Provider
      value={{ subCategoryStatus, setSubCategoryStatus }}
    >
      {children}
    </ActionButtonContext.Provider>
  );
};

type PantryProduct = {
  key: {
    key: string;
    product: [];
  };
  value: number;
};

type PantryContextType = {
  pantryProducts: PantryProduct[];
  setPantryProducts: Dispatch<SetStateAction<PantryProduct[]>>;
};

export const PantryContext = createContext<PantryContextType>({
  pantryProducts: [],
  setPantryProducts: (product) => {
    console.log("in context status", product);
  },
});

export const PantryProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pantryProducts, setPantryProducts] = useState<PantryProduct[]>([]);

  return (
    <PantryContext.Provider value={{ pantryProducts, setPantryProducts }}>
      {children}
    </PantryContext.Provider>
  );
};
