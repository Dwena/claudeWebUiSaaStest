import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { linkId, pageId } = body;

    if (!linkId || !pageId) {
      return NextResponse.json(
        { error: "Link ID and Page ID required" },
        { status: 400 }
      );
    }

    await prisma.linkClick.create({
      data: {
        linkId,
        pageId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
