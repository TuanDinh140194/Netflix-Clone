import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="shortcut icon" href="/images/default-blue.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
