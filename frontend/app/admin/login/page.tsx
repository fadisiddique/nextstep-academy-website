"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Loader2, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/lib/api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const schema = z.object({
  email:    z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router  = useRouter();
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await authApi.login(data.email, data.password);
      Cookies.set("ns_admin_token", res.data.data.token, { expires: 7, secure: true });
      toast.success("Welcome back!");
      router.replace("/admin");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon-900 via-charcoal-900 to-maroon-900
                    flex items-center justify-center p-4">
      {/* Blob */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9973A 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-gold">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="font-outfit font-bold text-white text-h2">NextStep</h1>
          <p className="text-small text-cream-200/60 mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-8">
          <h2 className="font-outfit font-bold text-white text-h3 mb-1">Sign In</h2>
          <p className="text-small text-cream-200/60 mb-6">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-small font-medium text-cream-200/80 mb-1.5">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white
                           placeholder-cream-200/30 focus:outline-none focus:ring-2 focus:ring-gold-400
                           focus:border-transparent transition-all text-body"
                placeholder="admin@nextstep.com"
                autoComplete="email"
              />
              {errors.email && <p className="text-small text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-small font-medium text-cream-200/80 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPw ? "text" : "password"}
                  className="w-full px-4 py-3 pr-11 rounded-lg bg-white/10 border border-white/15 text-white
                             placeholder-cream-200/30 focus:outline-none focus:ring-2 focus:ring-gold-400
                             focus:border-transparent transition-all text-body"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-200/40 hover:text-cream-200/70"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-small text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-600 text-white font-outfit font-semibold
                         py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2
                         shadow-gold mt-2 active:scale-[.98]"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : "Sign In →"}
            </button>
          </form>
        </div>

        <p className="text-center text-small text-cream-200/30 mt-6">
          NextStep Academy © {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
}
