import { Query, QueryTypesList } from "appwrite";
import { databases } from "../utils/appwrite";
import { v4 as uuidv4 } from "uuid";

export const dbData = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_DATABASE_ID ?? "",
      process.env.NEXT_PUBLIC_APPWRITE_HOUSEHOLD_COLLECTION_ID ?? "",
    );

    if (response.documents && Array.isArray(response.documents)) {
      return response.documents;
    }
  } catch (error) {
    console.log("DB Fetch Error", error);
  }
};

export const indexCategory = async (category: QueryTypesList) => {
  try {
    const categoryData = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_DATABASE_ID ?? "",
      process.env.NEXT_PUBLIC_APPWRITE_HOUSEHOLD_COLLECTION_ID ?? "",
      // [Query.search("Category", category)],
      //tried to index Category, but ["Kitchen"] is not string
      [Query.equal("Category", category)],
    );
    return categoryData.documents;
  } catch (error) {
    console.error("Error fetching category data:", error);
  }
};

export const indexProductType = async (
  productType: string | number | boolean | QueryTypesList,
) => {
  try {
    console.log("productType", productType);
    const categoryData = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_DATABASE_ID ?? "",
      process.env.NEXT_PUBLIC_APPWRITE_HOUSEHOLD_COLLECTION_ID ?? "",
      [Query.equal("Type", productType)],
    );
    return categoryData.documents;
  } catch (error) {
    console.error("Error fetching category data:", error);
  }
};

export const saveUserToDB = async (user: any) => {
  try {
    // const pantryList = [];
    const pantry = await databases.createDocument(
      "users", //"[DATABASE_ID]",
      "user", //"[COLLECTION_ID]",
      uuidv4(),
      { user },
    );
    console.log(pantry);
  } catch (error) {
    console.log("DB Fetch Error", error);
  }
};

//build relationship between current user and added pantry data
export const savePantryToDB = async (pantryItems: string[]) => {
  try {
    // const pantryList = [];
    const pantry = await databases.createDocument(
      "users", //"[DATABASE_ID]",
      "user", //"[COLLECTION_ID]",
      "pantry", //"[DOCUMENT_ID]",
      { pantryItems },
    );
    console.log(pantry);
  } catch (error) {
    console.log("DB Fetch Error", error);
  }
};
