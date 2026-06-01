import Navbar from "@/components/Navbar";
import ModeToggle from "@/components/ModeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <Navbar />
      <ModeToggle />
      <main className="wrapper w-full max-w-lg px-4 py-8">{children}</main>
    </div>
  );
}
