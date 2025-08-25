"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEYS = process.env.GEMINI_API_KEYS?.split(",") || [];

if (API_KEYS.length === 0) {
  throw new Error("No API keys found. Please set GEMINI_API_KEYS in .env");
}

let keyIndex = 0;
function getNextKey(): string {
  const key = API_KEYS[keyIndex].trim();
  keyIndex = (keyIndex + 1) % API_KEYS.length;
  return key;
}

export async function generateSummary(
  title: string,
  content: string
): Promise<string> {
  const prompt = `
You are a helpful assistant. 
Summarize the following content into exactly 2 sentences. 
Do not include any introductions, labels, or markdown. 
Only return the 2-line summary as plain text.

Title: ${title}
Content: ${content}
`;

  let lastError: unknown;

  for (let i = 0; i < API_KEYS.length; i++) {
    const apiKey = getNextKey();

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error(`Key failed [${apiKey.slice(0, 6)}...]:`, error);
      lastError = error;
    }
  }

  throw new Error(
    "All API keys failed. Last error: " + (lastError as Error).message
  );
}
