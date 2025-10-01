import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, X, FileText, MessageSquare, Brain, Clock, CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);

  const demoSteps = [
    {
      title: "Upload Content",
      description: "Processing YouTube video: 'Introduction to Machine Learning'",
      duration: 2000,
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "AI Analysis", 
      description: "Extracting key concepts, definitions, and learning objectives",
      duration: 3000,
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: "Course Generation",
      description: "Creating notes, quizzes, flashcards, and AI tutor",
      duration: 2000,
      icon: <MessageSquare className="w-5 h-5" />
    }
  ];

  const sampleContent = [
    "📝 Generated comprehensive lecture notes on ML fundamentals",
    "🧠 Created 8 interactive quiz questions about supervised learning",
    "💡 Generated 12 flashcards for key ML concepts",
    "🤖 AI Tutor ready to answer questions about the content"
  ];

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setProgress(0);
    setGeneratedContent([]);
    
    let totalDuration = 0;
    demoSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setGeneratedContent(prev => [...prev, sampleContent[index] || ""]);
        
        // Animate progress within each step
        const stepDuration = step.duration;
        const interval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + (100 / demoSteps.length / (stepDuration / 100));
            if (newProgress >= (index + 1) * (100 / demoSteps.length)) {
              clearInterval(interval);
              return (index + 1) * (100 / demoSteps.length);
            }
            return newProgress;
          });
        }, stepDuration / 100);
        
      }, totalDuration);
      totalDuration += step.duration;
    });

    // Complete demo
    setTimeout(() => {
      setCurrentStep(demoSteps.length);
      setProgress(100);
      setGeneratedContent(sampleContent);
    }, totalDuration);
  };

  // Reset demo when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setCurrentStep(0);
      setProgress(0);
      setGeneratedContent([]);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            EduSynth Demo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Interactive Demo */}
          <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden p-6">
            <div className="aspect-video flex flex-col justify-center">
              {!isPlaying ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Interactive Demo</h3>
                  <p className="text-white/80 mb-4">Watch EduSynth transform content into a complete course in real-time</p>
                  <Button variant="hero" onClick={startDemo}>
                    <Play className="w-4 h-4 mr-2" />
                    Start Live Demo (7 seconds)
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 text-white">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">Processing: Introduction to Machine Learning</h3>
                    <Progress value={progress} className="w-full max-w-md mx-auto mb-4" />
                    <p className="text-white/80 text-sm">{Math.round(progress)}% Complete</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {demoSteps.map((step, index) => (
                      <Card key={index} className={`border ${
                        index < currentStep ? 'border-green-500 bg-green-500/10' :
                        index === currentStep ? 'border-yellow-500 bg-yellow-500/10' :
                        'border-border/30 bg-background/50'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              index < currentStep ? 'bg-green-500' :
                              index === currentStep ? 'bg-yellow-500' :
                              'bg-muted'
                            }`}>
                              {index < currentStep ? 
                                <CheckCircle className="w-4 h-4 text-white" /> :
                                index === currentStep ?
                                <Loader2 className="w-4 h-4 text-white animate-spin" /> :
                                step.icon
                              }
                            </div>
                            <Badge variant={index <= currentStep ? "default" : "outline"} className="text-xs">
                              Step {index + 1}
                            </Badge>
                          </div>
                          <h4 className="font-semibold mb-2">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {generatedContent.length > 0 && (
                    <div className="bg-background/90 rounded-lg p-4 backdrop-blur-sm">
                      <h4 className="font-semibold text-foreground mb-3">✨ Generated Content:</h4>
                      <div className="space-y-2">
                        {generatedContent.map((content, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-foreground animate-fade-in">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {content}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep >= demoSteps.length && (
                    <div className="text-center">
                      <Button variant="hero" className="bg-white text-primary hover:bg-white/90" onClick={() => {
                        onClose();
                        setTimeout(() => {
                          document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      }}>
                        Try With Your Own Content
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Process Steps */}
          <div>
            <h3 className="text-lg font-semibold mb-4">How it works:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {demoSteps.map((step, index) => (
                <Card key={index} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        {step.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Step {index + 1}
                      </Badge>
                    </div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sample Results */}
          <div>
            <h3 className="text-lg font-semibold mb-4">What you'll get:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">📝 Smart Notes</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI-generated lecture notes with key concepts, definitions, and summaries
                  </p>
                  <div className="bg-muted/50 rounded p-3 text-xs">
                    <strong>Example:</strong> "Machine Learning is a subset of AI that enables computers to learn patterns from data without explicit programming..."
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">🧠 Interactive Quizzes</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Automatically generated questions to test comprehension
                  </p>
                  <div className="bg-muted/50 rounded p-3 text-xs">
                    <strong>Q:</strong> What is the main goal of supervised learning?<br/>
                    <strong>A:</strong> To learn from labeled training data
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">💡 Flashcards</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Spaced repetition flashcards for better retention
                  </p>
                  <div className="bg-muted/50 rounded p-3 text-xs">
                    <strong>Front:</strong> What is a Neural Network?<br/>
                    <strong>Back:</strong> Computing system inspired by biological neural networks
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">🤖 AI Tutor</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Personal AI assistant for questions and explanations
                  </p>
                  <div className="bg-muted/50 rounded p-3 text-xs">
                    <strong>You:</strong> Can you explain this concept?<br/>
                    <strong>AI:</strong> Sure! Let me break it down for you...
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-hero rounded-xl p-6 text-center text-white">
            <h3 className="text-xl font-semibold mb-3">Ready to try it yourself?</h3>
            <p className="text-white/90 mb-4">
              Start creating your first AI-powered course right now - it's completely free!
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                variant="hero" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
              >
                Try Live Demo
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;