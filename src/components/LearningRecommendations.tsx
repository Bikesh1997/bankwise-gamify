import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, PlayCircle, FileText, Clock, Star } from "lucide-react";

const LearningRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      type: "webinar",
      title: "Digital Marketing for Textile MSMEs",
      provider: "MSME Development Institute",
      duration: "2 hours",
      rating: 4.7,
      participants: 1250,
      description: "Learn proven digital marketing strategies specifically designed for textile businesses",
      date: "15th January 2024",
      isLive: true,
      tags: ["Marketing", "Digital", "Textiles"]
    },
    {
      id: 2,
      type: "course",
      title: "Export Documentation Mastery",
      provider: "Export Promotion Council",
      duration: "6 weeks",
      rating: 4.9,
      participants: 890,
      description: "Complete guide to export documentation, compliance, and international trade procedures",
      date: "Self-paced",
      isLive: false,
      tags: ["Export", "Documentation", "Compliance"]
    },
    {
      id: 3,
      type: "article",
      title: "GST Updates for Manufacturing Units",
      provider: "CA Institute of India",
      duration: "15 min read",
      rating: 4.5,
      participants: 2340,
      description: "Latest GST changes affecting manufacturing businesses and action items",
      date: "Updated today",
      isLive: false,
      tags: ["GST", "Tax", "Manufacturing"]
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
      default:
        return <GraduationCap className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "webinar":
        return "bg-destructive text-destructive-foreground";
      case "course":
        return "bg-primary text-primary-foreground";
      case "article":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Learning Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
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
                </div>
                
                <h4 className="font-medium text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.provider}</p>
                
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
                  <Button size="sm" className="text-xs h-7">
                    {item.type === "webinar" ? "Register Now" : 
                     item.type === "course" ? "Enroll" : "Read Article"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button variant="outline" className="w-full text-xs" size="sm">
            Browse All Learning Resources
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningRecommendations;