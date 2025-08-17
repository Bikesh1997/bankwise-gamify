import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, CreditCard, AlertTriangle, FileText, ChevronRight } from "lucide-react";

const LoanComplianceWidget = () => {
  const complianceItems = [
    {
      id: 1,
      type: "payment",
      title: "EMI Payment Due",
      dueDate: "15th August 2024",
      amount: "₹45,000",
      daysLeft: 3,
      status: "urgent",
      description: "Business Loan EMI - A/c ending 1234",
      actionLabel: "Pay Now"
    },
    {
      id: 2,
      type: "document",
      title: "KYC Documentation Update",
      dueDate: "25th August 2024",
      amount: null,
      daysLeft: 13,
      status: "upcoming",
      description: "Annual KYC update required for loan account",
      actionLabel: "Update KYC"
    },
    {
      id: 3,
      type: "filing",
      title: "ROC Annual Filing",
      dueDate: "30th September 2024",
      amount: null,
      daysLeft: 49,
      status: "scheduled",
      description: "Mandatory ROC filing for loan compliance",
      actionLabel: "View Details"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-primary text-primary-foreground";
      case "upcoming":
        return "bg-warning text-warning-foreground";
      case "scheduled":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CreditCard className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      case "filing":
        return <CalendarDays className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="h-full card-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarDays className="h-5 w-5 text-primary" />
          Loan Compliance Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {complianceItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/30 transition-all duration-300 group"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {getIcon(item.type)}
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                </div>
                <Badge className={`${getStatusColor(item.status)} text-xs px-2 py-1`}>
                  {item.daysLeft} days
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <div className="flex items-center gap-4 text-xs">
                <span className="font-medium text-foreground">Due: {item.dueDate}</span>
                {item.amount && (
                  <span className="font-bold text-primary">{item.amount}</span>
                )}
              </div>
              <Button
                size="sm"
                className="btn-primary text-xs h-8 group-hover:-translate-y-0.5 transition-transform"
              >
                {item.actionLabel}
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full hover:bg-accent transition-colors" size="sm">
            View All Compliance Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanComplianceWidget;