import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, ArrowUpRight, BarChart3 } from "lucide-react";

const BusinessInsights = () => {
  const opportunities = [
    {
      id: 1,
      title: "Organic Textile Demand Surge",
      growth: "+30%",
      timeframe: "Last 3 months",
      market: "Mumbai, Pune, Bangalore",
      confidence: "High",
      description: "Sustainable textile products showing strong demand growth in tier-1 cities",
      potentialRevenue: "₹15-25 lakhs",
      actionLabel: "Explore Opportunity"
    },
    {
      id: 2,
      title: "Digital Payment Integration",
      growth: "+45%",
      timeframe: "Last 6 months",
      market: "Pan India",
      confidence: "Very High",
      description: "Businesses with UPI integration reporting higher customer retention",
      potentialRevenue: "₹8-12 lakhs",
      actionLabel: "Get Started"
    },
    {
      id: 3,
      title: "Export Opportunity - Handicrafts",
      growth: "+20%",
      timeframe: "Q4 2023",
      market: "USA, Europe",
      confidence: "Medium",
      description: "Rising demand for Indian handicrafts in international markets",
      potentialRevenue: "₹50-80 lakhs",
      actionLabel: "Learn More"
    }
  ];

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "Very High":
        return "bg-secondary text-secondary-foreground";
      case "High":
        return "bg-primary text-primary-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-secondary" />
          Market Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="p-4 rounded-lg border bg-gradient-to-r from-card to-secondary/5 hover:from-secondary/5 hover:to-secondary/10 transition-all duration-300 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium text-sm">{opportunity.title}</h4>
                  <Badge className="bg-secondary text-secondary-foreground text-xs">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {opportunity.growth}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`${getConfidenceColor(opportunity.confidence)} text-xs`}>
                    <Target className="h-3 w-3 mr-1" />
                    {opportunity.confidence} Confidence
                  </Badge>
                  <span className="text-xs text-muted-foreground">{opportunity.timeframe}</span>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {opportunity.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium text-foreground">Target Market:</span>
                    <p className="text-muted-foreground">{opportunity.market}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Potential Revenue:</span>
                    <p className="text-secondary font-medium">{opportunity.potentialRevenue}</p>
                  </div>
                </div>
                
                <Button size="sm" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs h-8">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  {opportunity.actionLabel}
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button variant="outline" className="w-full text-xs" size="sm">
            View Market Analysis Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInsights;