import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiUrl } from "@/lib/api-client";

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(apiUrl("/api/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Sign-in failed.");
      } else {
        localStorage.setItem("token", data.token);
        if (data.userId) localStorage.setItem("userId", data.userId);
        setIsLoggedIn(true);
        router.push("/dashboard");
      }
    } catch {
      setError("Could not reach the server.");
    }
  };

  return (
    <div className="form-card">
      <h1 className="mb-4 text-2xl font-semibold">Logga in</h1>
      {error && <p className="error">{error}</p>}
      {isLoggedIn && <p className="mb-3 text-green-700">Du är nu inloggad!</p>}
      <form className="form-stack" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Användarnamn"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Lösenord"
          required
        />
        <button type="submit">Logga in</button>
      </form>
      <p className="mt-4 text-sm">
        Inget konto?{" "}
        <Link className="underline" href="/register">
          Registrera dig
        </Link>
      </p>
    </div>
  );
}
