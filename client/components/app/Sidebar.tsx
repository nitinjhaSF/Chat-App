import React from "react";

//next router
import { useRouter } from "next/router";

//next link
import Link from "next/link";

//components
import UserInfoBar from "./UserInfoBar";

//lib
import { DEFAULT_CHANNEL_ID } from "@/lib/constants";

import UserImage from "./UserImage";

const mostRecentChat = [
  {
    id: DEFAULT_CHANNEL_ID,
    name: "Default Chat",
  },
];

function UserSidebar() {
  const router = useRouter();
  const channelId = router.query.channelId as string;

  return (
    <section className="bg-slate-50 basis-60 dark:bg-gray-700 dark:text-white flex flex-col justify-between">
      <div className="flex-1 space-y-4 px-2 py-4 overflow-y-auto">
        <div className="space-y-3">
          <h1 className="text-sm">Chats</h1>

          <section className="space-y-3">
            {mostRecentChat?.map((chat, i) => (
              <NavOptions
                href={`/chat/${chat.id}`}
                key={i}
                isActive={chat.id == channelId}
              >
                <UserImage
                  // imageUrl={chat.imageUrl}
                  name={chat.name}
                  isOnline
                  isNameFallback
                />

                <p className="text-[15px]">{chat.name}</p>
              </NavOptions>
            ))}
          </section>
        </div>
      </div>

      <UserInfoBar />
    </section>
  );
}

export default UserSidebar;

interface INavOptionsProps {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
}

const NavOptions = (props: INavOptionsProps) => (
  <Link
    href={props.href}
    className={`flex gap-3 items-center cursor-pointer rounded-lg py-1 px-3 ${
      props.isActive
        ? "bg-blue-500 text-white"
        : "hover:text-white hover:bg-blue-400"
    }`}
  >
    {props.children}
  </Link>
);
