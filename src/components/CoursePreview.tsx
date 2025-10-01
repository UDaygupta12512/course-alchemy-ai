import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import AIChatAssistant from "@/components/AIChatAssistant";
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
  sourceType: "youtube" | "pdf" | "text" | "web" | "audio";
  inputContent?: string; // URL or file name
  generatedContent?: any; // AI-generated content
}

const CoursePreview = ({ isVisible, courseTitle, sourceType, inputContent, generatedContent }: CoursePreviewProps) => {
  const { toast } = useToast();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPerformance, setQuizPerformance] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    score: 0,
    timeSpent: "0 minutes",
    strengths: [] as string[],
    improvementAreas: [] as string[]
  });

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
    }
  };

  const handleExportCourse = () => {
    const courseData = {
      title: courseTitle,
      notes: courseContent.notes,
      quizzes: courseContent.quizzes,
      flashcards: courseContent.flashcards,
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(courseData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${courseTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Course Exported",
      description: "Your course has been downloaded as a JSON file.",
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

  const handleSubmitQuiz = () => {
    const quizzes = getCourseContent().quizzes;
    let correctCount = 0;
    const strengths: string[] = [];
    const improvementAreas: string[] = [];

    quizzes.forEach((quiz, index) => {
      const userAnswer = quizAnswers[index];
      if (userAnswer === quiz.correctAnswer) {
        correctCount++;
        strengths.push(quiz.topic || `Question ${index + 1}`);
      } else {
        improvementAreas.push(quiz.topic || `Question ${index + 1}`);
      }
    });

    const score = Math.round((correctCount / quizzes.length) * 100);
    
    setQuizPerformance({
      totalQuestions: quizzes.length,
      correctAnswers: correctCount,
      score,
      timeSpent: "5 minutes", // This would be calculated in a real app
      strengths,
      improvementAreas
    });
    
    setQuizSubmitted(true);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}% (${correctCount}/${quizzes.length} correct)`,
    });
  };

  // Use AI-generated content if available, otherwise fall back to generated content
  const getCourseContent = () => {
    if (generatedContent) {
      return {
        notes: generatedContent.notes || [],
        quizzes: generatedContent.quizzes || [],
        flashcards: generatedContent.flashcards || []
      };
    }
    
    // Fallback to generated content if no AI content
    return generateContent();
  };

  const courseContent = getCourseContent();

  // Generate intelligent content based on input analysis (fallback)
  function generateContent() {
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

    const content = {
      youtube: {
        notes: [
          {
            title: `Core Concepts from "${inputName.substring(0, 40)}..."`,
            content: `Main Focus: ${config.focus}

Key Topics: ${keyPhrases}

Practical Applications: ${config.applications}

**Detailed Analysis:**

This comprehensive video provides in-depth insights into ${config.displayName.toLowerCase()}, covering fundamental principles and advanced techniques. The content systematically builds understanding through structured learning modules.

**Core Principles Explored:**
1. **Foundation Layer**: Understanding the theoretical underpinnings and historical context
2. **Methodology Framework**: Systematic approaches to problem-solving and implementation
3. **Practical Applications**: Real-world case studies demonstrating effective application
4. **Advanced Techniques**: Cutting-edge strategies for optimization and scaling

**Implementation Guidelines:**
- Start with foundational concepts to build solid understanding
- Apply systematic methodology for consistent results
- Use practical examples to reinforce learning
- Implement advanced techniques gradually as competency develops

**Critical Success Factors:**
• Consistent practice and iterative improvement
• Application of learned concepts to real projects
• Regular assessment and adjustment of strategies
• Continuous learning and skill development

**Industry Best Practices:**
The video emphasizes industry-standard approaches that have proven successful across multiple organizations and use cases. These practices ensure reliability, scalability, and maintainability of solutions.`,
            duration: "12 min read"
          },
          {
            title: `Advanced Implementation Strategy & Methodologies`,
            content: `**Strategic Framework Overview:**

This section delves deep into the systematic approach for implementing ${config.displayName.toLowerCase()} solutions in professional environments.

**Phase 1: Planning & Assessment (Weeks 1-2)**
1. **Current State Analysis**
   - Comprehensive evaluation of existing systems and processes
   - Identification of key stakeholders and their requirements
   - Gap analysis between current capabilities and desired outcomes
   - Risk assessment and mitigation strategy development

2. **Strategic Planning**
   - Definition of clear, measurable objectives and success criteria
   - Development of detailed implementation roadmap with milestones
   - Resource allocation and team structure planning
   - Timeline establishment with realistic deadlines and buffer zones

**Phase 2: Foundation Building (Weeks 3-6)**
3. **Infrastructure Setup**
   - System architecture design and implementation
   - Tool selection and configuration based on project requirements
   - Team training and knowledge transfer sessions
   - Quality assurance processes and testing frameworks

4. **Pilot Implementation**
   - Small-scale testing with controlled variables
   - Performance monitoring and data collection
   - Feedback integration and process refinement
   - Documentation of lessons learned and best practices

**Phase 3: Full-Scale Deployment (Weeks 7-12)**
5. **Systematic Rollout**
   - Phased deployment to minimize disruption and risk
   - Continuous monitoring of key performance indicators
   - Regular stakeholder communication and status updates
   - Agile adaptation based on real-world feedback

6. **Optimization & Scaling**
   - Performance tuning and efficiency improvements
   - Scalability testing and capacity planning
   - Integration with existing systems and workflows
   - Long-term maintenance and support strategy

**Success Metrics & KPIs:**
- Implementation timeline adherence (target: 95% on-time delivery)
- Quality metrics and error rates (target: <2% defect rate)
- User adoption and satisfaction scores (target: >85% satisfaction)
- Return on investment and cost-benefit analysis
- Performance improvements and efficiency gains

**Advanced Techniques:**
• Automation strategies for repetitive tasks and processes
• Machine learning integration for predictive analytics
• Continuous integration and deployment pipelines
• Advanced monitoring and alerting systems
• Security best practices and compliance frameworks`,
            duration: "18 min read"
          },
          {
            title: `Expert-Level Insights & Advanced Applications`,
            content: `**Expert Analysis & Deep Dive:**

This advanced section provides expert-level insights into ${config.displayName.toLowerCase()}, exploring sophisticated techniques and emerging trends in the field.

**Advanced Conceptual Framework:**

**1. Theoretical Foundations**
The video explores cutting-edge theoretical concepts that form the backbone of modern ${config.displayName.toLowerCase()} practices:
- Emerging paradigms and their practical implications
- Integration of cross-disciplinary approaches and methodologies
- Advanced mathematical models and their real-world applications
- Cognitive science principles applied to ${config.displayName.toLowerCase()}

**2. Expert Methodologies**
Professional-grade approaches used by industry leaders:
- Advanced problem-solving frameworks used by Fortune 500 companies
- Proprietary methodologies developed through years of research and practice
- Data-driven decision making processes with statistical validation
- Iterative improvement cycles with continuous feedback loops

**3. Innovation Strategies**
Cutting-edge approaches to innovation and creativity:
- Design thinking methodologies for breakthrough solutions
- Rapid prototyping and testing frameworks
- Cross-functional collaboration techniques
- Technology-enabled innovation processes

**Real-World Case Studies:**

**Case Study 1: Global Enterprise Implementation**
- Challenge: Multinational corporation needed to standardize ${config.displayName.toLowerCase()} across 50+ countries
- Solution: Developed hybrid framework combining standardization with local adaptation
- Results: 40% improvement in efficiency, 60% reduction in implementation time
- Key Learnings: Cultural sensitivity crucial for global rollouts

**Case Study 2: Startup to Scale**
- Challenge: Rapidly growing startup needed scalable ${config.displayName.toLowerCase()} infrastructure
- Solution: Cloud-native architecture with automated scaling capabilities
- Results: Supported 10x growth without proportional increase in operational overhead
- Key Learnings: Early investment in scalability pays significant dividends

**Case Study 3: Legacy System Modernization**
- Challenge: 20-year-old system required modernization without business disruption
- Solution: Phased migration with parallel systems and gradual transition
- Results: Zero downtime migration with 50% performance improvement
- Key Learnings: Careful planning and risk mitigation essential for complex migrations

**Future Trends & Emerging Technologies:**
• AI/ML integration for predictive capabilities and automation
• Blockchain applications for transparency and security
• Edge computing for real-time processing and reduced latency
• Quantum computing implications for complex problem solving
• Sustainability considerations and green technology integration

**Professional Development Recommendations:**
- Continuous learning through industry conferences and certifications
- Building networks with other professionals and thought leaders
- Contributing to open-source projects and community initiatives
- Developing teaching and mentoring capabilities
- Staying current with regulatory and compliance requirements

**Implementation Checklist:**
✓ Establish clear governance and decision-making processes
✓ Implement comprehensive monitoring and analytics capabilities
✓ Develop disaster recovery and business continuity plans
✓ Create comprehensive documentation and knowledge management systems
✓ Build change management and user adoption strategies
✓ Establish vendor management and partnership frameworks
✓ Implement security and compliance monitoring systems`,
            duration: "25 min read"
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
            content: `Overview
This document provides a comprehensive introduction to ${config.displayName.toLowerCase()}, focusing on ${config.focus}.

Learning Objectives
By the end of this chapter, you will understand:
• Fundamental concepts and terminology
• Core principles underlying ${config.displayName.toLowerCase()}
• Real-world applications and use cases

Key Concepts
Definition: ${config.displayName} encompasses the study and application of ${config.focus}.

Importance: Understanding these concepts is crucial for ${config.applications}.

Applications: This knowledge directly applies to:
• Problem-solving in professional environments
• Strategic decision-making processes
• Innovation and improvement initiatives`,
            duration: "8 min read"
          },
          {
            title: `Chapter 2: Core Methodology & Framework`,
            content: `Theoretical Foundation
The document establishes a systematic approach to ${config.displayName.toLowerCase()} through evidence-based methodologies.

Step-by-Step Framework

Phase 1: Assessment & Planning
1. Current State Analysis
   • Evaluate existing conditions
   • Identify gaps and opportunities
   • Set measurable objectives

2. Strategic Planning
   • Define clear goals and success metrics
   • Develop implementation timeline
   • Allocate necessary resources

Phase 2: Implementation
3. Systematic Execution
   • Follow structured methodology
   • Apply best practices consistently
   • Monitor progress continuously

4. Quality Assurance
   • Validate results against objectives
   • Make data-driven adjustments
   • Document lessons learned

Best Practices
• Maintain clear documentation throughout the process
• Engage stakeholders at each critical phase
• Use quantitative metrics to measure success
• Adapt approach based on emerging insights`,
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
    };
    
    return sourceType === 'youtube' ? content.youtube : sourceType === 'pdf' ? content.pdf : content.youtube;
  }

  const content = getCourseContent();
  const mockNotes = content.notes || courseContent.notes;
  const mockQuizzes = content.quizzes || courseContent.quizzes;
  const mockFlashcards = content.flashcards || courseContent.flashcards;

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
              {sourceType === "youtube" ? "YouTube" : 
               sourceType === "pdf" ? "PDF" : 
               sourceType === "text" ? "Text" : 
               sourceType === "web" ? "Web" : "Audio"} Content
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
                     <div className="prose prose-sm max-w-none space-y-3">
                       <div className="text-muted-foreground leading-relaxed">
                         {note.content.split('\n').map((line, lineIndex) => (
                           <div key={lineIndex} className="mb-2">
                             {line.startsWith('•') ? (
                               <div className="flex items-start gap-2 ml-2">
                                 <span className="text-primary mt-1.5">•</span>
                                 <span>{line.substring(1).trim()}</span>
                               </div>
                             ) : line.trim() ? (
                               <p className="mb-3">{line}</p>
                             ) : null}
                           </div>
                         ))}
                       </div>
                     </div>
                   </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Interactive Quizzes</h3>
                <Badge variant="secondary">{mockQuizzes.length} Questions</Badge>
              </div>
              {!quizSubmitted && mockQuizzes.map((quiz, index) => (
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
              
              {!quizSubmitted && Object.keys(quizAnswers).length === mockQuizzes.length && (
                <div className="mt-6 flex justify-center">
                  <Button variant="hero" size="lg" onClick={handleSubmitQuiz}>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submit Quiz
                  </Button>
                </div>
              )}

              {quizSubmitted && (
                <div className="mt-6 space-y-6">
                  {/* Quiz Results Summary */}
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        Quiz Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-background rounded-lg border">
                          <div className="text-3xl font-bold text-primary mb-1">{quizPerformance.score}%</div>
                          <div className="text-sm text-muted-foreground">Overall Score</div>
                        </div>
                        <div className="text-center p-4 bg-background rounded-lg border">
                          <div className="text-3xl font-bold text-green-600 mb-1">{quizPerformance.correctAnswers}</div>
                          <div className="text-sm text-muted-foreground">Correct Answers</div>
                        </div>
                        <div className="text-center p-4 bg-background rounded-lg border">
                          <div className="text-3xl font-bold text-blue-600 mb-1">{quizPerformance.totalQuestions}</div>
                          <div className="text-sm text-muted-foreground">Total Questions</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Performance Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-green-600 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Strengths
                          </h4>
                          {quizPerformance.strengths.length > 0 ? (
                            <ul className="space-y-1">
                              {quizPerformance.strengths.map((strength, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">Focus on understanding the core concepts</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold text-orange-600 flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            Areas for Improvement
                          </h4>
                          {quizPerformance.improvementAreas.length > 0 ? (
                            <ul className="space-y-1">
                              {quizPerformance.improvementAreas.map((area, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                  {area}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">Excellent! All topics mastered</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time Spent:</span>
                          <span className="font-medium">{quizPerformance.timeSpent}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Retake Quiz Button */}
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                        setShowResults({});
                      }}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Retake Quiz
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="flashcards" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Study Flashcards</h3>
                <Badge variant="secondary">{mockFlashcards.length} Cards</Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockFlashcards.map((card, index) => (
                  <Card key={index} className="group cursor-pointer hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-accent/5 border border-border/50 hover:border-primary/40">
                    <CardContent className="p-5">
                      <div className="space-y-4">
                        <div className="text-center">
                          <Badge variant="secondary" className="text-xs font-medium mb-3">
                            {card.category}
                          </Badge>
                        </div>
                        
                        <div className="bg-primary/5 rounded-lg p-4 border min-h-[80px] flex items-center justify-center">
                          <div className="text-center">
                            <Badge variant="outline" className="mb-2 text-xs">Question</Badge>
                            <p className="font-semibold text-base text-foreground leading-tight">{card.front}</p>
                          </div>
                        </div>
                        
                        <div className="bg-accent/10 rounded-lg p-4 border min-h-[100px] flex items-center">
                          <div className="w-full">
                            <Badge variant="outline" className="mb-2 text-xs">Answer</Badge>
                            <p className="text-sm text-muted-foreground leading-relaxed text-left">{card.back}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tutor" className="space-y-4 mt-6">
              <AIChatAssistant courseContext={`Course: ${courseTitle}\n\nCourse Content:\n${getCourseContent().notes.map(note => `${note.title}: ${note.content.substring(0, 200)}...`).join('\n\n')}`} />
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