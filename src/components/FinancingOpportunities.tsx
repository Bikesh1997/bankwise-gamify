import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, ArrowUpRight, Lightbulb, ExternalLink } from "lucide-react";

const FinancingOpportunities = () => {
  const opportunities = [
    {
      id: 1,
      title: "Working Capital Enhancement",
      loanType: "Business Loan",
      amount: "Up to ₹50 lakhs",
      rate: "Starting 9.5% p.a.",
      tenure: "5 years",
      eligibility: "95%",
      description: "Boost your cash flow with our enhanced working capital loans designed for growing MSMEs",
      benefits: ["Quick disbursement", "Flexible repayment", "Minimal documentation"],
      urgency: "Limited time offer",
      actionLabel: "Learn More"
    },
    {
      id: 2,
      title: "Equipment Finance Scheme",
      loanType: "Asset Finance",
      amount: "Up to ₹2 crores",
      rate: "Starting 10.2% p.a.",
      tenure: "7 years",
      eligibility: "88%",
      description: "Expand your business with latest machinery and equipment financing solutions",
      benefits: ["100% finance", "Tax benefits", "Quick approval"],
      urgency: "Special rates",
      actionLabel: "Learn More"
    },
    {
      id: 3,
      title: "Digital Transformation Loan",
      loanType: "Tech Upgrade",
      amount: "Up to ₹25 lakhs",
      rate: "Starting 8.9% p.a.",
      tenure: "3 years",
      eligibility: "92%",
      description: "Digitize your business operations with our specialized technology upgrade loans",
      benefits: ["Subsidized rates", "Expert guidance", "Implementation support"],
      urgency: "New launch",
      actionLabel: "Learn More"
    }
  ];

  const getEligibilityColor = (eligibility: string) => {
    const percent = parseInt(eligibility);
    if (percent >= 90) return "text-success";
    if (percent >= 80) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <Card className="h-full card-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Financing Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="p-4 rounded-lg border bg-gradient-to-r from-card to-accent/5 hover:from-accent/5 hover:to-accent/10 transition-all duration-300 hover:shadow-md group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-sm">{opportunity.title}</h4>
                    <Badge className="bg-primary/10 text-primary text-xs">
                      {opportunity.urgency}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Loan Type:</span>
                      <p className="font-medium text-foreground">{opportunity.loanType}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Amount:</span>
                      <p className="font-bold text-primary">{opportunity.amount}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Interest Rate:</span>
                      <p className="font-medium text-foreground">{opportunity.rate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tenure:</span>
                      <p className="font-medium text-foreground">{opportunity.tenure}</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {opportunity.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium">Your Eligibility:</span>
                      <span className={`text-xs font-bold ${getEligibilityColor(opportunity.eligibility)}`}>
                        {opportunity.eligibility} Match
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {opportunity.benefits.map((benefit, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary border-secondary/20"
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="btn-primary text-xs h-8 flex-1 group-hover:-translate-y-0.5 transition-transform"
                    >
                      <Lightbulb className="h-3 w-3 mr-1" />
                      {opportunity.actionLabel}
                    </Button>
                    <Button
                      size="sm"
                      className="btn-secondary text-xs h-8 flex-1 group-hover:-translate-y-0.5 transition-transform"
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full text-xs hover:bg-accent transition-colors" size="sm">
            <ExternalLink className="h-3 w-3 mr-1" />
            Explore All Financing Options
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancingOpportunities;