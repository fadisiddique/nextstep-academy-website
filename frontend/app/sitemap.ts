import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nextstepacademy.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/courses`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/about`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/become-a-tutor`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Dynamic course pages
  let coursePages: MetadataRoute.Sitemap = [];
  try {
    const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses?active=true`);
    const data = await res.json();
    coursePages = (data.data || []).map((c: { slug: string; updatedAt: string }) => ({
      url:              `${baseUrl}/courses/${c.slug}`,
      lastModified:     new Date(c.updatedAt),
      changeFrequency:  "weekly" as const,
      priority:         0.85,
    }));
  } catch {}

  return [...staticPages, ...coursePages];
}
