import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, CheckCircle, Target } from 'lucide-react';

const FinancialTipsDetails: React.FC = () => {
  const todaysTip = {
    title: 'Optimize Your Business Cash Flow',
    content: 'Implement a 30-60-90 day payment collection strategy. Send invoices immediately, follow up at 15 days, and consider offering early payment discounts. This can improve your cash flow by up to 25% and reduce bad debt significantly.'
  };

  const essentialTips = [
    'Maintain separate business and personal bank accounts to track expenses accurately',
    'Set aside 15-20% of monthly revenue for tax obligations and compliance costs',
    'Review and negotiate supplier payment terms to improve working capital management',
    'Use digital accounting tools to automate bookkeeping and reduce human errors',
    'Build an emergency fund equivalent to 3-6 months of operating expenses',
    'Regularly monitor key financial ratios like current ratio and debt-to-equity ratio',
    'Consider invoice financing for immediate cash flow during growth phases',
    'Track daily cash position to avoid overdrafts and maintain adequate liquidity'
  ];

  const quickWins = [
    {
      title: 'Automate Recurring Payments',
      description: 'Set up automatic payments for utilities, rent, and loan EMIs to avoid late fees',
      timeToImplement: '1 hour'
    },
    {
      title: 'Implement Digital Invoicing',
      description: 'Switch to digital invoicing to reduce processing time by 50%',
      timeToImplement: '2 hours'
    },
    {
      title: 'Claim All Tax Deductions',
      description: 'Review eligible business expenses and ensure you\'re claiming all deductions',
      timeToImplement: '3 hours'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Today's Tip */}
      <Card className="bg-gradient-to-br from-amber-50 to-background border-amber-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            Today's Financial Tip
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <h5 className="font-medium text-foreground">{todaysTip.title}</h5>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {todaysTip.content}
          </p>
          <div className="pt-2">
            <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Essential Tips */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Essential Financial Tips
        </h4>
        
        <div className="space-y-3">
          {essentialTips.map((tip, index) => (
            <Card key={index} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Wins */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Quick Wins (Implement Today)
        </h4>
        
        <div className="space-y-3">
          {quickWins.map((win, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-foreground">{win.title}</h5>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {win.timeToImplement}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{win.description}</p>
                  <div className="pt-1">
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-600 hover:text-blue-700 p-0">
                      Get Implementation Guide →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
          <Target className="h-4 w-4 mr-2" />
          Get Personalized Tips
        </Button>
        <Button variant="outline" className="w-full" size="lg">
          <Lightbulb className="h-4 w-4 mr-2" />
          Schedule Financial Health Check
        </Button>
      </div>

      {/* Newsletter */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h5 className="font-medium text-green-900">Weekly Financial Tips</h5>
            <p className="text-sm text-green-700">
              Get actionable financial tips delivered to your inbox every week.
            </p>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
              Subscribe Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialTipsDetails;