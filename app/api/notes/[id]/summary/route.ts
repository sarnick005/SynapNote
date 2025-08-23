import { NextRequest, NextResponse } from "next/server";
import { generateSummary } from "@/lib/gemini/getSummary";
import prismaClient from "@/lib/db";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 mark params as Promise
) {
  try {
    const { id } = await context.params; // 👈 await params here

    const note = await prismaClient.note.findUnique({
      where: { id },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const summary = await generateSummary(note.title, note.content || "");

    const updated = await prismaClient.note.update({
      where: { id },
      data: { aiSummary: summary },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
