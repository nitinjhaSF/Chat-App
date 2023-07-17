export const AUTH_URL = "http://localhost:3002";
export const FACADE_URL = "http://localhost:3007";
export const SOCKET_IO_URL = "http://localhost:3005";

const mappedBashUrl = {
  auth: AUTH_URL,
  facade: FACADE_URL,
  socket: SOCKET_IO_URL,
} as const;

const getMappedBashUrl = (key: keyof typeof mappedBashUrl) => {
  return mappedBashUrl[key];
};

//internal user auth routes
export const USER_LOGIN_ENDPOINT = getMappedBashUrl("auth") + "/auth/login";

//google auth routes
export const GOOGLE_LOGIN_ENDPOINT = getMappedBashUrl("auth") + `/auth/google`;
export const GOOGLE_AUTH_REDIRECTION_ENDPOINT =
  getMappedBashUrl("auth") + `/auth/google-auth-redirect`;

//token related routes
export const GET_AUTH_TOKEN_ENDPOINT = getMappedBashUrl("auth") + `/auth/token`;
export const REFRESH_AUTH_TOKEN_ENDPOINT =
  getMappedBashUrl("auth") + `/auth/token-refresh`;

//message related routes
export const GET_ALL_MESSAGE_OF_CHANNEL = (channelId: string) =>
  getMappedBashUrl("facade") + `/messages?channelId=${channelId}`;
export const CREATE_MESSAGE_ENDPOINT = getMappedBashUrl("facade") + "/messages";
