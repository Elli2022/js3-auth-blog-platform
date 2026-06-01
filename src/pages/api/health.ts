import type { NextApiRequest, NextApiResponse } from "next";
import { dbConfig, jwtSecret } from "@/lib/config";
import { getDb } from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const checks = {
    mongodbUri: Boolean(dbConfig.dbUri),
    jwtSecret: Boolean(jwtSecret),
    database: "unknown" as "ok" | "error" | "skipped",
    dbName: dbConfig.dbName,
    collection: dbConfig.dbColl,
  };

  if (!dbConfig.dbUri) {
    return res.status(503).json({
      status: "degraded",
      message: "MONGODB_URI is missing",
      checks,
    });
  }

  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    checks.database = "ok";
    return res.status(200).json({ status: "ok", checks });
  } catch (error) {
    checks.database = "error";
    const message =
      error instanceof Error ? error.message : "Database connection failed";
    return res.status(503).json({
      status: "degraded",
      message,
      checks,
    });
  }
}
