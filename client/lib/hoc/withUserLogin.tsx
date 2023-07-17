import React from "react";

//layout
import { AppLayout } from "@/components/layout";
import { userDataAtom } from "@/components/recoil";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { signIn } from "../authHelper";
import { DEFAULT_CHANNEL_ID } from "../constants";
import { IUserAuthProps } from "./userAuth";

interface IOptionsConfiguration {}

function withUserLogin(
  Component: React.ComponentType<IUserAuthProps>,
  options?: IOptionsConfiguration
) {
  // eslint-disable-next-line react/display-name
  return (props: IUserAuthProps) => {
    const { tokenDetails } = props;
    const router = useRouter();
    const { channelId, code } = router.query;

    //recoil state
    const setUser = useSetRecoilState(userDataAtom);

    React.useEffect(() => {
      if (tokenDetails) {
        setUser(jwtDecode(tokenDetails.accessToken));
        signIn(tokenDetails);
      }
      if (channelId !== DEFAULT_CHANNEL_ID)
        router.replace(`/chat/${DEFAULT_CHANNEL_ID}`);
      else if (code) {
        router.replace("/chat", undefined, { shallow: true });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenDetails]);

    return (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    );
  };
}

export default withUserLogin;
