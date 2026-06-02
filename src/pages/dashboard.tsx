import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiUrl } from "@/lib/api-client";
import { errorMessageFromApi, parseJsonResponse } from "@/lib/api-response";
import { Card } from "@/components/ui/Card";
import { Button, Field, Input, TextArea } from "@/components/ui/Field";

type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string | null;
};

export default function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const router = useRouter();

  const loadPosts = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoadingPosts(true);
    try {
      const response = await fetch(apiUrl("/api/v1/user/blog"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data: result, parseError } = await parseJsonResponse(response);

      if (!response.ok) {
        setError(errorMessageFromApi(result, parseError));
        return;
      }

      const list = result?.data;
      if (Array.isArray(list)) setPosts(list as BlogPost[]);
    } catch {
      setError("Could not load your posts.");
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username") || "";
    setIsLoggedIn(!!token);
    setUsername(storedUsername);
    if (token) void loadPosts();
  }, [loadPosts]);

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
      setError("You must sign in to publish a blog post.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found — please sign in again.");
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
        setMessage("Blog post saved to MongoDB.");
        setFormData({ title: "", content: "" });
        await loadPosts();
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    setPosts([]);
    router.push("/signin");
  };

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <Card>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Blog dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {username
              ? `Signed in as ${username} — posts are published under your username.`
              : "Create posts via JWT-protected API routes."}
          </p>
        </div>
        {isLoggedIn && (
          <Button type="button" variant="secondary" onClick={handleLogout}>
            Sign out
          </Button>
        )}
      </div>

      {!isLoggedIn ? (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          You must{" "}
          <Link className="font-semibold underline" href="/signin">
            sign in
          </Link>{" "}
          first.
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
            <Field label="Title">
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Field>
            <Field label="Content">
              <TextArea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                required
              />
            </Field>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving…" : "Publish post"}
            </Button>
          </form>

          <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-700">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Your posts
            </h2>
            {loadingPosts ? (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading posts…</p>
            ) : posts.length === 0 ? (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No posts yet. Publish your first one above.
              </p>
            ) : (
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/50"
                  >
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white">
                        {post.title}
                      </h3>
                      {post.createdAt && (
                        <time
                          className="text-xs text-zinc-500 dark:text-zinc-400"
                          dateTime={post.createdAt}
                        >
                          {formatDate(post.createdAt)}
                        </time>
                      )}
                    </div>
                    <p className="mb-2 whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                      {post.content}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Author: {post.author}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </Card>
  );
}
