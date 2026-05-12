import axios, { AxiosInstance, AxiosError } from "axios";
import Cookies from "js-cookie";

// ── Base instance ──────────────────────────────────────────
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ── Request interceptor — attach JWT ───────────────────────
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("ns_admin_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — handle 401 ─────────────────────
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookies.remove("ns_admin_token");
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

// ═══════════════════════════════════════════════════════════
//  COURSES
// ═══════════════════════════════════════════════════════════

export const coursesApi = {
  getAll: (params?: { category?: string; featured?: boolean }) =>
    api.get("/courses", { params }),

  getBySlug: (slug: string) =>
    api.get(`/courses/${slug}`),

  create: (data: FormData) =>
    api.post("/courses", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: string, data: FormData) =>
    api.put(`/courses/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id: string) =>
    api.delete(`/courses/${id}`),

  toggleFeatured: (id: string) =>
    api.patch(`/courses/${id}/featured`),

  toggleActive: (id: string) =>
    api.patch(`/courses/${id}/active`),
};

// ═══════════════════════════════════════════════════════════
//  TESTIMONIALS
// ═══════════════════════════════════════════════════════════

export const testimonialsApi = {
  getAll: (params?: { featured?: boolean; active?: boolean }) =>
    api.get("/testimonials", { params }),

  create: (data: FormData) =>
    api.post("/testimonials", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: string, data: FormData) =>
    api.put(`/testimonials/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id: string) =>
    api.delete(`/testimonials/${id}`),
};

// ═══════════════════════════════════════════════════════════
//  LEADS
// ═══════════════════════════════════════════════════════════

export const leadsApi = {
  submit: (data: object) =>
    api.post("/leads", data),

  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get("/leads", { params }),

  updateStatus: (id: string, status: string, notes?: string) =>
    api.patch(`/leads/${id}/status`, { status, notes }),

  delete: (id: string) =>
    api.delete(`/leads/${id}`),

  export: () =>
    api.get("/leads/export", { responseType: "blob" }),
};

// ═══════════════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════════════

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  me: () =>
    api.get("/auth/me"),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.put("/auth/change-password", { currentPassword, newPassword }),
};

// ═══════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════

export const dashboardApi = {
  getStats: () => api.get("/dashboard/stats"),
};

// ═══════════════════════════════════════════════════════════
//  CONTACT
// ═══════════════════════════════════════════════════════════

export const contactApi = {
  send: (data: object) => api.post("/contact", data),
};

// ═══════════════════════════════════════════════════════════
//  TUTOR APPLICATIONS
// ═══════════════════════════════════════════════════════════

export const tutorApi = {
  apply: (data: object) => api.post("/tutor-applications", data),
  getAll: () => api.get("/tutor-applications"),
  updateStatus: (id: string, status: string) =>
    api.patch(`/tutor-applications/${id}/status`, { status }),
};

export default api;
