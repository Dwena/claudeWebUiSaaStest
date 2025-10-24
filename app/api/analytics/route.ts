import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    // Get total page views
    const totalViews = await prisma.pageView.count({
      where: {
        pageId: page.id,
      },
    });

    // Get views in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentViews = await prisma.pageView.count({
      where: {
        pageId: page.id,
        viewedAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    // Get clicks per link
    const linkClicksData = await Promise.all(
      page.links.map(async (link) => {
        const totalClicks = await prisma.linkClick.count({
          where: {
            linkId: link.id,
          },
        });

        const recentClicks = await prisma.linkClick.count({
          where: {
            linkId: link.id,
            clickedAt: {
              gte: sevenDaysAgo,
            },
          },
        });

        return {
          linkId: link.id,
          linkTitle: link.title,
          linkUrl: link.url,
          totalClicks,
          recentClicks,
        };
      })
    );

    // Get total clicks across all links
    const totalClicks = await prisma.linkClick.count({
      where: {
        pageId: page.id,
      },
    });

    const recentClicks = await prisma.linkClick.count({
      where: {
        pageId: page.id,
        clickedAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    return NextResponse.json({
      analytics: {
        totalViews,
        recentViews,
        totalClicks,
        recentClicks,
        linkClicks: linkClicksData,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
