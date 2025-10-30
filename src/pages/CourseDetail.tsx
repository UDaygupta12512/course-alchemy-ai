import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, BookOpen, Play, CheckCircle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import BackButton from '@/components/BackButton';
import { toast } from 'sonner';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Course data (in a real app, this would be fetched from an API)
  const courses = {
    '1': {
      id: 1,
      title: 'Machine Learning Fundamentals',
      description: 'Comprehensive course covering the basics of machine learning algorithms and applications.',
      fullDescription: 'Master the fundamentals of machine learning with this comprehensive course. Learn key algorithms, understand how to apply them to real-world problems, and build your own ML models from scratch. This course covers supervised and unsupervised learning, neural networks basics, and practical implementation with Python.',
      category: 'ai-courses',
      rating: 4.8,
      students: 1234,
      duration: '8 hours',
      level: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
      tags: ['AI', 'Machine Learning', 'Python'],
      instructor: 'Dr. Sarah Chen',
      price: 'Free',
      lessons: 24,
      modules: [
        {
          title: 'Introduction to Machine Learning',
          lessons: ['What is Machine Learning?', 'Types of ML Algorithms', 'Setting up Python Environment']
        },
        {
          title: 'Supervised Learning',
          lessons: ['Linear Regression', 'Classification Algorithms', 'Model Evaluation']
        },
        {
          title: 'Unsupervised Learning',
          lessons: ['Clustering', 'Dimensionality Reduction', 'Anomaly Detection']
        }
      ],
      requirements: ['Basic Python knowledge', 'Understanding of basic statistics', 'Computer with internet connection'],
      whatYouLearn: [
        'Understand core ML concepts and algorithms',
        'Implement ML models using Python',
        'Evaluate and optimize model performance',
        'Apply ML to real-world problems'
      ]
    },
    '2': {
      id: 2,
      title: 'AI-Powered Study Assistant',
      description: 'Interactive tool that helps you create personalized study plans and track progress.',
      fullDescription: 'Transform your study sessions with our AI-powered assistant. This tool adapts to your learning style, creates personalized study schedules, and tracks your progress in real-time.',
      category: 'study-tools',
      rating: 4.9,
      students: 856,
      duration: 'Unlimited',
      level: 'All Levels',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
      tags: ['Study Tools', 'AI Assistant', 'Productivity'],
      instructor: 'MindSphere AI',
      price: 'Premium',
      lessons: 0,
      modules: [],
      requirements: [],
      whatYouLearn: ['Create effective study schedules', 'Track learning progress', 'Optimize study sessions']
    },
    '3': {
      id: 3,
      title: 'Deep Learning with Neural Networks',
      description: 'Advanced course on neural networks, backpropagation, and deep learning architectures.',
      fullDescription: 'Dive deep into neural networks and modern deep learning techniques. Learn to build and train complex neural network architectures, understand backpropagation, and implement state-of-the-art models.',
      category: 'ai-courses',
      rating: 4.7,
      students: 967,
      duration: '12 hours',
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&h=400&fit=crop',
      tags: ['Deep Learning', 'Neural Networks', 'TensorFlow'],
      instructor: 'Prof. Alex Kumar',
      price: '$49',
      lessons: 36,
      modules: [
        {
          title: 'Neural Network Basics',
          lessons: ['Perceptrons', 'Activation Functions', 'Forward Propagation']
        },
        {
          title: 'Training Deep Networks',
          lessons: ['Backpropagation', 'Gradient Descent', 'Optimization Techniques']
        },
        {
          title: 'Advanced Architectures',
          lessons: ['CNNs', 'RNNs', 'Transformers']
        }
      ],
      requirements: ['Strong Python skills', 'ML fundamentals', 'Linear algebra knowledge'],
      whatYouLearn: [
        'Build neural networks from scratch',
        'Train deep learning models',
        'Implement CNN and RNN architectures',
        'Use TensorFlow and PyTorch'
      ]
    },
    '4': {
      id: 4,
      title: 'Introduction to Data Science',
      description: 'Learn data analysis, visualization, and statistical methods with real-world projects.',
      fullDescription: 'Start your data science journey with this comprehensive introduction. Learn to analyze data, create compelling visualizations, and apply statistical methods to solve real-world problems.',
      category: 'ai-courses',
      rating: 4.6,
      students: 2134,
      duration: '10 hours',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      tags: ['Data Science', 'Statistics', 'Python', 'R'],
      instructor: 'Dr. Maria Rodriguez',
      price: '$29',
      lessons: 28,
      modules: [
        {
          title: 'Data Analysis Fundamentals',
          lessons: ['Data Types', 'Data Cleaning', 'Exploratory Analysis']
        },
        {
          title: 'Statistical Methods',
          lessons: ['Descriptive Statistics', 'Hypothesis Testing', 'Regression Analysis']
        },
        {
          title: 'Data Visualization',
          lessons: ['Matplotlib', 'Seaborn', 'Interactive Dashboards']
        }
      ],
      requirements: ['Basic programming knowledge', 'High school mathematics'],
      whatYouLearn: [
        'Clean and prepare data',
        'Perform statistical analysis',
        'Create data visualizations',
        'Build predictive models'
      ]
    },
    '5': {
      id: 5,
      title: 'Smart Flashcards Generator',
      description: 'AI-powered tool that creates intelligent flashcards from your study materials.',
      fullDescription: 'Let AI create perfect flashcards from your notes and study materials. Our smart generator analyzes your content and creates optimized flashcards for maximum retention.',
      category: 'study-tools',
      rating: 4.8,
      students: 1456,
      duration: 'Unlimited',
      level: 'All Levels',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
      tags: ['Flashcards', 'Memory', 'AI Generated'],
      instructor: 'MindSphere AI',
      price: 'Free',
      lessons: 0,
      modules: [],
      requirements: [],
      whatYouLearn: ['Generate flashcards automatically', 'Use spaced repetition', 'Track memory retention']
    },
    '6': {
      id: 6,
      title: 'Natural Language Processing Basics',
      description: 'Understanding text processing, sentiment analysis, and language models.',
      fullDescription: 'Explore the fascinating world of Natural Language Processing. Learn how computers understand and process human language, from basic text processing to advanced language models.',
      category: 'ai-courses',
      rating: 4.5,
      students: 743,
      duration: '6 hours',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop',
      tags: ['NLP', 'Text Processing', 'NLTK'],
      instructor: 'Dr. James Wilson',
      price: '$39',
      lessons: 18,
      modules: [
        {
          title: 'Text Processing Basics',
          lessons: ['Tokenization', 'Stemming & Lemmatization', 'POS Tagging']
        },
        {
          title: 'Language Understanding',
          lessons: ['Sentiment Analysis', 'Named Entity Recognition', 'Text Classification']
        },
        {
          title: 'Language Models',
          lessons: ['Word Embeddings', 'Transformers Intro', 'BERT Basics']
        }
      ],
      requirements: ['Python programming', 'Basic ML knowledge'],
      whatYouLearn: [
        'Process and analyze text data',
        'Build sentiment analysis models',
        'Understand language models',
        'Use NLTK and spaCy'
      ]
    }
  };

  const course = courses[id as keyof typeof courses];

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Navigation />
        <div className="pt-20 px-6 py-8">
          <div className="max-w-7xl mx-auto text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
            <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/explore')}>Back to Explore</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    toast.success(`Successfully enrolled in "${course.title}"!`);
    // In a real app, this would add the course to the user's enrolled courses
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      <div className="pt-20 px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <BackButton />

          {/* Hero Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge>{course.category === 'ai-courses' ? 'Course' : 'Study Tool'}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{course.fullDescription}</p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-warning text-warning" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-5 h-5" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                  {course.lessons > 0 && (
                    <div className="flex items-center gap-1">
                      <Play className="w-5 h-5" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <p className="text-sm text-muted-foreground">
                    Created by <span className="font-semibold text-foreground">{course.instructor}</span>
                  </p>
                </div>
              </div>

              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-80 object-cover rounded-lg shadow-elegant"
              />
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center">
                    {course.price}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={handleEnroll} className="w-full" size="lg">
                    {course.category === 'study-tools' ? 'Start Using Tool' : 'Enroll Now'}
                  </Button>
                  
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-semibold">This course includes:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>{course.duration} of content</span>
                      </div>
                      {course.lessons > 0 && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>{course.lessons} lessons</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Course Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {course.whatYouLearn.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      What You'll Learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {course.requirements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    {course.modules.length} modules • {course.lessons} lessons
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.modules.length > 0 ? (
                    course.modules.map((module, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-3">
                          Module {index + 1}: {module.title}
                        </h4>
                        <ul className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Play className="w-4 h-4" />
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      This is a study tool with unlimited access to features
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructor">
              <Card>
                <CardHeader>
                  <CardTitle>About the Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{course.instructor}</h3>
                      <p className="text-muted-foreground">Expert Instructor</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div>
                      <p className="text-2xl font-bold">{course.rating}</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{course.students.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Students</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-sm text-muted-foreground">Course</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    An experienced educator passionate about making {course.category === 'ai-courses' ? 'AI and machine learning' : 'learning tools'} accessible to everyone.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
