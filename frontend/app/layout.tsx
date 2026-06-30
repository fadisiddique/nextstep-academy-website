import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextstepacademy.com"),
  title: {
    default: "NextStep Academy — Premium Online Tutoring for Students",
    template: "%s | NextStep Academy",
  },
  description:
    "Personalized one-to-one online tuition, small batch classes, foundation programs, and language courses trusted by families across UAE & India.",
  keywords: [
    "online tutoring",
    "private tutor",
    "online classes UAE",
    "online tuition India",
    "NextStep Academy",
    "one to one tuition",
    "language courses",
    "foundation program",
  ],
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://nextstepacademy.com",
    siteName: "NextStep Academy",
    title: "NextStep Academy — Premium Online Tutoring",
    description:
      "Expert online tutors, personalized learning plans, and proven results for students across UAE & India.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextStep Academy",
    description: "Premium online tutoring trusted by families across UAE & India.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
return (
  <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
    <body className="bg-cream-50 text-charcoal-900 antialiased">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "var(--font-inter)",
            borderRadius: "12px",
            border: "1px solid #EDE4D8",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          },
          success: {
            iconTheme: {
              primary: "#6B1A2A",
              secondary: "#FAF7F2",
            },
          },
        }}
      />

      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </body>
  </html>
);

}
