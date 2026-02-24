import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BannerSection from "@/components/BannerSection";
import AIAgentsSection from "@/components/AIAgentsSection";
import DomainsSection from "@/components/DomainsSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";
import QueryBot from "@/components/QueryBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <BannerSection />
      <AIAgentsSection />
      <DomainsSection />
      <ServicesSection />
      <PricingSection />
      <PartnersSection />
      <Footer />
      <QueryBot />
    </div>
  );
};

export default Index;
