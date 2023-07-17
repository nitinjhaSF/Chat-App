import { userAuth, withUserLogin } from "@/lib/hoc";

function Chat() {
  return null;
}

export default withUserLogin(Chat);

export const getServerSideProps = userAuth();
