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
  console.log('Index.tsx: Index page rendering...');
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', color: '#000', marginBottom: '10px' }}>
        <h1>Website Loading Test - This should be visible</h1>
        <p>If you can see this text, the React app is working.</p>
      </div>
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
