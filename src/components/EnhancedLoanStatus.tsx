import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Calendar, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

const EnhancedLoanStatus = () => {
  const [selectedLoan, setSelectedLoan] = useState(0);

  const loans = [
    {
      id: 1,
      type: "Business Term Loan",
      amount: "₹15,00,000",
      outstanding: "₹8,50,000",
      nextEMI: "₹35,500",
      dueDate: "15th Jan 2024",
      progress: 43,
      status: "active",
      rate: "8.5%",
      tenure: "5 years"
    },
    {
      id: 2,
      type: "Working Capital Loan",
      amount: "₹5,00,000",
      outstanding: "₹2,25,000",
      nextEMI: "₹18,750",
      dueDate: "20th Jan 2024",
      progress: 55,
      status: "active", 
      rate: "9.2%",
      tenure: "3 years"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "overdue":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-full card-elevated">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-heading">
          <CreditCard className="h-5 w-5 text-primary glow-on-hover" />
          My Loans Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Loan Selection Tabs */}
        <div className="flex gap-2">
          {loans.map((loan, index) => (
            <Button
              key={loan.id}
              variant={selectedLoan === index ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLoan(index)}
              className="text-xs"
            >
              {loan.type.split(' ')[0]}
            </Button>
          ))}
        </div>

        {/* Selected Loan Details */}
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-card to-muted/20 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-subheading">{loans[selectedLoan].type}</h3>
              <Badge className={`${getStatusColor(loans[selectedLoan].status)} interactive-scale`}>
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Loan Amount</p>
                <p className="font-semibold">{loans[selectedLoan].amount}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Outstanding</p>
                <p className="font-semibold text-primary">{loans[selectedLoan].outstanding}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Interest Rate</p>
                <p className="font-semibold">{loans[selectedLoan].rate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tenure</p>
                <p className="font-semibold">{loans[selectedLoan].tenure}</p>
              </div>
            </div>
          </div>

          {/* Payment Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Loan Progress</span>
              <span className="text-sm text-muted-foreground">{loans[selectedLoan].progress}% paid</span>
            </div>
            <Progress value={loans[selectedLoan].progress} className="progress-enhanced" />
          </div>

          {/* Next EMI */}
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-warning" />
              <span className="text-sm font-semibold">Next EMI Due</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-foreground">{loans[selectedLoan].nextEMI}</p>
                <p className="text-xs text-muted-foreground">Due: {loans[selectedLoan].dueDate}</p>
              </div>
              <Button size="sm" variant="default" className="interactive-scale">
                Pay Now
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="interactive-scale">
              <TrendingUp className="h-3 w-3 mr-1" />
              View Statement
            </Button>
            <Button variant="outline" size="sm" className="interactive-scale">
              <AlertCircle className="h-3 w-3 mr-1" />
              Request Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedLoanStatus;