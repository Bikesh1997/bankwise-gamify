import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, ExternalLink, Clock, TrendingUp } from "lucide-react";

const MSMENewsSection = () => {
  const newsItems = [
    {
      title: "Government Announces New MSME Credit Guarantee Scheme",
      summary: "Enhanced collateral-free loans up to ₹5 crores for manufacturing MSMEs with improved interest rates.",
      category: "Policy Update",
      timeAgo: "2 hours ago",
      isImportant: true
    },
    {
      title: "Digital Payment Incentives for Small Businesses",
      summary: "New cashback schemes for MSMEs adopting UPI and digital payment methods for B2B transactions.",
      category: "Financial Update",
      timeAgo: "1 day ago",
      isImportant: false
    },
    {
      title: "Export Promotion Scheme Extended Until 2025",
      summary: "MSME export incentives and support programs extended with additional benefits for first-time exporters.",
      category: "Export News",
      timeAgo: "2 days ago",
      isImportant: true
    },
    {
      title: "Technology Adoption Grants Now Available",
      summary: "Government launches ₹1000 crore fund for MSMEs to adopt Industry 4.0 technologies and automation.",
      category: "Technology",
      timeAgo: "3 days ago",
      isImportant: false
    }
  ];

  const tips = [
    "Maintain a credit score above 750 for better loan terms",
    "File GST returns on time to avoid penalties",
    "Consider invoice discounting for immediate cash flow",
    "Explore government subsidies for technology upgrades"
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* News Feed */}
            <div className="lg:col-span-2">
              <Card className="card-elevated h-fit">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Newspaper className="h-6 w-6 text-primary" />
                    Latest MSME Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {newsItems.map((item, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-muted/30 rounded-lg border border-border/10 hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={
                              item.isImportant 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted text-muted-foreground border border-border"
                            }
                          >
                            {item.category}
                          </Badge>
                          {item.isImportant && (
                            <TrendingUp className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {item.timeAgo}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {item.summary}
                      </p>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:text-primary-dark p-0 h-auto font-medium"
                      >
                        Read More
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <Button variant="outline" className="w-full">
                      View All News & Updates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advisory Tips Sidebar */}
            <div className="lg:col-span-1">
              <Card className="card-elevated h-fit">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    Quick Financial Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-4 rounded-xl border border-secondary/20">
                    <h3 className="font-semibold text-secondary mb-2">Today's Tip</h3>
                    <p className="text-sm text-foreground leading-relaxed">
                      Regularly review your credit utilization ratio. Keep it below 30% of your credit limit 
                      to maintain a healthy credit score and qualify for better loan terms.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Essential Tips:</h4>
                    {tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-foreground leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      Get Personalized Tips
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MSMENewsSection;