import Header from "@/components/header";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
}
