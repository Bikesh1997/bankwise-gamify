import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, PlayCircle, FileText, Clock, Star, Users, BookOpen } from "lucide-react";

const LearningResources = () => {
  const resources = [
    {
      id: 1,
      type: "webinar",
      title: "MSME Loan Optimization Strategies",
      provider: "Aditya Birla Finance Academy",
      duration: "1.5 hours",
      rating: 4.8,
      participants: 850,
      description: "Learn advanced strategies to optimize your business loans and improve cash flow management",
      date: "20th August 2024, 3:00 PM",
      isLive: true,
      level: "Intermediate",
      tags: ["Loan Management", "Cash Flow", "Strategy"]
    },
    {
      id: 2,
      type: "course",
      title: "Digital Finance for MSMEs",
      provider: "MSME Development Institute",
      duration: "4 weeks",
      rating: 4.9,
      participants: 1240,
      description: "Comprehensive course on digital financial tools and platforms for modern MSME operations",
      date: "Self-paced",
      isLive: false,
      level: "Beginner",
      tags: ["Digital Finance", "Technology", "Business Growth"]
    },
    {
      id: 3,
      type: "article",
      title: "New RBI Guidelines for MSME Lending",
      provider: "Financial Times India",
      duration: "8 min read",
      rating: 4.6,
      participants: 2100,
      description: "Latest updates on RBI guidelines affecting MSME lending practices and borrower benefits",
      date: "Published today",
      isLive: false,
      level: "Expert",
      tags: ["Regulatory", "RBI", "Compliance"]
    },
    {
      id: 4,
      type: "workshop",
      title: "Business Plan Workshop for Loan Applications",
      provider: "Aditya Birla Finance Academy",
      duration: "3 hours",
      rating: 4.7,
      participants: 420,
      description: "Hands-on workshop to create compelling business plans that improve loan approval chances",
      date: "25th August 2024, 10:00 AM",
      isLive: true,
      level: "Intermediate",
      tags: ["Business Planning", "Loan Application", "Strategy"]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "webinar":
        return <PlayCircle className="h-4 w-4" />;
      case "course":
        return <GraduationCap className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      case "workshop":
        return <Users className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "webinar":
        return "bg-primary text-primary-foreground";
      case "course":
        return "bg-secondary text-secondary-foreground";
      case "article":
        return "bg-success text-success-foreground";
      case "workshop":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-success/10 text-success border-success/20";
      case "Intermediate":
        return "bg-warning/10 text-warning border-warning/20";
      case "Expert":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getActionLabel = (type: string) => {
    switch (type) {
      case "webinar":
        return "Register for Webinar";
      case "course":
        return "Enroll Now";
      case "article":
        return "Read Article";
      case "workshop":
        return "Join Workshop";
      default:
        return "Learn More";
    }
  };

  return (
    <Card className="h-full card-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Learning & Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resources.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/30 transition-all duration-300 hover:shadow-md group"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`${getTypeColor(item.type)} text-xs`}>
                  {getTypeIcon(item.type)}
                  <span className="ml-1 capitalize">{item.type}</span>
                </Badge>
                {item.isLive && (
                  <Badge className="bg-destructive text-destructive-foreground text-xs animate-pulse">
                    Live
                  </Badge>
                )}
                <Badge variant="outline" className={`${getLevelColor(item.level)} text-xs`}>
                  {item.level}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.provider}</p>
              </div>
              
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-warning" />
                  {item.rating} ({item.participants})
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs px-2 py-0.5 bg-muted/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">{item.date}</span>
                <Button 
                  size="sm" 
                  className="btn-primary text-xs h-8 group-hover:-translate-y-0.5 transition-transform"
                >
                  {getActionLabel(item.type)}
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full text-xs hover:bg-accent transition-colors" size="sm">
            Browse All Learning Resources
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningResources;