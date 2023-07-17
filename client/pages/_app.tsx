import "@/styles/globals.css";

import { GlobalContextProvider, SocketProvider } from "@/components/contexts";
import { ToastAlerts } from "@/components/ui";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SocketProvider>
        <GlobalContextProvider>
          <ToastAlerts />
          <Component {...pageProps} />
        </GlobalContextProvider>
      </SocketProvider>
    </RecoilRoot>
  );
}
