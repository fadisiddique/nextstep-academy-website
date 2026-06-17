import HeroSection from "@/components/sections/HeroSection";
import {
  StatsSection,
  TrustSection,
  FeaturesSection,
  CoursesPreview,
  TestimonialsSection,
  DemoCtaSection,
  FaqSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <TrustSection />
      <FeaturesSection />
      <CoursesPreview />
      <TestimonialsSection />
      <DemoCtaSection />
      <FaqSection />
    </>
  );
}