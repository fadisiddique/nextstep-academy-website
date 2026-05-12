"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Globe, Clock, Users, TrendingUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { tutorApi } from "@/lib/api";
import toast from "react-hot-toast";
import type { TutorApplicationData } from "@/types";

const schema = z.object({
  name:          z.string().min(2, "Name is required"),
  email:         z.string().email("Enter a valid email"),
  whatsapp:      z.string().min(8, "Enter a valid WhatsApp number"),
  qualification: z.string().min(3, "Qualification is required"),
  subjects:      z.string().min(2, "Please specify subjects"),
  experience:    z.string().min(1, "Select experience level"),
  availability:  z.string().min(1, "Select availability"),
  bio:           z.string().min(30, "Please write at least 30 characters"),
});

const HIGHLIGHTS = [
  { icon: <Users size={20} className="text-gold-400" />, label: "Supportive Community", sub: "Work with a team that cares" },
  { icon: <Clock size={20} className="text-gold-400" />, label: "Flexible Schedule",    sub: "Teach on your own terms" },
  { icon: <Globe size={20} className="text-gold-400" />, label: "Global Reach",         sub: "Students across UAE & India" },
  { icon: <TrendingUp size={20} className="text-gold-400" />, label: "Grow Your Income", sub: "Earn through teaching" },
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];

const AVAILABILITY_OPTIONS = [
  "Weekday mornings",
  "Weekday evenings",
  "Weekends only",
  "Full-time (any time)",
  "Part-time (flexible)",
];

export default function BecomeATutorPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TutorApplicationData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: TutorApplicationData) => {
    setLoading(true);
    try {
      await tutorApi.apply(data);
      // Also open WhatsApp for immediate follow-up
      const msg = encodeURIComponent(
        `Hi, I'd like to apply as a tutor at NextStep Academy.\n\n` +
        `Name: ${data.name}\nSubjects: ${data.subjects}\nExperience: ${data.experience}`
      );
      window.open(`https://wa.me/919567175595?text=${msg}`, "_blank");
      setSuccess(true);
      reset();
    } catch {
      toast.error("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-gradient-to-br from-charcoal-900 via-maroon-900 to-charcoal-900 overflow-hidden">
        {/* Decorative blob */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9973A 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-8 pointer-events-none"
          style={{ background: "radial-gradient(circle, #6B1A2A 0%, transparent 70%)" }}
        />

        <div className="container-wide px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-5">
                🏫 Join Our Teaching Community
              </span>

              <h1
                className="font-outfit font-bold text-white mb-5 leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.025em" }}
              >
                Share Your Knowledge,<br />
                <span style={{ color: "#C9973A" }}>Inspire Students</span>
              </h1>

              <p className="text-body-lg text-cream-200/80 mb-8 max-w-md leading-relaxed">
                Become a tutor at NextStep Academy Online and help students achieve their
                learning goals while earning through teaching — on your own schedule.
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-2 gap-4">
                {HIGHLIGHTS.map((h) => (
                  <div
                    key={h.label}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/6 border border-white/10"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gold-500/15 flex items-center justify-center shrink-0">
                      {h.icon}
                    </div>
                    <div>
                      <p className="font-outfit font-semibold text-white text-small">{h.label}</p>
                      <p className="text-small text-cream-200/60">{h.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — decorative visual */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative animate-float">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-xs">
                  <div className="w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-400
                                  flex items-center justify-center mb-5 mx-auto">
                    <span className="font-outfit font-bold text-gold-400 text-2xl">T</span>
                  </div>
                  <p className="font-outfit font-bold text-white text-center text-h4 mb-1">
                    Mr. Arjun Kumar
                  </p>
                  <p className="text-small text-cream-200/60 text-center mb-5">English & Grammar</p>
                  <div className="space-y-2.5">
                    {["5+ Years Teaching", "200+ Students Taught", "4.9★ Average Rating"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-small text-cream-200/80">
                        <CheckCircle size={13} className="text-gold-400 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/10 text-center">
                    <p className="text-small text-cream-200/60">Monthly Earnings</p>
                    <p className="font-outfit font-bold text-gold-400 text-h3">AED 3,500+</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="section bg-cream-50">
        <div className="container-tight px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-pill">Apply Now</span>
            <h2 className="section-title">Start Your Application</h2>
            <p className="section-subtitle mx-auto">
              Tell us about yourself and we'll get in touch within 24 hours.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-12 text-center"
              >
                <CheckCircle size={56} className="text-maroon-800 mx-auto mb-5" />
                <h3 className="font-outfit font-bold text-h2 text-charcoal-900 mb-3">
                  Application Received!
                </h3>
                <p className="text-body text-gray-500 max-w-sm mx-auto">
                  Thank you for applying! Our team will review your application and reach out
                  via WhatsApp within 24–48 hours.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card p-8"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Full Name *</label>
                      <input {...register("name")} className="input" placeholder="e.g. Priya Menon" />
                      {errors.name && <p className="text-small text-red-500 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="label">Email Address *</label>
                      <input {...register("email")} type="email" className="input" placeholder="your@email.com" />
                      {errors.email && <p className="text-small text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="label">WhatsApp Number *</label>
                    <input {...register("whatsapp")} type="tel" className="input" placeholder="+971 50 000 0000" />
                    {errors.whatsapp && <p className="text-small text-red-500 mt-1">{errors.whatsapp.message}</p>}
                  </div>

                  <div>
                    <label className="label">Highest Qualification *</label>
                    <input
                      {...register("qualification")}
                      className="input"
                      placeholder="e.g. B.Ed, M.Sc. Mathematics, MA English"
                    />
                    {errors.qualification && <p className="text-small text-red-500 mt-1">{errors.qualification.message}</p>}
                  </div>

                  <div>
                    <label className="label">Subjects You Teach *</label>
                    <input
                      {...register("subjects")}
                      className="input"
                      placeholder="e.g. English Grammar, Spoken English, Mathematics"
                    />
                    {errors.subjects && <p className="text-small text-red-500 mt-1">{errors.subjects.message}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Teaching Experience *</label>
                      <select {...register("experience")} className="input">
                        <option value="">Select...</option>
                        {EXPERIENCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                      </select>
                      {errors.experience && <p className="text-small text-red-500 mt-1">{errors.experience.message}</p>}
                    </div>
                    <div>
                      <label className="label">Availability *</label>
                      <select {...register("availability")} className="input">
                        <option value="">Select...</option>
                        {AVAILABILITY_OPTIONS.map(o => <option key={o}>{o}</option>)}
                      </select>
                      {errors.availability && <p className="text-small text-red-500 mt-1">{errors.availability.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="label">About Yourself *</label>
                    <textarea
                      {...register("bio")}
                      className="input resize-none"
                      rows={4}
                      placeholder="Tell us about your teaching philosophy, achievements, and why you'd like to join NextStep Academy..."
                    />
                    {errors.bio && <p className="text-small text-red-500 mt-1">{errors.bio.message}</p>}
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center btn-lg">
                    {loading
                      ? <><Loader2 size={18} className="animate-spin" /> Submitting Application...</>
                      : "Apply Now — Join NextStep Academy →"
                    }
                  </button>

                  <p className="text-small text-gray-500 text-center">
                    By applying, you agree that we may contact you via WhatsApp and email regarding your application.
                  </p>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
