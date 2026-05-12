"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Shield, PlayCircle } from "lucide-react";
import DemoModal from "@/components/DemoModal";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden
                           bg-gradient-to-br from-cream-100 via-cream-50 to-white pt-20">

        {/* Background decoration — subtle, not noisy */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large maroon gradient blob — top right */}
          <div
            className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #6B1A2A 0%, transparent 70%)" }}
          />
          {/* Small gold blob — bottom left */}
          <div
            className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle, #C9973A 0%, transparent 70%)" }}
          />
          {/* Grid pattern — very faint */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(#6B1A2A 1px, transparent 1px),
                                linear-gradient(90deg, #6B1A2A 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container-wide px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT — text */}
            <div className="relative z-10">

              {/* Trust badge */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                           bg-maroon-800/8 border border-maroon-800/20 mb-6"
              >
                <Shield size={14} className="text-maroon-800" />
                <span className="text-small font-semibold text-maroon-800 font-outfit">
                  Trusted by families across UAE & India
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-outfit font-bold text-charcoal-900 mb-5 leading-[1.1]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.75rem)", letterSpacing: "-0.025em" }}
              >
                Expert Tutors,{" "}
                <span className="text-gradient">Personalized</span>{" "}
                Learning for Every Student
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-body-lg text-gray-500 max-w-lg mb-8 leading-relaxed"
              >
                One-to-one online tuition, small batch classes, language courses, and
                foundation programs — designed to build confidence and deliver results.
              </motion.p>

              {/* Social proof chips */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {[
                  { icon: <Star size={13} className="fill-gold-500 text-gold-500" />, label: "4.9/5 Rating" },
                  { icon: <Users size={13} className="text-maroon-800" />, label: "500+ Students" },
                  { icon: <Shield size={13} className="text-maroon-800" />, label: "Expert Tutors" },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full
                               border border-cream-200 shadow-sm text-small text-charcoal-800 font-medium"
                  >
                    {icon}
                    {label}
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <button
                  onClick={() => setDemoOpen(true)}
                  className="btn-primary btn-lg group"
                >
                  Book Free Demo
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="/courses"
                  className="btn-secondary btn-lg group"
                >
                  <PlayCircle size={18} className="text-maroon-800" />
                  Explore Courses
                </a>
              </motion.div>

              {/* Micro-trust */}
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-small text-gray-500 mt-4"
              >
                ✓ No credit card required &nbsp;·&nbsp; ✓ Free 1-hour demo &nbsp;·&nbsp; ✓ Cancel anytime
              </motion.p>
            </div>

            {/* RIGHT — visual */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              {/* Main illustration card */}
              <div className="relative animate-float">
                <div className="bg-white rounded-2xl shadow-xl border border-cream-200 p-6 max-w-sm mx-auto">
                  {/* Fake tutor session card */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-maroon-800 flex items-center justify-center
                                    font-outfit font-bold text-white text-lg">A</div>
                    <div>
                      <p className="font-outfit font-semibold text-charcoal-900">Live Session</p>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-small text-emerald-600 font-medium">In Progress</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-maroon-800/5 border border-maroon-800/10 p-4 mb-4">
                    <p className="text-small font-medium text-charcoal-800 mb-1">Today's Topic</p>
                    <p className="font-outfit font-semibold text-maroon-800">Advanced Grammar — Tenses</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-small text-gray-500">Duration</p>
                      <p className="font-outfit font-semibold text-charcoal-900">60 mins</p>
                    </div>
                    <div>
                      <p className="text-small text-gray-500">Progress</p>
                      <p className="font-outfit font-semibold text-maroon-800">78%</p>
                    </div>
                    <div className="w-16 h-16">
                      <svg viewBox="0 0 36 36" className="-rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#EDE4D8" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15.9" fill="none"
                          stroke="#6B1A2A" strokeWidth="3"
                          strokeDasharray="78 22"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating rating card */}
              <motion.div
                initial={{ opacity: 0, y: 12, x: 12 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-6 -left-8 bg-white rounded-xl shadow-lg
                           border border-cream-200 px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={12} className="fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <span className="font-outfit font-bold text-charcoal-900 text-small">4.9</span>
                  <span className="text-small text-gray-500">from 200+ reviews</span>
                </div>
              </motion.div>

              {/* Floating student count */}
              <motion.div
                initial={{ opacity: 0, y: -12, x: -12 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute -top-6 -right-4 bg-maroon-800 rounded-xl shadow-maroon
                           px-4 py-3 text-white"
              >
                <p className="font-outfit font-bold text-lg leading-none">500+</p>
                <p className="text-small text-cream-200/80">Happy Students</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
