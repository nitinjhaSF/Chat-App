//components
import MessageEditor from "./MessageEditor";

//recoil
import { useEffect } from "react";
import { useMessageView } from "../hooks";
import MessageCard from "./MessageCard";

function MessageView() {
  const { sortedMessagesWithDate, setAllMessages } = useMessageView();

  useEffect(() => {
    document.getElementById("scroll-to-bottom")?.scrollIntoView({
      behavior: "instant",
      block: "end",
    });
  }, [sortedMessagesWithDate]);

  return (
    <section className="h-full flex flex-col justify-between">
      <div className="overflow-y-auto pt-8 px-4 h-full">
        <section className="mt-10 space-y-7">
          {!sortedMessagesWithDate.length
            ? Array.from({ length: 2 }).map((_, i) => (
                <MessageViewShimmer key={i} />
              ))
            : sortedMessagesWithDate.map((messagesWithDate, i) => (
                <div key={i} className="space-y-5 py-3">
                  <div className="relative">
                    <div className="h-0.5 bg-gray-300 rounded dark:bg-gray-500"></div>
                    <div className="rounded-2xl px-4 py-1 absolute text-sm left-1/2 -translate-x-1/2 -translate-y-1/2 -top-1/2 shadow bg-gray-100 dark:bg-gray-500">
                      {new Date(messagesWithDate.date).toLocaleDateString(
                        "en-us",
                        {
                          month: "long",
                          year: "numeric",
                          day: "2-digit",
                        }
                      )}
                    </div>
                  </div>

                  <div className="space-y-5">
                    {messagesWithDate?.messages.map((message) => (
                      <MessageCard message={message} key={message.id} />
                    ))}
                  </div>
                </div>
              ))}
        </section>

        <div id="scroll-to-bottom"></div>
      </div>

      <div className="p-4">
        <MessageEditor
          onMessageSent={(messageNode) =>
            setAllMessages((messages) => [...messages, messageNode])
          }
        />
      </div>
    </section>
  );
}

export default MessageView;

const MessageViewShimmer = () => {
  return (
    <div className="space-y-5 py-5 animate-pulse">
      <div className="relative">
        <div className="h-0.5 bg-gray-400 bg-opacity-60 rounded dark:bg-gray-500"></div>
        <div className="rounded-2xl px-4 py-1 absolute text-sm left-1/2 -translate-x-1/2 -translate-y-1/2 -top-1/2 shadow bg-gray-100 dark:bg-gray-500 h-6 w-32"></div>
      </div>

      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, j) => (
          <div key={j} className="flex gap-4">
            <div className="bg-gray-400 bg-opacity-60 dark:bg-gray-700 rounded-full w-10 h-10"></div>
            <div className="space-y-2 relative top-2">
              <p className="h-3 w-56 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              <p className="h-3 w-48 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              <div className="flex gap-3">
                <p className="h-3 w-24 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
                <p className="h-3 w-24 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              </div>
              <div className="flex gap-3">
                <p className="h-3 w-24 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
                <p className="h-3 w-24 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              </div>

              <p className="h-3 w-44 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              <div className="flex gap-4">
                <p className="h-3 w-28 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
                <p className="h-3 w-28 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
