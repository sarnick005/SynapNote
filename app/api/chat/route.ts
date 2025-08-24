import { NextResponse } from "next/server";
import { getResponse } from "@/lib/gemini/getResponse";
import prismaClient from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { context, prompt, userId } = await req.json();

    if (!prompt || !userId) {
      return NextResponse.json(
        { error: "Prompt and userId required" },
        { status: 400 }
      );
    }

    const answer = await getResponse(context, prompt);

    const newChat = await prismaClient.response.create({
      data: { userId, prompt, response: answer },
    });

    return NextResponse.json({ text: newChat.response });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json(
      { error: "Failed to fetch AI response" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const chats = await prismaClient.response.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(chats);
  } catch (err) {
    console.error("Error fetching chats:", err);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}
