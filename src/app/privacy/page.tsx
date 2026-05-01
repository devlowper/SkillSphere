import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SkillSphere Privacy Policy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-base-100 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link href="/" className="text-sm text-green-500 hover:underline">← Back to Home</Link>
          <h1 className="text-3xl font-extrabold text-base-content mt-4 mb-2">Privacy Policy</h1>
          <p className="text-sm text-base-content/50">Last updated: January 1, 2025</p>
        </div>
        <div className="prose prose-sm max-w-none text-base-content/70 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-base-content">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, enroll in a course, or contact us for support. This includes your name, email address, and profile photo URL.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-base-content">2. How We Use Your Information</h2>
            <p>We use the information we collect to operate, maintain, and provide you with the features and functionality of SkillSphere, including to personalize your learning experience and send you notifications.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-base-content">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Passwords are hashed and never stored in plain text.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-base-content">4. Cookies</h2>
            <p>We use session cookies to authenticate users and maintain your logged-in state. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-base-content">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@skillsphere.dev" className="text-green-500 hover:underline">privacy@skillsphere.dev</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
