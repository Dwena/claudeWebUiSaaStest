import Link from "next/link";
import { FaLink, FaCheck } from "react-icons/fa";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <FaLink className="text-primary-600 text-2xl mr-2" />
              <span className="text-2xl font-bold text-black">LinkPro</span>
            </Link>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-black">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-2">Free</h2>
            <div className="mb-6">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-black">/month</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>1 bio page</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>Up to 5 links</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>Basic themes</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>Basic analytics</span>
              </li>
            </ul>

            <Link
              href="/register"
              className="block w-full text-center bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-xl p-8 text-white relative">
            <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 rounded-bl-lg rounded-tr-lg font-semibold text-sm">
              POPULAR
            </div>

            <h2 className="text-2xl font-bold mb-2">Pro</h2>
            <div className="mb-6">
              <span className="text-5xl font-bold">$9</span>
              <span className="text-primary-100">/month</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <FaCheck className="text-yellow-300 mt-1 mr-3 flex-shrink-0" />
                <span>Everything in Free</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-yellow-300 mt-1 mr-3 flex-shrink-0" />
                <span><strong>Unlimited links</strong></span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-yellow-300 mt-1 mr-3 flex-shrink-0" />
                <span>Custom themes & colors</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-yellow-300 mt-1 mr-3 flex-shrink-0" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-yellow-300 mt-1 mr-3 flex-shrink-0" />
                <span>Custom domain support</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-yellow-300 mt-1 mr-3 flex-shrink-0" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-yellow-300 mt-1 mr-3 flex-shrink-0" />
                <span>Remove LinkPro branding</span>
              </li>
            </ul>

            <Link
              href="/register"
              className="block w-full text-center bg-white text-primary-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Pro Trial
            </Link>
            <p className="text-center text-sm text-primary-100 mt-3">
              14-day free trial, no credit card required
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-2">
                Can I upgrade or downgrade anytime?
              </h3>
              <p className="text-black">
                Yes! You can upgrade to Pro or downgrade to Free at any time. Changes take effect immediately.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-2">
                What happens to my links if I downgrade?
              </h3>
              <p className="text-black">
                If you downgrade from Pro to Free and have more than 5 links, your links will remain but only the first 5 will be visible to visitors.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-black">
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-2">
                How do custom domains work?
              </h3>
              <p className="text-black">
                With Pro, you can connect your own domain (e.g., links.yourdomain.com) instead of using linkpro.com/username. We'll provide simple instructions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to get started?
          </h2>
          <Link
            href="/register"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
          >
            Create Your Free Account
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
