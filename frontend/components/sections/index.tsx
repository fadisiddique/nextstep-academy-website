// ──────────────────────────────────────────────────────────────────────────
//  ALL PAGE SECTIONS  (each exported separately)
// ──────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Users, BookOpen, Star, Award,
  CheckCircle, Clock, Zap, Globe,
  Heart, TrendingUp, Laptop, ChevronDown, ArrowRight,
} from "lucide-react";
import CourseCard, { CourseCardSkeleton } from "@/components/CourseCard";
import TestimonialCard from "@/components/TestimonialCard";
import DemoModal from "@/components/DemoModal";
import { coursesApi, testimonialsApi } from "@/lib/api";
import type { Course, Testimonial } from "@/types";

// ═══════════════════════════════════════════════════════════════════════════
//  STATS SECTION
// ═══════════════════════════════════════════════════════════════════════════

const STATS = [
  { label: "Students Enrolled", value: "500+", icon: <Users size={24} className="text-maroon-800" /> },
  { label: "Courses Offered",   value: "12+",  icon: <BookOpen size={24} className="text-gold-500" /> },
  { label: "Average Rating",    value: "4.9★", icon: <Star size={24} className="text-gold-500 fill-gold-500" /> },
  { label: "Expert Tutors",     value: "15+",  icon: <Award size={24} className="text-maroon-800" /> },
];

