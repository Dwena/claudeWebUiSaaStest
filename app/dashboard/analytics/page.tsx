"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaLink, FaEye, FaMousePointer, FaArrowLeft, FaChartBar } from "react-icons/fa";

type LinkClickData = {
  linkId: string;
  linkTitle: string;
  linkUrl: string;
  totalClicks: number;
  recentClicks: number;
};

type Analytics = {
  totalViews: number;
  recentViews: number;
  totalClicks: number;
  recentClicks: number;
  linkClicks: LinkClickData[];
};

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [status]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/analytics");
      const data = await res.json();

      if (data.analytics) {
        setAnalytics(data.analytics);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setLoading(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-black">Chargement...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <FaLink className="text-primary-600 text-2xl mr-2" />
                <span className="text-2xl font-bold text-black">LinkPro</span>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-black">Aucune donnée disponible. Créez d'abord votre page.</p>
          <Link href="/dashboard" className="text-primary-600 underline mt-4 inline-block">
            Retour au dashboard
          </Link>
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
              <span className="text-2xl font-bold text-black">LinkPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-black">{session?.user?.email}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-black hover:text-black mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Retour au dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2 flex items-center">
            <FaChartBar className="mr-3 text-primary-600" />
            Statistiques
          </h1>
          <p className="text-black">Suivez les performances de votre page</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Views */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaEye className="text-blue-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-black text-sm font-medium mb-1">Vues totales</h3>
            <p className="text-3xl font-bold text-black">{analytics.totalViews}</p>
            <p className="text-sm text-black mt-2">
              {analytics.recentViews} ces 7 derniers jours
            </p>
          </div>

          {/* Recent Views */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FaEye className="text-green-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-black text-sm font-medium mb-1">Vues (7 jours)</h3>
            <p className="text-3xl font-bold text-black">{analytics.recentViews}</p>
            <p className="text-sm text-black mt-2">Cette semaine</p>
          </div>

          {/* Total Clicks */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaMousePointer className="text-purple-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-black text-sm font-medium mb-1">Clics totaux</h3>
            <p className="text-3xl font-bold text-black">{analytics.totalClicks}</p>
            <p className="text-sm text-black mt-2">
              {analytics.recentClicks} ces 7 derniers jours
            </p>
          </div>

          {/* Recent Clicks */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FaMousePointer className="text-orange-600 text-2xl" />
              </div>
            </div>
            <h3 className="text-black text-sm font-medium mb-1">Clics (7 jours)</h3>
            <p className="text-3xl font-bold text-black">{analytics.recentClicks}</p>
            <p className="text-sm text-black mt-2">Cette semaine</p>
          </div>
        </div>

        {/* Links Performance */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-black mb-6">
            Performance des liens
          </h2>

          {analytics.linkClicks.length === 0 ? (
            <p className="text-black text-center py-8">
              Aucun lien pour le moment. Ajoutez des liens pour voir leurs statistiques.
            </p>
          ) : (
            <div className="space-y-4">
              {analytics.linkClicks.map((link) => (
                <div
                  key={link.linkId}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-black text-lg mb-1">
                        {link.linkTitle}
                      </h3>
                      <p className="text-sm text-black truncate">{link.linkUrl}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-black font-medium mb-1">
                        Clics totaux
                      </p>
                      <p className="text-2xl font-bold text-black">
                        {link.totalClicks}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-black font-medium mb-1">
                        Clics (7 jours)
                      </p>
                      <p className="text-2xl font-bold text-black">
                        {link.recentClicks}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {analytics.totalClicks > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-black mb-1">
                        <span>Performance</span>
                        <span>
                          {Math.round((link.totalClicks / analytics.totalClicks) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{
                            width: `${(link.totalClicks / analytics.totalClicks) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-black mb-2 flex items-center">
            <FaChartBar className="mr-2 text-primary-600" />
            À propos des statistiques
          </h3>
          <ul className="space-y-2 text-black">
            <li>• Les vues sont comptabilisées chaque fois que quelqu'un visite votre page</li>
            <li>• Les clics sont enregistrés lorsqu'un visiteur clique sur un de vos liens</li>
            <li>• Les statistiques "7 jours" montrent l'activité de la dernière semaine</li>
            <li>• La barre de performance montre quel lien est le plus populaire</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
