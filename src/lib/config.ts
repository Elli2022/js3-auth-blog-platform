export const dbConfig = {
  dbName: process.env.MONGODB_DB_NAME || "JS3-app",
  dbUri: process.env.MONGODB_URI || process.env.MONGODB_DB_URL || "",
  dbColl: process.env.MONGODB_COLLECTION || "Users",
};

export const jwtSecret = process.env.JWT_SECRET || "";

export function assertDbConfig() {
  if (!dbConfig.dbUri) {
    throw new Error(
      "Database is not configured. Set MONGODB_URI in Netlify environment variables."
    );
  }
}

export function assertAuthConfig() {
  assertDbConfig();
  if (!jwtSecret) {
    throw new Error(
      "JWT_SECRET is not configured. Set it in Netlify environment variables."
    );
  }
}
