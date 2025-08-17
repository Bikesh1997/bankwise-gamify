import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  AlertCircle, 
  FileText, 
  TrendingUp, 
  Download,
  Star,
  CheckCircle,
  ExternalLink,
  Target,
  Shield,
  Briefcase
} from "lucide-react";

interface FormData {
  msmeNumber: string;
  tdsStatus: string;
  annualTurnover: string;
  currentLoanStatus: string;
}

interface SmartAnalysisResultsProps {
  formData: FormData;
  onStartOver: () => void;
}

const SmartAnalysisResults = ({ formData, onStartOver }: SmartAnalysisResultsProps) => {
  const generateRecommendedLoan = () => {
    const turnoverMap: { [key: string]: { amount: string; rate: string; type: string } } = {
      "under-50l": { amount: "₹5-15 Lakhs", rate: "10.5%", type: "Working Capital" },
      "50l-2cr": { amount: "₹25-75 Lakhs", rate: "9.8%", type: "Business Expansion" },
      "2cr-10cr": { amount: "₹1-3 Crores", rate: "9.2%", type: "Equipment Finance" },
      "10cr-50cr": { amount: "₹5-15 Crores", rate: "8.8%", type: "Term Loan" },
      "above-50cr": { amount: "₹10-50 Crores", rate: "8.5%", type: "Corporate Loan" }
    };
    return turnoverMap[formData.annualTurnover] || turnoverMap["under-50l"];
  };

  const loan = generateRecommendedLoan();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <Badge className="bg-success text-success-foreground px-4 py-2 text-sm font-medium">
          <CheckCircle className="h-4 w-4 mr-2" />
          Analysis Complete
        </Badge>
        <h2 className="text-display text-foreground">
          Your Smart Analysis Report
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Based on your profile, we've identified the best opportunities for your business growth
        </p>
        <Button 
          variant="outline" 
          size="lg"
          className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Download className="h-5 w-5" />
          Download PDF Report
        </Button>
      </div>

      <Separator />

      {/* Results Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Loan Opportunities */}
        <Card className="card-elevated h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <CreditCard className="h-6 w-6 text-primary" />
              Recommended Loan Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{loan.type}</h3>
                  <p className="text-muted-foreground">Pre-approved offer</p>
                </div>
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Best Match
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold text-primary">{loan.amount}</div>
                  <div className="text-sm text-muted-foreground">Loan Amount</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">{loan.rate}</div>
                  <div className="text-sm text-muted-foreground">Interest Rate</div>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                Apply Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Other Available Options:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">Working Capital Loan</div>
                    <div className="text-sm text-muted-foreground">₹2-8 Lakhs • 11.2% p.a.</div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">Equipment Finance</div>
                    <div className="text-sm text-muted-foreground">₹5-20 Lakhs • 10.8% p.a.</div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Reminders */}
        <Card className="card-elevated h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Shield className="h-6 w-6 text-primary" />
              Compliance Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-br from-success/5 to-success/10 p-4 rounded-xl border border-success/20">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="font-medium text-success">TDS Status: {formData.tdsStatus}</span>
              </div>
              <p className="text-sm text-muted-foreground">Next filing due: March 31, 2024</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Upcoming Reminders:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <div className="flex-1">
                    <div className="font-medium text-warning">GST Return Due</div>
                    <div className="text-sm text-muted-foreground">Due in 15 days</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">ROC Filing</div>
                    <div className="text-sm text-muted-foreground">Due in 45 days</div>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              View All Compliance Tasks
            </Button>
          </CardContent>
        </Card>

        {/* Regulatory Updates */}
        <Card className="card-elevated h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <FileText className="h-6 w-6 text-primary" />
              Regulatory Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-medium text-foreground mb-2">New MSME Interest Rate Policy</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  RBI announces reduced interest rates for MSME loans effective January 2024.
                </p>
                <Badge className="bg-primary/10 text-primary">Affects You</Badge>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">GST Compliance Updates</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  New filing procedures for quarterly returns starting Q2 2024.
                </p>
                <Badge variant="outline">General Update</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Updates
            </Button>
          </CardContent>
        </Card>

        {/* Business Growth Advisory */}
        <Card className="card-elevated h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <TrendingUp className="h-6 w-6 text-primary" />
              Growth Advisory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-4 rounded-xl border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-secondary" />
                <span className="font-medium text-secondary">Credit Score: 720</span>
              </div>
              <p className="text-sm text-muted-foreground">Excellent - Qualify for premium rates</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Recommendations:</h4>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Diversify Revenue Streams</div>
                      <div className="text-xs text-muted-foreground">Consider digital expansion opportunities</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Optimize Working Capital</div>
                      <div className="text-xs text-muted-foreground">Improve cash flow cycle by 15-20%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Get Detailed Advisory Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Start Over Button */}
      <div className="text-center pt-8">
        <Button 
          onClick={onStartOver}
          variant="outline" 
          size="lg"
          className="gap-2"
        >
          Start New Analysis
        </Button>
      </div>
    </div>
  );
};

export default SmartAnalysisResults;