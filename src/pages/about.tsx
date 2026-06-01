import Link from "next/link";
import { githubRepoUrl, liveDemoUrl, siteName } from "@/lib/site";
import { Card } from "@/components/ui/Card";

export default function About() {
  return (
    <Card className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="!mt-0 text-3xl font-bold">Om {siteName}</h1>

      <p>
        Det här är min <strong>större uppgift i JavaScript 3</strong> (FE22,
        hösten 2023). Projektet hette ursprungligen bland annat{" "}
        <em>users-ms</em> och <em>My-Next.js-Project</em> — många små GitHub-repos
        som jag senare slog ihop till{" "}
        <a href={githubRepoUrl}>js3-auth-blog-platform</a>.
      </p>

      <h2>Live-demo</h2>
      <p>
        <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
          {liveDemoUrl}
        </a>
      </p>

      <h2>Vad jag lärde mig</h2>
      <ul>
        <li>Sätta upp ett helt system själv — frontend, API, databas, cache</li>
        <li>
          <strong>MongoDB Atlas</strong> (databas <code>JS3-app</code>, collection{" "}
          <code>Users</code>)
        </li>
        <li>
          <strong>Redis</strong> för cache av användare och JWT (i ursprungsversionen)
        </li>
        <li>Express microservice-mönster → nu Next.js API routes på Netlify</li>
        <li>JWT, registrering, blogginlägg med skyddade routes</li>
      </ul>

      <h2>Kurs &amp; klass</h2>
      <p>
        Uppgiften var öppen och krävde mycket eget arbete. Få i klassen fullföljde
        till ett komplett system utan lärarstöd —{" "}
        <strong>ungefär tre personer</strong> enligt min minnesbild, varav jag var
        en. Det passar också tidslinjen okt–nov 2023 med veckovisa versioner i git.
      </p>
      <p>
        Det var <strong>inte</strong> ett slutprojekt (som HTML/JS-slutprojekt) utan
        den större JS3-uppgiften med microservice + frontend.
      </p>

      <h2>Stack idag</h2>
      <ul>
        <li>Next.js 14, TypeScript, Tailwind CSS, next-themes</li>
        <li>MongoDB Atlas, JWT, bcrypt</li>
        <li>Netlify: <code>elli-auth-blog</code></li>
      </ul>

      <p>
        <Link href="/">← Tillbaka till startsidan</Link>
      </p>
    </Card>
  );
}
