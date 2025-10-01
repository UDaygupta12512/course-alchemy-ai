import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, FileText, Target, BarChart3, Calendar, BookOpen, Brain } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolTitle: string;
}

const DemoModal = ({ isOpen, onClose, toolTitle }: DemoModalProps) => {
  const getDemoContent = () => {
    switch (toolTitle) {
      case "Smart Note Taking":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  AI-Generated Notes Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Photosynthesis - Key Concepts</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span><strong>Definition:</strong> Process by which plants convert light energy into chemical energy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span><strong>Formula:</strong> 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span><strong>Location:</strong> Primarily occurs in chloroplasts of leaf cells</span>
                    </li>
                  </ul>
                </div>
                <Badge variant="secondary">Auto-generated from lecture content</Badge>
              </CardContent>
            </Card>
          </div>
        );

      case "Adaptive Testing":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Adaptive Quiz Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Question 1 of 5</h4>
                    <p className="mb-4">What is the primary function of chlorophyll in photosynthesis?</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">A) To absorb light energy</Button>
                      <Button variant="outline" className="w-full justify-start">B) To store glucose</Button>
                      <Button variant="outline" className="w-full justify-start">C) To release oxygen</Button>
                      <Button variant="outline" className="w-full justify-start">D) To transport water</Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Difficulty:</span>
                    <Badge variant="secondary">Beginner</Badge>
                    <span className="text-sm ml-4">Adapting to your performance...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "Progress Analytics":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Learning Analytics Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">12h</div>
                    <div className="text-sm text-muted-foreground">Study Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">7/10</div>
                    <div className="text-sm text-muted-foreground">Topics Mastered</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Biology</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Chemistry</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Physics</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "Study Scheduler":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  AI Study Planner Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg bg-primary/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Biology Review</div>
                        <div className="text-sm text-muted-foreground">9:00 AM - 10:30 AM</div>
                      </div>
                      <Badge>Today</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Chemistry Practice Test</div>
                        <div className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</div>
                      </div>
                      <Badge variant="outline">Tomorrow</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Physics Problem Set</div>
                        <div className="text-sm text-muted-foreground">7:00 PM - 8:30 PM</div>
                      </div>
                      <Badge variant="outline">Tomorrow</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    AI-optimized for your peak learning hours
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Demo Coming Soon</h3>
            <p className="text-muted-foreground">This tool demo will be available soon!</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{toolTitle} - Interactive Demo</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="demo" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="demo">Live Demo</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="demo" className="mt-6">
            {getDemoContent()}
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>AI-powered intelligent algorithms</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-secondary" />
                  <span>Personalized learning adaptation</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  <span>Real-time progress tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Proven learning effectiveness</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close Demo
          </Button>
          <Button>
            Get Full Access
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;