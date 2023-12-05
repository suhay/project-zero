import { account } from "./appwrite";
import { paths } from "./env";

export const verifyEmail = async () => {
  try {
    await account.createVerification(paths.VERIFY_EMAIL);
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

export const googleAuth = async () => {
  try {
    account.createOAuth2Session(
      "google",
      paths.OAUTH_SUCCESS,
      paths.OAUTH_FAILURE,
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};
