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
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">Course Alchemy</span>
                  <p className="text-xs text-muted-foreground">Dashboard</p>
                </div>
              </Link>
              
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="hidden sm:flex"
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
                  className="pl-10 pr-4 py-2 border border-border rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background transition-all"
                />
              </div>
              
              <Button size="icon" variant="ghost" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <div className="flex items-center gap-3 pl-3 border-l border-border">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">
                    {profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground">Free Plan</p>
                </div>
                <Avatar className="ring-2 ring-primary/20">
                  <AvatarImage src={profile?.avatar_url || user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-primary text-white font-medium">
                    {profile?.full_name?.[0] || user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" variant="ghost" onClick={handleSignOut} className="text-muted-foreground hover:text-destructive">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl"></div>
          <div className="relative p-8 rounded-3xl border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
                  Welcome back, {profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}! 👋
                </h1>
                <p className="text-muted-foreground text-lg">Here's what's happening with your learning journey today.</p>
              </div>
              <div className="hidden lg:block">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="text-lg font-semibold">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Today'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-muted/30 p-1 rounded-2xl">
            <TabsTrigger value="overview" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-border/50 bg-gradient-to-br from-background to-muted/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold mt-2 bg-gradient-primary bg-clip-text text-transparent">{stat.value}</p>
                        <p className="text-xs text-green-600 mt-2 font-medium">{stat.change}</p>
                      </div>
                      <div className={`${stat.color} bg-muted/30 p-3 rounded-xl`}>
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Courses */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Recent Courses
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("courses")}>
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentCourses.map((course) => (
                      <div key={course.id} className="flex items-center gap-4 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted">
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{course.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <Badge variant="outline" className="text-xs">
                              {course.type}
                            </Badge>
                            <span>{course.createdAt}</span>
                            <span className={course.status === 'completed' ? 'text-green-600' : 'text-blue-600'}>
                              {course.progress}% complete
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Quick Create
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="hero" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("courses")}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      YouTube Video
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("courses")}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Upload PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("courses")}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Browse Templates
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Learning Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">7 days</div>
                      <p className="text-sm text-muted-foreground mb-4">Keep it up! You're on fire 🔥</p>
                      <div className="flex justify-center gap-1">
                        {[...Array(7)].map((_, i) => (
                          <div key={i} className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ))}
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