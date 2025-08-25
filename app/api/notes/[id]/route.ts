import prismaClient from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, content, link } = body;

    if (!title || !content) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const updatedNote = await prismaClient.note.update({
      where: { id },
      data: {
        title,
        content,
        link,
      },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update note" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const updatedNote = await prismaClient.note.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(
      { message: "Note deleted successfully", note: updatedNote },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete note" },
      { status: 500 }
    );
  }
}
