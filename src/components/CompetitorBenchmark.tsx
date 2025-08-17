import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Star, Globe, TrendingUp, ExternalLink } from "lucide-react";

const CompetitorBenchmark = () => {
  const competitors = [
    {
      name: "Your Business",
      pricing: 85,
      reviews: 4.2,
      reviewCount: 156,
      onlinePresence: 65,
      marketShare: 12,
      isYour: true
    },
    {
      name: "TextileCraft Pro",
      pricing: 92,
      reviews: 4.6,
      reviewCount: 289,
      onlinePresence: 88,
      marketShare: 28,
      isYour: false
    },
    {
      name: "Mumbai Fabrics Ltd",
      pricing: 78,
      reviews: 4.1,
      reviewCount: 203,
      onlinePresence: 72,
      marketShare: 19,
      isYour: false
    },
    {
      name: "Green Textiles Co",
      pricing: 95,
      reviews: 4.8,
      reviewCount: 412,
      onlinePresence: 94,
      marketShare: 31,
      isYour: false
    }
  ];

  const metrics = [
    { label: "Pricing Competitiveness", key: "pricing", icon: TrendingUp, unit: "%" },
    { label: "Customer Reviews", key: "reviews", icon: Star, unit: "/5" },
    { label: "Online Presence", key: "onlinePresence", icon: Globe, unit: "%" },
    { label: "Market Share", key: "marketShare", icon: Users, unit: "%" }
  ];

  const getScoreColor = (score: number, isYour: boolean) => {
    if (isYour) return "text-primary";
    if (score >= 90) return "text-secondary";
    if (score >= 70) return "text-warning";
    return "text-muted-foreground";
  };

  const getProgressColor = (score: number, isYour: boolean) => {
    if (isYour) return "bg-primary";
    if (score >= 90) return "bg-secondary";
    if (score >= 70) return "bg-warning";
    return "bg-muted";
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Competitor Benchmarking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.key} className="space-y-3">
            <div className="flex items-center gap-2">
              <metric.icon className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">{metric.label}</h4>
            </div>
            
            <div className="space-y-2">
              {competitors.map((competitor) => {
                const score = metric.key === "reviews" 
                  ? competitor[metric.key as keyof typeof competitor] as number
                  : competitor[metric.key as keyof typeof competitor] as number;
                
                const displayValue = metric.key === "reviews" 
                  ? `${score}${metric.unit} (${competitor.reviewCount})`
                  : `${score}${metric.unit}`;

                const progressValue = metric.key === "reviews" 
                  ? (score / 5) * 100 
                  : score;

                return (
                  <div key={competitor.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={competitor.isYour ? "font-medium" : ""}>
                          {competitor.name}
                        </span>
                        {competitor.isYour && (
                          <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                            You
                          </Badge>
                        )}
                      </div>
                      <span className={`font-medium ${getScoreColor(score, competitor.isYour)}`}>
                        {displayValue}
                      </span>
                    </div>
                    <Progress 
                      value={progressValue} 
                      className="h-2"
                      style={{
                        backgroundColor: competitor.isYour ? 'hsl(var(--primary))' : undefined
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="pt-3 border-t space-y-2">
          <h5 className="font-medium text-sm text-foreground">Key Insights:</h5>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <TrendingUp className="h-3 w-3 mt-0.5 text-secondary" />
              Your pricing is competitive but reviews need improvement
            </li>
            <li className="flex items-start gap-2">
              <Globe className="h-3 w-3 mt-0.5 text-warning" />
              Consider strengthening online presence for better reach
            </li>
          </ul>
          
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="text-xs flex-1">
              <ExternalLink className="h-3 w-3 mr-1" />
              Detailed Report
            </Button>
            <Button size="sm" variant="default" className="text-xs flex-1">
              Improvement Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorBenchmark;