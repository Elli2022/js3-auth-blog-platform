import bcrypt from "bcrypt";
import crypto from "crypto";

const BCRYPT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  if (stored.startsWith("$2")) {
    return bcrypt.compare(password, stored);
  }
  const legacy = crypto.createHash("md5").update(password).digest("hex");
  return legacy === stored;
}
