"use client";

import { FaExternalLinkAlt } from "react-icons/fa";

type LinkButtonProps = {
  link: {
    id: string;
    title: string;
    url: string;
  };
  pageId: string;
  className: string;
};

export default function LinkButton({ link, pageId, className }: LinkButtonProps) {
  const handleClick = async () => {
    // Track click in background (don't await to avoid blocking navigation)
    fetch("/api/analytics/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId: link.id, pageId }),
    }).catch((error) => {
      // Silently fail - analytics shouldn't block user experience
      console.error("Failed to track click:", error);
    });
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center">
        <span>{link.title}</span>
        <FaExternalLinkAlt className="ml-2 text-sm opacity-50" />
      </div>
    </a>
  );
}
