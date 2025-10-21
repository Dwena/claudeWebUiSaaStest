import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FaExternalLinkAlt } from "react-icons/fa";

type Props = {
  params: {
    username: string;
  };
};

async function getPage(username: string) {
  const page = await prisma.page.findUnique({
    where: {
      username: username.toLowerCase(),
      isPublished: true,
    },
    include: {
      links: {
        where: {
          isActive: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return page;
}

async function trackPageView(pageId: string) {
  await prisma.pageView.create({
    data: {
      pageId,
    },
  });
}

export default async function UserPage({ params }: Props) {
  const page = await getPage(params.username);

  if (!page) {
    notFound();
  }

  // Track page view (in production, you'd want to do this client-side to avoid blocking)
  await trackPageView(page.id);

  const themes: Record<string, string> = {
    default: "bg-gradient-to-br from-blue-50 to-indigo-100",
    dark: "bg-gradient-to-br from-gray-900 to-gray-800",
    sunset: "bg-gradient-to-br from-orange-100 to-pink-100",
    forest: "bg-gradient-to-br from-green-100 to-teal-100",
    ocean: "bg-gradient-to-br from-blue-100 to-cyan-100",
  };

  const linkStyles: Record<string, string> = {
    default: "bg-white text-gray-900 hover:bg-gray-50",
    dark: "bg-gray-800 text-white hover:bg-gray-700",
    sunset: "bg-white text-gray-900 hover:bg-orange-50",
    forest: "bg-white text-gray-900 hover:bg-green-50",
    ocean: "bg-white text-gray-900 hover:bg-blue-50",
  };

  const textStyles: Record<string, string> = {
    default: "text-gray-900",
    dark: "text-white",
    sunset: "text-gray-900",
    forest: "text-gray-900",
    ocean: "text-gray-900",
  };

  const bioStyles: Record<string, string> = {
    default: "text-gray-600",
    dark: "text-gray-300",
    sunset: "text-gray-700",
    forest: "text-gray-700",
    ocean: "text-gray-700",
  };

  const theme = page.theme || "default";
  const bgClass = themes[theme] || themes.default;
  const linkClass = linkStyles[theme] || linkStyles.default;
  const textClass = textStyles[theme] || textStyles.default;
  const bioClass = bioStyles[theme] || bioStyles.default;

  return (
    <div className={`min-h-screen ${bgClass} py-12 px-4`}>
      <div className="max-w-2xl mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-12">
          {page.avatarUrl && (
            <img
              src={page.avatarUrl}
              alt={page.title}
              className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
            />
          )}
          {!page.avatarUrl && (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {page.title.charAt(0).toUpperCase()}
            </div>
          )}

          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${textClass}`}>
            {page.title}
          </h1>

          {page.bio && (
            <p className={`text-lg mb-6 max-w-xl mx-auto ${bioClass}`}>
              {page.bio}
            </p>
          )}
        </div>

        {/* Links Section */}
        <div className="space-y-4 mb-12">
          {page.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${linkClass} rounded-xl p-5 text-center font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1`}
              onClick={async () => {
                // Track click
                await fetch("/api/analytics/click", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ linkId: link.id, pageId: page.id }),
                });
              }}
            >
              <div className="flex items-center justify-center">
                <span>{link.title}</span>
                <FaExternalLinkAlt className="ml-2 text-sm opacity-50" />
              </div>
            </a>
          ))}

          {page.links.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-lg ${bioClass}`}>
                No links available yet
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center">
          <a
            href="/"
            className={`text-sm ${bioClass} hover:underline inline-flex items-center`}
          >
            Create your own LinkPro page
          </a>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const page = await getPage(params.username);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${page.title} - LinkPro`,
    description: page.bio || `Check out ${page.title}'s links`,
  };
}
