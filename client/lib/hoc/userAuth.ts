import { GetServerSideProps } from "next";

import { ApiRoutes } from "@/lib/constants";
import { APIPusher } from "@/lib/services";

//types
import { ITokenDetailsCookie } from "@/types";

export interface IUserAuthProps {
  tokenDetails: ITokenDetailsCookie | null;
}

const userAuth =
  (
    callback?: GetServerSideProps
  ): GetServerSideProps<IUserAuthProps | object> =>
  async (ctx) => {
    const { code } = ctx.query;

    let tokenDetails: ITokenDetailsCookie | null = null;

    if (code) {
      try {
        const payload = {
          code,
          clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
        };

        console.log("payload", payload);

        tokenDetails = (
          await APIPusher<ITokenDetailsCookie>(
            ApiRoutes.GET_AUTH_TOKEN_ENDPOINT,
            payload
          )
        ).data;
      } catch (err) {
        console.log("err", err);
        return {
          redirect: {
            destination: "/signin",
            permanent: false,
          },
        };
      }
    }

    const defaultData = {
      props: {
        tokenDetails,
      },
    };

    if (callback) {
      const callbackData = await callback(ctx);

      if ("redirect" in callbackData) return callbackData;

      if ("notFound" in callbackData) return callbackData;

      return {
        ...callbackData,
        props: { ...callbackData.props, ...defaultData },
      };
    }

    return defaultData;
  };

export default userAuth;
