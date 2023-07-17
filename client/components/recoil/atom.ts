import { tokenDetailsCookie } from "@/lib/cookie";
import { IUser } from "@/types";
import jwtDecode from "jwt-decode";
import { atom } from "recoil";

export const userDataAtom = atom<IUser | null>({
  key: "userDataAtom",
  default: null,
  effects: [
    ({ setSelf }) => {
      setTimeout(() => {
        const tokenDetails = tokenDetailsCookie.getJson;
        if (tokenDetails) setSelf(jwtDecode(tokenDetails.accessToken));
      }, 0);
    },
  ],
});
