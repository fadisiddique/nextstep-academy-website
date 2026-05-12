"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Star, ToggleLeft, ToggleRight } from "lucide-react";
import { testimonialsApi } from "@/lib/api";
import toast from "react-hot-toast";
import type { Testimonial } from "@/types";
import TestimonialFormModal from "./TestimonialFormModal";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading]           = useState(true);
  const [modalOpen, setModalOpen]       = useState(false);
  const [editing, setEditing]           = useState<Testimonial | null>(null);

  const load = () => {
    setLoading(true);
    testimonialsApi.getAll()
      .then(r => setTestimonials(r.data.data))
      .catch(() => toast.error("Failed to load testimonials"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await testimonialsApi.delete(id);
      setTestimonials(t => t.filter(x => x._id !== id));
      toast.success("Deleted");
    } catch { toast.error("Failed to delete"); }
  };

  const openEdit = (t: Testimonial) => { setEditing(t); setModalOpen(true); };
  const openNew  = () => { setEditing(null); setModalOpen(true); };

  const onSaved = (saved: Testimonial) => {
    setTestimonials(prev =>
      editing ? prev.map(x => x._id === saved._id ? saved : x) : [saved, ...prev]
    );
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-outfit font-bold text-h2 text-charcoal-900">Testimonials</h1>
          <p className="text-body text-gray-500">{testimonials.length} reviews</p>
        </div>
        <button onClick={openNew} className="btn-primary">
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card p-6 space-y-3">
                <div className="skeleton h-4 w-24 rounded" />
                <div className="skeleton h-16 rounded" />
                <div className="flex gap-3">
                  <div className="skeleton w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <div className="skeleton h-3 w-28 rounded" />
                    <div className="skeleton h-3 w-20 rounded" />
                  </div>
                </div>
              </div>
            ))
          : testimonials.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="card p-6 flex flex-col"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={13}
                      className={si < t.rating ? "fill-gold-500 text-gold-500" : "fill-cream-300 text-cream-300"} />
                  ))}
                  <div className="ml-auto flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-small font-medium
                      ${t.isActive ? "bg-emerald-100 text-emerald-700" : "bg-cream-200 text-gray-500"}`}>
                      {t.isActive ? "Active" : "Hidden"}
                    </span>
                    {t.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-small font-medium bg-gold-100 text-gold-700">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Review */}
                <p className="text-small text-gray-500 italic flex-1 line-clamp-3 mb-4">
                  &ldquo;{t.review}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-3 border-t border-cream-200">
                  <div>
                    <p className="font-outfit font-semibold text-charcoal-900 text-small">{t.name}</p>
                    <p className="text-small text-gray-400">{t.role}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEdit(t)}
                      className="p-2 rounded-lg hover:bg-cream-100 text-gray-400 hover:text-maroon-800 transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(t._id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
        }
      </div>

      {modalOpen && (
        <TestimonialFormModal
          testimonial={editing}
          onClose={() => setModalOpen(false)}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}
