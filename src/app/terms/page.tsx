import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "SkillSphere Terms and Conditions of use.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-base-100 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link href="/" className="text-sm text-green-500 hover:underline">← Back to Home</Link>
          <h1 className="text-3xl font-extrabold text-base-content mt-4 mb-2">Terms & Conditions</h1>
          <p className="text-sm text-base-content/50">Last updated: January 1, 2025</p>
        </div>
        <div className="prose prose-sm max-w-none text-base-content/70 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-base-content">1. Acceptance of Terms</h2>
            <p>By accessing and using SkillSphere, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-base-content">2. Use License</h2>
            <p>Permission is granted to temporarily access the materials (information or software) on SkillSphere for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-base-content">3. User Accounts</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password that you use to access the service.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-base-content">4. Course Content</h2>
            <p>All course content is provided for educational purposes only. SkillSphere reserves the right to modify, suspend, or discontinue any course at any time without notice.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-base-content">5. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@skillsphere.dev" className="text-green-500 hover:underline">legal@skillsphere.dev</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
