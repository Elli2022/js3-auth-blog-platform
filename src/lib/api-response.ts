export async function parseJsonResponse(response: Response) {
  const text = await response.text();
  try {
    return { data: JSON.parse(text) as Record<string, unknown>, raw: text };
  } catch {
    return {
      data: null,
      raw: text,
      parseError: true as const,
    };
  }
}

export function errorMessageFromApi(
  result: Record<string, unknown> | null,
  parseError?: boolean
) {
  if (parseError) {
    return "Serverfel — kontrollera att databasen (MongoDB Atlas) är igång och att miljövariabler är satta på Netlify.";
  }
  if (!result) return "Något gick fel.";
  if (typeof result.data === "string") return result.data;
  if (typeof result.error === "string") return result.error;
  return "Något gick fel.";
}
