import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Star, Globe, TrendingUp, BarChart3, ExternalLink, Zap } from "lucide-react";

const CompetitorAnalysis = () => {
  const competitors = [
    {
      name: "Your Business",
      loanUtilization: 78,
      creditScore: 750,
      marketPosition: 68,
      growthRate: 15,
      isYour: true
    },
    {
      name: "TechCorp Solutions",
      loanUtilization: 85,
      creditScore: 780,
      marketPosition: 82,
      growthRate: 22,
      isYour: false
    },
    {
      name: "InnovateMSME Ltd",
      loanUtilization: 72,
      creditScore: 720,
      marketPosition: 75,
      growthRate: 18,
      isYour: false
    },
    {
      name: "GrowthFirst Enterprises",
      loanUtilization: 88,
      creditScore: 800,
      marketPosition: 90,
      growthRate: 28,
      isYour: false
    }
  ];

  const insights = [
    {
      metric: "Credit Score",
      recommendation: "Improve payment history to reach 780+ score",
      impact: "Unlock better interest rates and higher loan limits",
      actionLabel: "Improve Score"
    },
    {
      metric: "Loan Utilization",
      recommendation: "Optimize utilization to 80-85% for better growth",
      impact: "Access to additional working capital facilities",
      actionLabel: "Optimize Now"
    }
  ];

  const metrics = [
    { label: "Loan Utilization", key: "loanUtilization", icon: BarChart3, unit: "%" },
    { label: "Credit Score", key: "creditScore", icon: Star, unit: "" },
    { label: "Market Position", key: "marketPosition", icon: Globe, unit: "%" },
    { label: "Growth Rate", key: "growthRate", icon: TrendingUp, unit: "%" }
  ];

  const getScoreColor = (score: number, isYour: boolean, key: string) => {
    if (isYour) return "text-primary";
    if (key === "creditScore") {
      if (score >= 750) return "text-success";
      if (score >= 700) return "text-warning";
      return "text-muted-foreground";
    }
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <Card className="h-full card-elevated">
      <CardHeader className="pb-4">
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
                const score = competitor[metric.key as keyof typeof competitor] as number;
                const displayValue = metric.key === "creditScore" 
                  ? `${score}` 
                  : `${score}${metric.unit}`;

                const progressValue = metric.key === "creditScore" 
                  ? (score / 850) * 100 
                  : score;

                return (
                  <div key={competitor.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={competitor.isYour ? "font-semibold" : ""}>
                          {competitor.name}
                        </span>
                        {competitor.isYour && (
                          <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                            You
                          </Badge>
                        )}
                      </div>
                      <span className={`font-semibold ${getScoreColor(score, competitor.isYour, metric.key)}`}>
                        {displayValue}
                      </span>
                    </div>
                    <Progress 
                      value={progressValue} 
                      className="h-2"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t space-y-3">
          <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Growth Opportunities:
          </h5>
          
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="p-3 rounded-lg bg-accent/30 space-y-2">
                <h6 className="text-xs font-medium text-foreground">{insight.metric}</h6>
                <p className="text-xs text-muted-foreground">{insight.recommendation}</p>
                <p className="text-xs text-success font-medium">{insight.impact}</p>
                <Button size="sm" className="btn-secondary text-xs h-7 w-full">
                  {insight.actionLabel}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="text-xs flex-1 hover:bg-accent transition-colors">
              <ExternalLink className="h-3 w-3 mr-1" />
              Compare Now
            </Button>
            <Button size="sm" className="btn-primary text-xs flex-1">
              Apply for Offer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;