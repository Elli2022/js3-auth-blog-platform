import Link from "next/link";
import { liveDemoUrl, siteName } from "@/lib/site";

export default function About() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-left">
      <h1 className="text-3xl font-bold">About {siteName}</h1>

      <p>
        Full-stack learning project from autumn 2023: Next.js UI (theme toggle,
        routing, forms) plus a user microservice (registration, JWT login,
        MongoDB, optional Redis caching) and authenticated blog posts.
      </p>

      <h2 className="text-xl font-semibold">Live demo</h2>
      <p>
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href={liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {liveDemoUrl}
        </a>
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Registration and login require MongoDB Atlas and{" "}
        <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-800">
          JWT_SECRET
        </code>{" "}
        configured in Netlify environment variables.
      </p>

      <h2 className="text-xl font-semibold">School background</h2>
      <p>
        This work grew out of the same period as other{" "}
        <strong>FE22 (frontend developer)</strong> coursework—e.g. JavaScript 2
        mini projects in spring 2023 and HTML/CSS coursework—with many small
        GitHub snapshots merged later into{" "}
        <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-800">
          users-ms-main
        </code>{" "}
        and{" "}
        <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-800">
          My-Next.js-Project
        </code>
        .
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Oct–Nov 2023:</strong> incremental versions (theme → routing
          → register/login UI → MongoDB Atlas → Redis → JWT blog API).
        </li>
        <li>
          <strong>Not a final thesis:</strong> unlike named{" "}
          <em>slutprojekt</em> repos; this was a progressive full-stack /
          microservice exercise.
        </li>
        <li>
          <strong>Substitute teacher period (~6 weeks):</strong> not recorded in
          git commit messages; your memory may refer to a wider class
          situation—the repo history only shows steady weekly coursework commits.
        </li>
      </ul>

      <h2 className="text-xl font-semibold">Stack</h2>
      <ul className="list-disc space-y-1 pl-6">
        <li>Next.js 14 (Pages Router), TypeScript, Tailwind CSS</li>
        <li>next-themes, JWT, MongoDB Atlas</li>
        <li>bcrypt password hashing (legacy MD5 still accepted for old accounts)</li>
        <li>Hosted on Netlify</li>
      </ul>

      <p>
        <Link className="text-blue-600 underline dark:text-blue-400" href="/">
          ← Back to home
        </Link>
      </p>
    </article>
  );
}
