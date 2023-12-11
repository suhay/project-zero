import { Models } from "appwrite";
import { atomWithReset } from "jotai/utils";

export const UserAtom = atomWithReset<Models.User<Models.Preferences> | null>(
  null,
);
