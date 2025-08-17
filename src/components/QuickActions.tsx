import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  FileText, 
  PiggyBank, 
  Calculator, 
  Phone, 
  Download,
  ArrowRight,
  Zap
} from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Apply for New Loan",
      description: "Get pre-approved offers",
      icon: PiggyBank,
      color: "primary",
      badge: "Popular",
      disabled: false
    },
    {
      id: 2,
      title: "EMI Calculator",
      description: "Calculate your EMIs",
      icon: Calculator,
      color: "secondary", 
      badge: null,
      disabled: false
    },
    {
      id: 3,
      title: "Download Statements",
      description: "Last 12 months",
      icon: Download,
      color: "muted",
      badge: null,
      disabled: false
    },
    {
      id: 4,
      title: "Schedule Call",
      description: "Talk to relationship manager",
      icon: Phone,
      color: "success",
      badge: "Free",
      disabled: false
    },
    {
      id: 5,
      title: "Tax Benefits",
      description: "View your tax savings",
      icon: FileText,
      color: "warning",
      badge: null,
      disabled: false
    },
    {
      id: 6,
      title: "Instant Top-up",
      description: "Additional funds in 24hrs",
      icon: Zap,
      color: "primary",
      badge: "New",
      disabled: false
    }
  ];

  const getIconColor = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Popular":
        return "bg-primary text-primary-foreground";
      case "New":
        return "bg-success text-success-foreground";
      case "Free":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-full card-elevated">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-heading">
          <Zap className="h-5 w-5 text-primary glow-on-hover" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => {
            const IconComponent = action.icon;
            
            return (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 card-interactive text-left"
                disabled={action.disabled}
              >
                <div className="flex items-center justify-between w-full">
                  <IconComponent className={`h-5 w-5 ${getIconColor(action.color)}`} />
                  {action.badge && (
                    <Badge className={`${getBadgeColor(action.badge)} text-xs px-2 py-0.5`}>
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <div className="w-full">
                  <h4 className="font-semibold text-sm mb-1">{action.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-foreground">
            View All Services
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;