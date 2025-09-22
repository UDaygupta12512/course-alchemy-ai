import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Brain, 
  Download,
  CheckCircle,
  Clock,
  Star,
  Send
} from "lucide-react";

interface CoursePreviewProps {
  isVisible: boolean;
  courseTitle: string;
  sourceType: "youtube" | "pdf";
  inputContent?: string; // URL or file name
}

const CoursePreview = ({ isVisible, courseTitle, sourceType, inputContent }: CoursePreviewProps) => {
  const { toast } = useToast();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai' as const,
      message: "Hi! I'm your AI tutor for this course. I can help explain concepts, answer questions, and provide additional examples. What would you like to learn more about?"
    },
    {
      id: 2,
      type: 'user' as const,
      message: "Can you explain neural networks in simple terms?"
    },
    {
      id: 3,
      type: 'ai' as const,
      message: "Think of neural networks like your brain! Just as your brain has neurons that connect and pass information, artificial neural networks have nodes that process information. Each node receives input, processes it, and passes the result to the next layer. The network 'learns' by adjusting these connections based on examples, just like how you learn from experience! 🧠"
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  if (!isVisible) return null;

  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Different responses based on keywords or topics
    if (message.includes('neural network') || message.includes('ai') || message.includes('machine learning')) {
      return "Neural networks are inspired by biological neurons! They consist of interconnected nodes that process information in layers. Each connection has a weight that gets adjusted during training. Think of it like learning to recognize patterns - the more examples you see, the better you get at identifying them.";
    } else if (message.includes('explain') || message.includes('what is') || message.includes('how does')) {
      return "Great question! Let me break this down step by step with examples from the course content. This concept builds on the fundamentals we covered earlier and connects to practical applications you'll encounter in real-world scenarios.";
    } else if (message.includes('example') || message.includes('practical') || message.includes('use case')) {
      return "Here's a practical example: In the finance industry, this concept is used for fraud detection, risk assessment, and algorithmic trading. For instance, banks use these techniques to analyze transaction patterns and identify suspicious activities in real-time.";
    } else if (message.includes('difference') || message.includes('compare') || message.includes('vs')) {
      return "The key differences lie in their approach and application. Method A focuses on accuracy and precision, while Method B prioritizes speed and scalability. The choice depends on your specific requirements - data size, processing time, and accuracy needs.";
    } else if (message.includes('code') || message.includes('implement') || message.includes('programming')) {
      return "From a programming perspective, here's how you'd implement this: Start with data preprocessing, then define your model architecture, set up training loops, and finally evaluate performance. I can walk you through each step with code examples if you'd like!";
    } else if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! I'm here to help you master these concepts. Feel free to ask about any part of the course material - whether it's theory, practical applications, or implementation details.";
    } else {
      // Default varied responses
      const defaultResponses = [
        "That's an insightful question! Based on the course material, this topic connects to several key principles we've discussed. Let me elaborate on the most important aspects.",
        "Excellent point! This concept is fundamental to understanding the broader framework. I can provide specific examples and walk through the reasoning step by step.",
        "I can definitely help with that! This is a common area where students need clarification. Let me explain it using analogies and practical examples from the course.",
        "Great question! This relates directly to what we covered in the previous sections. The key insight here is understanding how different components work together.",
        "That's a topic that often requires deeper explanation. Based on the course content, here are the essential points you need to understand about this concept."
      ];
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      message: newMessage
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    
    // Simulate AI response with contextual reply
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai' as const,
        message: getAIResponse(currentMessage)
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleExportCourse = () => {
    toast({
      title: "Course Export Started",
      description: "Your complete course is being prepared for download...",
    });
  };

  const handleSaveToDashboard = () => {
    toast({
      title: "Course Saved",
      description: "Successfully saved to your dashboard for future access.",
    });
  };

  const handleQuizAnswer = (quizIndex: number, selectedOption: number) => {
    setQuizAnswers(prev => ({ ...prev, [quizIndex]: selectedOption }));
    setShowResults(prev => ({ ...prev, [quizIndex]: true }));
  };

  // Generate intelligent content based on input analysis
  const generateContent = () => {
    const input = inputContent?.toLowerCase() || courseTitle.toLowerCase();
    
    // Advanced topic detection with keywords
    const analyzeInput = () => {
      const topics = {
        'ai-ml': ['machine learning', 'ai', 'neural', 'deep learning', 'artificial intelligence', 'algorithm', 'model'],
        'programming': ['react', 'javascript', 'python', 'coding', 'programming', 'software', 'development', 'web'],
        'business': ['business', 'management', 'strategy', 'entrepreneur', 'startup', 'finance', 'investment'],
        'design': ['design', 'ui', 'ux', 'interface', 'user experience', 'figma', 'prototype'],
        'data-science': ['data', 'analytics', 'statistics', 'visualization', 'big data', 'sql', 'analysis'],
        'marketing': ['marketing', 'sales', 'growth', 'seo', 'social media', 'advertising', 'branding'],
        'science': ['research', 'study', 'scientific', 'experiment', 'theory', 'methodology', 'academic'],
        'health': ['health', 'medical', 'wellness', 'fitness', 'nutrition', 'psychology', 'therapy'],
        'education': ['education', 'learning', 'teaching', 'course', 'tutorial', 'lesson', 'academic']
      };

      for (const [category, keywords] of Object.entries(topics)) {
        if (keywords.some(keyword => input.includes(keyword))) {
          return category;
        }
      }
      return 'general';
    };

    const detectedTopic = analyzeInput();
    const inputName = inputContent || courseTitle;
    
    // Extract key phrases for more specific content
    const extractKeyPhrases = () => {
      const words = input.split(' ').filter(word => word.length > 3);
      return words.slice(0, 3).join(', ');
    };

    const keyPhrases = extractKeyPhrases();

    const topicConfigs = {
      'ai-ml': {
        displayName: 'Machine Learning & AI',
        focus: 'algorithms, neural networks, and data modeling',
        applications: 'predictive analytics, automation, and intelligent systems'
      },
      'programming': {
        displayName: 'Programming & Development',
        focus: 'code structure, best practices, and software architecture',
        applications: 'web applications, mobile apps, and system optimization'
      },
      'business': {
        displayName: 'Business Strategy',
        focus: 'strategic planning, market analysis, and organizational growth',
        applications: 'decision-making, process optimization, and competitive advantage'
      },
      'design': {
        displayName: 'Design & User Experience',
        focus: 'user interface design, interaction patterns, and visual hierarchy',
        applications: 'product design, user research, and design systems'
      },
      'data-science': {
        displayName: 'Data Science & Analytics',
        focus: 'data analysis, statistical methods, and visualization techniques',
        applications: 'business intelligence, reporting, and data-driven insights'
      },
      'marketing': {
        displayName: 'Marketing & Growth',
        focus: 'customer acquisition, brand building, and market positioning',
        applications: 'campaign optimization, audience targeting, and conversion strategies'
      },
      'science': {
        displayName: 'Scientific Research',
        focus: 'research methodology, experimental design, and evidence-based conclusions',
        applications: 'academic research, hypothesis testing, and knowledge advancement'
      },
      'health': {
        displayName: 'Health & Wellness',
        focus: 'health principles, wellness strategies, and evidence-based practices',
        applications: 'lifestyle optimization, preventive care, and well-being improvement'
      },
      'education': {
        displayName: 'Education & Learning',
        focus: 'learning principles, educational methods, and knowledge transfer',
        applications: 'curriculum design, instructional strategies, and skill development'
      },
      'general': {
        displayName: 'General Knowledge',
        focus: 'core concepts, fundamental principles, and practical applications',
        applications: 'skill development, knowledge building, and practical implementation'
      }
    };

    const config = topicConfigs[detectedTopic];

    return {
      youtube: {
        notes: [
          {
            title: `Core Concepts from "${inputName.substring(0, 40)}..."`,
            content: `• **Main Focus**: ${config.focus}\n• **Key Topics**: ${keyPhrases}\n• **Practical Applications**: ${config.applications}\n\nThis video provides actionable insights that can be immediately applied to real-world scenarios. The content emphasizes practical implementation over theoretical discussion.`,
            duration: "5 min read"
          },
          {
            title: `Implementation Strategy`,
            content: `**Step-by-Step Approach:**\n1. Foundation building with core principles\n2. Practical application through examples\n3. Advanced techniques and optimization\n4. Real-world case studies and scenarios\n\n**Success Metrics:** Clear benchmarks for measuring progress and effectiveness in ${config.displayName.toLowerCase()}.`,
            duration: "7 min read"
          },
          {
            title: `Key Takeaways & Action Items`,
            content: `**Immediate Actions:**\n• Apply the primary methodology discussed\n• Implement the recommended tools/frameworks\n• Practice with the provided examples\n\n**Long-term Goals:**\n• Master the advanced concepts\n• Develop expertise in ${config.displayName.toLowerCase()}\n• Build a portfolio of successful applications`,
            duration: "4 min read"
          }
        ],
        quizzes: [
          {
            question: `What is the primary methodology emphasized in "${inputName.substring(0, 40)}..." for achieving success in ${config.displayName.toLowerCase()}?`,
            options: [
              "Theoretical understanding first, then practical application",
              "Hands-on practice with immediate real-world implementation", 
              "Collaborative learning through peer interaction",
              "Systematic step-by-step progression through fundamentals"
            ],
            correct: 1,
            explanation: `The content emphasizes practical, hands-on implementation as the most effective way to master ${config.displayName.toLowerCase()} concepts and achieve meaningful results.`
          },
          {
            question: `Which approach is recommended for beginners in ${config.displayName.toLowerCase()}?`,
            options: [
              "Start with advanced concepts to understand the big picture",
              "Focus on memorizing terminology and definitions",
              "Begin with practical projects and learn concepts through application",
              "Study theoretical frameworks before any practical work"
            ],
            correct: 2,
            explanation: `Learning through practical application helps beginners understand concepts in context and build confidence through tangible results in ${config.displayName.toLowerCase()}.`
          },
          {
            question: `What is the most important success factor mentioned for ${config.displayName.toLowerCase()} projects?`,
            options: [
              "Having the latest tools and technology",
              "Working individually without distractions",
              "Consistent practice and iterative improvement",
              "Focusing only on theoretical knowledge"
            ],
            correct: 2,
            explanation: `Consistent practice and iterative improvement are highlighted as key to mastering ${config.displayName.toLowerCase()} and achieving long-term success.`
          },
          {
            question: `How should you measure progress in ${config.displayName.toLowerCase()}?`,
            options: [
              "By the number of hours spent studying",
              "Through practical projects and real-world applications",
              "By memorizing all theoretical concepts",
              "Using only peer comparisons"
            ],
            correct: 1,
            explanation: `Progress is best measured through practical projects and real-world applications that demonstrate your ability to apply ${config.displayName.toLowerCase()} concepts effectively.`
          },
          {
            question: `What is the recommended strategy for overcoming challenges in ${config.displayName.toLowerCase()}?`,
            options: [
              "Give up and try a different approach",
              "Stick to one method regardless of results",
              "Break down problems into smaller, manageable parts",
              "Always ask for help immediately"
            ],
            correct: 2,
            explanation: `Breaking down complex problems into smaller, manageable parts is a fundamental strategy that makes ${config.displayName.toLowerCase()} challenges more approachable and solvable.`
          }
        ],
        flashcards: [
          { 
            front: `${config.displayName} Foundation`, 
            back: `Core principle from "${inputName}": ${config.focus}`,
            category: config.displayName
          },
          { 
            front: `Implementation Method`, 
            back: `Practical approach for applying ${config.displayName.toLowerCase()} concepts in real-world scenarios`,
            category: "Application"
          },
          { 
            front: `Success Metric`, 
            back: `Key indicator for measuring progress and effectiveness in ${config.displayName.toLowerCase()} projects`,
            category: "Measurement"
          }
        ]
      },
      pdf: {
        notes: [
          {
            title: `Chapter 1: Introduction to ${config.displayName}`,
            content: `## Overview\nThis document provides a comprehensive introduction to ${config.displayName.toLowerCase()}, focusing on ${config.focus}.\n\n## Learning Objectives\nBy the end of this chapter, you will understand:\n• Fundamental concepts and terminology\n• Core principles underlying ${config.displayName.toLowerCase()}\n• Real-world applications and use cases\n\n## Key Concepts\n**Definition**: ${config.displayName} encompasses the study and application of ${config.focus}.\n\n**Importance**: Understanding these concepts is crucial for ${config.applications}.\n\n**Applications**: This knowledge directly applies to:\n• Problem-solving in professional environments\n• Strategic decision-making processes\n• Innovation and improvement initiatives`,
            duration: "8 min read"
          },
          {
            title: `Chapter 2: Core Methodology & Framework`,
            content: `## Theoretical Foundation\nThe document establishes a systematic approach to ${config.displayName.toLowerCase()} through evidence-based methodologies.\n\n## Step-by-Step Framework\n\n### Phase 1: Assessment & Planning\n1. **Current State Analysis**\n   - Evaluate existing conditions\n   - Identify gaps and opportunities\n   - Set measurable objectives\n\n2. **Strategic Planning**\n   - Define clear goals and success metrics\n   - Develop implementation timeline\n   - Allocate necessary resources\n\n### Phase 2: Implementation\n3. **Systematic Execution**\n   - Follow structured methodology\n   - Apply best practices consistently\n   - Monitor progress continuously\n\n4. **Quality Assurance**\n   - Validate results against objectives\n   - Make data-driven adjustments\n   - Document lessons learned\n\n## Best Practices\n• Maintain clear documentation throughout the process\n• Engage stakeholders at each critical phase\n• Use quantitative metrics to measure success\n• Adapt approach based on emerging insights`,
            duration: "12 min read"
          },
          {
            title: `Chapter 3: Practical Implementation & Results`,
            content: `## Real-World Applications\nThis chapter demonstrates how theoretical concepts translate into practical solutions for ${config.applications}.\n\n## Case Study Analysis\n\n### Successful Implementation Example\n**Context**: Organizations applying ${config.displayName.toLowerCase()} principles\n**Challenge**: Need to improve efficiency and outcomes\n**Solution**: Systematic application of documented framework\n**Results**: Measurable improvements in key performance indicators\n\n### Key Success Factors\n1. **Leadership Commitment**\n   - Strong support from decision-makers\n   - Clear communication of objectives\n   - Adequate resource allocation\n\n2. **Systematic Approach**\n   - Following established methodology\n   - Regular progress monitoring\n   - Continuous improvement mindset\n\n3. **Stakeholder Engagement**\n   - Active participation from all levels\n   - Clear role definitions\n   - Regular feedback mechanisms\n\n## Expected Outcomes\nProper implementation typically results in:\n• **Efficiency Gains**: 15-30% improvement in process performance\n• **Quality Enhancement**: Reduction in errors and rework\n• **Knowledge Transfer**: Improved team capabilities and understanding\n• **Sustainable Results**: Long-term benefits through embedded practices\n\n## Next Steps\n• Apply learned concepts to current projects\n• Develop implementation plan using provided framework\n• Establish monitoring and evaluation system\n• Build capabilities for continuous improvement`,
            duration: "15 min read"
          }
        ],
        quizzes: [
          {
            question: `According to "${inputName.substring(0, 40)}...", what is the most effective methodology for ${config.displayName.toLowerCase()} research?`,
            options: [
              "Pure theoretical analysis with mathematical modeling",
              "Empirical research combined with practical validation", 
              "Observational studies without intervention",
              "Meta-analysis of existing literature only"
            ],
            correct: 1,
            explanation: `The document emphasizes that combining empirical research with practical validation provides the most reliable and applicable results in ${config.displayName.toLowerCase()}.`
          },
          {
            question: `What framework does the research recommend for implementing findings in ${config.displayName.toLowerCase()}?`,
            options: [
              "Immediate full-scale deployment across all areas",
              "Theoretical validation before any practical application",
              "Phased implementation with continuous monitoring and adjustment",
              "Pilot testing in controlled environments only"
            ],
            correct: 2,
            explanation: `The research advocates for phased implementation with continuous monitoring to ensure successful adoption and optimization in ${config.displayName.toLowerCase()} contexts.`
          },
          {
            question: `Which phase is most critical for successful ${config.displayName.toLowerCase()} implementation according to the document?`,
            options: [
              "Initial planning and goal setting",
              "Resource allocation and budgeting",
              "Continuous monitoring and adjustment",
              "Final evaluation and reporting"
            ],
            correct: 2,
            explanation: `The document emphasizes that continuous monitoring and adjustment throughout the implementation process is crucial for adapting to changing conditions and ensuring success.`
          },
          {
            question: `What does the research identify as the primary success factor for ${config.displayName.toLowerCase()} projects?`,
            options: [
              "Having unlimited budget and resources",
              "Using the most advanced technology available",
              "Strong leadership commitment and stakeholder engagement",
              "Following a rigid, unchanging plan"
            ],
            correct: 2,
            explanation: `The research consistently highlights that strong leadership commitment combined with active stakeholder engagement are the most critical factors for project success in ${config.displayName.toLowerCase()}.`
          },
          {
            question: `How should organizations measure the effectiveness of ${config.displayName.toLowerCase()} initiatives?`,
            options: [
              "Only through financial metrics",
              "By comparing to industry averages only",
              "Using a combination of quantitative and qualitative metrics",
              "Through subjective management assessment"
            ],
            correct: 2,
            explanation: `The document recommends using both quantitative metrics (like efficiency gains) and qualitative measures (like stakeholder satisfaction) to comprehensively evaluate ${config.displayName.toLowerCase()} effectiveness.`
          },
          {
            question: `What is the recommended approach for scaling ${config.displayName.toLowerCase()} solutions across an organization?`,
            options: [
              "Implement everywhere simultaneously for maximum impact",
              "Start with pilot programs and gradually expand based on results",
              "Focus only on the most visible departments first",
              "Wait until perfect before any implementation"
            ],
            correct: 1,
            explanation: `The research strongly advocates for starting with pilot programs to validate approaches and learn lessons before scaling, ensuring higher success rates in ${config.displayName.toLowerCase()} implementations.`
          }
        ],
        flashcards: [
          { 
            front: `Research Methodology`, 
            back: `Evidence-based approach used in "${inputName}" for investigating ${config.displayName.toLowerCase()} phenomena`,
            category: "Research"
          },
          { 
            front: `Key Framework`, 
            back: `Systematic approach for implementing ${config.displayName.toLowerCase()} solutions based on the document's findings`,
            category: "Implementation"
          },
          { 
            front: `Critical Finding`, 
            back: `Major insight from the research that advances understanding in ${config.displayName.toLowerCase()}`,
            category: config.displayName
          },
          { 
            front: `Success Factor`, 
            back: `Essential element identified in the research for achieving optimal results in ${config.displayName.toLowerCase()}`,
            category: "Success Metrics"
          }
        ]
      }
    }[sourceType];
  };

  const content = generateContent();
  const mockNotes = content.notes;
  const mockQuizzes = content.quizzes;
  const mockFlashcards = content.flashcards;

  return (
    <div className="mt-8 animate-fade-in">
      <Card className="bg-gradient-card border-primary/20 shadow-glow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Course Generated Successfully!
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {sourceType === "youtube" ? "YouTube" : "PDF"} Content
            </Badge>
          </div>
          <p className="text-muted-foreground">
            <strong>{courseTitle}</strong> has been transformed into a complete micro-course
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Quizzes
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="tutor" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                AI Tutor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated Lecture Notes</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
              {mockNotes.map((note, index) => (
                <Card key={index} className="border border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{note.title}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {note.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Interactive Quizzes</h3>
                <Badge variant="secondary">{mockQuizzes.length} Questions</Badge>
              </div>
              {mockQuizzes.map((quiz, index) => (
                <Card key={index} className="border border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Question {index + 1}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        Multiple Choice
                      </Badge>
                    </div>
                  </CardHeader>
                   <CardContent>
                     <p className="font-medium mb-4 text-foreground">{quiz.question}</p>
                     <div className="space-y-3">
                       {quiz.options.map((option, optIndex) => {
                         const isSelected = quizAnswers[index] === optIndex;
                         const isCorrect = optIndex === quiz.correct;
                         const showResult = showResults[index];
                         
                         return (
                           <div 
                             key={optIndex} 
                             className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                               showResult
                                 ? isCorrect 
                                   ? "bg-green-50 border-green-300 text-green-800 shadow-sm" 
                                   : isSelected 
                                     ? "bg-red-50 border-red-300 text-red-800 shadow-sm"
                                     : "bg-card border-border/50"
                                 : isSelected
                                   ? "bg-primary/10 border-primary text-primary"
                                   : "bg-card border-border/50 hover:border-primary/30 hover:bg-accent/30"
                             }`}
                             onClick={() => handleQuizAnswer(index, optIndex)}
                           >
                             <div className="flex items-center gap-3">
                               <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                                 showResult
                                   ? isCorrect 
                                     ? "bg-green-200 text-green-800" 
                                     : isSelected 
                                       ? "bg-red-200 text-red-800"
                                       : "bg-muted text-muted-foreground"
                                   : isSelected
                                     ? "bg-primary text-primary-foreground"
                                     : "bg-muted text-muted-foreground"
                               }`}>
                                 {String.fromCharCode(65 + optIndex)}
                               </span>
                               <span className="flex-1">{option}</span>
                               {showResult && isCorrect && (
                                 <CheckCircle className="w-5 h-5 text-green-600" />
                               )}
                               {showResult && isSelected && !isCorrect && (
                                 <div className="w-5 h-5 text-red-600">✗</div>
                               )}
                             </div>
                           </div>
                         );
                       })}
                     </div>
                     {showResults[index] && quiz.explanation && (
                       <div className={`mt-4 p-4 border rounded-lg ${
                         quizAnswers[index] === quiz.correct 
                           ? "bg-green-50 border-green-200" 
                           : "bg-blue-50 border-blue-200"
                       }`}>
                         <p className={`text-sm ${
                           quizAnswers[index] === quiz.correct 
                             ? "text-green-800" 
                             : "text-blue-800"
                         }`}>
                           <strong>
                             {quizAnswers[index] === quiz.correct ? "Correct! " : "Incorrect. "}
                           </strong>
                           {quiz.explanation}
                         </p>
                       </div>
                     )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="flashcards" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Study Flashcards</h3>
                <Badge variant="secondary">{mockFlashcards.length} Cards</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {mockFlashcards.map((card, index) => (
                  <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-accent/10 border-2 border-border/50 hover:border-primary/30">
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <Badge variant="secondary" className="text-xs font-medium">
                              {card.category}
                            </Badge>
                          </div>
                          <div className="bg-primary/5 rounded-lg p-4 border">
                            <Badge variant="outline" className="mb-3 text-xs">Term</Badge>
                            <p className="font-semibold text-lg text-foreground">{card.front}</p>
                          </div>
                        </div>
                        <div className="border-t-2 border-dashed border-border/50 pt-4">
                          <div className="bg-accent/20 rounded-lg p-4 border">
                            <Badge variant="outline" className="mb-3 text-xs">Definition</Badge>
                            <p className="text-sm text-muted-foreground leading-relaxed">{card.back}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tutor" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">AI Tutor Chat</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Online</span>
                </div>
              </div>
              <Card className="border border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                        {message.type === 'ai' && (
                          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className={`flex-1 ${message.type === 'user' ? 'max-w-xs' : ''}`}>
                          <p className={`text-sm rounded-lg p-3 ${
                            message.type === 'ai' 
                              ? 'bg-muted/50' 
                              : 'bg-primary text-primary-foreground'
                          }`}>
                            {message.message}
                          </p>
                        </div>
                        {message.type === 'user' && (
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">You</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <input 
                      type="text" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ask your AI tutor anything..." 
                      className="flex-1 px-4 py-3 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button size="sm" className="px-4" onClick={handleSendMessage}>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 mt-6 pt-6 border-t">
            <Button variant="hero" className="flex-1" onClick={handleExportCourse}>
              <Download className="w-4 h-4 mr-2" />
              Export Complete Course
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleSaveToDashboard}>
              <Star className="w-4 h-4 mr-2" />
              Save to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursePreview;