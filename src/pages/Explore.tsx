import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, Users, BookOpen, Video, FileText, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import BackButton from '@/components/BackButton';
import { toast } from 'sonner';

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', label: 'All', icon: BookOpen },
    { id: 'ai-courses', label: 'AI Courses', icon: Brain },
    { id: 'study-tools', label: 'Study Tools', icon: Zap },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  const featuredContent = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      description: 'Comprehensive course covering the basics of machine learning algorithms and applications.',
      category: 'ai-courses',
      rating: 4.8,
      students: 1234,
      duration: '8 hours',
      level: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
      tags: ['AI', 'Machine Learning', 'Python'],
      instructor: 'Dr. Sarah Chen',
      price: 'Free'
    },
    {
      id: 2,
      title: 'AI-Powered Study Assistant',
      description: 'Interactive tool that helps you create personalized study plans and track progress.',
      category: 'study-tools',
      rating: 4.9,
      students: 856,
      duration: 'Unlimited',
      level: 'All Levels',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
      tags: ['Study Tools', 'AI Assistant', 'Productivity'],
      instructor: 'MindSphere AI',
      price: 'Premium'
    },
    {
      id: 3,
      title: 'Deep Learning with Neural Networks',
      description: 'Advanced course on neural networks, backpropagation, and deep learning architectures.',
      category: 'ai-courses',
      rating: 4.7,
      students: 967,
      duration: '12 hours',
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=200&fit=crop',
      tags: ['Deep Learning', 'Neural Networks', 'TensorFlow'],
      instructor: 'Prof. Alex Kumar',
      price: '$49'
    },
    {
      id: 4,
      title: 'Introduction to Data Science',
      description: 'Learn data analysis, visualization, and statistical methods with real-world projects.',
      category: 'ai-courses',
      rating: 4.6,
      students: 2134,
      duration: '10 hours',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      tags: ['Data Science', 'Statistics', 'Python', 'R'],
      instructor: 'Dr. Maria Rodriguez',
      price: '$29'
    },
    {
      id: 5,
      title: 'Smart Flashcards Generator',
      description: 'AI-powered tool that creates intelligent flashcards from your study materials.',
      category: 'study-tools',
      rating: 4.8,
      students: 1456,
      duration: 'Unlimited',
      level: 'All Levels',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop',
      tags: ['Flashcards', 'Memory', 'AI Generated'],
      instructor: 'MindSphere AI',
      price: 'Free'
    },
    {
      id: 6,
      title: 'Natural Language Processing Basics',
      description: 'Understanding text processing, sentiment analysis, and language models.',
      category: 'ai-courses',
      rating: 4.5,
      students: 743,
      duration: '6 hours',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop',
      tags: ['NLP', 'Text Processing', 'NLTK'],
      instructor: 'Dr. James Wilson',
      price: '$39'
    }
  ];

  const filteredContent = featuredContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      case 'newest':
        return b.id - a.id;
      default: // popular
        return b.students - a.students;
    }
  });

  const handleCourseClick = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      <div className="pt-20 px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center gap-4 mb-4 justify-center">
              <BackButton />
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Explore Learning Content
              </h1>
            </div>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Discover AI-powered courses, study tools, and educational resources tailored to your learning journey
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search for courses, tools, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full lg:w-[200px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <category.icon className="w-4 h-4" />
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full lg:w-[150px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="gap-2">
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {sortedContent.length} result{sortedContent.length !== 1 ? 's' : ''} found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedContent.map((item) => (
                  <Card 
                    key={item.id} 
                    className="overflow-hidden hover:shadow-glow transition-all duration-300 group cursor-pointer"
                    onClick={() => handleCourseClick(item.id)}
                  >
                    <div className="relative">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={item.price === 'Free' ? 'secondary' : 'outline'} className="bg-white/90">
                          {item.price}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm line-clamp-2">
                        {item.description}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-warning text-warning" />
                          {item.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {item.students.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.duration}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">By {item.instructor}</span>
                          <Badge variant="outline">{item.level}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(item.id);
                          }}
                          className="w-full mt-4"
                          variant={item.price === 'Free' ? 'default' : 'outline'}
                        >
                          {item.category === 'study-tools' ? 'Use Tool' : 'View Course'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {sortedContent.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No content found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Explore;