"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, GraduationCap } from "lucide-react";

const COURSE_CATEGORIES = [
  { label: "Foundation Course",     href: "/courses/foundation-course" },
  { label: "Advanced Language",     href: "/courses/advanced-language-course" },
  { label: "Spoken Language",       href: "/courses/spoken-language-course" },
  { label: "Cursive Writing",       href: "/courses/cursive-writing-course" },
  { label: "Art & Craft",           href: "/courses/art-craft-courses" },
  { label: "Parent & Ward Counselling", href: "/courses/parent-ward-counselling" },
];

const NAV_LINKS = [
  { label: "Home",           href: "/" },
  { label: "Courses",        href: "/courses",          hasDrop: true },
  { label: "Become a Tutor", href: "/become-a-tutor" },
  { label: "About",          href: "/about" },
  { label: "Contact",        href: "/contact" },
];

export default function Navbar() {
  const pathname   = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [hidden,   setHidden]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesDrop, setCoursesDrop] = useState(false);
  const lastScrollY = useRef(0);
  const dropRef = useRef<HTMLDivElement>(null);

  // Scroll hide / solid logic
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > lastScrollY.current && y > 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setCoursesDrop(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-cream-200" : "bg-maroon-900/20 backdrop-blur-md border-b border-white/10"}
          ${hidden ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        <div className="container-wide px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 bg-maroon-800 rounded-lg flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className={`font-outfit font-bold text-lg leading-tight transition-colors duration-300 ${scrolled ? "text-charcoal-900" : "text-white"
}`}>
                NextStep<br />
                <span className={`text-sm font-semibold tracking-wide ${ scrolled ? "text-maroon-800" : "text-white/80"}`}>Academy</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.hasDrop ? (
                  <div key={link.label} ref={dropRef} className="relative">
                    <button
  onClick={() => setCoursesDrop((v) => !v)}
  className={`nav-link flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
    scrolled
      ? "text-charcoal-900 hover:bg-cream-100"
      : "text-white/90 hover:text-white hover:bg-white/10"
  } ${isActive(link.href) ? "active" : ""}`}
>
  {link.label}
  <ChevronDown
    size={14}
    className={`transition-transform duration-200 ${
      coursesDrop ? "rotate-180" : ""
    }`}
  />
</button>

                    <AnimatePresence>
                      {coursesDrop && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg
                                     border border-cream-200 py-2 overflow-hidden"
                        >
                          {COURSE_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              onClick={() => setCoursesDrop(false)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-small text-charcoal-800
                                         hover:bg-cream-100 hover:text-maroon-800 transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-maroon-800/40" />
                              {cat.label}
                            </Link>
                          ))}
                          <div className="mx-3 mt-1 pt-2 border-t border-cream-200">
                            <Link
                              href="/courses"
                              onClick={() => setCoursesDrop(false)}
                              className="flex items-center justify-center gap-1 py-2 text-small
                                         font-semibold text-maroon-800 hover:underline"
                            >
                              View All Courses →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
  key={link.label}
  href={link.href}
  className={`nav-link px-3 py-2 rounded-md transition-colors ${
    scrolled
      ? "text-charcoal-900 hover:bg-cream-100"
      : "text-white/90 hover:text-white hover:bg-white/10"
  } ${isActive(link.href) ? "active" : ""}`}
>
  {link.label}
</Link>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/courses" className="btn-secondary btn-sm text-small">
                Explore Courses
              </Link>
              <button
                className="btn-primary btn-sm text-small"
                onClick={() => {
                  const msg = encodeURIComponent("Hi, I'd like to book a free demo class at NextStep Academy.");
                  window.open(`https://wa.me/919567175595?text=${msg}`, "_blank");
                }}
              >
                Free Demo 🎓
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-cream-200 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-charcoal-900/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-xl
                         flex flex-col md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-cream-200">
                <span className="font-outfit font-bold text-maroon-800">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-cream-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto p-5 space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-lg font-medium
                        transition-colors hover:bg-cream-100 hover:text-maroon-800
                        ${isActive(link.href) ? "bg-maroon-800/8 text-maroon-800 font-semibold" : "text-charcoal"}`}
                    >
                      {link.label}
                    </Link>
                    {link.hasDrop && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-cream-300 pl-3">
                        {COURSE_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className="block py-2 text-small text-gray-500 hover:text-maroon-800"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-5 border-t border-cream-200 space-y-3">
                <Link href="/courses" className="btn-secondary w-full justify-center">
                  Explore Courses
                </Link>
                <button
                  className="btn-primary w-full justify-center"
                  onClick={() => {
                    const msg = encodeURIComponent("Hi, I'd like to book a free demo class at NextStep Academy.");
                    window.open(`https://wa.me/919567175595?text=${msg}`, "_blank");
                  }}
                >
                  Book Free Demo 🎓
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
