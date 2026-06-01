export const dbConfig = {
  dbName: process.env.MONGODB_DB_NAME || "db_my_app",
  dbUri: process.env.MONGODB_URI || process.env.MONGODB_DB_URL || "",
  dbColl: process.env.MONGODB_COLLECTION || "coll_users",
};

export const jwtSecret = process.env.JWT_SECRET || "";

export function assertConfig() {
  if (!dbConfig.dbUri) {
    throw new Error("MONGODB_URI is not configured");
  }
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }
}
