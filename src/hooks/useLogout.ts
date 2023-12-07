import React from "react";

import { useResetAtom } from "jotai/utils";
import { useRouter } from "next/navigation";

import { UserAtom } from "../states/user";
import { account } from "../utils/appwrite";

export function useLogout() {
  const resetUser = useResetAtom(UserAtom);
  const router = useRouter();

  const logout = React.useCallback(async () => {
    await account.deleteSession("current");
    resetUser();
    router.push("/");
  }, [resetUser, router]);

  return {
    logout,
  };
}
