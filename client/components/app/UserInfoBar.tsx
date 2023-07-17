//components
import UserInfoModel from "./UserInfoModel";

//headless ui
import { Popover } from "@headlessui/react";

//recoil
import { userDataAtom } from "@/components/recoil";
import { useRecoilValue } from "recoil";

//helper
import UserImage from "./UserImage";

function UserInfoBar() {
  const currentUser = useRecoilValue(userDataAtom);

  return (
    <Popover as="div" className="relative">
      {() => (
        <section className="flex gap-2 dark:bg-[#2f353b] relative">
          <Popover.Button className="flex gap-2 items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-800 px-2 py-3 outline-none">
            <UserImage
              name={currentUser?.firstName}
              isOnline
              className="w-8 h-8"
            />

            <h3 className="font-medium">
              {currentUser?.firstName || currentUser?.username}
            </h3>
          </Popover.Button>

          <div className="px-2 py-3"></div>

          <Popover.Panel className="absolute z-[1] bottom-20 left-4">
            <UserInfoModel />
          </Popover.Panel>
        </section>
      )}
    </Popover>
  );
}

export default UserInfoBar;
