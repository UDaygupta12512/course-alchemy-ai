import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Clock, Trophy, Zap, Globe } from "lucide-react";

const LiveStats = () => {
  const [stats, setStats] = useState({
    activeUsers: 47832,
    coursesCreated: 15234,
    hoursStudied: 298456,
    successRate: 94,
    countriesReached: 156,
    averageImprovement: 185
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        coursesCreated: prev.coursesCreated + Math.floor(Math.random() * 2),
        hoursStudied: prev.hoursStudied + Math.floor(Math.random() * 5),
        successRate: 94 + Math.floor(Math.random() * 3),
        countriesReached: prev.countriesReached,
        averageImprovement: 185 + Math.floor(Math.random() * 10)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: <Users className="w-8 h-8" />,
      value: stats.activeUsers.toLocaleString() + "+",
      label: "Active Learners",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: stats.coursesCreated.toLocaleString() + "+",
      label: "Courses Created",
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: stats.hoursStudied.toLocaleString() + "+",
      label: "Hours Studied",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      value: stats.successRate + "%",
      label: "Success Rate",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: stats.countriesReached + "+",
      label: "Countries",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: stats.averageImprovement + "%",
      label: "Avg Improvement",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Live</span> Learning Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time statistics showing the global impact of our AI-powered learning platform
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {statItems.map((stat, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-card border-0"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live data updating every few seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;