import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, X, FileText, MessageSquare, Brain, Clock } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const demoSteps = [
    {
      title: "Upload Content",
      description: "Drag & drop a PDF or paste YouTube URL",
      duration: "30 seconds",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "AI Analysis", 
      description: "Our AI processes and extracts key concepts",
      duration: "2-3 minutes",
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: "Course Generation",
      description: "Complete course with notes, quizzes & tutor",
      duration: "1 minute",
      icon: <MessageSquare className="w-5 h-5" />
    }
  ];

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
          {/* Demo Video Placeholder */}
          <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Interactive Demo Video</h3>
                <p className="text-white/80 mb-4">See EduSynth transform a YouTube video into a complete course</p>
                <Button variant="hero" onClick={() => {
                  // In a real app, this would play a demo video
                  alert("Demo video would play here! For now, try the live demo below by uploading content.");
                }}>
                  <Play className="w-4 h-4 mr-2" />
                  Play Demo (3:45)
                </Button>
              </div>
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