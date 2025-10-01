import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  Clock, 
  Star,
  TrendingUp,
  Users,
  Play,
  ChevronRight,
  Filter,
  Search
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();

  const handleEnrollNow = () => {
    navigate("/dashboard");
  };

  const handleUseTool = () => {
    navigate("/dashboard");
  };

  const featuredCourses = [
    {
      id: 1,
      title: "Complete React.js Masterclass",
      instructor: "John Smith",
      rating: 4.8,
      students: 12543,
      duration: "8h 30m",
      level: "Beginner",
      price: "Free",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      description: "Learn React.js from scratch with hands-on projects and real-world examples."
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Sarah Johnson",
      rating: 4.9,
      students: 8921,
      duration: "12h 15m",
      level: "Intermediate",
      price: "$49",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      description: "Master the basics of machine learning with Python and scikit-learn."
    },
    {
      id: 3,
      title: "Advanced JavaScript Patterns",
      instructor: "Mike Wilson",
      rating: 4.7,
      students: 6754,
      duration: "6h 45m",
      level: "Advanced",
      price: "$29",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      description: "Deep dive into advanced JavaScript concepts and design patterns."
    },
    {
      id: 4,
      title: "Data Science with Python",
      instructor: "Emily Chen",
      rating: 4.8,
      students: 9876,
      duration: "10h 20m",
      level: "Beginner",
      price: "Free",
      thumbnail: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=400&h=250&fit=crop",
      description: "Learn data analysis and visualization with Python, pandas, and matplotlib."
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      instructor: "Alex Rodriguez",
      rating: 4.6,
      students: 5432,
      duration: "7h 10m",
      level: "Beginner",
      price: "$39",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      description: "Master the fundamentals of user interface and user experience design."
    },
    {
      id: 6,
      title: "Cloud Computing with AWS",
      instructor: "David Park",
      rating: 4.9,
      students: 7654,
      duration: "9h 30m",
      level: "Intermediate",
      price: "$59",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      description: "Learn cloud computing concepts and AWS services hands-on."
    }
  ];

  const categories = [
    "All Courses",
    "Programming",
    "Data Science",
    "Design",
    "Business",
    "Marketing",
    "Personal Development"
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
              <span className="font-medium">Explore Courses</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="hero">Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Explore Our Course 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Library</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of courses created by experts and powered by AI to accelerate your learning journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search for courses, topics, or instructors..." 
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-card transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant={course.price === "Free" ? "default" : "secondary"}
                    className="bg-white/90 text-primary"
                  >
                    {course.price}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {course.students.toLocaleString()} students
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="flex-1"
                    onClick={handleEnrollNow}
                  >
                    Enroll Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleUseTool}
                  >
                    Use Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="min-w-[200px]">
            Load More Courses
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Explore;