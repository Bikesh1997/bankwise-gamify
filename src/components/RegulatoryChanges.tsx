import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ChevronRight, Download } from "lucide-react";

const RegulatoryChanges = () => {
  const changes = [
    {
      id: 1,
      title: "GST Invoice Rules Updated",
      category: "GST",
      effectiveDate: "1st February 2024",
      impact: "Medium",
      summary: "New mandatory fields added to GST invoices for B2B transactions above ₹5 lakhs",
      actionItems: [
        "Update invoice templates",
        "Train billing staff",
        "Test with sample invoices"
      ],
      isNew: true
    },
    {
      id: 2,
      title: "TDS Rate Changes for Professional Services",
      category: "TDS",
      effectiveDate: "1st April 2024",
      impact: "High",
      summary: "TDS rate for professional and technical services increased from 10% to 15%",
      actionItems: [
        "Update TDS calculation system",
        "Revise vendor agreements",
        "Inform accounting team"
      ],
      isNew: true
    },
    {
      id: 3,
      title: "Annual ROC Filing Format Changes",
      category: "ROC",
      effectiveDate: "31st March 2024",
      impact: "Low",
      summary: "Minor changes in AOC-4 form for annual filing with additional disclosures",
      actionItems: [
        "Download new forms",
        "Review disclosure requirements",
        "Update filing checklist"
      ],
      isNew: false
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-destructive text-destructive-foreground";
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
      case "GST":
        return "bg-primary/10 text-primary border-primary/20";
      case "TDS":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "ROC":
        return "bg-accent/10 text-accent-foreground border-accent/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Recent Regulatory Changes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {changes.map((change) => (
          <div
            key={change.id}
            className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium text-sm">{change.title}</h4>
                  {change.isNew && (
                    <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                      New
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={`${getCategoryColor(change.category)} text-xs`}>
                    {change.category}
                  </Badge>
                  <Badge className={`${getImpactColor(change.impact)} text-xs`}>
                    {change.impact} Impact
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {change.effectiveDate}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {change.summary}
                </p>
                
                <div className="space-y-1">
                  <h5 className="text-xs font-medium text-foreground">Action Required:</h5>
                  <ul className="space-y-1">
                    {change.actionItems.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ChevronRight className="h-3 w-3 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    <Download className="h-3 w-3 mr-1" />
                    Download Guide
                  </Button>
                  <Button size="sm" variant="default" className="text-xs h-7">
                    Mark as Read
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button variant="ghost" className="w-full text-xs" size="sm">
            View All Regulatory Updates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulatoryChanges;