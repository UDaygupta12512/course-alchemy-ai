import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Medical Student",
      university: "Stanford University",
      image: "https://images.unsplash.com/photo-1494790108755-2616b381d49b?w=150&h=150&fit=crop&crop=face",
      content: "This platform revolutionized how I study. I cut my study time in half while improving my retention by 80%. The AI-generated notes are incredibly accurate and well-structured.",
      rating: 5,
      subject: "Medical Studies"
    },
    {
      name: "Alex Rodriguez",
      role: "Software Engineer",
      university: "MIT",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The interactive quizzes and flashcards helped me master complex algorithms. The AI tutor feels like having a personal teaching assistant available 24/7.",
      rating: 5,
      subject: "Computer Science"
    },
    {
      name: "Emily Johnson",
      role: "Business Student",
      university: "Harvard Business School",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "From dense case studies to complex financial models, this tool makes everything digestible. My grades improved dramatically since I started using it.",
      rating: 5,
      subject: "Business Analytics"
    },
    {
      name: "David Kim",
      role: "Research Assistant",
      university: "Cambridge University",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The course summaries are perfect for literature reviews. It saved me weeks of work and helped me identify key concepts I would have missed.",
      rating: 5,
      subject: "Research Methods"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            What Our Learners Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of students who've transformed their learning experience
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-card">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          
                          <div className="relative mb-4">
                            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                            <p className="text-lg text-foreground/90 leading-relaxed pl-6">
                              {testimonial.content}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.university}</p>
                            </div>
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {testimonial.subject}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;