import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Hem" },
  { href: "/register", label: "Registrera" },
  { href: "/signin", label: "Logga in" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "Om projektet" },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          JS3 <span className="text-violet-400">Auth &amp; Blog</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-zinc-300 transition hover:bg-white/10 hover:text-white",
                router.pathname === link.href && "bg-white/10 text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
