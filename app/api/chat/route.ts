import { NextResponse } from "next/server";
import { getResponse } from "@/lib/gemini/getResponse";

export async function POST(req: Request) {
  try {
    const { context, prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    const answer = await getResponse(context, prompt);
    return NextResponse.json({ text: answer });
  } catch (err: any) {
    console.error("Gemini error:", err);
    return NextResponse.json(
      { error: "Failed to fetch AI response" },
      { status: 500 }
    );
  }
}
