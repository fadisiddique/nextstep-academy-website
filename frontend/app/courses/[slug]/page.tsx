import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetailClient from "./CourseDetailClient";

interface Props {
  params: { slug: string };
}

// SSG: generate static params from all active courses
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses?active=true`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return (data.data || []).map((c: { slug: string }) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

// Dynamic metadata per course
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${params.slug}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    const course = data.data;
    if (!course) return { title: "Course Not Found" };
    return {
      title: `${course.title} | NextStep Academy`,
      description: course.shortDescription,
      openGraph: {
        title: course.title,
        description: course.shortDescription,
        images: [{ url: course.image }],
      },
    };
  } catch {
    return { title: "Course | NextStep Academy" };
  }
}

export default async function CourseDetailPage({ params }: Props) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${params.slug}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    if (!data.data) notFound();
    return <CourseDetailClient course={data.data} />;
  } catch {
    notFound();
  }
}
