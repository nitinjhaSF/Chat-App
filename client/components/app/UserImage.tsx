import React from "react";

type IProps = {
  imageUrl?: string;
  name?: string;
  className?: string;
  isNameFallback?: true;
  isOnline: boolean;
};

function UserImage(props: IProps) {
  const {
    imageUrl,
    name,
    className = "",
    isNameFallback = false,
    isOnline,
  } = props;

  return (
    <div className="relative">
      {!imageUrl && isNameFallback ? (
        <div className="w-10 h-10 cursor-pointer transition-all duration-300 rounded-[100px] hover:rounded-2xl bg-gray-200 text-gray-700 flex items-center justify-center text-xl dark:bg-gray-600 dark:text-white uppercase">
          {name ? name[0] : "U"}
        </div>
      ) : (
        <img
          className={`rounded-full w-10 h-10 ${className}`}
          src={
            imageUrl ||
            "https://edison-tenant.b-cdn.net/Empty-states/default-profile.png"
          }
          alt={name}
        />
      )}

      <div
        className={`absolute rounded-full bottom-0 right-0 z-[1] w-3 h-3 ${
          isOnline ? "bg-green-500" : "bg-gray-400"
        }`}
      ></div>
    </div>
  );
}

export default UserImage;
