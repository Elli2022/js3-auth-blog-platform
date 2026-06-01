import Navbar from "@/components/Navbar";
import ModeToggle from "@/components/ModeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/20 via-zinc-950 to-zinc-950" />
      <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <Navbar />
      <ModeToggle />
      <main className="relative mx-auto w-full max-w-lg px-4 py-10">{children}</main>
    </div>
  );
}
