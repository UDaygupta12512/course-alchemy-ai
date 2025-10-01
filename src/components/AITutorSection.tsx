import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MessageSquare, 
  Brain, 
  Lightbulb, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";
import AIChatAssistant from "./AIChatAssistant";

const AITutorSection = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const tutorFeatures = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "24/7 Availability",
      description: "Get help anytime, anywhere with instant responses"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Personalized Learning",
      description: "Adapts to your learning style and pace"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Smart Explanations",
      description: "Complex concepts broken down into simple terms"
    }
  ];

  const capabilities = [
    "Answer questions about course material",
    "Explain difficult concepts step-by-step",
    "Provide additional examples and analogies",
    "Help with homework and assignments",
    "Create study plans and schedules",
    "Suggest learning resources"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Learning
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Your Personal
                <span className="bg-gradient-primary bg-clip-text text-transparent block">
                  AI Tutor Chat
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get instant answers and explanations from your personal AI teaching assistant. 
                Available 24/7 to help you understand concepts, solve problems, and accelerate your learning.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-4">
              {tutorFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
              <DialogTrigger asChild>
                <Button className="group" size="lg">
                  Try AI Tutor Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>AI Tutor Demo</DialogTitle>
                </DialogHeader>
                <AIChatAssistant courseContext="Demo course - Feel free to ask any educational questions!" />
              </DialogContent>
            </Dialog>
          </div>

          {/* Right Content - Demo Chat */}
          <div className="relative">
            <Card className="shadow-elegant border-0 bg-gradient-card overflow-hidden">
              <CardHeader className="bg-gradient-primary text-white">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Tutor Assistant
                  <Badge variant="secondary" className="ml-auto bg-white/20 text-white border-white/30">
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {/* Chat Messages */}
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary text-white p-3 rounded-2xl rounded-br-md max-w-xs">
                      Can you explain photosynthesis in simple terms?
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      AI
                    </div>
                    <div className="bg-muted p-3 rounded-2xl rounded-bl-md max-w-xs">
                      <p className="text-sm">
                        Sure! Think of photosynthesis as plants making their own food using sunlight, 
                        water, and air. It's like having a solar-powered kitchen! 🌱
                      </p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Would you like me to break this down further?
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-primary text-white p-3 rounded-2xl rounded-br-md max-w-xs">
                      Yes, what are the main steps?
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      AI
                    </div>
                    <div className="bg-muted p-3 rounded-2xl rounded-bl-md max-w-xs">
                      <p className="text-sm mb-2">Great question! Here are the main steps:</p>
                      <div className="space-y-2 text-sm">
                        {capabilities.slice(0, 3).map((step, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-success" />
                            <span className="text-xs">{step.split(' ').slice(0, 3).join(' ')}...</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Typing Indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    AI
                  </div>
                  <div className="bg-muted p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-secondary rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">What Your AI Tutor Can Help With</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From basic questions to complex problem-solving, your AI tutor is equipped to assist with every aspect of your learning journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((capability, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-gradient-card border border-border/30">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-sm font-medium">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITutorSection;