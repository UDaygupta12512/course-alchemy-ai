import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  TrendingUp, 
  Award, 
  Users,
  Quote,
  CheckCircle
} from "lucide-react";

const SuccessStoriesSection = () => {
  const stories = [
    {
      name: "Sarah Chen",
      role: "Medical Student",
      university: "Stanford University",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      story: "MindSphere AI transformed my study routine completely. I was struggling with biochemistry until I started using the AI tutor. The personalized explanations and adaptive quizzes helped me understand complex molecular processes in ways my textbook never could.",
      achievement: "Improved GPA from 3.2 to 3.8",
      timeframe: "In 6 months",
      rating: 5,
      subjects: ["Biochemistry", "Anatomy", "Pharmacology"]
    },
    {
      name: "Marcus Rodriguez",
      role: "Software Engineering Student",
      university: "MIT",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      story: "The AI-generated coding challenges and instant feedback system were game-changers. I went from struggling with algorithms to landing internships at top tech companies. The study scheduler helped me balance multiple programming languages efficiently.",
      achievement: "Landed Google internship",
      timeframe: "After 8 months",
      rating: 5,
      subjects: ["Python", "Data Structures", "Machine Learning"]
    },
    {
      name: "Emily Watson",
      role: "Law Student",
      university: "Harvard Law",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      story: "Preparing for the bar exam was overwhelming until I discovered MindSphere AI. The AI tutor helped me break down complex legal concepts, and the progress tracking kept me motivated. I passed on my first attempt with a score in the top 10%.",
      achievement: "Top 10% bar exam score",
      timeframe: "First attempt",
      rating: 5,
      subjects: ["Constitutional Law", "Contracts", "Torts"]
    }
  ];

  const achievements = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      stat: "2.5x",
      label: "Average Grade Improvement",
      description: "Students see significant grade increases within the first semester"
    },
    {
      icon: <Award className="w-6 h-6" />,
      stat: "94%",
      label: "Pass Rate",
      description: "Of students using our platform for exam preparation"
    },
    {
      icon: <Users className="w-6 h-6" />,
      stat: "50K+",
      label: "Success Stories",
      description: "Students who've achieved their academic goals"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-success/10 text-success border-success/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Success Stories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Real Students,
            <span className="bg-gradient-secondary bg-clip-text text-transparent block">
              Real Results
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover how students from top universities are transforming their academic performance 
            and achieving their goals with MindSphere AI's AI-powered learning platform.
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-card relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Quote className="w-6 h-6 text-primary/20" />
              </div>
              
              <CardContent className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <Avatar className="ring-2 ring-primary/20">
                    <AvatarImage src={story.avatar} alt={story.name} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                    <p className="text-xs text-primary font-medium">{story.university}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Story */}
                <blockquote className="text-sm leading-relaxed text-muted-foreground italic">
                  "{story.story}"
                </blockquote>

                {/* Achievement */}
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-success" />
                    <span className="font-semibold text-success text-sm">{story.achievement}</span>
                  </div>
                  <p className="text-xs text-success/80">{story.timeframe}</p>
                </div>

                {/* Subjects */}
                <div className="flex flex-wrap gap-2">
                  {story.subjects.map((subject, subjectIndex) => (
                    <Badge key={subjectIndex} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-hero opacity-10 rounded-3xl blur-3xl"></div>
          <Card className="relative border-0 bg-gradient-card shadow-elegant">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Academic Excellence Achieved</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join the growing community of successful students who have transformed their academic journey 
                  with our AI-powered learning platform.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform shadow-glow">
                      {achievement.icon}
                    </div>
                    <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                      {achievement.stat}
                    </div>
                    <div className="text-lg font-semibold mb-1">{achievement.label}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;