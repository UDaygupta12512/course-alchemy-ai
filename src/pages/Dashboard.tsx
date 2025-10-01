import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Brain, 
  Clock, 
  Download, 
  Plus, 
  Search,
  Star,
  TrendingUp,
  Users,
  Play,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  BarChart3,
  Target,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AIChatAssistant from "@/components/AIChatAssistant";
import CourseManager from "@/components/CourseManager";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState<any>(null);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    setProfile(data);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const recentCourses = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      type: "YouTube",
      progress: 75,
      createdAt: "2 days ago",
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "React.js Fundamentals",
      type: "PDF",
      progress: 45,
      createdAt: "1 week ago", 
      status: "in-progress",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      type: "YouTube",
      progress: 90,
      createdAt: "2 weeks ago",
      status: "completed", 
      thumbnail: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=200&fit=crop"
    }
  ];

  const stats = [
    {
      label: "Courses Created",
      value: "12",
      change: "+3 this month",
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      label: "Study Hours",
      value: "47h",
      change: "+12h this week",
      icon: <Clock className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      label: "Quiz Score",
      value: "92%",
      change: "+5% improvement",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-purple-600"
    },
    {
      label: "AI Interactions",
      value: "156",
      change: "+23 this week",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-orange-600"
    }
  ];

  const achievements = [
    { title: "First Course Created", icon: "🎯", unlocked: true },
    { title: "Study Streak 7 Days", icon: "🔥", unlocked: true },
    { title: "Quiz Master", icon: "🧠", unlocked: true },
    { title: "AI Conversation Expert", icon: "🤖", unlocked: false },
    { title: "Course Creator Pro", icon: "⭐", unlocked: false },
  ];


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-elegant">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-smooth">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">MindSphere AI</span>
                  <p className="text-xs text-muted-foreground font-medium">Learning Dashboard</p>
                </div>
              </Link>
              
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="hidden sm:flex border-border/50 hover:bg-muted/50 transition-smooth"
              >
                <Link to="/">
                  ← Back to Website
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="pl-10 pr-4 py-2.5 border border-border/50 rounded-2xl text-sm w-72 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-smooth hover:bg-background"
                />
              </div>
              
              <Button size="icon" variant="ghost" className="relative hover:bg-muted/50 transition-smooth">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full animate-pulse shadow-glow"></span>
              </Button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-border/30">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-foreground">
                    {profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                    <p className="text-xs text-muted-foreground">Free Plan</p>
                  </div>
                </div>
                <Avatar className="ring-2 ring-primary/30 shadow-card hover:ring-primary/50 transition-smooth">
                  <AvatarImage src={profile?.avatar_url || user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-primary text-white font-semibold text-lg">
                    {profile?.full_name?.[0] || user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" variant="ghost" onClick={handleSignOut} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-10 rounded-3xl blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-card rounded-3xl"></div>
          <div className="relative p-8 lg:p-10 rounded-3xl border border-border/30 shadow-elegant backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-success">Online</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
                  Welcome back, {profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}! 👋
                </h1>
                <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl leading-relaxed">
                  Ready to continue your learning journey? Let's see what amazing progress you'll make today.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="text-right space-y-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/50 rounded-2xl border border-border/30">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Member since</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    }) : 'Today'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-muted/20 p-1.5 rounded-3xl border border-border/30 shadow-card backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2 rounded-2xl px-4 py-2.5 transition-smooth data-[state=active]:bg-background data-[state=active]:shadow-card data-[state=active]:text-primary font-medium">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2 rounded-2xl px-4 py-2.5 transition-smooth data-[state=active]:bg-background data-[state=active]:shadow-card data-[state=active]:text-primary font-medium">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center gap-2 rounded-2xl px-4 py-2.5 transition-smooth data-[state=active]:bg-background data-[state=active]:shadow-card data-[state=active]:text-primary font-medium">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 rounded-2xl px-4 py-2.5 transition-smooth data-[state=active]:bg-background data-[state=active]:shadow-card data-[state=active]:text-primary font-medium">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 rounded-2xl px-4 py-2.5 transition-smooth data-[state=active]:bg-background data-[state=active]:shadow-card data-[state=active]:text-primary font-medium">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="group hover:shadow-elegant hover:scale-[1.02] transition-all duration-300 border-border/30 bg-gradient-card shadow-card backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{stat.value}</p>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                          <p className="text-xs text-success font-medium">{stat.change}</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-2xl group-hover:from-primary/15 group-hover:to-primary/10 transition-all duration-300">
                        <div className="text-primary">
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Courses */}
              <div className="lg:col-span-2">
                <Card className="border-border/30 shadow-card bg-gradient-card">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      Recent Courses
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("courses")} className="border-border/50 hover:bg-muted/50 transition-smooth">
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentCourses.map((course) => (
                      <div key={course.id} className="group flex items-center gap-4 p-4 border border-border/30 rounded-2xl hover:bg-muted/20 hover:shadow-card transition-all duration-300 hover:scale-[1.01]">
                        <div className="w-20 h-14 rounded-xl overflow-hidden bg-muted shadow-card">
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0 space-y-2">
                          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{course.title}</h3>
                          <div className="flex items-center gap-3 text-sm">
                            <Badge variant="outline" className="text-xs bg-background/50 border-border/30">
                              {course.type}
                            </Badge>
                            <span className="text-muted-foreground">{course.createdAt}</span>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${course.status === 'completed' ? 'bg-success' : 'bg-primary'}`}></div>
                              <span className={course.status === 'completed' ? 'text-success' : 'text-primary'}>
                                {course.progress}% complete
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Learning Streak */}
              <div className="space-y-6">
                <Card className="border-border/30 shadow-card bg-gradient-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl">
                        <Plus className="w-5 h-5 text-secondary" />
                      </div>
                      Quick Create
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     <Button 
                      variant="hero" 
                      className="w-full justify-start h-12 rounded-xl shadow-card"
                      onClick={() => {
                        setActiveTab("courses");
                        toast({
                          title: "YouTube Video Creator",
                          description: "Create interactive courses from YouTube videos coming soon!",
                        });
                      }}
                    >
                      <Play className="w-4 h-4 mr-3" />
                      YouTube Video
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12 rounded-xl border-border/30 hover:bg-muted/50 transition-smooth"
                      onClick={() => setActiveTab("courses")}
                    >
                      <FileText className="w-4 h-4 mr-3" />
                      Upload PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12 rounded-xl border-border/30 hover:bg-muted/50 transition-smooth"
                      onClick={() => setActiveTab("courses")}
                    >
                      <Users className="w-4 h-4 mr-3" />
                      Browse Templates
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/30 shadow-card bg-gradient-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl">
                        <Star className="w-5 h-5 text-accent" />
                      </div>
                      Learning Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">7 days</div>
                        <div className="absolute -inset-4 bg-gradient-primary opacity-10 rounded-full blur-xl"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">Keep it up! You're on fire 🔥</p>
                      <div className="flex justify-center gap-2">
                        {[...Array(7)].map((_, i) => (
                          <div key={i} className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-pulse">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-success/10 rounded-xl border border-success/20">
                        <p className="text-xs text-success font-medium">Amazing! You're in the top 10% of learners</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <CourseManager />
          </TabsContent>

          <TabsContent value="ai-chat">
            <AIChatAssistant />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        achievement.unlocked 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-muted/30 border-border opacity-60'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.unlocked ? 'Unlocked!' : 'Keep learning to unlock this achievement'}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Zap className="w-3 h-3 mr-1" />
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <input 
                      type="text" 
                      value={profile?.full_name || user?.user_metadata?.full_name || ''} 
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      value={user?.email || ''} 
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Plan</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">Free Plan</Badge>
                      <Button size="sm" variant="outline">Upgrade</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;