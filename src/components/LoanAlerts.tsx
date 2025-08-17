import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertCircle, Info, TrendingUp, X, CheckCircle } from "lucide-react";

const LoanAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: "payment",
      icon: <AlertCircle className="h-4 w-4" />,
      title: "EMI Due Reminder",
      message: "Your EMI of ₹45,000 is due on 15th August. Avoid late fees by paying now.",
      actionLabel: "Pay Now",
      priority: "high",
      timestamp: "Today",
      amount: "₹45,000"
    },
    {
      id: 2,
      type: "rate",
      icon: <TrendingUp className="h-4 w-4" />,
      title: "Interest Rate Update",
      message: "Good news! Your loan interest rate has been reduced by 0.5% effective this month.",
      actionLabel: "View Details",
      priority: "medium",
      timestamp: "2 days ago",
      amount: null
    },
    {
      id: 3,
      type: "document",
      icon: <Info className="h-4 w-4" />,
      title: "Document Verification",
      message: "Please upload your latest ITR for continued loan benefits and credit limit enhancement.",
      actionLabel: "Upload Documents",
      priority: "medium",
      timestamp: "1 week ago",
      amount: null
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-primary bg-primary/5";
      case "medium":
        return "border-l-secondary bg-secondary/5";
      case "low":
        return "border-l-muted bg-muted/5";
      default:
        return "border-l-muted";
    }
  };

  const getActionButtonClass = (type: string) => {
    switch (type) {
      case "payment":
        return "btn-primary";
      case "rate":
        return "btn-secondary";
      default:
        return "bg-accent text-accent-foreground hover:bg-accent/80";
    }
  };

  return (
    <Card className="h-full card-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Smart Loan Alerts
          </div>
          <Badge className="bg-primary text-primary-foreground text-xs">
            3 Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`relative p-4 rounded-lg border-l-4 ${getPriorityColor(alert.priority)} transition-all hover:shadow-md group`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-foreground/10 text-foreground text-xs px-2 py-1">
                    {alert.icon}
                    <span className="ml-1 capitalize">{alert.type}</span>
                  </Badge>
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">{alert.title}</h4>
                  {alert.amount && (
                    <p className="text-lg font-bold text-primary">{alert.amount}</p>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {alert.message}
                </p>
                
                <Button
                  size="sm"
                  className={`${getActionButtonClass(alert.type)} text-xs h-8 group-hover:-translate-y-0.5 transition-transform`}
                >
                  {alert.actionLabel}
                </Button>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-xs" size="sm">
              <CheckCircle className="h-3 w-3 mr-1" />
              Mark All as Read
            </Button>
            <Button variant="outline" className="text-xs" size="sm">
              View All Alerts
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanAlerts;