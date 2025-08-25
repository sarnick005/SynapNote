import prismaClient from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const notes = await prismaClient.note.findMany({
      where: {
        userId: id,
        isActive: true, 
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notes);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to fetch notes", error: err.message },
      { status: 500 }
    );
  }
}
