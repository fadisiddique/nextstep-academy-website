"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseForm from "../../CourseForm";
import { coursesApi } from "@/lib/api";
import toast from "react-hot-toast";
import type { Course } from "@/types";

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    coursesApi.getAll()
      .then(r => {
        const found = r.data.data.find((c: Course) => c._id === params.id);
        if (!found) { toast.error("Course not found"); router.push("/admin/courses"); }
        else setCourse(found);
      })
      .catch(() => { toast.error("Failed to load course"); router.push("/admin/courses"); });
  }, [params.id, router]);

  const onSubmit = async (fd: globalThis.FormData) => {
    await coursesApi.update(params.id, fd);
    toast.success("Course updated!");
    router.push("/admin/courses");
  };

  if (!course) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 rounded-full border-2 border-maroon-800 border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div>
      <h1 className="font-outfit font-bold text-h2 text-charcoal-900 mb-8">Edit Course</h1>
      <CourseForm course={course} onSubmit={onSubmit} />
    </div>
  );
}
