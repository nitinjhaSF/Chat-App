import { ChatView } from "@/components/app";
import { DEFAULT_CHANNEL_ID } from "@/lib/constants";
import { userAuth, withUserLogin } from "@/lib/hoc";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Chat() {
  return <ChatView />;
}

export default withUserLogin(Chat);

export const getServerSideProps = userAuth(async (context) => {
  const { params } = context;
  const channelId = params?.channelId;

  if (channelId !== DEFAULT_CHANNEL_ID)
    return {
      redirect: {
        destination: `/chat/${DEFAULT_CHANNEL_ID}`,
        permanent: true,
      },
    };

  return { props: {} };
});
