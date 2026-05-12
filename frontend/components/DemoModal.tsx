"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { leadsApi } from "@/lib/api";
import toast from "react-hot-toast";
import type { DemoFormData } from "@/types";

const schema = z.object({
  studentName:    z.string().min(2, "Please enter a valid name"),
  grade:          z.string().min(1, "Please select a grade"),
  whatsapp:       z.string().min(8, "Please enter a valid WhatsApp number"),
  parentName:     z.string().optional(),
  courseInterest: z.string().optional(),
});

const GRADES = [
  "Pre-KG / KG", "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9",
  "Grade 10", "Grade 11", "Grade 12", "Adult Learner",
];

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
}

export default function DemoModal({ isOpen, onClose, preselectedCourse }: DemoModalProps) {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const WHATSAPP = "919567175595";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoFormData>({
    resolver: zodResolver(schema),
    defaultValues: { courseInterest: preselectedCourse },
  });

  const onSubmit = async (data: DemoFormData) => {
    setSubmitting(true);
    try {
      // Save lead to backend
      await leadsApi.submit({ ...data, source: "demo-form" });

      // Open WhatsApp
      const msg = encodeURIComponent(
        `Hi, I'd like to book a FREE Demo Class.\n\n` +
        `Student Name: ${data.studentName}\n` +
        `Grade: ${data.grade}\n` +
        `WhatsApp: ${data.whatsapp}\n` +
        (data.parentName     ? `Parent Name: ${data.parentName}\n`     : "") +
        (data.courseInterest ? `Course Interest: ${data.courseInterest}` : "")
      );
      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");

      setSuccess(true);
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="overlay-backdrop" onClick={handleClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-cream-100 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {success ? (
              /* Success state */
              <div className="text-center py-6">
                <CheckCircle size={56} className="text-maroon-800 mx-auto mb-4" />
                <h3 className="font-outfit font-bold text-h3 text-charcoal-900 mb-2">
                  We'll be in touch!
                </h3>
                <p className="text-body text-gray-500 mb-6">
                  Your WhatsApp has opened. Send us the message and our team will confirm your FREE demo session shortly.
                </p>
                <button className="btn-primary w-full justify-center" onClick={handleClose}>
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-6">
                  <span className="badge-gold text-small mb-3 inline-flex">
                    🎓 Completely Free
                  </span>
                  <h2 className="font-outfit font-bold text-h3 text-charcoal-900 leading-snug">
                    Book a Free Demo Class
                  </h2>
                  <p className="text-small text-gray-500 mt-1">
                    Fill in your details and we'll connect you via WhatsApp.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="label">Student Name *</label>
                    <input
                      {...register("studentName")}
                      className="input"
                      placeholder="e.g. Aryan Sharma"
                    />
                    {errors.studentName && (
                      <p className="text-small text-red-500 mt-1">{errors.studentName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Grade / Class *</label>
                    <select {...register("grade")} className="input">
                      <option value="">Select grade...</option>
                      {GRADES.map((g) => <option key={g}>{g}</option>)}
                    </select>
                    {errors.grade && (
                      <p className="text-small text-red-500 mt-1">{errors.grade.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">WhatsApp Number *</label>
                    <input
                      {...register("whatsapp")}
                      className="input"
                      placeholder="+971 50 000 0000"
                      type="tel"
                    />
                    {errors.whatsapp && (
                      <p className="text-small text-red-500 mt-1">{errors.whatsapp.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Parent Name (optional)</label>
                    <input
                      {...register("parentName")}
                      className="input"
                      placeholder="e.g. Mr. Rahul Sharma"
                    />
                  </div>

                  <div>
                    <label className="label">Course Interest (optional)</label>
                    <input
                      {...register("courseInterest")}
                      className="input"
                      placeholder="e.g. Foundation Course"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center mt-2"
                  >
                    {submitting ? (
                      <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                    ) : (
                      "Book Free Demo via WhatsApp 📲"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
