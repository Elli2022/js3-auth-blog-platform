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
        <em>users-ms</em>, <em>FullstackApplikation</em> och{" "}
        <em>My-Next.js-Project</em> — många små GitHub-repos som jag senare slog
        ihop till <a href={githubRepoUrl}>js3-auth-blog-platform</a>.
      </p>

      <h2>Live-demo</h2>
      <p>
        <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
          {liveDemoUrl}
        </a>
      </p>

      <h2>MongoDB Atlas (ursprung vs idag)</h2>
      <p>
        <strong>Det här projektet använde inte receptbloggen.</strong> Klustret{" "}
        <code>receptBloggCluster</code> (<code>receptbloggcluster.hree1g3</code>)
        tillhör ett <em>annat</em> projekt (receptbok med recept och bilder). För
        JS3-uppgiften var det i stället:
      </p>
      <ul>
        <li>
          <strong>Kluster (2023):</strong> <code>cluster2.6uupj5n.mongodb.net</code>{" "}
          (Atlas-projekt med kluster som hette <strong>Cluster2</strong>)
        </li>
        <li>
          <strong>Databas:</strong> <code>JS3-app</code>
        </li>
        <li>
          <strong>Collection:</strong> <code>Users</code>
        </li>
      </ul>
      <p>
        Det gamla <code>cluster2</code>-klustret finns inte kvar på Atlas längre.
        För att få live-sajten att fungera igen pekade vi tillfälligt Netlify mot
        ett annat aktivt kluster, men med samma databasnamn{" "}
        <code>JS3-app</code> och collection <code>Users</code> — alltså ny tom
        databas i molnet, inte receptbloggens data.
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
          Netlify:{" "}
          <a href={liveDemoUrl}>{liveDemoUrl.replace("https://", "")}</a>
        </li>
      </ul>

      <p>
        <Link href="/">← Tillbaka till startsidan</Link>
      </p>
    </Card>
  );
}
