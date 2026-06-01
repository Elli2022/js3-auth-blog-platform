import Link from "next/link";
import { StatusPills, aboutPills } from "@/components/StatusPills";
import { githubRepoUrl, liveDemoUrl, siteName } from "@/lib/site";
import { Card } from "@/components/ui/Card";

export default function About() {
  return (
    <Card className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="!mt-0 text-3xl font-bold">Om {siteName}</h1>

      <p>
        Det här är min <strong>större uppgift i JavaScript 3</strong> (FE22,
        hösten 2023). Projektet hette ursprungligen bland annat{" "}
        <em>users-ms</em>, <em>FullstackApplikation</em> och{" "}
        <em>My-Next.js-Project</em> — många små GitHub-repos som jag senare slog
        ihop till <a href={githubRepoUrl}>js3-auth-blog-platform</a>.
      </p>

      <StatusPills items={[...aboutPills]} className="not-prose my-6" />

      <h2>Live-demo</h2>
      <p>
        <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
          {liveDemoUrl}
        </a>
      </p>

      <h2>MongoDB Atlas (ursprung vs idag)</h2>
      <p>
        <strong>Det här projektet använde inte receptbloggen.</strong> Klustret{" "}
        <code>receptBloggCluster</code> tillhör ett <em>annat</em> Atlas-projekt
        (receptbok). JS3-auth-bloggen har sitt eget Atlas-projekt och kluster.
      </p>

      <h3>2023 (ursprungligt)</h3>
      <ul>
        <li>
          <strong>Kluster:</strong> <code>cluster2.6uupj5n.mongodb.net</code>{" "}
          (hette <strong>Cluster2</strong> — finns inte kvar)
        </li>
        <li>
          <strong>Databas / collection:</strong> <code>JS3-app</code> /{" "}
          <code>Users</code>
        </li>
      </ul>

      <h3>Idag (återupptaget juni 2026)</h3>
      <ul>
        <li>
          <strong>Atlas-projekt:</strong> <code>js3-auth-blog</code> (tidigare
          &quot;Project 0&quot;)
        </li>
        <li>
          <strong>Kluster:</strong> <code>JS3-app</code> på{" "}
          <code>js3-app.72twkv6.mongodb.net</code>
        </li>
        <li>
          <strong>Databasanvändare (app):</strong> <code>js3-auth-app</code>
        </li>
        <li>
          <strong>Databas / collection:</strong> <code>JS3-app</code> /{" "}
          <code>Users</code> (samma namn som 2023)
        </li>
        <li>
          <strong>Netlify:</strong> anslutningssträngen ligger i{" "}
          <code>MONGODB_URI</code> (Site settings → Environment variables)
        </li>
      </ul>
      <p>
        Under en kort period pekade live-sajten tillfälligt mot{" "}
        <code>receptBloggCluster</code> eftersom det gamla klustret var borta.
        Sedan juni 2026 kör vi igen mot det riktiga JS3-klustret ovan.
      </p>

      <h3>Lösenord &amp; åtkomst</h3>
      <p>
        Atlas-lösenordet för <code>js3-auth-app</code> sparas i din{" "}
        <strong>lösenordshanterare</strong> (kopiera från Netlify: Site
        configuration → Environment variables → <code>MONGODB_URI</code>, eller
        från Atlas → Database Access). Dela det aldrig i git eller i chatten.
      </p>

      <h2>Postman</h2>
      <p>
        Jag använde <strong>Postman</strong> under utvecklingen för att testa API:t
        (registrering, login, blogg) innan frontenden var klar — och för att
        verifiera att backend svarade när jag lagt till min{" "}
        <strong>aktuella IP-adress</strong> i Atlas under{" "}
        <em>Network Access → IP Access List</em>. Samma princip gäller Netlify
        idag: servern i molnet måste få ansluta (t.ex. via <code>0.0.0.0/0</code>{" "}
        eller specifika IP:n).
      </p>

      <h2>Måste det köras lokalt på min dator?</h2>
      <p>
        <strong>Nej — inte för att andra ska använda sajten.</strong> Idag kör
        allt på <strong>Netlify</strong> (frontend + API), och databasen ligger
        kvar i <strong>MongoDB Atlas</strong> i molnet. Din dator behöver inte vara
        påslagen.
      </p>
      <p>
        <strong>Lokalt (<code>npm run dev</code>)</strong> var (och är) till för{" "}
        <em>utveckling</em>: du kör Next.js/API på t.ex.{" "}
        <code>localhost:3000</code> på din maskin, men ansluter fortfarande till
        Atlas i molnet — du behöver inte installera MongoDB lokalt. Under 2023
        körde backend ofta på port <code>3013</code> eller <code>3020</code> medan
        Postman och frontenden testades mot samma API.
      </p>

      <h2>Vad jag lärde mig</h2>
      <ul>
        <li>Sätta upp ett helt system själv — frontend, API, databas, cache</li>
        <li>MongoDB Atlas, nätverksåtkomst (IP-lista), databasanvändare</li>
        <li>
          <strong>Redis</strong> för cache av användare och JWT (i
          ursprungsversionen)
        </li>
        <li>Express microservice → nu Next.js API routes på Netlify</li>
        <li>JWT, registrering, blogginlägg med skyddade routes</li>
      </ul>

      <h2>Kurs &amp; klass</h2>
      <p>
        Uppgiften var öppen och krävde mycket eget arbete. Få i klassen fullföljde
        till ett komplett system utan lärarstöd —{" "}
        <strong>ungefär tre personer</strong> enligt min minnesbild, varav jag var
        en. Det var <strong>inte</strong> ett slutprojekt utan den större
        JS3-uppgiften.
      </p>

      <h2>Stack idag</h2>
      <ul>
        <li>Next.js 14, TypeScript, Tailwind CSS, next-themes</li>
        <li>MongoDB Atlas, JWT, bcrypt</li>
        <li>
          Blogg-dashboard: titel + innehåll, författare = inloggat användarnamn,
          lista under &quot;Dina inlägg&quot;
        </li>
        <li>
          Netlify + GitHub Actions: varje push till <code>master</code> deployar
          automatiskt
        </li>
        <li>
          Live:{" "}
          <a href={liveDemoUrl}>{liveDemoUrl.replace("https://", "")}</a>
        </li>
      </ul>

      <p>
        <Link href="/">← Tillbaka till startsidan</Link>
      </p>
    </Card>
  );
}
