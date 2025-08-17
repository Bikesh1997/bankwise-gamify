import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Download, Check, ExternalLink } from "lucide-react";

const RegulatoryPanel = () => {
  const regulatoryUpdates = [
    {
      id: 1,
      title: "New MSME Loan Guidelines",
      category: "RBI",
      effectiveDate: "1st September 2024",
      impact: "Medium",
      summary: "Updated guidelines for MSME loan classification and restructuring options",
      actionItems: [
        "Review loan agreement terms",
        "Update business classification",
        "Submit compliance certificate"
      ],
      isNew: true,
      acknowledged: false
    },
    {
      id: 2,
      title: "Digital Lending Compliance",
      category: "NBFC",
      effectiveDate: "15th August 2024",
      impact: "High",
      summary: "Enhanced KYC requirements for digital lending platforms and borrower protection measures",
      actionItems: [
        "Complete enhanced KYC",
        "Review digital agreements",
        "Update contact preferences"
      ],
      isNew: true,
      acknowledged: false
    },
    {
      id: 3,
      title: "Interest Rate Transparency Rules",
      category: "RBI",
      effectiveDate: "1st July 2024",
      impact: "Low",
      summary: "Mandatory disclosure of all charges and fees in loan documentation",
      actionItems: [
        "Review fee structure",
        "Download updated agreements",
        "Confirm understanding"
      ],
      isNew: false,
      acknowledged: true
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-primary text-primary-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      case "Low":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "RBI":
        return "bg-primary/10 text-primary border-primary/20";
      case "NBFC":
        return "bg-secondary/10 text-secondary border-secondary/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <Card className="h-full card-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Regulatory Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {regulatoryUpdates.map((update) => (
          <div
            key={update.id}
            className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md group ${
              update.acknowledged ? 'bg-muted/20' : 'bg-card hover:bg-accent/30'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-sm">{update.title}</h4>
                    {update.isNew && !update.acknowledged && (
                      <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                        New
                      </Badge>
                    )}
                    {update.acknowledged && (
                      <Badge className="bg-success text-success-foreground text-xs px-2 py-0.5">
                        <Check className="h-3 w-3 mr-1" />
                        Acknowledged
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={`${getCategoryColor(update.category)} text-xs`}>
                      {update.category}
                    </Badge>
                    <Badge className={`${getImpactColor(update.impact)} text-xs`}>
                      {update.impact} Impact
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {update.effectiveDate}
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {update.summary}
                  </p>
                  
                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold text-foreground">Required Actions:</h5>
                    <ul className="space-y-1">
                      {update.actionItems.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full ${update.acknowledged ? 'bg-success' : 'bg-primary'}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="text-xs h-7 hover:bg-accent transition-colors">
                      <Download className="h-3 w-3 mr-1" />
                      Read More
                    </Button>
                    {!update.acknowledged && (
                      <Button size="sm" className="btn-primary text-xs h-7 group-hover:-translate-y-0.5 transition-transform">
                        <Check className="h-3 w-3 mr-1" />
                        Acknowledge
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-xs h-7 hover:bg-accent transition-colors">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full text-xs hover:bg-accent transition-colors" size="sm">
            View All Regulatory Updates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulatoryPanel;