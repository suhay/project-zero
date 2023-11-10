import { account } from "./appwrite";

export const verifyEmail = async () => {
  try {
    await account.createVerification("http://localhost:3000/verify");
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const verifyAndNavigate = async (
  userId: string | null,
  secret: string | null,
) => {
  try {
    if (userId && secret) {
      await account.updateVerification(userId, secret);
      return "profile";
    }
  } catch (error) {
    console.log("Error during email verification", error);
  }
  return null;
};

export const getWindowUserIdSecret = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");

  return { secret, userId };
};

export const login = async (email: string, password: string) => {
  try {
    const data = await account.createEmailSession(email, password);
    return data;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

export const googleAuth = () => {
  try {
    const data = account.createOAuth2Session(
      "google",
      "http://localhost:3000",
      "http://localhost:3000/signup",
    );
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};
