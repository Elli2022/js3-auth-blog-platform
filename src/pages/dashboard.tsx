import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiUrl } from "@/lib/api-client";
import { errorMessageFromApi, parseJsonResponse } from "@/lib/api-response";
import { Card } from "@/components/ui/Card";
import { Button, Field, Input, TextArea } from "@/components/ui/Field";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!isLoggedIn) {
      setError("Du måste logga in för att skriva ett blogginlägg.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Ingen token hittades — logga in igen.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/v1/user/blog"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { data: result, parseError } = await parseJsonResponse(response);

      if (!response.ok) {
        setError(errorMessageFromApi(result, parseError));
      } else {
        setMessage("Blogginlägget sparades i MongoDB.");
        setFormData({ title: "", content: "", author: "" });
      }
    } catch {
      setError("Kunde inte nå servern.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    router.push("/signin");
  };

  return (
    <Card>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Blogg-dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Skriv inlägg med JWT-skyddad API-route.
          </p>
        </div>
        {isLoggedIn && (
          <Button type="button" variant="secondary" onClick={handleLogout}>
            Logga ut
          </Button>
        )}
      </div>

      {!isLoggedIn ? (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          Du måste{" "}
          <Link className="font-semibold underline" href="/signin">
            logga in
          </Link>{" "}
          först.
        </p>
      ) : (
        <>
          {error && (
            <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </p>
          )}
          {message && (
            <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
              {message}
            </p>
          )}
          <form className="space-y-4" onSubmit={handleBlogPost}>
            <Field label="Titel">
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Field>
            <Field label="Innehåll">
              <TextArea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                required
              />
            </Field>
            <Field label="Författare">
              <Input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Field>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sparar…" : "Publicera inlägg"}
            </Button>
          </form>
        </>
      )}
    </Card>
  );
}
