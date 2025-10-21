import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const pageSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens and underscores"),
  title: z.string().min(1).max(100),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  theme: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const page = await prisma.page.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        links: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return NextResponse.json({ page });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { username, title, bio, avatarUrl, theme } = pageSchema.parse(body);

    // Check if username is already taken
    const existingPage = await prisma.page.findUnique({
      where: { username },
    });

    if (existingPage) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }

    // Create page
    const page = await prisma.page.create({
      data: {
        userId: session.user.id,
        username,
        title,
        bio: bio || "",
        avatarUrl: avatarUrl || "",
        theme: theme || "default",
      },
    });

    return NextResponse.json({ page }, { status: 201 });
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
    const { title, bio, avatarUrl, theme } = z.object({
      title: z.string().min(1).max(100).optional(),
      bio: z.string().max(500).optional(),
      avatarUrl: z.string().url().optional().or(z.literal("")),
      theme: z.string().optional(),
    }).parse(body);

    const page = await prisma.page.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const updatedPage = await prisma.page.update({
      where: {
        id: page.id,
      },
      data: {
        ...(title && { title }),
        ...(bio !== undefined && { bio }),
        ...(avatarUrl !== undefined && { avatarUrl }),
        ...(theme && { theme }),
      },
    });

    return NextResponse.json({ page: updatedPage });
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
