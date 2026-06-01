import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import sanitizeHtml from "sanitize-html";
import { hashPassword, verifyPassword } from "./password";
import { assertAuthConfig, assertDbConfig, dbConfig, jwtSecret } from "./config";
import { getBlogCollection, getUsersCollection } from "./mongodb";

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
  role?: string;
};

function md5(value: string) {
  return crypto.createHash("md5").update(value).digest("hex");
}

function sanitize(value: string) {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
}

function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function publicUser(user: Record<string, unknown> | null) {
  if (!user) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safe } = user;
  return safe;
}

export async function registerUser(input: RegisterInput) {
  assertDbConfig();

  const username = sanitize(input.username?.trim() || "");
  const email = sanitize(input.email?.trim() || "");
  const password = input.password || "";
  const role = input.role === "admin" ? "admin" : "user";

  if (!username) throw new Error("missing parameter: username");
  if (!password) throw new Error("missing parameter: password");
  if (!email || !isEmail(email)) throw new Error("invalid email");

  const users = await getUsersCollection();
  const existing = await users
    .find({ $or: [{ username }, { email }] })
    .toArray();

  if (existing.length) {
    throw new Error("user already exists");
  }

  const now = Date.now();
  const user = {
    username,
    email,
    password: await hashPassword(password),
    role,
    usernameHash: md5(username),
    emailHash: md5(email),
    usernamePasswordHash: md5(username + password),
    created: now,
    modified: now,
  };

  const result = await users.insertOne(user);
  const saved = await users.findOne({ _id: result.insertedId });
  return publicUser(saved as Record<string, unknown>);
}

export async function loginUser(username: string, password: string) {
  assertAuthConfig();

  const users = await getUsersCollection();
  const user = await users.findOne({ username });

  if (!user) {
    throw new Error("User not found.");
  }

  const ok = await verifyPassword(password, String(user.password));
  if (!ok) {
    throw new Error("Incorrect password.");
  }

  const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, {
    expiresIn: "1h",
  });

  return {
    token,
    userId: user._id.toString(),
    username: String(user.username),
  };
}

export async function findUsers(query: {
  username?: string;
  email?: string;
}) {
  assertDbConfig();
  const users = await getUsersCollection();
  const filter: Record<string, string> = {};

  if (query.username) filter.username = query.username;
  if (query.email) filter.email = query.email;

  const results = await users.find(filter).toArray();
  return results.map((u) => publicUser(u as Record<string, unknown>));
}

async function getUsernameForUserId(userId: string) {
  const users = await getUsersCollection();
  const user = await users.findOne({ _id: new ObjectId(userId) });
  if (!user?.username) throw new Error("User not found.");
  return String(user.username);
}

export async function createBlogPost(input: {
  title: string;
  content: string;
  userId: string;
}) {
  assertAuthConfig();

  const title = input.title?.trim();
  const content = input.content?.trim();

  if (!title) throw new Error("Title is required.");
  if (!content) throw new Error("Content is required.");

  const author = await getUsernameForUserId(input.userId);
  const blog = await getBlogCollection();
  const result = await blog.insertOne({
    title,
    content,
    author,
    userId: input.userId,
    createdAt: new Date(),
  });

  return { insertedId: result.insertedId, dbName: dbConfig.dbName };
}

export async function getBlogPostsForUser(userId: string) {
  assertAuthConfig();

  const author = await getUsernameForUserId(userId);
  const blog = await getBlogCollection();
  const posts = await blog
    .find({ $or: [{ userId }, { author }] })
    .sort({ createdAt: -1 })
    .toArray();

  return posts.map((post) => ({
    id: post._id.toString(),
    title: String(post.title ?? ""),
    content: String(post.content ?? ""),
    author: String(post.author ?? ""),
    createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : null,
  }));
}
