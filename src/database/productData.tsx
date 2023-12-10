import { ID, Permission, Query, Role } from "appwrite";
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

export const indexCategory = async (category: string) => {
  try {
    // in case the category is string []
    // const categoryQueries = categories.map((category) => {
    //   return Query.equal("Categories", category);
    // });
    // const combinedQuery = categoryQueries.join(", ");

    const categoryData = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_DATABASE_ID ?? "",
      process.env.NEXT_PUBLIC_APPWRITE_HOUSEHOLD_COLLECTION_ID ?? "",
      // [combinedQuery],
      [Query.equal("Categories", category)],
    );
    return categoryData.documents;
  } catch (error) {
    console.error("Error fetching category data:", error);
  }
};

export const indexProductType = async (
  productType: string | number | boolean,
) => {
  try {
    // console.log("productType", productType);
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

export const saveUserToDB = async (user: string) => {
  try {
    const userResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID ?? "",
      [Query.equal("UserId", user)],
    );
    const currUserDocument = userResponse.documents;

    //create new user document if there the user doesn't exist
    if (currUserDocument.length <= 0) {
      console.log("user doesn't exists");
      const docResponse = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID ?? "",
        ID.unique(),
        { UserId: user },
        [
          Permission.read(Role.any()),
          Permission.update(
            Role.user(process.env.NEXT_PUBLIC_APPWRITE_USER_PERMISSION ?? ""),
          ),
        ],
      );
      console.log("docResponse", docResponse);
    } else {
      const docId = currUserDocument[0].$id;
      const updateResponse = await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID ?? "",
        docId,
        { UserId: user },
        [
          // Permission.update(Role.any()),
          // Permission.delete(Role.any()),
          Permission.update(
            Role.user(process.env.NEXT_PUBLIC_APPWRITE_USER_PERMISSION ?? ""),
          ),
        ],
      );
      console.log("updateResponse", updateResponse);
    }
  } catch (error) {
    console.log("Create User Document Error", error);
  }
};

export const savePantry = async (user: string, pantryItems: string[]) => {
  try {
    //check pantry doc exists
    const pantryResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
      process.env.NEXT_PUBLIC_APPWRITE_PANTRY_COLLECTION_ID ?? "",
      [Query.equal("userId", user)],
    );
    const pantryDocument = pantryResponse.documents;
    console.log("pantryDocument", pantryDocument);

    //check user doc exists
    const userResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID ?? "",
      [Query.equal("UserId", user)],
    );
    const userDocument = userResponse.documents;
    console.log("userDocument", userDocument);

    //create or update user<->pantry data
    if (pantryDocument.length <= 0) {
      const createPantryResponse = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
        process.env.NEXT_PUBLIC_APPWRITE_PANTRY_COLLECTION_ID ?? "",
        ID.unique(),
        { userId: user, products: pantryItems },
        [
          // Permission.update(Role.any()),
          // Permission.delete(Role.any()),
          Permission.update(
            Role.user(process.env.NEXT_PUBLIC_APPWRITE_USER_PERMISSION ?? ""),
          ),
        ],
      );
      console.log("createPantryResponse", createPantryResponse);
    } else {
      const userPantryResponse = await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID ?? "",
        userDocument[0].$id,
        { UserId: user, pantry: pantryItems } as {
          pantry: string[];
        }, //onboarding: ""
        [
          // Permission.update(Role.any()),
          // Permission.delete(Role.any()),
          Permission.update(
            Role.user(process.env.NEXT_PUBLIC_APPWRITE_USER_PERMISSION ?? ""),
          ),
        ],
      );
      console.log("userPantryResponse", userPantryResponse);
      return userPantryResponse;
    }
  } catch (error) {
    console.log("Save Pantry and Update User's Pantry Error", error);
  }
};

export const getUserPantryDB = async (user: string) => {
  try {
    const userPantryDocResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID ?? "",
      [Query.equal("UserId", user)],
    );
    //return user's document data and get pantry
    // console.log("userPantryDocResponse", userPantryDocResponse.documents);
    return userPantryDocResponse.documents;
  } catch (error) {
    console.log("Fetch Pantry Error", error);
  }
};
