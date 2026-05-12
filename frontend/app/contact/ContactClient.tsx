"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, Facebook, Instagram, Linkedin, Youtube, Loader2, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactApi } from "@/lib/api";
import toast from "react-hot-toast";
import type { ContactFormData } from "@/types";

const schema = z.object({
  name:    z.string().min(2, "Name is required"),
  email:   z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      await contactApi.send(data);
      setSuccess(true);
      reset();
    } catch {
      toast.error("Something went wrong. Please email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-maroon-800 to-maroon-900 relative overflow-hidden">
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9973A 0%, transparent 70%)" }}
        />
        <div className="container-wide px-4 sm:px-6 text-center relative z-10">
          <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-4">
            Contact Us
          </span>
          <h1
            className="font-outfit font-bold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-body-lg text-cream-200/80 max-w-lg mx-auto">
            Have a question? Our team typically responds within a few hours.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-10 bg-cream-100 border-b border-cream-200">
        <div className="container-wide px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: <Mail size={22} className="text-maroon-800" />,
                title: "Email Us",
                info: "nsnextstepacademyonline@gmail.com",
                link: "mailto:nsnextstepacademyonline@gmail.com",
              },
              {
                icon: <Phone size={22} className="text-gold-500" />,
                title: "Call Us",
                info: "+91 95671 75595 · +971 547165524",
                link: "tel:+919567175595",
              },
              {
                icon: <Clock size={22} className="text-maroon-800" />,
                title: "Working Hours",
                info: "Mon–Sat: 10:00 AM – 6:00 PM",
                link: null,
              },
            ].map((item) => (
              <div key={item.title} className="card p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-outfit font-semibold text-charcoal-900 mb-1">{item.title}</p>
                  {item.link ? (
                    <a href={item.link} className="text-small text-gray-500 hover:text-maroon-800 transition-colors">
                      {item.info}
                    </a>
                  ) : (
                    <p className="text-small text-gray-500">{item.info}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + social */}
      <section className="section bg-white">
        <div className="container-tight px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-outfit font-bold text-h2 text-charcoal-900 mb-2">Send a Message</h2>
              <p className="text-body text-gray-500 mb-7">
                Fill in the form and we'll get back to you within 24 hours.
              </p>

              {success ? (
                <div className="card p-8 text-center">
                  <CheckCircle size={48} className="text-maroon-800 mx-auto mb-4" />
                  <h3 className="font-outfit font-bold text-h3 text-charcoal-900 mb-2">Message Sent!</h3>
                  <p className="text-body text-gray-500">Thank you. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="label">Your Name *</label>
                    <input {...register("name")} className="input" placeholder="e.g. Rahul Sharma" />
                    {errors.name && <p className="text-small text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="label">Email Address *</label>
                    <input {...register("email")} type="email" className="input" placeholder="your@email.com" />
                    {errors.email && <p className="text-small text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="label">Subject *</label>
                    <input {...register("subject")} className="input" placeholder="How can we help?" />
                    {errors.subject && <p className="text-small text-red-500 mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="label">Message *</label>
                    <textarea {...register("message")} className="input resize-none" rows={5}
                      placeholder="Tell us more..." />
                    {errors.message && <p className="text-small text-red-500 mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                    {loading ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : "Send Message →"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Social / info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-outfit font-bold text-h2 text-charcoal-900 mb-2">Find Us Online</h2>
              <p className="text-body text-gray-500 mb-7">
                Follow our journey and stay updated on new courses and special offers.
              </p>

              <div className="space-y-3">
                {[
                  { Icon: Facebook,  label: "Facebook",  href: "https://www.facebook.com/share/187WJjCcgc/", color: "#1877F2" },
                  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/nextstepacademyonline", color: "#E1306C" },
                  { Icon: Linkedin,  label: "LinkedIn",  href: "#", color: "#0A66C2" },
                  { Icon: Youtube,   label: "YouTube",   href: "https://www.youtube.com/@NEXTSTEPACADEMYONLINE", color: "#FF0000" },
                ].map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 card hover:shadow-md transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                      style={{ background: color }}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="font-medium text-charcoal-900 group-hover:text-maroon-800 transition-colors">
                      {label}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl bg-maroon-800 text-white">
                <p className="font-outfit font-semibold text-h4 mb-2">💬 Prefer WhatsApp?</p>
                <p className="text-small text-cream-200/80 mb-4">
                  Chat directly with our team for faster replies.
                </p>
                <button
                  onClick={() => {
                    const msg = encodeURIComponent("Hi, I have a question about NextStep Academy.");
                    window.open(`https://wa.me/919567175595?text=${msg}`, "_blank");
                  }}
                  className="btn bg-gold-500 text-white hover:bg-gold-600 px-5 py-2.5 rounded-lg
                             text-small font-semibold transition-colors"
                >
                  Open WhatsApp →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
