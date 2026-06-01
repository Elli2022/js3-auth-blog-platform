import Head from "next/head";
import Navbar from "@/components/Navbar";
import ModeToggle from "@/components/ModeToggle";
import { siteName, liveDemoUrl } from "@/lib/site";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Head>
        <title>{siteName}</title>
        <meta
          name="description"
          content="JS3 (FE22) större uppgift: Next.js, JWT, MongoDB Atlas och skyddad blogg-dashboard. Live-demo på Netlify."
        />
        <meta property="og:title" content={siteName} />
        <meta property="og:url" content={liveDemoUrl} />
        <meta
          property="og:description"
          content="Fullstack auth & blog — portfolio-projekt från JavaScript 3, hösten 2023."
        />
      </Head>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/20 via-zinc-950 to-zinc-950" />
      <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <Navbar />
      <ModeToggle />
      <main className="relative mx-auto w-full max-w-lg px-4 py-10">{children}</main>
    </div>
  );
}
