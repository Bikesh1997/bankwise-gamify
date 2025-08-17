import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, AlertCircle, Info } from 'lucide-react';

const RegulatoryUpdatesDetails: React.FC = () => {
  const updates = [
    {
      id: 1,
      title: 'New GST Rate Changes for MSMEs',
      description: 'Government announces reduced GST rates for small businesses with turnover below ₹1.5 crore. This will help reduce compliance burden and improve cash flow.',
      category: 'Affects You',
      date: '2 days ago',
      priority: 'high',
      link: '#'
    },
    {
      id: 2,
      title: 'Digital Payment Incentives Extended',
      description: 'RBI extends digital payment incentives for small businesses. Additional cashback and reduced transaction fees available till March 2024.',
      category: 'Affects You',
      date: '5 days ago',
      priority: 'medium',
      link: '#'
    },
    {
      id: 3,
      title: 'Updated MSME Classification Criteria',
      description: 'Ministry of MSME updates classification criteria based on investment and turnover. Check if your business classification has changed.',
      category: 'General Update',
      date: '1 week ago',
      priority: 'medium',
      link: '#'
    },
    {
      id: 4,
      title: 'New Export Promotion Scheme',
      description: 'Government launches new export promotion scheme for MSMEs with additional subsidies and support for international market expansion.',
      category: 'General Update',
      date: '2 weeks ago',
      priority: 'low',
      link: '#'
    },
    {
      id: 5,
      title: 'TDS Rate Changes Effective April 2024',
      description: 'Changes in TDS rates for certain categories of payments. Review your TDS compliance and update your systems accordingly.',
      category: 'Affects You',
      date: '3 weeks ago',
      priority: 'high',
      link: '#'
    }
  ];

  const getCategoryBadge = (category: string) => {
    if (category === 'Affects You') {
      return (
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          <AlertCircle className="h-3 w-3 mr-1" />
          Affects You
        </Badge>
      );
    }
    return (
      <Badge variant="outline">
        <Info className="h-3 w-3 mr-1" />
        General Update
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-amber-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Latest Regulatory Updates
        </h3>
        <p className="text-sm text-muted-foreground">
          Stay updated with the latest government policies, compliance changes, and regulatory announcements affecting your business.
        </p>
      </div>

      <div className="space-y-4">
        {updates.map((update) => (
          <Card key={update.id} className={`hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(update.priority)}`}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryBadge(update.category)}
                      <span className="text-xs text-muted-foreground">{update.date}</span>
                    </div>
                    <h5 className="font-medium text-foreground mb-2">{update.title}</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {update.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="text-primary hover:text-primary">
                    Read More
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button variant="outline" className="w-full md:w-auto">
          View All Updates
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Stay Informed</p>
              <p className="text-xs text-blue-700">
                Subscribe to our regulatory update notifications to get instant alerts about changes that affect your business.
              </p>
              <Button variant="outline" size="sm" className="mt-2 border-blue-300 text-blue-700 hover:bg-blue-100">
                Subscribe to Alerts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulatoryUpdatesDetails;