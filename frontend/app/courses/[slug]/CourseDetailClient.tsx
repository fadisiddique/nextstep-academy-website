"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, Users, ChevronDown, Check, ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { leadsApi } from "@/lib/api";
import toast from "react-hot-toast";
import type { Course, InquiryFormData } from "@/types";

const schema = z.object({
  studentName:    z.string().min(2, "Required"),
  grade:          z.string().min(1, "Select a grade"),
  whatsapp:       z.string().min(8, "Enter a valid number"),
  email:          z.string().email().optional().or(z.literal("")),
  courseInterest: z.string(),
  message:        z.string().optional(),
});

const GRADES = [
  "Pre-KG / KG", "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9",
  "Grade 10", "Grade 11", "Grade 12", "Adult Learner",
];

const WHATSAPP = "919567175595";

export default function CourseDetailClient({ course }: { course: Course }) {
  const [openFaq, setOpenFaq]   = useState<number | null>(null);
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<InquiryFormData>({
    resolver: zodResolver(schema),
    defaultValues: { courseInterest: course.title },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setLoading(true);
    try {
      await leadsApi.submit({ ...data, source: "course-inquiry" });
      const msg = encodeURIComponent(
        `Hi, I'm interested in the *${course.title}* at NextStep Academy.\n\n` +
        `Student Name: ${data.studentName}\nGrade: ${data.grade}\nWhatsApp: ${data.whatsapp}` +
        (data.message ? `\nMessage: ${data.message}` : "")
      );
      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
      setSuccess(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-cream-100 border-b border-cream-200">
        <div className="container-wide px-4 sm:px-6">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-small text-gray-500
                                           hover:text-maroon-800 transition-colors">
            <ArrowLeft size={14} /> Back to Courses
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-cream-100 pb-0">
        <div className="container-wide px-4 sm:px-6 py-10">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {course.badge && (
                <span className={`badge mb-3 ${
                  course.badge === "Popular" ? "badge-maroon" : "badge-gold"
                }`}>
                  {course.badge}
                </span>
              )}

              <h1
                className="font-outfit font-bold text-charcoal-900 mb-4 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.02em" }}
              >
                {course.title}
              </h1>

              <p className="text-body-lg text-gray-500 mb-6 leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-small text-charcoal-800">
                  <Clock size={15} className="text-maroon-800" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-small text-charcoal-800">
                  <Users size={15} className="text-maroon-800" />
                  <span className="font-medium">{course.studentCount}+ students</span>
                </div>
                <div className="flex items-center gap-1.5 text-small">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13}
                      className={i < Math.round(course.rating)
                        ? "fill-gold-500 text-gold-500"
                        : "fill-cream-300 text-cream-300"}
                    />
                  ))}
                  <span className="font-medium text-charcoal-800 ml-1">{course.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-2.5">
                {course.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-small text-charcoal-800">
                    <Check size={14} className="text-maroon-800 mt-0.5 shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — course image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-video relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main content + sticky form */}
      <section className="section bg-white">
        <div className="container-wide px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Full description */}
              <div>
                <h2 className="font-outfit font-bold text-h3 text-charcoal-900 mb-4">
                  About This Course
                </h2>
                <p className="text-body text-gray-500 leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              {/* Curriculum */}
              {course.curriculum?.length > 0 && (
                <div>
                  <h2 className="font-outfit font-bold text-h3 text-charcoal-900 mb-5">
                    What You'll Learn
                  </h2>
                  <div className="space-y-4">
                    {course.curriculum.map((section, i) => (
                      <div key={i} className="card p-5">
                        <h3 className="font-outfit font-semibold text-h4 text-charcoal-900 mb-3">
                          {section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-small text-gray-500">
                              <Check size={14} className="text-maroon-800 mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {course.faqs?.length > 0 && (
                <div>
                  <h2 className="font-outfit font-bold text-h3 text-charcoal-900 mb-5">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {course.faqs.map((faq, i) => (
                      <div key={i}>
                        <button
                          className="w-full text-left card p-4 flex justify-between items-start gap-3
                                     hover:shadow-md transition-shadow"
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        >
                          <span className="font-outfit font-semibold text-charcoal-900 text-body">
                            {faq.question}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`shrink-0 text-maroon-800 transition-transform
                              ${openFaq === i ? "rotate-180" : ""}`}
                          />
                        </button>
                        {openFaq === i && (
                          <div className="px-4 py-3 bg-cream-100 border border-t-0 border-cream-200 rounded-b-xl">
                            <p className="text-small text-gray-500">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky inquiry form */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                {success ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-maroon-800/10 flex items-center justify-center mx-auto mb-4">
                      <Check size={28} className="text-maroon-800" />
                    </div>
                    <h3 className="font-outfit font-bold text-h4 text-charcoal-900 mb-2">
                      Inquiry Sent!
                    </h3>
                    <p className="text-small text-gray-500">
                      Check your WhatsApp — our team will confirm your session shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-5">
                      {course.price && (
                        <p className="font-outfit font-bold text-maroon-800 text-h3 mb-0.5">
                          {course.price}
                        </p>
                      )}
                      <h3 className="font-outfit font-semibold text-h4 text-charcoal-900">
                        Enroll in this Course
                      </h3>
                      <p className="text-small text-gray-500 mt-1">
                        Fill in your details and we'll contact you on WhatsApp.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                      <div>
                        <label className="label">Student Name *</label>
                        <input {...register("studentName")} className="input" placeholder="e.g. Aryan Sharma" />
                        {errors.studentName && <p className="text-small text-red-500 mt-1">{errors.studentName.message}</p>}
                      </div>

                      <div>
                        <label className="label">Grade *</label>
                        <select {...register("grade")} className="input">
                          <option value="">Select...</option>
                          {GRADES.map(g => <option key={g}>{g}</option>)}
                        </select>
                        {errors.grade && <p className="text-small text-red-500 mt-1">{errors.grade.message}</p>}
                      </div>

                      <div>
                        <label className="label">WhatsApp Number *</label>
                        <input {...register("whatsapp")} className="input" type="tel" placeholder="+971 50 000 0000" />
                        {errors.whatsapp && <p className="text-small text-red-500 mt-1">{errors.whatsapp.message}</p>}
                      </div>

                      <div>
                        <label className="label">Email (optional)</label>
                        <input {...register("email")} className="input" type="email" placeholder="your@email.com" />
                      </div>

                      <div>
                        <label className="label">Message (optional)</label>
                        <textarea {...register("message")} className="input resize-none" rows={2}
                          placeholder="Any specific questions?" />
                      </div>

                      <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
                        {loading ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : "Send Inquiry 📲"}
                      </button>

                      <button
                        type="button"
                        className="btn-outline w-full justify-center"
                        onClick={() => {
                          const msg = encodeURIComponent(`Hi, I'm interested in the ${course.title}. Please share more details.`);
                          window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
                        }}
                      >
                        💬 WhatsApp Directly
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
