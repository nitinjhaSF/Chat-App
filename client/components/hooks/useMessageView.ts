import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { ApiRoutes, DEFAULT_CHANNEL_ID } from "@/lib/constants";
import { useAPIFetcher } from "@/lib/hooks";
import { MessageVariant, MessageDateGroup } from "@/types";
import { useSocketContext } from "../contexts";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../recoil";

function useMessageView() {
  const router = useRouter();
  const channelId = router.query.channelId as string;
  const { data: chatMessages } = useAPIFetcher<MessageVariant[]>(
    ApiRoutes.GET_ALL_MESSAGE_OF_CHANNEL(channelId)
  );

  const user = useRecoilValue(userDataAtom);

  const [allMessages, setAllMessages] = useState<MessageVariant[]>([]);

  //socket
  const socket = useSocketContext();

  useEffect(() => {
    if (chatMessages) setAllMessages(chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    socket?.on("connect", () => {
      socket.emit("subscribe-to-channel", [DEFAULT_CHANNEL_ID]);
    });
    socket?.on("userNotif", (notification) => {
      console.log("notification", notification);

      const updatedMessageNode = {
        ...notification,
        channelId: DEFAULT_CHANNEL_ID,
        channelType: "0",
        id: notification.messageId || window.crypto.randomUUID(),
        createdOn: Date.now(),
      };

      if (notification.subject.split("| ")?.at(1) !== user?.email)
        setAllMessages((messages) => [...messages, updatedMessageNode]);
    });

    return () => {
      socket?.off("userNotif");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const sortedMessagesWithDate = useMemo<MessageDateGroup[]>(() => {
    const messagesWithData = allMessages.reduce<MessageDateGroup[]>(
      (msgWithDate, messageNode) => {
        const lastNode = msgWithDate.at(-1);

        if (
          lastNode?.date.toDateString() ===
          new Date(messageNode.createdOn).toDateString()
        ) {
          lastNode.messages.push(messageNode);
        } else
          msgWithDate.push({
            date: new Date(messageNode.createdOn),
            messages: [messageNode],
          });

        return msgWithDate;
      },
      []
    );

    return messagesWithData;
  }, [allMessages]);

  return { sortedMessagesWithDate, setAllMessages };
}

export default useMessageView;
