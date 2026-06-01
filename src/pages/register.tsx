import React, { useState } from "react";
import Link from "next/link";
import { apiUrl } from "@/lib/api-client";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(apiUrl("/api/v1/user"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          typeof result.data === "string"
            ? result.data
            : "Registration failed."
        );
      } else {
        setIsRegistered(true);
      }
    } catch {
      setError("Unexpected error. Try again.");
    }
  };

  return (
    <div className="form-card">
      {isRegistered ? (
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">Välkommen, {formData.username}!</h1>
          <p>Vill du logga in?</p>
          <Link className="text-blue-600 underline" href="/signin">
            Logga in
          </Link>
        </div>
      ) : (
        <>
          <h1 className="mb-4 text-2xl font-semibold">Registrera</h1>
          {error && <p className="error">{error}</p>}
          <form className="form-stack" onSubmit={handleRegister}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Användarnamn"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-post"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Lösenord"
              required
            />
            <button type="submit">Registrera</button>
          </form>
        </>
      )}
    </div>
  );
}
