"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit2, Trash2, Star, Users, ToggleLeft, ToggleRight, ExternalLink, Search } from "lucide-react";
import { coursesApi } from "@/lib/api";
import toast from "react-hot-toast";
import type { Course } from "@/types";

export default function AdminCoursesPage() {
  const [courses, setCourses]   = useState<Course[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    coursesApi.getAll()
      .then(res => setCourses(res.data.data))
      .catch(() => toast.error("Failed to load courses"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await coursesApi.delete(id);
      toast.success("Course deleted");
      setCourses(c => c.filter(x => x._id !== id));
    } catch {
      toast.error("Failed to delete course");
    } finally {
      setDeleting(null);
    }
  };

  const toggleActive = async (id: string) => {
    try {
      await coursesApi.toggleActive(id);
      setCourses(c => c.map(x => x._id === id ? { ...x, isActive: !x.isActive } : x));
    } catch {
      toast.error("Failed to update course");
    }
  };

  const toggleFeatured = async (id: string) => {
    try {
      await coursesApi.toggleFeatured(id);
      setCourses(c => c.map(x => x._id === id ? { ...x, isFeatured: !x.isFeatured } : x));
    } catch {
      toast.error("Failed to update course");
    }
  };

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-outfit font-bold text-h2 text-charcoal-900">Courses</h1>
          <p className="text-body text-gray-500">{courses.length} total courses</p>
        </div>
        <Link href="/admin/courses/new" className="btn-primary shrink-0">
          <Plus size={18} /> Add New Course
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream-100 border-b border-cream-200">
                {["Course", "Category", "Rating", "Students", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-4 text-small font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="px-5 py-4">
                          <div className="skeleton h-4 rounded w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                : filtered.map((course, i) => (
                    <motion.tr
                      key={course._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-cream-50 transition-colors"
                    >
                      {/* Course name + image */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0">
                            <Image src={course.image} alt={course.title} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-charcoal-900 text-small leading-tight">
                              {course.title}
                            </p>
                            {course.badge && (
                              <span className="text-small text-maroon-800 font-medium">{course.badge}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-cream-100 text-small text-charcoal-800 capitalize whitespace-nowrap">
                          {course.category.replace(/-/g, " ")}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 text-small">
                          <Star size={13} className="fill-gold-500 text-gold-500" />
                          {course.rating.toFixed(1)}
                        </div>
                      </td>

                      {/* Students */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 text-small text-gray-500">
                          <Users size={13} />
                          {course.studentCount.toLocaleString()}
                        </div>
                      </td>

                      {/* Status toggles */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => toggleActive(course._id)}
                            className={`flex items-center gap-1.5 text-small font-medium
                              ${course.isActive ? "text-emerald-600" : "text-gray-400"}`}
                          >
                            {course.isActive
                              ? <ToggleRight size={18} className="text-emerald-500" />
                              : <ToggleLeft size={18} />}
                            {course.isActive ? "Active" : "Inactive"}
                          </button>
                          <button
                            onClick={() => toggleFeatured(course._id)}
                            className={`flex items-center gap-1.5 text-small font-medium
                              ${course.isFeatured ? "text-gold-500" : "text-gray-400"}`}
                          >
                            <Star size={14} className={course.isFeatured ? "fill-gold-500" : ""} />
                            {course.isFeatured ? "Featured" : "Not featured"}
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/courses/${course.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg hover:bg-cream-100 text-gray-400 hover:text-charcoal-900 transition-colors"
                            title="View"
                          >
                            <ExternalLink size={15} />
                          </Link>
                          <Link
                            href={`/admin/courses/${course._id}/edit`}
                            className="p-2 rounded-lg hover:bg-cream-100 text-gray-400 hover:text-maroon-800 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </Link>
                          <button
                            onClick={() => handleDelete(course._id, course.title)}
                            disabled={deleting === course._id}
                            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
              }

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-gray-500">
                    No courses found. <Link href="/admin/courses/new" className="text-maroon-800 hover:underline">Add one →</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
