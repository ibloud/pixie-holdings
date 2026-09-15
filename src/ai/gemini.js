import { PIXIE_AGENT_SCHEMA, PIXIE_AGENT_SYSTEM_PROMPT } from "./prompts.js";

const DEFAULT_MODEL = "gemini-1.5-flash";
const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const TIMEOUT_MS = 8000;

function fallback(message = "I can help explain the next PIXIE step.") {
  return { reply: message, intent: "general", requiresConfirmation: false, fallback: true };
}

export async function askGemini(message, { apiKey = process.env.GEMINI_API_KEY, model = process.env.GEMINI_MODEL || DEFAULT_MODEL, context = "" } = {}) {
  const text = String(message ?? "").trim();
  if (!text) throw new Error("message is required");
  if (text.length > 2000) throw new Error("message is too long");
  if (!apiKey) return fallback();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${ENDPOINT}/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        system_instruction: { parts: [{ text: `${PIXIE_AGENT_SYSTEM_PROMPT}\n\nCORE CATALOG:\n${context}` }] },
        contents: [{ role: "user", parts: [{ text }] }],
        generationConfig: {
          temperature: 0.2,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 240,
          responseMimeType: "application/json",
          responseSchema: PIXIE_AGENT_SCHEMA
        }
      })
    });

    if (!response.ok) throw new Error(`Gemini request failed with status ${response.status}`);
    const payload = await response.json();
    const raw = payload?.candidates?.[0]?.content?.parts?.map(part => part.text ?? "").join("").trim();
    if (!raw) return fallback();

    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed.reply !== "string" || typeof parsed.intent !== "string" || typeof parsed.requiresConfirmation !== "boolean") return fallback(raw);
      return parsed;
    } catch {
      return fallback(raw);
    }
  } catch (error) {
    if (error?.name === "AbortError") throw new Error("Gemini request timed out");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
