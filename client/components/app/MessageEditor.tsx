import React from "react";

//heroicons
import { PlusCircleIcon } from "@heroicons/react/24/solid";

//next router
import { useRouter } from "next/router";

//recoil
import { useRecoilValue } from "recoil";

//types
import { StandardMessage } from "@/types";

import { ApiRoutes } from "@/lib/constants";
import { APIPusher } from "@/lib/services";
import { userDataAtom } from "../recoil";

interface IProps {
  onMessageSent: (messageNode: StandardMessage) => void;
}

function MessageEditor(props: IProps) {
  const { onMessageSent } = props;
  const router = useRouter();
  const channelId = router.query.channelId as string;

  const user = useRecoilValue(userDataAtom);

  const [messageValue, setMessageValue] = React.useState("");

  const messageRowLength = messageValue.split("\n").length;

  const messageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMessageValue(value);
  };

  const messageKeyDownHandler = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const event = new KeyboardEvent(e.type);
    e.target.dispatchEvent(event);

    if (e.key == "Enter" && !e.shiftKey) {
      const { value } = e.currentTarget;
      e.preventDefault();

      const messageNode = await APIPusher<StandardMessage>(
        ApiRoutes.CREATE_MESSAGE_ENDPOINT,
        {
          subject: `${user?.firstName} | ${user?.email}`,
          body: value,
          channelType: "0",
          channelId,
          toUserId: channelId,
        }
      );

      onMessageSent(messageNode.data);
      setMessageValue("");
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded text-slate-500 dark:text-slate-300 bg-gray-100 dark:bg-gray-500">
      <PlusCircleIcon className="w-6 h-6 cursor-pointer hover:text-slate-600 dark:hover:text-slate-100" />
      <textarea
        rows={messageRowLength < 6 ? messageRowLength : 6}
        value={messageValue}
        onChange={messageHandler}
        onKeyDown={messageKeyDownHandler}
        className="py-2 outline-none resize-none bg-inherit text-sm w-full"
        placeholder="Write A Message..."
      />
    </div>
  );
}

export default MessageEditor;
