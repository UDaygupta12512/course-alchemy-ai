import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import Features from "@/components/Features";
import AITutorSection from "@/components/AITutorSection";
import StudyToolsSection from "@/components/StudyToolsSection";
import LiveStats from "@/components/LiveStats";
import InteractiveDemo from "@/components/InteractiveDemo";
import HowItWorks from "@/components/HowItWorks";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
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
      <AITutorSection />
      <StudyToolsSection />
      <LiveStats />
      <InteractiveDemo />
      <HowItWorks />
      <SuccessStoriesSection />
      <Testimonials />
      <Pricing />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