export function StatsSection() {
  return (
    <section className="py-12 bg-white border-y border-cream-200">
      <div className="container-wide px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-2 p-4"
            >
              <div className="w-12 h-12 rounded-xl bg-cream-100 flex items-center justify-center mb-1">
                {s.icon}
              </div>
              <p className="font-outfit font-bold text-maroon-800"
                 style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)" }}>
                {s.value}
              </p>
              <p className="text-small text-gray-500 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  TRUST SECTION
// ═══════════════════════════════════════════════════════════════════════════

const TRUST_ITEMS = [
  { label: "UAE Families", flag: "🇦🇪" },
  { label: "Indian Families", flag: "🇮🇳" },
  { label: "CBSE Curriculum", flag: "📚" },
  { label: "British Curriculum", flag: "🎓" },
  { label: "ICSE Curriculum", flag: "📖" },
  { label: "WhatsApp Support", flag: "📲" },
];

export function TrustSection() {
  return (
    <section className="py-10 bg-cream-100 border-b border-cream-200 overflow-hidden">
      <div className="container-wide px-4 sm:px-6 mb-4">
        <p className="text-center text-small text-gray-500 font-medium uppercase tracking-widest">
          Serving families with
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 px-4">
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full
                       border border-cream-200 shadow-sm text-small font-medium text-charcoal-800"
          >
            <span>{item.flag}</span>
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  FEATURES SECTION
// ═══════════════════════════════════════════════════════════════════════════

const FEATURES = [
  {
    icon: <Laptop size={22} className="text-maroon-800" />,
    title: "One-to-One Sessions",
    desc: "Fully personalized sessions where the tutor focuses entirely on your child's needs, pace, and learning style.",
  },
  {
    icon: <Globe size={22} className="text-gold-500" />,
    title: "Learn From Anywhere",
    desc: "Our platform is fully online — students from UAE, India, or anywhere in the world can join with ease.",
  },
  {
    icon: <Clock size={22} className="text-maroon-800" />,
    title: "Flexible Scheduling",
    desc: "Book sessions around your family's schedule. Morning, evening, weekdays or weekends — your choice.",
  },
  {
    icon: <TrendingUp size={22} className="text-gold-500" />,
    title: "Measurable Progress",
    desc: "Regular assessments and detailed progress reports so parents always know how their child is advancing.",
  },
  {
    icon: <Heart size={22} className="text-maroon-800" />,
    title: "Confidence Building",
    desc: "Our teaching approach is nurturing and encouraging — designed to build academic confidence alongside skills.",
  },
  {
    icon: <Zap size={22} className="text-gold-500" />,
    title: "Interactive Learning",
    desc: "Engaging worksheets, quizzes, and activities make learning enjoyable and help concepts stick longer.",
  },
];

export function FeaturesSection() {
  return (
    <section className="section bg-white">
      <div className="container-wide px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-pill">Why NextStep</span>
          <h2 className="section-title">
            Learning that actually{" "}
            <span className="text-gradient">works</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We combine expert tutors, technology, and genuine care to create an experience
            students look forward to — every session.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-6 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-lg bg-cream-100 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-outfit font-semibold text-h4 text-charcoal-900 mb-2">
                {f.title}
              </h3>
              <p className="text-small text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  COURSES PREVIEW
// ═══════════════════════════════════════════════════════════════════════════

export function CoursesPreview() {
  const [courses, setCourses]   = useState<Course[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    coursesApi.getAll({ featured: true })
      .then((res) => setCourses(res.data.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section bg-cream-100">
      <div className="container-wide px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-pill">Our Courses</span>
            <h2 className="section-title mb-0">
              Find the perfect course<br />for your child
            </h2>
          </div>
          <Link href="/courses" className="btn-outline btn-sm shrink-0 self-start sm:self-auto">
            View All Courses <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)
            : courses.map((c, i) => <CourseCard key={c._id} course={c} index={i} />)
          }
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  TESTIMONIALS SECTION
// ═══════════════════════════════════════════════════════════════════════════

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialsApi.getAll({ featured: true, active: true })
      .then((res) => setTestimonials(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section bg-white">
      <div className="container-wide px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-pill">Testimonials</span>
          <h2 className="section-title">
            Families that <span className="text-gradient">trust us</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Real results, real stories — from parents and students across UAE & India.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card p-6 space-y-3">
                <div className="skeleton h-4 rounded w-24" />
                <div className="skeleton h-20 rounded" />
                <div className="flex gap-3 items-center pt-2">
                  <div className="skeleton w-10 h-10 rounded-full" />
                  <div className="space-y-1 flex-1">
                    <div className="skeleton h-3 rounded w-28" />
                    <div className="skeleton h-3 rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t._id} testimonial={t} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  DEMO CTA SECTION
// ═══════════════════════════════════════════════════════════════════════════

export function DemoCtaSection() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section className="py-20 relative overflow-hidden bg-maroon-800">
        {/* Decorative blob */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9973A 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FAF7F2 0%, transparent 70%)" }}
        />

        <div className="container-tight px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-5">
              🎓 Limited Spots Available
            </span>
            <h2
              className="font-outfit font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em" }}
            >
              Experience a FREE Demo Class Today
            </h2>
            <p className="text-body-lg text-cream-200/80 max-w-xl mx-auto mb-8">
              Let your child meet their tutor, experience our teaching style, and see
              the difference for themselves — completely free, no commitment needed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setDemoOpen(true)}
                className="btn bg-white text-maroon-800 px-8 py-4 rounded-xl font-semibold
                           text-body hover:bg-cream-100 active:scale-[.98] shadow-lg
                           hover:shadow-xl transition-all group"
              >
                Book My Free Demo
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const msg = encodeURIComponent("Hi, I have some questions about NextStep Academy. Can you help?");
                  window.open(`https://wa.me/919567175595?text=${msg}`, "_blank");
                }}
                className="btn border-2 border-white/30 text-white px-8 py-4 rounded-xl
                           font-semibold text-body hover:bg-white/10 transition-colors"
              >
                💬 Chat on WhatsApp
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              {["No credit card required", "1-hour demo session", "Personalized for your child"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-small text-cream-200/70">
                  <CheckCircle size={14} className="text-gold-400" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  FAQ SECTION
// ═══════════════════════════════════════════════════════════════════════════

const FAQS = [
  {
    q: "Who are the tutors at NextStep Academy?",
    a: "Our tutors are experienced, vetted educators with strong subject expertise and a genuine passion for teaching. Each tutor undergoes a thorough screening process before joining our platform.",
  },
  {
    q: "What age groups do you cater to?",
    a: "We work with students from Pre-KG all the way through Grade 12, as well as adult learners for language courses. Our programs are fully adapted to each age group's curriculum and learning needs.",
  },
  {
    q: "How is the free demo structured?",
    a: "Your child will have a 1-hour session with one of our tutors. The tutor will assess your child's current level, understand their goals, and give you a clear learning plan — all at no charge.",
  },
  {
    q: "Do you follow UAE or Indian curriculum?",
    a: "Yes — we support CBSE, ICSE, and British curriculum (including MOE UAE). Our tutors are familiar with all major curricula followed by families in UAE and India.",
  },
  {
    q: "How do I pay and what are the timings?",
    a: "Pricing and scheduling are discussed after the free demo, based on your child's needs and preferred timing. Sessions are available Monday to Saturday, 10AM–6PM, with flexibility for other timings by arrangement.",
  },
  {
    q: "Can I switch tutors if needed?",
    a: "Absolutely. We want your child to thrive. If the tutor-student match isn't working out, we'll find a better fit at no extra charge.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section bg-cream-50">
      <div className="container-tight px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-pill">FAQ</span>
          <h2 className="section-title">Common questions</h2>
          <p className="section-subtitle mx-auto">
            Everything parents ask us before enrolling their child.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <button
                className="w-full text-left card p-5 flex items-start justify-between gap-4
                           hover:shadow-md transition-shadow"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-outfit font-semibold text-charcoal-900 text-body">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-maroon-800 transition-transform duration-200 mt-0.5
                    ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 py-4 bg-cream-100 rounded-b-xl border border-t-0 border-cream-200">
                      <p className="text-body text-gray-500 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
