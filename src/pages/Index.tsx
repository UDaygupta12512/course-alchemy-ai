import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import Features from "@/components/Features";
import LiveStats from "@/components/LiveStats";
import InteractiveDemo from "@/components/InteractiveDemo";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <UploadSection />
      <Features />
      <LiveStats />
      <InteractiveDemo />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
