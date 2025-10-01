import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import DemoModal from "./DemoModal";
import { 
  FileText, 
  Target, 
  BarChart3, 
  Calendar,
  Trophy,
  Clock,
  BookOpen,
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const StudyToolsSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string>("");
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const tools = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Note Taking",
      description: "AI-generated notes that capture key concepts and relationships",
      features: ["Auto-summarization", "Keyword extraction", "Mind maps"],
      color: "bg-gradient-primary"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Adaptive Testing",
      description: "Personalized quizzes that adapt to your learning progress",
      features: ["Difficulty adjustment", "Weak point focus", "Progress tracking"],
      color: "bg-gradient-secondary"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Progress Analytics",
      description: "Detailed insights into your learning patterns and achievements",
      features: ["Performance metrics", "Time tracking", "Goal setting"],
      color: "bg-gradient-hero"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Study Scheduler",
      description: "AI-optimized study plans that fit your schedule and goals",
      features: ["Smart scheduling", "Deadline tracking", "Reminder system"],
      color: "bg-gradient-primary"
    }
  ];

  const stats = [
    {
      icon: <Trophy className="w-6 h-6" />,
      value: "95%",
      label: "Success Rate",
      description: "Students see improved grades"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: "3x",
      label: "Faster Learning",
      description: "Compared to traditional methods"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      value: "87%",
      label: "Retention Rate",
      description: "Better knowledge retention"
    }
  ];

  const handleExploreTool = (toolTitle: string) => {
    setSelectedTool(toolTitle);
    setIsDemoOpen(true);
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
            <Zap className="w-3 h-3 mr-1" />
            Advanced Study Tools
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Supercharge Your
            <span className="bg-gradient-secondary bg-clip-text text-transparent block">
              Study Sessions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Access a comprehensive suite of AI-powered study tools designed to optimize your learning experience 
            and help you achieve your academic goals faster than ever before.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {tools.map((tool, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-card overflow-hidden">
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className={`w-16 h-16 ${tool.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-glow`}>
                    {tool.icon}
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    New
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold">{tool.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group/btn hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleExploreTool(tool.title)}
                >
                  Explore Tool
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-hero opacity-10 rounded-3xl blur-3xl"></div>
          <Card className="relative border-0 bg-gradient-card shadow-elegant">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Proven Results</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our AI-powered study tools have helped thousands of students achieve their learning goals 
                  with measurable improvements in performance and retention.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform shadow-glow">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="inline-block border-0 bg-gradient-hero text-white shadow-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Learning?</h3>
              <p className="text-white/90 mb-6 max-w-md">
                Join thousands of students who have already supercharged their studies with our AI tools.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={handleGetStarted}
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <DemoModal 
          isOpen={isDemoOpen}
          onClose={() => setIsDemoOpen(false)}
          toolTitle={selectedTool}
        />
      </div>
    </section>
  );
};

export default StudyToolsSection;