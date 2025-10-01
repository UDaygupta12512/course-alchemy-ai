import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Brain, 
  Download,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";

interface CoursePreviewProps {
  isVisible: boolean;
  courseTitle: string;
  sourceType: "youtube" | "pdf";
}

const CoursePreview = ({ isVisible, courseTitle, sourceType }: CoursePreviewProps) => {
  if (!isVisible) return null;

  const mockNotes = [
    {
      title: "Introduction to Machine Learning",
      content: "Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed...",
      duration: "5 min read"
    },
    {
      title: "Types of Machine Learning",
      content: "There are three main types: Supervised Learning, Unsupervised Learning, and Reinforcement Learning...",
      duration: "7 min read"
    },
    {
      title: "Neural Networks Basics",
      content: "Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes...",
      duration: "10 min read"
    }
  ];

  const mockQuizzes = [
    {
      question: "What is the main goal of supervised learning?",
      options: ["To find patterns in unlabeled data", "To learn from labeled training data", "To interact with an environment", "To compress data"],
      correct: 1
    },
    {
      question: "Which algorithm is commonly used for classification?",
      options: ["K-means", "Random Forest", "PCA", "DBSCAN"],
      correct: 1
    },
    {
      question: "What does a neural network neuron do?",
      options: ["Stores data", "Processes inputs and produces output", "Connects to the internet", "Runs algorithms"],
      correct: 1
    }
  ];

  const mockFlashcards = [
    { front: "What is AI?", back: "Artificial Intelligence - computer systems that perform tasks requiring human intelligence" },
    { front: "Define Machine Learning", back: "A subset of AI that learns patterns from data without explicit programming" },
    { front: "What is a Neural Network?", back: "Computing system inspired by biological neural networks with interconnected nodes" }
  ];

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
                <Badge variant="secondary">3 Questions</Badge>
              </div>
              {mockQuizzes.map((quiz, index) => (
                <Card key={index} className="border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base">Question {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-4">{quiz.question}</p>
                    <div className="space-y-2">
                      {quiz.options.map((option, optIndex) => (
                        <div 
                          key={optIndex} 
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            optIndex === quiz.correct 
                              ? "bg-green-50 border-green-200 text-green-700" 
                              : "bg-muted/30 border-border hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-background border flex items-center justify-center text-sm">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            {option}
                            {optIndex === quiz.correct && (
                              <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="flashcards" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Study Flashcards</h3>
                <Badge variant="secondary">{mockFlashcards.length} Cards</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {mockFlashcards.map((card, index) => (
                  <Card key={index} className="group cursor-pointer hover:shadow-card transition-all">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="mb-4">
                          <Badge variant="outline" className="mb-2">Front</Badge>
                          <p className="font-medium">{card.front}</p>
                        </div>
                        <div className="border-t pt-4">
                          <Badge variant="outline" className="mb-2">Back</Badge>
                          <p className="text-sm text-muted-foreground">{card.back}</p>
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
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm bg-muted/50 rounded-lg p-3">
                          Hi! I'm your AI tutor for this course. I can help explain concepts, answer questions, and provide additional examples. What would you like to learn more about?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 justify-end">
                      <div className="flex-1 max-w-xs">
                        <p className="text-sm bg-primary text-primary-foreground rounded-lg p-3">
                          Can you explain neural networks in simple terms?
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">You</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm bg-muted/50 rounded-lg p-3">
                          Think of neural networks like your brain! Just as your brain has neurons that connect and pass information, artificial neural networks have nodes that process information. Each node receives input, processes it, and passes the result to the next layer. The network "learns" by adjusting these connections based on examples, just like how you learn from experience! 🧠
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <input 
                      type="text" 
                      placeholder="Ask your AI tutor anything..." 
                      className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                    />
                    <Button size="sm">Send</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 mt-6 pt-6 border-t">
            <Button variant="hero" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Export Complete Course
            </Button>
            <Button variant="outline" className="flex-1">
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