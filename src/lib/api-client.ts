export function apiUrl(path: string) {
  if (typeof window === "undefined") {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return `${base}${path}`;
  }
  return path;
}
