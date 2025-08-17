import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';

const LoanOverviewDetails: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Recommended Loan Opportunities
        </h3>
        <p className="text-sm text-muted-foreground">
          Based on your profile: Equipment Finance, Pre-approved offers available
        </p>
      </div>

      {/* Best Match */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Star className="h-4 w-4 text-primary fill-primary" />
              Best Match for You
            </CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Recommended
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Loan Amount</p>
              <p className="font-semibold text-lg text-foreground">₹1-3 Crores</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interest Rate</p>
              <p className="font-semibold text-lg text-primary">9.2% p.a.*</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Processing Time</p>
              <p className="font-medium text-foreground">7-10 days</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Loan Type</p>
              <p className="font-medium text-foreground">Equipment Finance</p>
            </div>
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
            size="lg"
          >
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Other Options */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Other Loan Options</h4>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Working Capital Loan</h5>
                <p className="text-sm text-muted-foreground">₹2-8 Lakhs • 11.2% p.a.*</p>
                <p className="text-xs text-muted-foreground">Quick approval for business operations</p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Equipment Finance</h5>
                <p className="text-sm text-muted-foreground">₹5-20 Lakhs • 10.8% p.a.*</p>
                <p className="text-xs text-muted-foreground">Finance new machinery and equipment</p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Business Expansion Loan</h5>
                <p className="text-sm text-muted-foreground">₹10-50 Lakhs • 12.5% p.a.*</p>
                <p className="text-xs text-muted-foreground">Scale your business operations</p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-xs text-muted-foreground">
        *Interest rates are subject to credit evaluation and may vary based on your profile and market conditions.
      </div>
    </div>
  );
};

export default LoanOverviewDetails;
