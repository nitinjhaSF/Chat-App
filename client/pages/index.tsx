import { GetStaticProps } from "next";

export default function Home() {
  return null;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: "/signin",
      permanent: true,
    },
  };
};
