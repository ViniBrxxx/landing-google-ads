import { Hero } from "@/components/landing/Hero";
import { Brands } from "@/components/landing/Brands";
import { Products } from "@/components/landing/Products";
import { DistributorShowcase } from "@/components/landing/DistributorShowcase";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { Differential } from "@/components/landing/Differential";
import { Logistics } from "@/components/landing/Logistics";
import { Conditions } from "@/components/landing/Conditions";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Index = () => {
  useScrollReveal();

  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rio Piranhas",
    description:
      "Distribuidora para empresas e revendedores no Maranhão e Piauí, com produtos de alta procura para revenda e compra direta.",
    areaServed: ["Maranhão", "Piauí"],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1200" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Hero />
      <Brands />
      <Problem />
      <Differential />
      <Products />
      <DistributorShowcase />
      <HowItWorks />
      <Logistics />
      <SocialProof />
      <Conditions />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
