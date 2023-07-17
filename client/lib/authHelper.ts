import { ITokenDetailsCookie } from "@/types";
import { tokenDetailsCookie } from "./cookie";
import { APIPusher } from "./services";
import { ApiRoutes } from "./constants";
import cookie from "js-cookie";

export const signIn = (tokenDetail: ITokenDetailsCookie) => {
  tokenDetailsCookie.set(tokenDetail);
};

export const logout = () => {
  tokenDetailsCookie.delete();
  if (typeof window !== "undefined") window.location.href = "/signin";
};

export const refreshToken = async () => {
  const tokenDetails = tokenDetailsCookie.getJson;

  if (!tokenDetails) throw new Error("Token Missing");

  try {
    const newTokenDetails = await APIPusher<ITokenDetailsCookie>(
      ApiRoutes.REFRESH_AUTH_TOKEN_ENDPOINT,
      {
        refreshToken: tokenDetails.refreshToken,
      }
    );
    signIn(newTokenDetails.data);
    console.log("cookie", JSON.parse(cookie.get("token_details") || "{}"));
  } catch (err: any) {
    return err.response.data;
  }
};
