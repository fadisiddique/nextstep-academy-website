// ──────────────────────────────────────────────────
//  NextStep Academy — Shared TypeScript Types
// ──────────────────────────────────────────────────

export interface Course {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;              // Cloudinary URL
  imagePublicId: string;      // Cloudinary public_id
  category: CourseCategory;
  duration: string;           // e.g. "8 Weeks"
  rating: number;             // 1-5
  studentCount: number;
  badge?: "Popular" | "New" | "Bestseller" | "Featured";
  highlights: string[];       // bullet list
  curriculum: CurriculumSection[];
  faqs: FAQ[];
  price?: string;             // "AED 250 / month" or "Free Demo"
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CourseCategory =
  | "foundation"
  | "language"
  | "spoken-language"
  | "cursive-writing"
  | "art-craft"
  | "counselling"
  | "one-to-one";
  
export type CourseFilterCategory =
  | "all"
  | CourseCategory;

export interface CurriculumSection {
  title: string;
  items: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

// ── Testimonial ────────────────────────────────────

export interface Testimonial {
  _id: string;
  name: string;
  role: string;               // "Parent of Grade 5 Student" | "Student, Grade 10"
  avatar?: string;            // Cloudinary URL
  rating: number;
  review: string;
  videoUrl?: string;          // optional YouTube / Cloudinary video
  successStory?: {
    before: string;
    after: string;
  };
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

// ── Lead / Inquiry ─────────────────────────────────

export interface Lead {
  _id: string;
  studentName: string;
  parentName?: string;
  grade: string;
  whatsapp: string;
  email?: string;
  courseInterest?: string;
  message?: string;
  source: "demo-form" | "course-inquiry" | "whatsapp-cta" | "contact-form";
  status: "new" | "contacted" | "enrolled" | "not-interested";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Admin ──────────────────────────────────────────

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "super-admin" | "admin";
}

export interface AuthResponse {
  token: string;
  user: AdminUser;
}

// ── API responses ──────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

// ── Forms ──────────────────────────────────────────

export interface DemoFormData {
  studentName: string;
  grade: string;
  whatsapp: string;
  parentName?: string;
  courseInterest?: string;
}

export interface InquiryFormData {
  studentName: string;
  grade: string;
  whatsapp: string;
  email?: string;
  courseInterest: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TutorApplicationData {
  name: string;
  email: string;
  whatsapp: string;
  qualification: string;
  subjects: string;
  experience: string;
  availability: string;
  bio: string;
}

// ── Dashboard stats ────────────────────────────────

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  enrolledStudents: number;
  totalCourses: number;
  totalTestimonials: number;
  recentLeads: Lead[];
}
