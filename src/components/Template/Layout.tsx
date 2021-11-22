import Head from "next/head";

import TemplateContainer from "./Container";
export interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { title, children } = props;
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{title || "Wa Project - Front-End - Challenge"}</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TemplateContainer>{children}</TemplateContainer>
    </>
  );
};

export default Layout;
