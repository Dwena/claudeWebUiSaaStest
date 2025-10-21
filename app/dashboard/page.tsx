"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaLink, FaPlus, FaEdit, FaTrash, FaEye, FaChartLine, FaCrown } from "react-icons/fa";

type Link = {
  id: string;
  title: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
};

type Page = {
  id: string;
  username: string;
  title: string;
  bio: string;
  avatarUrl: string;
  theme: string;
  links: Link[];
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [showAddLink, setShowAddLink] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  // Form states
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPage();
    }
  }, [status]);

  const fetchPage = async () => {
    try {
      const res = await fetch("/api/page");
      const data = await res.json();

      if (data.page) {
        setPage(data.page);
        setTitle(data.page.title);
        setBio(data.page.bio);
      } else {
        setShowCreatePage(true);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching page:", error);
      setLoading(false);
    }
  };

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, title, bio }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setPage(data.page);
      setShowCreatePage(false);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleUpdatePage = async () => {
    setError("");

    try {
      const res = await fetch("/api/page", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, bio }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setPage(data.page);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: linkTitle, url: linkUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      fetchPage();
      setShowAddLink(false);
      setLinkTitle("");
      setLinkUrl("");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
      await fetch(`/api/links?linkId=${linkId}`, {
        method: "DELETE",
      });

      fetchPage();
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (showCreatePage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Create Your Page</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleCreatePage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">linkpro.com/</span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="yourname"
                  pattern="[a-zA-Z0-9_-]+"
                  minLength={3}
                  maxLength={30}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio (optional)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Tell people about yourself..."
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Create Page
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FaLink className="text-primary-600 text-2xl mr-2" />
              <span className="text-2xl font-bold text-gray-900">LinkPro</span>
            </div>
            <div className="flex items-center space-x-4">
              {!session?.user?.isPro && (
                <Link
                  href="/pricing"
                  className="flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  <FaCrown className="mr-2" />
                  Upgrade to Pro
                </Link>
              )}
              <span className="text-gray-700">{session?.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="text-gray-700 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Editor */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Page Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Link
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/${page?.username}`}
                      readOnly
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <Link
                      href={`/${page?.username}`}
                      target="_blank"
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center"
                    >
                      <FaEye className="mr-2" />
                      View
                    </Link>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleUpdatePage}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    onBlur={handleUpdatePage}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Links</h2>
                <button
                  onClick={() => setShowAddLink(true)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Add Link
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              {showAddLink && (
                <form onSubmit={handleAddLink} className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Link title"
                      value={linkTitle}
                      onChange={(e) => setLinkTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddLink(false);
                          setLinkTitle("");
                          setLinkUrl("");
                        }}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {page?.links && page.links.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No links yet. Add your first link to get started!
                  </p>
                ) : (
                  page?.links.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{link.title}</h3>
                        <p className="text-sm text-gray-500 truncate">{link.url}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {!session?.user?.isPro && page?.links && page.links.length >= 5 && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    You've reached the free plan limit of 5 links.{" "}
                    <Link href="/pricing" className="font-semibold underline">
                      Upgrade to Pro
                    </Link>{" "}
                    for unlimited links!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Preview */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Preview</h2>

              <div className="border-4 border-gray-300 rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[600px]">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold mb-2">{title || "Your Name"}</h1>
                  <p className="text-gray-600">{bio || "Your bio goes here"}</p>
                </div>

                <div className="space-y-3">
                  {page?.links && page.links.length > 0 ? (
                    page.links.map((link) => (
                      <div
                        key={link.id}
                        className="bg-white rounded-lg p-4 text-center font-semibold hover:bg-gray-50 transition cursor-pointer shadow-sm"
                      >
                        {link.title}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      Your links will appear here
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
