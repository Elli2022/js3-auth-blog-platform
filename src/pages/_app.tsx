import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import RootLayout from "@/components/RootLayout";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ThemeProvider>
  );
}
