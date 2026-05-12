"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Course } from "@/types";

const schema = z.object({
  title:            z.string().min(3, "Required"),
  shortDescription: z.string().min(10).max(280),
  fullDescription:  z.string().min(20, "Required"),
  category: z.enum(["foundation","language","spoken-language","cursive-writing","art-craft","counselling"]),
  duration:         z.string().min(1, "Required"),
  rating:           z.coerce.number().min(1).max(5),
  studentCount:     z.coerce.number().min(0),
  price:            z.string().optional(),
  badge:            z.enum(["Popular","New","Bestseller","Featured",""]).optional(),
  isFeatured:       z.boolean(),
  isActive:         z.boolean(),
  highlights:       z.array(z.object({ value: z.string() })),
  faqs:             z.array(z.object({ question: z.string(), answer: z.string() })),
});

type FormData = z.infer<typeof schema>;

interface Props {
  course?: Course;
  onSubmit: (fd: globalThis.FormData) => Promise<void>;
}

export default function CourseForm({ course, onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImage] = useState<File | null>(null);

  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title:            course?.title            ?? "",
      shortDescription: course?.shortDescription ?? "",
      fullDescription:  course?.fullDescription  ?? "",
      category:         course?.category         ?? "foundation",
      duration:         course?.duration         ?? "Flexible",
      rating:           course?.rating           ?? 4.8,
      studentCount:     course?.studentCount     ?? 0,
      price:            course?.price            ?? "",
      badge:            (course?.badge as any)   ?? "",
      isFeatured:       course?.isFeatured       ?? false,
      isActive:         course?.isActive         ?? true,
      highlights:       (course?.highlights ?? []).map(v => ({ value: v })),
      faqs:             course?.faqs             ?? [],
    },
  });

  const { fields: hlFields, append: hlAppend, remove: hlRemove } =
    useFieldArray({ control, name: "highlights" });

  const { fields: faqFields, append: faqAppend, remove: faqRemove } =
    useFieldArray({ control, name: "faqs" });

  const submit = async (data: FormData) => {
    if (!course && !imageFile) { toast.error("Course image is required"); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title",            data.title);
      fd.append("shortDescription", data.shortDescription);
      fd.append("fullDescription",  data.fullDescription);
      fd.append("category",         data.category);
      fd.append("duration",         data.duration);
      fd.append("rating",           String(data.rating));
      fd.append("studentCount",     String(data.studentCount));
      fd.append("isFeatured",       String(data.isFeatured));
      fd.append("isActive",         String(data.isActive));
      if (data.price) fd.append("price", data.price);
      if (data.badge) fd.append("badge", data.badge);
      fd.append("highlights",  JSON.stringify(data.highlights.map(h => h.value).filter(Boolean)));
      fd.append("faqs",        JSON.stringify(data.faqs));
      fd.append("curriculum",  JSON.stringify([]));
      if (imageFile) fd.append("image", imageFile);
      await onSubmit(fd as any);
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const F = ({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) => (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="text-small text-red-500 mt-1">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6 max-w-3xl">

      {/* Basic info */}
      <div className="card p-6 space-y-4">
        <h2 className="font-outfit font-semibold text-h4 text-charcoal-900">Basic Information</h2>

        <F label="Title *" error={errors.title?.message}>
          <input {...register("title")} className="input" placeholder="Foundation Course" />
        </F>

        <F label="Short Description * (max 280 chars)" error={errors.shortDescription?.message}>
          <textarea {...register("shortDescription")} className="input resize-none" rows={2}
            placeholder="A concise summary shown on course cards..." />
        </F>

        <F label="Full Description *" error={errors.fullDescription?.message}>
          <textarea {...register("fullDescription")} className="input resize-none" rows={5}
            placeholder="Detailed course description shown on the course page..." />
        </F>

        <div className="grid grid-cols-2 gap-4">
          <F label="Category *" error={errors.category?.message}>
            <select {...register("category")} className="input">
              <option value="foundation">Foundation</option>
              <option value="language">Language</option>
              <option value="spoken-language">Spoken Language</option>
              <option value="cursive-writing">Cursive Writing</option>
              <option value="art-craft">Art & Craft</option>
              <option value="counselling">Counselling</option>
            </select>
          </F>

          <F label="Duration" error={errors.duration?.message}>
            <input {...register("duration")} className="input" placeholder="e.g. 8 Weeks / Flexible" />
          </F>

          <F label="Rating (1–5)">
            <input {...register("rating")} type="number" step="0.1" min="1" max="5" className="input" />
          </F>

          <F label="Student Count">
            <input {...register("studentCount")} type="number" className="input" />
          </F>

          <F label="Price (optional)">
            <input {...register("price")} className="input" placeholder="AED 250 / month" />
          </F>

          <F label="Badge (optional)">
            <select {...register("badge")} className="input">
              <option value="">None</option>
              <option value="Popular">Popular</option>
              <option value="New">New</option>
              <option value="Bestseller">Bestseller</option>
              <option value="Featured">Featured</option>
            </select>
          </F>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-small font-medium">
            <input {...register("isActive")} type="checkbox" className="w-4 h-4 accent-maroon-800" />
            Active (published)
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-small font-medium">
            <input {...register("isFeatured")} type="checkbox" className="w-4 h-4 accent-maroon-800" />
            Featured (homepage)
          </label>
        </div>
      </div>

      {/* Image */}
      <div className="card p-6 space-y-3">
        <h2 className="font-outfit font-semibold text-h4 text-charcoal-900">
          Course Image {!course && <span className="text-red-500">*</span>}
        </h2>
        {course?.image && (
          <img src={course.image} alt="" className="w-40 h-24 object-cover rounded-lg mb-2" />
        )}
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] ?? null)}
          className="input text-small py-2" />
        <p className="text-small text-gray-400">Recommended: 800×500px, JPG/PNG/WebP. Auto-optimised via Cloudinary.</p>
      </div>

      {/* Highlights */}
      <div className="card p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-outfit font-semibold text-h4 text-charcoal-900">Highlights</h2>
          <button type="button" onClick={() => hlAppend({ value: "" })}
            className="btn-secondary btn-sm text-small">
            <Plus size={14} /> Add
          </button>
        </div>
        {hlFields.map((field, i) => (
          <div key={field.id} className="flex gap-2">
            <input {...register(`highlights.${i}.value`)} className="input flex-1"
              placeholder="e.g. One-to-one personalized sessions" />
            <button type="button" onClick={() => hlRemove(i)}
              className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {hlFields.length === 0 && (
          <p className="text-small text-gray-400">No highlights yet. Click Add to create one.</p>
        )}
      </div>

      {/* FAQs */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-outfit font-semibold text-h4 text-charcoal-900">FAQs</h2>
          <button type="button" onClick={() => faqAppend({ question: "", answer: "" })}
            className="btn-secondary btn-sm text-small">
            <Plus size={14} /> Add FAQ
          </button>
        </div>
        {faqFields.map((field, i) => (
          <div key={field.id} className="p-4 bg-cream-100 rounded-lg space-y-2">
            <div className="flex gap-2">
              <input {...register(`faqs.${i}.question`)} className="input flex-1"
                placeholder="Question" />
              <button type="button" onClick={() => faqRemove(i)}
                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600">
                <Trash2 size={15} />
              </button>
            </div>
            <textarea {...register(`faqs.${i}.answer`)} className="input resize-none w-full"
              rows={2} placeholder="Answer" />
          </div>
        ))}
        {faqFields.length === 0 && (
          <p className="text-small text-gray-400">No FAQs yet.</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button type="button" onClick={() => history.back()} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading
            ? <><Loader2 size={16} className="animate-spin" /> Saving...</>
            : course ? "Update Course" : "Create Course"
          }
        </button>
      </div>
    </form>
  );
}
