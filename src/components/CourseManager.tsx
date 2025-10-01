import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link2, FileText, Video, Plus, Play, Download, Edit, Trash2, Eye, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  title: string;
  type: "youtube" | "pdf" | "url";
  source: string;
  progress: number;
  status: "processing" | "completed" | "failed";
  createdAt: Date;
  thumbnail?: string;
  description?: string;
  duration?: string;
  notesCount?: number;
  quizCount?: number;
}

const CourseManager = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Introduction to Machine Learning",
      type: "youtube",
      source: "https://youtube.com/watch?v=example",
      progress: 100,
      status: "completed",
      createdAt: new Date("2024-01-10"),
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
      description: "Comprehensive introduction to ML concepts",
      duration: "2h 15m",
      notesCount: 45,
      quizCount: 12
    },
    {
      id: "2",
      title: "React.js Advanced Patterns",
      type: "pdf",
      source: "react-patterns.pdf",
      progress: 75,
      status: "processing",
      createdAt: new Date("2024-01-08"),
      description: "Advanced React development patterns",
      notesCount: 32,
      quizCount: 8
    },
    {
      id: "3",
      title: "Data Structures & Algorithms",
      type: "url",
      source: "https://example.com/dsa-course",
      progress: 100,
      status: "completed",
      createdAt: new Date("2024-01-05"),
      thumbnail: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=200&fit=crop",
      description: "Complete DSA course with examples",
      duration: "4h 30m",
      notesCount: 67,
      quizCount: 25
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState<{
    title: string;
    source: string;
    type: "youtube" | "pdf" | "url";
    description: string;
  }>({
    title: "",
    source: "",
    type: "youtube",
    description: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateCourse = async () => {
    if (!newCourse.title || !newCourse.source) {
      toast({
        title: "Missing information",
        description: "Please provide both title and source.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate course creation
    setTimeout(() => {
      const course: Course = {
        id: Date.now().toString(),
        title: newCourse.title,
        type: newCourse.type,
        source: newCourse.source,
        progress: 0,
        status: "processing",
        createdAt: new Date(),
        description: newCourse.description,
        notesCount: 0,
        quizCount: 0
      };

      setCourses(prev => [course, ...prev]);
      setIsProcessing(false);
      setIsCreateModalOpen(false);
      setNewCourse({ title: "", source: "", type: "youtube", description: "" });

      toast({
        title: "Course created!",
        description: "Your course is being processed. You'll be notified when it's ready.",
      });

      // Simulate processing completion
      setTimeout(() => {
        setCourses(prev => prev.map(c => 
          c.id === course.id 
            ? { ...c, progress: 100, status: "completed", notesCount: Math.floor(Math.random() * 50) + 20, quizCount: Math.floor(Math.random() * 15) + 5 }
            : c
        ));
      }, 3000);
    }, 1000);
  };

  const handleViewCourse = (course: Course) => {
    toast({
      title: "Opening course...",
      description: `Loading "${course.title}" for viewing.`,
    });
    // In a real app, this would navigate to a course view page
    window.open(course.source, '_blank');
  };

  const handleEditCourse = (course: Course) => {
    toast({
      title: "Edit course",
      description: `Opening editor for "${course.title}".`,
    });
    // In a real app, this would open an edit modal or navigate to edit page
  };

  const handleDownloadCourse = (course: Course) => {
    toast({
      title: "Downloading materials...",
      description: `Preparing download for "${course.title}".`,
    });
    // In a real app, this would trigger a download of course materials
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    toast({
      title: "Course deleted",
      description: "The course has been removed from your library.",
    });
  };

  const getTypeIcon = (type: Course['type']) => {
    switch (type) {
      case "youtube": return <Video className="w-4 h-4" />;
      case "pdf": return <FileText className="w-4 h-4" />;
      case "url": return <Link2 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success";
      case "processing": return "bg-warning";
      case "failed": return "bg-destructive";
      default: return "bg-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Course Library</h2>
          <p className="text-muted-foreground">Manage your AI-generated courses</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  placeholder="Enter course title..."
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Source Type</Label>
                <Tabs 
                  value={newCourse.type} 
                  onValueChange={(value) => setNewCourse(prev => ({ ...prev, type: value as "youtube" | "pdf" | "url" }))}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="youtube">YouTube</TabsTrigger>
                    <TabsTrigger value="pdf">PDF</TabsTrigger>
                    <TabsTrigger value="url">Website</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course-source">
                  {newCourse.type === "youtube" && "YouTube URL"}
                  {newCourse.type === "pdf" && "Upload PDF"}
                  {newCourse.type === "url" && "Website URL"}
                </Label>
                {newCourse.type === "pdf" ? (
                  <div 
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF files up to 10MB</p>
                    {newCourse.source && (
                      <p className="text-xs text-muted-foreground mt-2">Selected: {newCourse.source}</p>
                    )}
                    <Input
                      id="course-pdf"
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewCourse(prev => ({ ...prev, source: file.name }));
                        }
                      }}
                    />
                  </div>
                ) : (
                  <Input
                    id="course-source"
                    placeholder={
                      newCourse.type === "youtube" 
                        ? "https://youtube.com/watch?v=..." 
                        : "https://example.com/article"
                    }
                    value={newCourse.source}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, source: e.target.value }))}
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course-description">Description (Optional)</Label>
                <Textarea
                  id="course-description"
                  placeholder="Brief description of the course content..."
                  value={newCourse.description}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleCreateCourse} 
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? "Creating..." : "Create Course"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                {/* Thumbnail */}
                <div className="w-48 h-32 bg-muted flex-shrink-0">
                  {course.thumbnail ? (
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getTypeIcon(course.type)}
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <Badge variant="outline" className="gap-1">
                          {getTypeIcon(course.type)}
                          {course.type.toUpperCase()}
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(course.status)}`}></div>
                      </div>
                      {course.description && (
                        <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Created {course.createdAt.toLocaleDateString()}</span>
                        {course.duration && <span>{course.duration}</span>}
                        {course.notesCount && <span>{course.notesCount} notes</span>}
                        {course.quizCount && <span>{course.quizCount} quiz questions</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewCourse(course)}
                        title="View Course"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditCourse(course)}
                        title="Edit Course"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadCourse(course)}
                        title="Download Materials"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => deleteCourse(course.id)}
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {courses.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
          <p className="text-muted-foreground mb-4">Create your first AI-powered course to get started</p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Course
          </Button>
        </Card>
      )}
    </div>
  );
};

export default CourseManager;