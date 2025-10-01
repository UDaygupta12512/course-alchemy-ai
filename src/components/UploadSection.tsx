import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Youtube, FileText, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CoursePreview from "./CoursePreview";
import { supabase } from "@/integrations/supabase/client";

const UploadSection = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCoursePreview, setShowCoursePreview] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [sourceType, setSourceType] = useState<"youtube" | "pdf">("youtube");
  const [inputContent, setInputContent] = useState("");
  const [generatedCourseContent, setGeneratedCourseContent] = useState<any>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  };

  const generateCourseContent = async (type: "youtube" | "pdf", content: string, title: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-course-content', {
        body: {
          sourceType: type,
          content: content,
          title: title
        }
      });

      if (error) throw error;

      if (data.success) {
        setGeneratedCourseContent(data.courseContent);
        return data.courseContent;
      } else {
        throw new Error(data.error || 'Failed to generate content');
      }
    } catch (error) {
      console.error('Course generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI content. Using sample content instead.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleYouTubeSubmit = async () => {
    if (!youtubeUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a YouTube URL to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    toast({
      title: "AI Processing Started!",
      description: "Analyzing your YouTube video and generating comprehensive course content...",
    });

    setSourceType("youtube");
    setInputContent(youtubeUrl);
    
    // Generate dynamic title based on URL
    const generateTitleFromUrl = (url: string) => {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube')) {
        const videoId = urlObj.searchParams.get('v');
        return `Advanced Course from YouTube Video (${videoId?.substring(0, 8) || 'Video'})`;
      }
      return "Advanced Course from YouTube Video";
    };
    
    const title = generateTitleFromUrl(youtubeUrl);
    setCourseTitle(title);

    // Generate real AI content
    const content = await generateCourseContent("youtube", youtubeUrl, title);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowCoursePreview(true);
      toast({
        title: "AI Course Generated Successfully!",
        description: "Your comprehensive micro-course is ready with detailed notes, challenging quizzes, and AI tutor.",
      });
      // Scroll to preview
      setTimeout(() => {
        document.getElementById('course-preview')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2000);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    toast({
      title: "AI Processing Started!",
      description: `Analyzing ${files.length} PDF file(s) and generating comprehensive course content...`,
    });

    setSourceType("pdf");
    const fileNames = Array.from(files).map(f => f.name).join(", ");
    setInputContent(fileNames);
    
    // Generate dynamic title based on file names
    const generateTitleFromFiles = (fileList: FileList) => {
      const fileNames = Array.from(fileList).map(f => f.name.replace('.pdf', ''));
      if (fileList.length === 1) {
        return `Advanced Course: ${fileNames[0]}`;
      } else {
        return `Comprehensive Multi-PDF Course (${fileList.length} documents)`;
      }
    };
    
    const title = generateTitleFromFiles(files);
    setCourseTitle(title);

    // Generate real AI content
    const content = await generateCourseContent("pdf", fileNames, title);

    setTimeout(() => {
      setIsProcessing(false);
      setShowCoursePreview(true);
      toast({
        title: "AI Course Generated Successfully!",
        description: "Your PDF content has been transformed into a comprehensive interactive course.",
      });
      // Scroll to preview
      setTimeout(() => {
        document.getElementById('course-preview')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2000);
  };

  return (
    <section id="upload-section" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Start Your Course
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Creation</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Upload your content and let AI transform it into an engaging learning experience
          </p>
        </div>

        <Card className="bg-gradient-card shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6 text-primary" />
              Content Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="youtube" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="youtube" className="flex items-center gap-2">
                  <Youtube className="w-4 h-4" />
                  YouTube Video
                </TabsTrigger>
                <TabsTrigger value="pdf" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  PDF Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="youtube" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="youtube-url" className="text-base font-medium">
                    YouTube Video URL
                  </Label>
                  <div className="flex gap-3">
                    <Input
                      id="youtube-url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="text-base h-12"
                    />
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="px-6"
                      onClick={handleYouTubeSubmit}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Generating with AI..." : "Generate Course"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Paste any public YouTube video URL to generate a complete course
                  </p>
                </div>

                {/* YouTube preview area */}
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 bg-muted/10">
                  <div className="text-center">
                    <Youtube className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      Video preview will appear here once you paste a URL
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pdf" className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                    isDragging
                      ? "border-primary bg-primary/5 scale-105"
                      : "border-muted-foreground/20 hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => {
                    handleDrag(e);
                    const files = e.dataTransfer.files;
                    handleFileUpload(files);
                  }}
                >
                  <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Drop your PDF files here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Or click to browse and select files
                  </p>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.pdf';
                      input.multiple = true;
                      input.onchange = (e) => {
                        const target = e.target as HTMLInputElement;
                        handleFileUpload(target.files);
                      };
                      input.click();
                    }}
                  >
                    Choose Files
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Supports PDF files up to 50MB. Multiple files allowed.
                  </p>
                </div>

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isProcessing}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf';
                    input.multiple = true;
                    input.onchange = (e) => {
                      const target = e.target as HTMLInputElement;
                      handleFileUpload(target.files);
                    };
                    input.click();
                  }}
                >
                  {isProcessing ? "Generating with AI..." : "Generate Course from PDFs"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Processing preview */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Processing Preview</h3>
                <p className="text-muted-foreground">
                  Once uploaded, your content will be processed to generate lecture notes, 
                  interactive quizzes, flashcards, and a personalized AI tutor.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div id="course-preview">
          <CoursePreview 
            isVisible={showCoursePreview}
            courseTitle={courseTitle}
            sourceType={sourceType}
            inputContent={inputContent}
            generatedContent={generatedCourseContent}
          />
        </div>
      </div>
    </section>
  );
};

export default UploadSection;