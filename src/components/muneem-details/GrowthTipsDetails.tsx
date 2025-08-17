import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, FileText, BarChart3, Star } from 'lucide-react';

const GrowthTipsDetails: React.FC = () => {
  const creditScore = {
    score: 750,
    maxScore: 900,
    rating: 'Good',
    change: '+25 points from last month'
  };

  const recommendations = [
    {
      id: 1,
      title: 'Improve Cash Flow Management',
      description: 'Implement automated invoicing and follow-up systems to reduce payment delays by 30%',
      impact: 'High',
      timeframe: '2-3 months'
    },
    {
      id: 2,
      title: 'Optimize Working Capital',
      description: 'Consider invoice discounting facilities to improve liquidity and fund growth opportunities',
      impact: 'Medium',
      timeframe: '1 month'
    },
    {
      id: 3,
      title: 'Enhance Digital Presence',
      description: 'Invest in digital marketing and e-commerce to reach new customer segments',
      impact: 'High',
      timeframe: '3-6 months'
    },
    {
      id: 4,
      title: 'Diversify Revenue Streams',
      description: 'Explore complementary products/services to reduce dependency on single revenue source',
      impact: 'Medium',
      timeframe: '6-12 months'
    }
  ];

  const getImpactBadge = (impact: string) => {
    if (impact === 'High') {
      return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">High Impact</Badge>;
    }
    if (impact === 'Medium') {
      return <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">Medium Impact</Badge>;
    }
    return <Badge variant="outline">Low Impact</Badge>;
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Excellent':
        return 'text-green-600';
      case 'Good':
        return 'text-blue-600';
      case 'Fair':
        return 'text-amber-600';
      default:
        return 'text-red-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Credit Score */}
      <Card className="bg-gradient-to-br from-blue-50 to-background border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-600" />
            Business Credit Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">{creditScore.score}</p>
              <p className="text-sm text-muted-foreground">out of {creditScore.maxScore}</p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-semibold ${getRatingColor(creditScore.rating)}`}>
                {creditScore.rating}
              </p>
              <p className="text-xs text-green-600">{creditScore.change}</p>
            </div>
          </div>
          <Progress value={(creditScore.score / creditScore.maxScore) * 100} className="h-3" />
          <p className="text-xs text-muted-foreground">
            A good credit score helps you get better loan terms and higher credit limits.
          </p>
        </CardContent>
      </Card>

      {/* Key Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h4 className="font-semibold text-foreground">Growth Recommendations</h4>
        </div>
        
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground mb-1">{rec.title}</h5>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                    {getImpactBadge(rec.impact)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Timeframe: {rec.timeframe}</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-primary hover:text-primary">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Business Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-muted-foreground">Revenue Growth</p>
              <p className="font-semibold text-green-700">+15.2%</p>
              <p className="text-xs text-muted-foreground">vs last quarter</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-muted-foreground">Profit Margin</p>
              <p className="font-semibold text-blue-700">18.5%</p>
              <p className="text-xs text-muted-foreground">Industry avg: 16%</p>
            </div>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-muted-foreground">Market Position</p>
            <p className="font-semibold text-amber-700">Above Average</p>
            <p className="text-xs text-muted-foreground">Top 30% in your sector</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
          <FileText className="h-4 w-4 mr-2" />
          Get Detailed Advisory Report
        </Button>
        <Button variant="outline" className="w-full" size="lg">
          <Target className="h-4 w-4 mr-2" />
          Start New Analysis
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        * Recommendations are based on your business profile and industry benchmarks. Consult with financial advisors for personalized guidance.
      </div>
    </div>
  );
};

export default GrowthTipsDetails;