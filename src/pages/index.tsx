import Link from "next/link";
import { liveDemoUrl, siteName } from "@/lib/site";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Field";

export default function Home() {
  return (
    <div className="space-y-6">
      <Card className="text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-500">
          FE22 · JavaScript 3 · Större uppgift
        </p>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {siteName}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
          Fullstack med Next.js, JWT, MongoDB Atlas och Redis — mitt första större
          projekt där vi satte upp hela systemet själva.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/register">
            <Button type="button">Registrera</Button>
          </Link>
          <Link href="/signin">
            <Button type="button" variant="secondary">
              Logga in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button type="button" variant="ghost">
              Dashboard
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          <Link className="underline hover:text-violet-600" href="/about">
            Om projektet &amp; kursen
          </Link>
          {" · "}
          <a className="underline hover:text-violet-600" href={liveDemoUrl}>
            Live på Netlify
          </a>
        </p>
      </Card>
    </div>
  );
}
