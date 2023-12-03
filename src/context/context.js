"use client";
import { createContext, useState } from "react";
import { ProductDetails } from "@/constants";

export const LoginContext = createContext({
  profileStatus: "",
  setProfileStatus: (status) => {
    console.log("in context status", status);
  },
});

export const LoginProvider = ({ children }) => {
  const [profileStatus, setProfileStatus] = useState("");

  return (
    <LoginContext.Provider value={{ profileStatus, setProfileStatus }}>
      {children}
    </LoginContext.Provider>
  );
};

export const CategoryStatusContext = createContext({
  categoryStatus: { category: "", status: "" },
  setCategoryStatus: (status) => {
    console.log("in context status", status);
  },
});

export const CategoryStatusProvider = ({ children }) => {
  const [categoryStatus, setCategoryStatus] = useState({});

  return (
    <CategoryStatusContext.Provider
      value={{ categoryStatus, setCategoryStatus }}
    >
      {children}
    </CategoryStatusContext.Provider>
  );
};

export const ActionButtonContext = createContext({
  subCategoryStatus: { name: "" },
  setSubCategoryStatus: (status) => {
    console.log("in context status", status);
  },
});

export const SubCategoryStatusProvider = ({ children }) => {
  const [subCategoryStatus, setSubCategoryStatus] = useState("");

  return (
    <ActionButtonContext.Provider
      value={{ subCategoryStatus, setSubCategoryStatus }}
    >
      {children}
    </ActionButtonContext.Provider>
  );
};

export const PantryContext = createContext({
  pantryProducts: [{ key: { key: "", product: [] }, value: ProductDetails }],
  setPantryProducts: (product) => {
    console.log("in context status", product);
  },
});

export const PantryProductProvider = ({ children }) => {
  const [pantryProducts, setPantryProducts] = useState([]);

  return (
    <PantryContext.Provider value={{ pantryProducts, setPantryProducts }}>
      {children}
    </PantryContext.Provider>
  );
};
