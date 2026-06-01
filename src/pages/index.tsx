import Link from "next/link";
import { liveDemoUrl, siteName } from "@/lib/site";

export default function Home() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl font-bold">{siteName}</h1>
      <p className="text-neutral-600 dark:text-neutral-300">
        Register, sign in with JWT, and publish blog posts. Dark/light theme
        included.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link className="btn-primary" href="/register">
          Register
        </Link>
        <Link className="btn-secondary" href="/signin">
          Sign in
        </Link>
        <Link className="btn-secondary" href="/dashboard">
          Dashboard
        </Link>
      </div>
      <p className="text-sm">
        <Link className="underline" href="/about">
          About this project
        </Link>
        {" · "}
        <a className="underline" href={liveDemoUrl}>
          Live on Netlify
        </a>
      </p>
    </div>
  );
}
