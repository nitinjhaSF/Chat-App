import React, { useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

// recoil
import { userDataAtom } from "@/components/recoil";
import { tokenDetailsCookie } from "@/lib/cookie";
import { useSetRecoilState } from "recoil";
import { ApiRoutes } from "@/lib/constants";

const SocketContext = React.createContext<Socket | null>(null);

export function useSocketContext() {
  return useContext(SocketContext);
}

export const SocketProvider = (props: React.PropsWithChildren) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const setUser = useSetRecoilState(userDataAtom);

  React.useEffect(() => {
    const tokenDetails = tokenDetailsCookie.getJson;
    if (!tokenDetails) return;

    const socketIo = io(ApiRoutes.SOCKET_IO_URL, {
      path: "/socket.io",
      transports: ["polling"],
      upgrade: false,
    });

    setSocket(socketIo);

    return () => {
      socketIo.close();
    };
  }, []);

  const value = useMemo(() => socket, [socket]);

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
