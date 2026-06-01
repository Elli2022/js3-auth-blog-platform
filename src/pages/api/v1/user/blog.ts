import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@/lib/config";
import { createBlogPost } from "@/lib/user-service";

function getToken(req: NextApiRequest) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = getToken(req);
  if (!token || !jwtSecret) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    jwt.verify(token, jwtSecret);
  } catch {
    return res.status(400).json({ error: "Invalid token." });
  }

  const { title, content, author } = req.body || {};

  try {
    const saved = await createBlogPost({
      title: String(title || ""),
      content: String(content || ""),
      author: String(author || ""),
    });
    return res.status(201).json({ err: 0, data: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Blog post failed";
    return res.status(500).json({ err: 1, data: message });
  }
}
