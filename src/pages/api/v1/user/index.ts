import type { NextApiRequest, NextApiResponse } from "next";
import { findUsers, registerUser } from "@/lib/user-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const saved = await registerUser(req.body);
      return res.status(201).json({ err: 0, data: saved });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      const isClient =
        message.includes("missing") ||
        message.includes("invalid") ||
        message.includes("exists");
      const isDb =
        message.includes("MongoDB") ||
        message.includes("ENOTFOUND") ||
        message.includes("Database") ||
        message.includes("configured");
      const status = isClient ? 400 : isDb ? 503 : 500;
      const friendly = isDb
        ? "MongoDB Atlas är inte tillgänglig. Klustret från 2023 verkar vara borttaget — skapa ett nytt cluster och uppdatera MONGODB_URI på Netlify."
        : message;
      return res.status(status).json({ err: 1, data: friendly });
    }
  }

  if (req.method === "GET") {
    try {
      const username = req.query.username as string | undefined;
      const email = req.query.email as string | undefined;
      const results = await findUsers({ username, email });
      return res.status(200).json({ err: 0, data: results });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Lookup failed";
      return res.status(403).json({ err: 1, data: { err: message } });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
