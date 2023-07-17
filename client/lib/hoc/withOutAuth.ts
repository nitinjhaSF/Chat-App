import type { GetServerSideProps } from "next";
import { DEFAULT_CHANNEL_ID } from "../constants";

const withOutAuth =
  (callback?: GetServerSideProps): GetServerSideProps =>
  async (ctx) => {
    if (ctx.req.cookies.token_details) {
      return {
        redirect: {
          destination: `/chat/${DEFAULT_CHANNEL_ID}`,
          permanent: false,
        },
      };
    }

    if (callback) return callback(ctx);

    return {
      props: {},
    };
  };

export default withOutAuth;
