import React from "react";

//components
import { Sidebar } from "@/components/app";

interface IProps {
  children: React.ReactNode;
}

function AppLayout(props: IProps) {
  return (
    <main className="flex h-screen overflow-hidden dark:text-white">
      <Sidebar />

      <div className="bg-slate-200 dark:bg-gray-600 flex-1 w-0 h-full">
        {React.Children.only(props.children)}
      </div>
    </main>
  );
}

export default AppLayout;
