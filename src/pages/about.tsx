import Link from "next/link";
import { StatusPills, aboutPills } from "@/components/StatusPills";
import { githubRepoUrl, liveDemoUrl, siteName } from "@/lib/site";
import { Card } from "@/components/ui/Card";

export default function About() {
  return (
    <Card className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="!mt-0 text-3xl font-bold">About {siteName}</h1>

      <p>
        A full-stack web application where users register, authenticate with JWT,
        and manage personal blog posts behind a protected dashboard. The project
        consolidates earlier microservice experiments into a single Next.js
        codebase deployed on Netlify with MongoDB Atlas as the database.
      </p>

      <StatusPills items={[...aboutPills]} className="not-prose my-6" />

      <h2>Live demo</h2>
      <p>
        <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
          {liveDemoUrl}
        </a>
      </p>

      <h2>Architecture</h2>
      <ul>
        <li>
          <strong>Frontend:</strong> Next.js 14 (Pages Router), TypeScript,
          Tailwind CSS, dark/light theme
        </li>
        <li>
          <strong>API:</strong> Next.js API routes on Netlify (register, login,
          protected blog CRUD)
        </li>
        <li>
          <strong>Database:</strong> MongoDB Atlas — database <code>JS3-app</code>
          , collections for users and blog posts
        </li>
        <li>
          <strong>Auth:</strong> JWT bearer tokens, bcrypt password hashing
          (legacy MD5 still accepted for older accounts)
        </li>
      </ul>

      <h2>Operations</h2>
      <p>
        Production runs entirely in the cloud: Netlify serves the app and API,
        Atlas stores data. Environment variables (<code>MONGODB_URI</code>,{" "}
        <code>JWT_SECRET</code>, <code>NEXT_PUBLIC_SITE_URL</code>) are configured
        in the Netlify dashboard. Check{" "}
        <a href={`${liveDemoUrl}/api/health`} target="_blank" rel="noopener noreferrer">
          /api/health
        </a>{" "}
        for database connectivity status.
      </p>

      <h2>What I learned</h2>
      <ul>
        <li>End-to-end system design: UI, API, database, deployment, and CI</li>
        <li>MongoDB Atlas networking, database users, and connection strings</li>
        <li>JWT authentication flows and protected API routes</li>
        <li>Migrating from Express microservices to unified Next.js API routes</li>
      </ul>

      <h2>Related repository</h2>
      <p>
        <a
          href="https://github.com/Elli2022/authentication-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          authentication-service
        </a>{" "}
        — an earlier Express authentication exercise kept as a separate archive.
      </p>

      <h2>Source code</h2>
      <p>
        <a href={githubRepoUrl}>{githubRepoUrl}</a>
      </p>

      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </Card>
  );
}
