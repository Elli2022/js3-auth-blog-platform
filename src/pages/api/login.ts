import type { NextApiRequest, NextApiResponse } from "next";
import { loginUser } from "@/lib/user-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Användarnamn och lösenord krävs." });
  }

  try {
    const { token, userId, username: loggedInUsername } = await loginUser(
      String(username),
      String(password)
    );
    return res.status(200).json({ token, userId, username: loggedInUsername });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return res.status(400).json({ error: message });
  }
}
