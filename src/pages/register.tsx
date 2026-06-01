import React, { useState } from "react";
import Link from "next/link";
import { apiUrl } from "@/lib/api-client";
import { errorMessageFromApi, parseJsonResponse } from "@/lib/api-response";
import { Card } from "@/components/ui/Card";
import { Button, Field, Input } from "@/components/ui/Field";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(apiUrl("/api/v1/user"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const { data: result, parseError } = await parseJsonResponse(response);

      if (!response.ok) {
        setError(errorMessageFromApi(result, parseError));
      } else {
        setIsRegistered(true);
      }
    } catch {
      setError(
        "Kunde inte nå servern. Kontrollera nätverk eller att sajten är deployad korrekt."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      {isRegistered ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Välkommen, {formData.username}!
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Ditt konto är skapat. Logga in för att skriva blogginlägg.
          </p>
          <Link href="/signin">
            <Button type="button">Logga in</Button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
            Skapa konto
          </h1>
          <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
            Registrering för JS3 Auth &amp; Blog — samma flöde som i kursprojektet
            2023.
          </p>
          {error && (
            <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </p>
          )}
          <form className="space-y-4" onSubmit={handleRegister}>
            <Field label="Användarnamn">
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="t.ex. Elli88"
                required
                autoComplete="username"
              />
            </Field>
            <Field label="E-post">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="du@example.com"
                required
                autoComplete="email"
              />
            </Field>
            <Field label="Lösenord">
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minst 4 tecken"
                required
                autoComplete="new-password"
              />
            </Field>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Skapar konto…" : "Registrera"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Har du redan konto?{" "}
            <Link className="font-medium text-violet-600 underline dark:text-violet-400" href="/signin">
              Logga in
            </Link>
          </p>
        </>
      )}
    </Card>
  );
}
