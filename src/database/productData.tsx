import { databases } from "../utils/appwrite";

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
