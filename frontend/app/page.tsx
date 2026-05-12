"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import CourseCard, { CourseCardSkeleton } from "@/components/CourseCard";
import { coursesApi } from "@/lib/api";
import type { Course, CourseCategory } from "@/types";
import type { CourseFilterCategory } from "@/types";

const TABS: { label: string; value: CourseFilterCategory }[] = [
  { label: "All Courses",      value: "all" },
  { label: "Foundation",       value: "foundation" },
  { label: "Language",         value: "language" },
  { label: "Spoken Language",  value: "spoken-language" },
  { label: "Cursive Writing",  value: "cursive-writing" },
  { label: "Art & Craft",      value: "art-craft" },
  { label: "Counselling",      value: "counselling" },
];

export default function CoursesPage() {
  const [activeTab, setActiveTab]   = useState<CourseFilterCategory>("all");
  const [search, setSearch]         = useState("");
  const [courses, setCourses]       = useState<Course[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = activeTab !== "all" ? { category: activeTab } : {};
    coursesApi.getAll(params)
      .then((res) => setCourses(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeTab]);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.shortDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Page header */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-maroon-800 to-maroon-900 relative overflow-hidden">
        {/* Subtle blob */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9973A 0%, transparent 70%)" }}
        />
        <div className="container-wide px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-4">
              All Courses
            </span>
            <h1
              className="font-outfit font-bold text-white mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              Learn Something Extraordinary
            </h1>
            <p className="text-body-lg text-cream-200/80 max-w-xl mx-auto mb-8">
              Choose from our expertly designed courses — each built to deliver real, measurable results.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border-0 bg-white/95 backdrop-blur-sm
                           text-charcoal-900 placeholder-gray-400 shadow-lg focus:outline-none
                           focus:ring-2 focus:ring-gold-400 text-body"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="bg-white border-b border-cream-200 sticky top-16 md:top-20 z-30">
        <div className="container-wide px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-3">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`shrink-0 px-4 py-2 rounded-lg text-small font-medium transition-all duration-200
                  ${activeTab === tab.value
                    ? "bg-maroon-800 text-white shadow-sm"
                    : "text-gray-500 hover:bg-cream-100 hover:text-charcoal-900"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course grid */}
      <section className="section bg-cream-50">
        <div className="container-wide px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-outfit font-semibold text-charcoal-900 text-h3 mb-2">No courses found</p>
              <p className="text-gray-500">Try a different search or category.</p>
            </div>
          ) : (
            <>
              <p className="text-small text-gray-500 mb-6">
                Showing <strong>{filtered.length}</strong> course{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((c, i) => (
                  <CourseCard key={c._id} course={c} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
