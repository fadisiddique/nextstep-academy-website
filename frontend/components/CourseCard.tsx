"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Clock, Users, ArrowRight } from "lucide-react";
import type { Course } from "@/types";

const BADGE_STYLES: Record<string, string> = {
  Popular:    "bg-maroon-800 text-white",
  New:        "bg-gold-500 text-white",
  Bestseller: "bg-charcoal-900 text-white",
  Featured:   "bg-peach-500 text-white",
};

interface CourseCardProps {
  course: Course;
  index?: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < Math.round(rating) ? "star-filled fill-gold-500" : "star-empty fill-cream-300"}
        />
      ))}
      <span className="text-small text-gray-500 ml-1 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link href={`/courses/${course.slug}`} className="group block h-full">
        <article className="card-hover h-full flex flex-col overflow-hidden">

          {/* Image */}
          <div className="course-img-wrap relative">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badge */}
            {course.badge && (
              <span
                className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-small font-semibold
                  font-outfit tracking-wide ${BADGE_STYLES[course.badge]}`}
              >
                {course.badge}
              </span>
            )}

            {/* Category chip */}
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-small
                             bg-white/90 backdrop-blur-sm text-charcoal-800 font-medium capitalize">
              {course.category.replace(/-/g, " ")}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5">
            <h3 className="font-outfit font-semibold text-charcoal-900 text-h4 leading-snug
                           group-hover:text-maroon-800 transition-colors duration-200 mb-2">
              {course.title}
            </h3>

            <p className="text-small text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
              {course.shortDescription}
            </p>

            {/* Meta row */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-small text-gray-500">
                <Clock size={13} className="text-maroon-800/60" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1.5 text-small text-gray-500">
                <Users size={13} className="text-maroon-800/60" />
                {course.studentCount.toLocaleString()}+ students
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <StarRating rating={course.rating} />
            </div>

            {/* Divider */}
            <div className="border-t border-cream-200 pt-4 flex items-center justify-between">
              {course.price ? (
                <span className="font-outfit font-semibold text-maroon-800 text-body-lg">
                  {course.price}
                </span>
              ) : (
                <span className="text-small text-gray-500">Contact for pricing</span>
              )}

              <span className="inline-flex items-center gap-1 text-small font-semibold
                               text-maroon-800 group-hover:gap-2 transition-all duration-200">
                Learn More <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

// Skeleton loader
export function CourseCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton" style={{ aspectRatio: "16/10" }} />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 rounded w-3/4" />
        <div className="skeleton h-4 rounded w-full" />
        <div className="skeleton h-4 rounded w-2/3" />
        <div className="flex gap-3">
          <div className="skeleton h-4 rounded w-20" />
          <div className="skeleton h-4 rounded w-24" />
        </div>
        <div className="flex justify-between pt-2">
          <div className="skeleton h-5 rounded w-24" />
          <div className="skeleton h-5 rounded w-20" />
        </div>
      </div>
    </div>
  );
}
