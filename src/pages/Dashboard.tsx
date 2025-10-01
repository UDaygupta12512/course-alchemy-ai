import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">EduSynth</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">Dashboard</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your learning journey today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-card transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`${stat.color}`}>
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
                <Button variant="outline" size="sm">
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

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Quick Create
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/#upload-section">
                  <Button variant="hero" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    YouTube Video
                  </Button>
                </Link>
                <Link to="/#upload-section">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload PDF
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
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
      </div>
    </div>
  );
};

export default Dashboard;