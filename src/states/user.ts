import { atom } from "jotai";
import { Models } from "appwrite";

export const UserAtom = atom<Models.User<Models.Preferences> | null>(null);

export const SetUserAtom = atom<
  null,
  [Models.User<Models.Preferences> | null],
  void
>(null, (_get, set, update) => {
  set(UserAtom, update);
});
