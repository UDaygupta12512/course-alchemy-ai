import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <UploadSection />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
