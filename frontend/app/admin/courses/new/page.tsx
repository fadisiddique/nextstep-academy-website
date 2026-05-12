"use client";

import { useRouter } from "next/navigation";
import CourseForm from "../CourseForm";
import { coursesApi } from "@/lib/api";
import toast from "react-hot-toast";

export default function NewCoursePage() {
  const router = useRouter();

  const onSubmit = async (fd: globalThis.FormData) => {
    await coursesApi.create(fd);
    toast.success("Course created!");
    router.push("/admin/courses");
  };

  return (
    <div>
      <h1 className="font-outfit font-bold text-h2 text-charcoal-900 mb-8">New Course</h1>
      <CourseForm onSubmit={onSubmit} />
    </div>
  );
}
