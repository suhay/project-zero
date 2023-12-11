import { ID, Permission, Query, Role } from "appwrite";
import { databases } from "../utils/appwrite";

export const indexCategory = async (category: string) => {
  try {
    // handle in case the category is set to string []
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

export const savePantry = async (user: string, pantryItems: string) => {
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

    //if user doesn't exist and user has no pantry documents
    if (userDocument.length <= 0 && pantryDocument.length <= 0) {
      const createPantryResponse = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
        process.env.NEXT_PUBLIC_APPWRITE_PANTRY_COLLECTION_ID ?? "",
        ID.unique(),
        { userId: user, pantries: pantryItems },
        [
          Permission.update(
            Role.user(process.env.NEXT_PUBLIC_APPWRITE_USER_PERMISSION ?? ""),
          ),
        ],
      );
      console.log("createPantryResponse", createPantryResponse);
    } else {
      //if user already exists, update only pantry data(currently saves a whole concatenated Ids)
      //TODO: improve pantry attributes saving and retrieving
      const userPantryResponse = await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
        process.env.NEXT_PUBLIC_APPWRITE_PANTRY_COLLECTION_ID ?? "",
        pantryDocument[0].$id,
        { pantries: pantryItems },
        [
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

//get current user's pantry data and render on profile pantry section
export const getUserPantryDB = async (user: string) => {
  try {
    const userPantryDocResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID ?? "",
      process.env.NEXT_PUBLIC_APPWRITE_PANTRY_COLLECTION_ID ?? "",
      [Query.equal("userId", user)],
    );
    return userPantryDocResponse.documents;
  } catch (error) {
    console.log("Fetch Pantry Error", error);
  }
};
