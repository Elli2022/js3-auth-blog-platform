import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const guestLinks = [
  { href: "/", label: "Hem" },
  { href: "/register", label: "Registrera" },
  { href: "/signin", label: "Logga in" },
  { href: "/about", label: "Om projektet" },
];

const memberLinks = [
  { href: "/", label: "Hem" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "Om projektet" },
];

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const syncAuth = () => {
      setLoggedIn(!!localStorage.getItem("token"));
      setUsername(localStorage.getItem("username") || "");
    };
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, [router.pathname]);

  const links = loggedIn ? memberLinks : guestLinks;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          JS3 <span className="text-violet-400">Auth &amp; Blog</span>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {loggedIn && username && (
            <span className="hidden rounded-full border border-[#2F7DE1]/25 bg-[#2F7DE1]/10 px-2.5 py-1 text-xs font-semibold text-[#8BB8F5] sm:inline">
              {username}
            </span>
          )}
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
      </div>
    </header>
  );
}
