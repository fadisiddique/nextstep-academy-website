"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { testimonialsApi } from "@/lib/api";
import toast from "react-hot-toast";
import type { Testimonial } from "@/types";

const schema = z.object({
  name:       z.string().min(2, "Required"),
  role:       z.string().min(2, "Required"),
  rating:     z.coerce.number().min(1).max(5),
  review:     z.string().min(10, "Min 10 characters"),
  videoUrl:   z.string().optional(),
  isActive:   z.boolean(),
  isFeatured: z.boolean(),
  storyBefore:z.string().optional(),
  storyAfter: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  testimonial: Testimonial | null;
  onClose: () => void;
  onSaved: (t: Testimonial) => void;
}

export default function TestimonialFormModal({ testimonial, onClose, onSaved }: Props) {
  const [loading, setLoading]   = useState(false);
  const [avatarFile, setAvatar] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:        testimonial?.name       ?? "",
      role:        testimonial?.role       ?? "",
      rating:      testimonial?.rating     ?? 5,
      review:      testimonial?.review     ?? "",
      videoUrl:    testimonial?.videoUrl   ?? "",
      isActive:    testimonial?.isActive   ?? true,
      isFeatured:  testimonial?.isFeatured ?? false,
      storyBefore: testimonial?.successStory?.before ?? "",
      storyAfter:  testimonial?.successStory?.after  ?? "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (k === "storyBefore" || k === "storyAfter") return;
        fd.append(k, String(v));
      });
      if (data.storyBefore || data.storyAfter) {
        fd.append("successStory", JSON.stringify({ before: data.storyBefore, after: data.storyAfter }));
      }
      if (avatarFile) fd.append("avatar", avatarFile);

      const res = testimonial
        ? await testimonialsApi.update(testimonial._id, fd)
        : await testimonialsApi.create(fd);

      toast.success(testimonial ? "Updated" : "Created");
      onSaved(res.data.data);
    } catch {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-7 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-outfit font-bold text-h3 text-charcoal-900">
            {testimonial ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-cream-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Name *</label>
              <input {...register("name")} className="input" placeholder="Mrs. Priya Sharma" />
              {errors.name && <p className="text-small text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label">Rating (1–5) *</label>
              <select {...register("rating")} className="input">
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Role / Description *</label>
            <input {...register("role")} className="input" placeholder="Parent of Grade 6 Student, Dubai" />
            {errors.role && <p className="text-small text-red-500 mt-1">{errors.role.message}</p>}
          </div>

          <div>
            <label className="label">Review *</label>
            <textarea {...register("review")} className="input resize-none" rows={4}
              placeholder="What did the parent/student say?" />
            {errors.review && <p className="text-small text-red-500 mt-1">{errors.review.message}</p>}
          </div>

          <div>
            <label className="label">Avatar Photo (optional)</label>
            <input type="file" accept="image/*" onChange={e => setAvatar(e.target.files?.[0] ?? null)}
              className="input text-small py-2" />
          </div>

          <div>
            <label className="label">Video URL (optional)</label>
            <input {...register("videoUrl")} className="input" placeholder="https://youtube.com/..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Before (success story)</label>
              <input {...register("storyBefore")} className="input" placeholder="Struggling with English" />
            </div>
            <div>
              <label className="label">After</label>
              <input {...register("storyAfter")} className="input" placeholder="Top of class" />
            </div>
          </div>

          <div className="flex gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-small font-medium text-charcoal-900">
              <input {...register("isActive")} type="checkbox" className="w-4 h-4 accent-maroon-800" />
              Active (visible on site)
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-small font-medium text-charcoal-900">
              <input {...register("isFeatured")} type="checkbox" className="w-4 h-4 accent-maroon-800" />
              Featured (homepage)
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
