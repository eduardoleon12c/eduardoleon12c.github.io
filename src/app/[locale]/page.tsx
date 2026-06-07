import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { PlansSection } from "@/components/PlansSection";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default function Home() {

  return (
    <main className="min-h-screen bg-[#0a0e1a]">
      <Header />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PlansSection />
      <Footer />
    </main>
  );
}
