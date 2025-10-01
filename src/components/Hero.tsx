import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Brain, Zap } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import { useToast } from "@/hooks/use-toast";
import DemoModal from "./DemoModal";
import { useState } from "react";

const Hero = () => {
  const { toast } = useToast();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleGetStarted = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchDemo = () => {
    setIsDemoModalOpen(true);
  };

  return (
    <>
    <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} toolTitle="Course Generation Demo" />
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Brain className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">AI-Powered Learning</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transform
              <span className="block bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                Any Content
              </span>
              Into Courses
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Upload YouTube videos or PDFs and watch AI generate complete micro-courses with 
              notes, quizzes, flashcards, and your personal AI tutor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8"
                onClick={handleGetStarted}
              >
                Start Creating Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={handleWatchDemo}
              >
                View Examples
                <BookOpen className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10k+</div>
                <div className="text-white/70 text-sm">Courses Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-white/70 text-sm">Learning Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5min</div>
                <div className="text-white/70 text-sm">Average Generation</div>
              </div>
            </div>
          </div>
          
          {/* Right column - Hero image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-glow">
              <img 
                src={heroImage} 
                alt="AI Course Generation Platform" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating feature cards */}
            <Card className="absolute -left-4 top-20 bg-white shadow-card p-4 max-w-[200px] transform -rotate-3 hover:rotate-0 transition-bounce">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Smart Notes</div>
                  <div className="text-xs text-muted-foreground">Auto-generated</div>
                </div>
              </div>
            </Card>
            
            <Card className="absolute -right-4 bottom-20 bg-white shadow-card p-4 max-w-[200px] transform rotate-3 hover:rotate-0 transition-bounce">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Tutor</div>
                  <div className="text-xs text-muted-foreground">24/7 Available</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
    </div>
    </>
  );
};

export default Hero;