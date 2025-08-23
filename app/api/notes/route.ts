import prismaClient from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, link, userId } = body;

    if (!title || !content || !userId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const note = await prismaClient.note.create({
      data: {
        title,
        content,
        link,
        userId,
      },
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create note" },
      { status: 500 }
    );
  }
}
