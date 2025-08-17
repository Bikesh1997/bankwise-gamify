import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock } from 'lucide-react';

const MSMEUpdatesDetails: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      category: 'Policy Update',
      title: 'Government Launches New MSME Support Package Worth ₹50,000 Crores',
      time: '2 hours ago',
      summary: 'Finance Ministry announces comprehensive support package including collateral-free loans, digital infrastructure development, and export promotion schemes.',
      link: '#'
    },
    {
      id: 2,
      category: 'Financial Update',
      title: 'RBI Reduces Repo Rate by 0.25%, Beneficial for MSME Lending',
      time: '6 hours ago',
      summary: 'Interest rates on business loans expected to decrease, making credit more accessible for small and medium enterprises.',
      link: '#'
    },
    {
      id: 3,
      category: 'Export News',
      title: 'India\'s MSME Exports Grow 18% in Q3, Textiles Lead the Way',
      time: '1 day ago',
      summary: 'Strong performance in textile, pharmaceutical, and engineering sectors drives MSME export growth despite global challenges.',
      link: '#'
    },
    {
      id: 4,
      category: 'Technology',
      title: 'Digital Payment Adoption Reaches 85% Among MSMEs',
      time: '2 days ago',
      summary: 'Government\'s digital push shows results as majority of small businesses now accept digital payments, improving financial inclusion.',
      link: '#'
    },
    {
      id: 5,
      category: 'Policy Update',
      title: 'GST Compliance Made Easier with New Simplified Return Forms',
      time: '3 days ago',
      summary: 'CBIC introduces simplified GST return forms specifically designed for MSMEs with turnover below ₹5 crores.',
      link: '#'
    },
    {
      id: 6,
      category: 'Financial Update',
      title: 'SIDBI Launches ₹10,000 Crore Fund for Green MSMEs',
      time: '5 days ago',
      summary: 'Special focus on sustainable and environment-friendly businesses with concessional interest rates and longer repayment periods.',
      link: '#'
    }
  ];

  const getCategoryBadge = (category: string) => {
    const styles = {
      'Policy Update': 'bg-blue-100 text-blue-800 border-blue-200',
      'Financial Update': 'bg-green-100 text-green-800 border-green-200',
      'Export News': 'bg-purple-100 text-purple-800 border-purple-200',
      'Technology': 'bg-orange-100 text-orange-800 border-orange-200'
    };

    return (
      <Badge variant="secondary" className={styles[category as keyof typeof styles] || 'bg-gray-100 text-gray-800'}>
        {category}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Latest MSME Updates
        </h3>
        <p className="text-sm text-muted-foreground">
          Stay informed about the latest news, policy changes, and opportunities in the MSME sector.
        </p>
      </div>

      <div className="space-y-4">
        {newsItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(item.category)}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-foreground mb-2 leading-tight">
                    {item.title}
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>
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
          View All News & Updates
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Newsletter Subscription */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <div>
              <h5 className="font-medium text-foreground">Stay Updated</h5>
              <p className="text-sm text-muted-foreground">
                Get the latest MSME news and updates delivered to your inbox weekly.
              </p>
            </div>
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-white">
              Subscribe to Newsletter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MSMEUpdatesDetails;