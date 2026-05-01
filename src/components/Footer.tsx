import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <HiOutlineAcademicCap className="text-white text-xl" />
              </div>
              <span className="text-xl font-extrabold">
                <span className="text-green-500">Skill</span>
                <span className="text-base-content">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-base-content/60 leading-relaxed">
              Empowering learners worldwide with high-quality, expert-led courses
              across technology, design, business, and more.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <FaFacebookF />, href: "#", label: "Facebook" },
                { icon: <FaTwitter />, href: "#", label: "Twitter" },
                { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
                { icon: <FaYoutube />, href: "#", label: "YouTube" },
                { icon: <FaInstagram />, href: "#", label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center text-base-content/60 hover:bg-green-500 hover:text-white transition-all duration-200 text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/courses", label: "All Courses" },
                { href: "/my-profile", label: "My Profile" },
                { href: "/login", label: "Login" },
                { href: "/register", label: "Register" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/60 hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {[
                "Web Development",
                "UI/UX Design",
                "Digital Marketing",
                "Data Science",
                "Cloud Computing",
                "Cybersecurity",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/courses?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-base-content/60 hover:text-green-500 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-base-content uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-green-500 text-lg mt-0.5 shrink-0" />
                <span className="text-sm text-base-content/60">
                  123 Learning Ave, San Francisco, CA 94105
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="text-green-500 text-lg shrink-0" />
                <a
                  href="tel:+11234567890"
                  className="text-sm text-base-content/60 hover:text-green-500 transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-green-500 text-lg shrink-0" />
                <a
                  href="mailto:hello@skillsphere.dev"
                  className="text-sm text-base-content/60 hover:text-green-500 transition-colors"
                >
                  hello@skillsphere.dev
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-base-content/50">
            © {new Date().getFullYear()} SkillSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-sm text-base-content/50 hover:text-green-500 transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-base-content/50 hover:text-green-500 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
