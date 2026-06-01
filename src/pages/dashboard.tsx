import React, { useState, useEffect } from "react";
import LogoutButton from "@/components/ui/LogoutButton";
import { useRouter } from "next/router";
import { apiUrl } from "@/lib/api-client";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!isLoggedIn) {
      setMessage("Du måste logga in för att kunna skriva ett blogginlägg.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Ingen token hittades.");
      return;
    }

    try {
      const response = await fetch(apiUrl("/api/v1/user/blog"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof result.data === "string" ? result.data : "Fel vid skickande"
        );
      }

      setMessage("Blogginlägg sparat!");
      setFormData({ title: "", content: "", author: "" });
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Ett fel inträffade."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    router.push("/signin");
  };

  return (
    <div className="form-card">
      <h1 className="mb-4 text-2xl font-semibold">Skapa blogginlägg</h1>
      {!isLoggedIn ? (
        <p>Du måste logga in för att kunna skriva ett blogginlägg.</p>
      ) : (
        <>
          <LogoutButton onLogout={handleLogout} />
          {message && <p className="mt-3 text-sm">{message}</p>}
          <form className="form-stack mt-4" onSubmit={handleBlogPost}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titel"
              required
            />
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Innehåll"
              required
            />
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Författare"
              required
            />
            <button type="submit">Skicka</button>
          </form>
        </>
      )}
    </div>
  );
}
