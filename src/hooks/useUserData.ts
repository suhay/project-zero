import { useEffect, useState } from "react";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { UserAtom } from "@/src/states/user";
import { account } from "@/src/utils/appwrite";

export function useUserData({
  successPath,
  failPath = "/login",
  cacheOnly,
}: {
  successPath?: string;
  failPath?: string | null;
  cacheOnly?: boolean;
}) {
  const router = useRouter();
  const [userProfile, setUserProfile] = useAtom(UserAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchUser = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const userData = await account.get();
      setUserProfile(userData);
      if (successPath) {
        router.push(successPath);
      }
    } catch (error: any) {
      setError(error);
      if (error && failPath) {
        router.push(failPath);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cacheOnly) {
      return;
    }
    if (userProfile != null) {
      if (successPath) {
        router.push(successPath);
      }
      return;
    }
    fetchUser();
  }, []);

  return {
    userProfile,
    loading,
    error,
  };
}
