import Link from "next/link";
import { FaLink, FaChartLine, FaPalette, FaRocket } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FaLink className="text-primary-600 text-2xl mr-2" />
              <span className="text-2xl font-bold text-black">LinkPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-black hover:text-black font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 font-medium transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            One Link for Everything
          </h1>
          <p className="text-xl md:text-2xl text-black mb-8 max-w-3xl mx-auto">
            Share your content, social profiles, and contact info with a single link.
            Perfect for Instagram, TikTok, Twitter, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
            >
              Create Your Page Free
            </Link>
            <Link
              href="/pricing"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition border-2 border-primary-600"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-4 text-black">
            No credit card required • Free forever plan available
          </p>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-primary-600 text-3xl mb-4">
              <FaLink />
            </div>
            <h3 className="text-xl font-semibold mb-2">Unlimited Links</h3>
            <p className="text-black">
              Add all your important links in one place. Social media, websites, stores, and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-primary-600 text-3xl mb-4">
              <FaPalette />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Themes</h3>
            <p className="text-black">
              Choose from beautiful themes or create your own with custom colors and styles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-primary-600 text-3xl mb-4">
              <FaChartLine />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-black">
              Track clicks, views, and engagement to understand your audience better.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-primary-600 text-3xl mb-4">
              <FaRocket />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-black">
              Lightning-fast page loads and 99.9% uptime ensure your links are always accessible.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-primary-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of creators, influencers, and businesses using LinkPro
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Create Your Free Page
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaLink className="text-primary-600 text-xl mr-2" />
              <span className="text-xl font-bold text-black">LinkPro</span>
            </div>
            <p className="text-black">
              &copy; 2024 LinkPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
