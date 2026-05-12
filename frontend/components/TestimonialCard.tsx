"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="card-hover h-full flex flex-col p-6 relative overflow-hidden">
        {/* Decorative quote mark */}
        <div className="absolute top-4 right-5 opacity-6">
          <Quote size={48} className="text-maroon-800 fill-maroon-800" />
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < testimonial.rating
                  ? "star-filled fill-gold-500 text-gold-500"
                  : "star-empty fill-cream-300 text-cream-300"
              }
            />
          ))}
        </div>

        {/* Review */}
        <blockquote className="flex-1 text-body text-charcoal-800 leading-relaxed mb-6 italic">
          &ldquo;{testimonial.review}&rdquo;
        </blockquote>

        {/* Success story */}
        {testimonial.successStory && (
          <div className="mb-5 p-3 rounded-lg bg-cream-100 border border-cream-200">
            <div className="flex gap-4 text-small">
              <div className="flex-1">
                <p className="text-gray-500 font-medium mb-0.5">Before</p>
                <p className="text-charcoal-800">{testimonial.successStory.before}</p>
              </div>
              <div className="w-px bg-cream-300" />
              <div className="flex-1">
                <p className="text-maroon-800 font-medium mb-0.5">After</p>
                <p className="text-charcoal-800">{testimonial.successStory.after}</p>
              </div>
            </div>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-cream-200">
          {testimonial.avatar ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-cream-200">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-maroon-800/10 flex items-center justify-center
                            shrink-0 ring-2 ring-cream-200 font-outfit font-bold text-maroon-800">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-outfit font-semibold text-charcoal-900 text-small">
              {testimonial.name}
            </p>
            <p className="text-small text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
