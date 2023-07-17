import React from "react";
import { MessageVariant } from "@/types";

interface IProps {
  message: MessageVariant;
}

function MessageCard(props: IProps) {
  const { message } = props;

  return (
    <div className={`flex gap-4`}>
      <div className="bg-blue-300 flex items-center justify-center rounded-full w-10 h-10 shrink-0 uppercase">
        {message.subject.trim().at(0)}
      </div>
      <div>
        <div className="space-x-2">
          <span>{message.subject.split(" |")[0]}</span>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(message.createdOn).toLocaleDateString("en-us", {
              month: "short",
              year: "numeric",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <p className="[overflow-wrap:anywhere]">{message.body}</p>
      </div>
    </div>
  );
}

export default MessageCard;
