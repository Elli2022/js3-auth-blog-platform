import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@/lib/config";
import { createBlogPost, getBlogPostsForUser } from "@/lib/user-service";

function getToken(req: NextApiRequest) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}

function getUserIdFromToken(token: string) {
  const payload = jwt.verify(token, jwtSecret) as { userId?: string };
  if (!payload.userId) throw new Error("Invalid token.");
  return payload.userId;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getToken(req);
  if (!token || !jwtSecret) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  let userId: string;
  try {
    userId = getUserIdFromToken(token);
  } catch {
    return res.status(400).json({ error: "Invalid token." });
  }

  if (req.method === "GET") {
    try {
      const posts = await getBlogPostsForUser(userId);
      return res.status(200).json({ err: 0, data: posts });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not load posts";
      return res.status(500).json({ err: 1, data: message });
    }
  }

  if (req.method === "POST") {
    const { title, content } = req.body || {};

    try {
      const saved = await createBlogPost({
        title: String(title || ""),
        content: String(content || ""),
        userId,
      });
      return res.status(201).json({ err: 0, data: saved });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Blog post failed";
      return res.status(500).json({ err: 1, data: message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
