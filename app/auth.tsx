import { account } from "./appwrite";

export async function verifyEmail() {
  console.log("in auth.tsx  verify email");
  const data = await account.createVerification("http://localhost:3000/verify");
  console.log("auth.tsx  verifyEmail data", data);
  return data;
}

export async function googleAuth() {
  const data = account.createOAuth2Session(
    "google",
    "http://localhost:3000",
    "http://localhost:3000/signup"
  );
  console.log("google log in");
  return data;
}
