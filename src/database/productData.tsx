import { useEffect, useState } from "react";
import { databases } from "../utils/appwrite";
import { Models } from "appwrite";

const ProductData = () => {
  const [documents, setDocuments] = useState<Models.Document[] | undefined>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_DATABASE_ID ?? "",
          process.env.NEXT_PUBLIC_APPWRITE_HOUSEHOLD_COLLECTION_ID ?? "",
        );

        if (response.documents && Array.isArray(response.documents)) {
          setDocuments(response.documents);
        }
      } catch (error) {
        console.log("DB Fetch Error", error);
      }
    };
    fetchProducts();
  }, []);
  return documents;
};

export default ProductData;
