"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  LayoutDashboard, BookOpen, Star, Users,
  LogOut, GraduationCap, Menu, X, ChevronRight,
} from "lucide-react";
import { authApi } from "@/lib/api";
import type { AdminUser } from "@/types";

const NAV = [
  { label: "Dashboard",    href: "/admin",              icon: <LayoutDashboard size={18} /> },
  { label: "Courses",      href: "/admin/courses",      icon: <BookOpen size={18} /> },
  { label: "Testimonials", href: "/admin/testimonials", icon: <Star size={18} /> },
  { label: "Leads",        href: "/admin/leads",        icon: <Users size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [user, setUser]           = useState<AdminUser | null>(null);
  const [loading, setLoading]     = useState(true);
  const [sidebarOpen, setSidebar] = useState(false);

  // Skip auth check on login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) { setLoading(false); return; }
    const token = Cookies.get("ns_admin_token");
    if (!token) { router.replace("/admin/login"); return; }
    authApi.me()
      .then((res) => setUser(res.data.data))
      .catch(() => { Cookies.remove("ns_admin_token"); router.replace("/admin/login"); })
      .finally(() => setLoading(false));
  }, [pathname, isLoginPage, router]);

  const logout = () => {
    Cookies.remove("ns_admin_token");
    router.replace("/admin/login");
  };

  if (isLoginPage) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-maroon-800 border-t-transparent animate-spin" />
          <p className="text-small text-gray-500">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={mobile
        ? "flex flex-col h-full"
        : "hidden lg:flex flex-col w-64 bg-maroon-900 min-h-screen fixed left-0 top-0 bottom-0 z-40"
      }
      style={mobile ? {} : {}}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
            <GraduationCap size={18} className="text-white" />
          </div>
          <div>
            <p className="font-outfit font-bold text-white text-small">NextStep</p>
            <p className="text-small text-cream-200/50" style={{ fontSize: "0.7rem" }}>Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSidebar(false)}
            className={`sidebar-link ${
              (item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href))
                ? "active"
                : ""
            }`}
          >
            {item.icon}
            {item.label}
            <ChevronRight size={14} className="ml-auto opacity-40" />
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/10">
        {user && (
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center
                            font-outfit font-bold text-gold-400 text-small">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white text-small truncate">{user.name}</p>
              <p className="text-small text-cream-200/50 truncate" style={{ fontSize: "0.7rem" }}>
                {user.role}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="sidebar-link w-full text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-cream-100">
      <Sidebar />

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="w-64 bg-maroon-900 flex flex-col">
            <Sidebar mobile />
          </div>
          <div
            className="flex-1 bg-charcoal-900/50 backdrop-blur-sm"
            onClick={() => setSidebar(false)}
          />
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-white border-b border-cream-200 px-4 sm:px-6 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-cream-100"
              onClick={() => setSidebar(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-small text-gray-500">
              <span>Admin</span>
              {pathname !== "/admin" && (
                <>
                  <ChevronRight size={12} />
                  <span className="capitalize text-charcoal-900 font-medium">
                    {pathname.split("/").pop()?.replace(/-/g, " ")}
                  </span>
                </>
              )}
            </div>
            <Link href="/" target="_blank" className="text-small text-maroon-800 hover:underline font-medium">
              View Website →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
