import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const linkSchema = z.object({
  title: z.string().min(1).max(100),
  url: z.string().url(),
  icon: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, url, icon } = linkSchema.parse(body);

    // Get user's page
    const page = await prisma.page.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        links: true,
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Check link limit for free users
    if (!session.user.isPro && page.links.length >= 5) {
      return NextResponse.json(
        { error: "Free users can only have 5 links. Upgrade to Pro for unlimited links." },
        { status: 403 }
      );
    }

    // Get the highest order number
    const maxOrder = page.links.reduce((max, link) => Math.max(max, link.order), -1);

    // Create link
    const link = await prisma.link.create({
      data: {
        pageId: page.id,
        title,
        url,
        icon: icon || "",
        order: maxOrder + 1,
      },
    });

    return NextResponse.json({ link }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { linkId, title, url, icon, isActive } = z.object({
      linkId: z.string(),
      title: z.string().min(1).max(100).optional(),
      url: z.string().url().optional(),
      icon: z.string().optional(),
      isActive: z.boolean().optional(),
    }).parse(body);

    // Verify link belongs to user's page
    const link = await prisma.link.findUnique({
      where: { id: linkId },
      include: {
        page: true,
      },
    });

    if (!link || link.page.userId !== session.user.id) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: {
        ...(title && { title }),
        ...(url && { url }),
        ...(icon !== undefined && { icon }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({ link: updatedLink });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const linkId = searchParams.get("linkId");

    if (!linkId) {
      return NextResponse.json({ error: "Link ID required" }, { status: 400 });
    }

    // Verify link belongs to user's page
    const link = await prisma.link.findUnique({
      where: { id: linkId },
      include: {
        page: true,
      },
    });

    if (!link || link.page.userId !== session.user.id) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    await prisma.link.delete({
      where: { id: linkId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
