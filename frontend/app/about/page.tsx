// ──────────────────────────────────────────────────────────────────────────
//  ABOUT PAGE  (app/about/page.tsx)
// ──────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about NextStep Academy — our mission, vision, values, and the team behind our premium online tutoring platform.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-cream-100 to-white relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle, #6B1A2A 0%, transparent 70%)" }}
        />
        <div className="container-wide px-4 sm:px-6 text-center">
          <span className="section-pill mb-4">About NextStep</span>
          <h1
            className="font-outfit font-bold text-charcoal-900 mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Empowering Students Through<br />
            <span className="text-gradient">Personalized Online Learning</span>
          </h1>
          <p className="text-body-lg text-gray-500 max-w-2xl mx-auto">
            NextStep Academy Online is a leading online learning platform dedicated to empowering
            students of all ages with expert one-to-one tuition, language courses, foundation
            programs, and creative skill-building classes.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section bg-white">
        <div className="container-wide px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                text: "To democratize education by providing accessible, high-quality learning experiences that empower individuals to achieve their goals and transform their lives.",
              },
              {
                icon: "🌍",
                title: "Our Vision",
                text: "A world where anyone, anywhere can access world-class education and unlock their full potential through continuous learning and skill development.",
              },
              {
                icon: "💎",
                title: "Our Values",
                text: "Excellence, accessibility, innovation, and community. We believe in creating inclusive learning environments where everyone can thrive.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-8 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-outfit font-bold text-h3 text-charcoal-900 mb-3">{item.title}</h3>
                <p className="text-body text-gray-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-cream-100">
        <div className="container-tight px-4 sm:px-6">
          <div className="text-center">
            <span className="section-pill">Our Story</span>
            <h2 className="section-title">Built on a belief that every student deserves the best</h2>
            <p className="text-body-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              NextStep Academy was founded with a simple but powerful belief: that every child, regardless of
              location or background, deserves access to expert tutoring and genuine personal attention.
              Starting with a small group of dedicated tutors and a handful of students across UAE and India,
              we have grown into a trusted platform serving 500+ families — and we are just getting started.
              Our teaching is built around relationships, not just content delivery. We take time to understand
              each student&apos;s strengths, gaps, and learning style before crafting a personalized plan that
              actually moves the needle.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
