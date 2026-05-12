"use client";

import Link from "next/link";
import { GraduationCap, Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { label: "Courses",        href: "/courses" },
  { label: "Become a Tutor", href: "/become-a-tutor" },
  { label: "About Us",       href: "/about" },
  { label: "Contact",        href: "/contact" },
];

const SUPPORT_LINKS = [
  { label: "Help Center",     href: "#" },
  { label: "FAQs",            href: "#" },
  { label: "Privacy Policy",  href: "#" },
  { label: "Terms of Service",href: "#" },
];

const SOCIAL = [
  { Icon: Facebook,  href: "https://www.facebook.com/share/187WJjCcgc/", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/nextstepacademyonline", label: "Instagram" },
  { Icon: Linkedin,  href: "#",                                            label: "LinkedIn" },
  { Icon: Youtube,   href: "https://www.youtube.com/@NEXTSTEPACADEMYONLINE", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-200 pt-16 pb-8">
      <div className="container-wide px-4 sm:px-6">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-maroon-800 rounded-lg flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="font-outfit font-bold text-white text-lg leading-tight">
                NextStep<br />
                <span className="text-gold-400 text-sm font-medium tracking-wide">Academy</span>
              </span>
            </Link>

            <p className="text-small text-cream-200/60 leading-relaxed mb-5">
              Empowering students of all ages through personalized, technology-driven
              online learning across UAE & India.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a href="mailto:nsnextstepacademyonline@gmail.com"
                 className="flex items-start gap-2.5 text-small text-cream-200/60 hover:text-gold-400 transition-colors">
                <Mail size={14} className="mt-0.5 shrink-0" />
                nsnextstepacademyonline@gmail.com
              </a>
              <a href="tel:+919567175595"
                 className="flex items-center gap-2.5 text-small text-cream-200/60 hover:text-gold-400 transition-colors">
                <Phone size={14} className="shrink-0" />
                +91 95671 75595 / +971 547165524
              </a>
              <span className="flex items-center gap-2.5 text-small text-cream-200/60">
                <MapPin size={14} className="shrink-0" />
                UAE & India
              </span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-maroon-800
                             flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-4 text-small uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-small text-cream-200/60 hover:text-gold-400
                               transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-maroon-600" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-4 text-small uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-small text-cream-200/60 hover:text-gold-400
                               transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-maroon-600" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-4 text-small uppercase tracking-wider">
              Book a Free Demo
            </h4>
            <p className="text-small text-cream-200/60 mb-4 leading-relaxed">
              Let your child experience a personalized session with one of our expert tutors — completely free.
            </p>
            <button
              onClick={() => {
                const msg = encodeURIComponent("Hi, I'd like to book a free demo class at NextStep Academy.");
                window.open(`https://wa.me/919567175595?text=${msg}`, "_blank");
              }}
              className="btn-gold btn-sm w-full justify-center text-small"
            >
              📅 Schedule Free Demo
            </button>

            <div className="mt-5 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-small font-semibold text-cream-200 mb-1">Working Hours</p>
              <p className="text-small text-cream-200/60">Mon – Sat: 10:00 AM – 6:00 PM</p>
              <p className="text-small text-cream-200/60">Sunday: By appointment</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-small text-cream-200/40">
            © {new Date().getFullYear()} NextStep Academy. All rights reserved.
          </p>
          <p className="text-small text-cream-200/40">
            Trusted by families across{" "}
            <span className="text-gold-400">UAE & India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
