import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, FileText, Brain, MessageSquare, Download, Sparkles } from "lucide-react";

const InteractiveDemo = () => {
  const [activeDemo, setActiveDemo] = useState("notes");
  const [isPlaying, setIsPlaying] = useState(false);

  const demos = {
    notes: {
      title: "AI Note Generation",
      description: "Watch as our AI transforms complex content into structured, easy-to-understand notes",
      icon: <FileText className="w-6 h-6" />,
      content: `Introduction to Machine Learning

What is Machine Learning?
Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed.

Key Concepts:
• Supervised Learning - Learning with labeled examples
• Unsupervised Learning - Finding patterns in unlabeled data  
• Neural Networks - Computing systems inspired by biological neural networks
• Training Data - Information used to teach the algorithm

Applications:
• Image Recognition - Identifying objects in photos
• Natural Language Processing - Understanding human language
• Recommendation Systems - Suggesting relevant content
• Predictive Analytics - Forecasting future trends

Benefits:
• Automation of complex tasks
• Pattern recognition at scale
• Improved decision making
• Enhanced user experiences`
    },
    quiz: {
      title: "Interactive Quiz Generation",
      description: "See how we create targeted quizzes that test understanding and reinforce learning",
      icon: <Brain className="w-6 h-6" />,
      content: "Quiz: Machine Learning Fundamentals\n\n1. What is machine learning?\na) A type of computer hardware\nb) A subset of AI that learns from data\nc) A programming language\nd) A database system\n\n✓ Answer: b) A subset of AI that learns from data\n\n2. Which type of learning uses labeled examples?\na) Unsupervised learning\nb) Reinforcement learning\nc) Supervised learning\nd) Deep learning\n\n✓ Answer: c) Supervised learning\n\n3. What are neural networks inspired by?\na) Computer circuits\nb) Mathematical equations\nc) Biological neural networks\nd) Internet protocols\n\n✓ Answer: c) Biological neural networks"
    },
    chat: {
      title: "AI Tutor Chat",
      description: "Experience instant explanations and personalized help from your AI teaching assistant",
      icon: <MessageSquare className="w-6 h-6" />,
      content: "💬 AI Tutor Chat\n\nYou: Can you explain supervised learning in simple terms?\n\n🤖 AI Tutor: Absolutely! Think of supervised learning like learning with a teacher.\n\nImagine you're learning to identify different dog breeds:\n• The teacher shows you photos of dogs with labels (\"Golden Retriever\", \"Poodle\", etc.)\n• You study these labeled examples\n• Later, when shown a new dog photo without a label, you can identify the breed\n\nThat's exactly how supervised learning works - the algorithm learns from labeled examples to make predictions on new, unlabeled data.\n\nYou: What's the difference between classification and regression?\n\n🤖 AI Tutor: Great question! Both are types of supervised learning:\n\n🏷️ Classification: Predicts categories/labels\n• Example: Email spam detection (spam/not spam)\n• Example: Image recognition (cat/dog/bird)\n\n📊 Regression: Predicts numerical values\n• Example: House price prediction ($250,000)\n• Example: Temperature forecasting (23°C)\n\nThink of it as: Classification = \"What type?\", Regression = \"How much?\""
    }
  };

  const handlePlayDemo = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            See the Magic in Action
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Experience how our AI transforms any content into a complete learning experience
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/10 backdrop-blur-sm border-border">
              {Object.entries(demos).map(([key, demo]) => (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="text-primary-foreground data-[state=active]:bg-card data-[state=active]:text-card-foreground"
                >
                  <div className="flex items-center gap-2">
                    {demo.icon}
                    <span className="hidden sm:inline">{demo.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(demos).map(([key, demo]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Demo Description */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-primary-foreground mb-3">
                        {demo.title}
                      </h3>
                      <p className="text-primary-foreground/80 text-lg leading-relaxed">
                        {demo.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button 
                        onClick={handlePlayDemo}
                        disabled={isPlaying}
                        variant="secondary"
                        size="lg"
                        className="bg-card text-card-foreground hover:bg-card/90"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        {isPlaying ? "Generating..." : "Try Demo"}
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-accent" />
                        <span className="text-primary-foreground/80">AI-Powered</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-card/20 text-primary-foreground border-border/30">
                        <Download className="w-3 h-3 mr-1" />
                        Exportable
                      </Badge>
                      <Badge variant="secondary" className="bg-card/20 text-primary-foreground border-border/30">
                        Real-time
                      </Badge>
                      <Badge variant="secondary" className="bg-card/20 text-primary-foreground border-border/30">
                        Interactive
                      </Badge>
                    </div>
                  </div>

                  {/* Demo Output */}
                  <Card className="bg-card/10 backdrop-blur-sm border-border/20">
                    <CardHeader>
                      <CardTitle className="text-primary-foreground flex items-center gap-2">
                        {demo.icon}
                        Live Demo Output
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-background/20 rounded-lg p-4 h-80 overflow-y-auto">
                        <pre className="text-primary-foreground/90 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                          {isPlaying && activeDemo === key ? (
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-150"></div>
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-300"></div>
                              <span className="ml-2">AI is generating content...</span>
                            </div>
                          ) : (
                            demo.content
                          )}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;