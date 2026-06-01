import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiUrl } from "@/lib/api-client";
import { errorMessageFromApi, parseJsonResponse } from "@/lib/api-response";
import { Card } from "@/components/ui/Card";
import { Button, Field, Input } from "@/components/ui/Field";

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(apiUrl("/api/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const { data, parseError } = await parseJsonResponse(response);

      if (!response.ok) {
        setError(errorMessageFromApi(data, parseError));
      } else {
        const token = data?.token as string | undefined;
        const userId = data?.userId as string | undefined;
        const username = data?.username as string | undefined;
        if (token) localStorage.setItem("token", token);
        if (userId) localStorage.setItem("userId", userId);
        if (username) localStorage.setItem("username", username);
        router.push("/dashboard");
      }
    } catch {
      setError("Kunde inte nå servern.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
        Logga in
      </h1>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        JWT-inloggning mot MongoDB — som i det ursprungliga microservice-projektet.
      </p>
      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Field label="Användarnamn">
          <Input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </Field>
        <Field label="Lösenord">
          <Input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </Field>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loggar in…" : "Logga in"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Inget konto?{" "}
        <Link className="font-medium text-violet-600 underline dark:text-violet-400" href="/register">
          Registrera dig
        </Link>
      </p>
    </Card>
  );
}
