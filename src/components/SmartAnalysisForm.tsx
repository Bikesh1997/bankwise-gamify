import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, TrendingUp, FileText, CreditCard } from "lucide-react";

interface FormData {
  msmeNumber: string;
  tdsStatus: string;
  annualTurnover: string;
  currentLoanStatus: string;
}

interface SmartAnalysisFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const SmartAnalysisForm = ({ onSubmit, isLoading }: SmartAnalysisFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    msmeNumber: "",
    tdsStatus: "",
    annualTurnover: "",
    currentLoanStatus: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elegant border-border/20">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-foreground mb-2">
          Start Your Smart Analysis
        </CardTitle>
        <p className="text-muted-foreground">
          Get personalized insights and loan opportunities in minutes
        </p>
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="msmeNumber" className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              MSME Registration Number
            </Label>
            <Input
              id="msmeNumber"
              type="text"
              placeholder="Enter your MSME registration number"
              value={formData.msmeNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, msmeNumber: e.target.value }))}
              className="input-enhanced"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tdsStatus" className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              TDS Status
            </Label>
            <Select value={formData.tdsStatus} onValueChange={(value) => setFormData(prev => ({ ...prev, tdsStatus: value }))}>
              <SelectTrigger className="input-enhanced">
                <SelectValue placeholder="Select your TDS status" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="compliant">Fully Compliant</SelectItem>
                <SelectItem value="partially">Partially Compliant</SelectItem>
                <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                <SelectItem value="not-applicable">Not Applicable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="annualTurnover" className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Annual Turnover
            </Label>
            <Select value={formData.annualTurnover} onValueChange={(value) => setFormData(prev => ({ ...prev, annualTurnover: value }))}>
              <SelectTrigger className="input-enhanced">
                <SelectValue placeholder="Select your annual turnover range" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="under-50l">Under ₹50 Lakhs</SelectItem>
                <SelectItem value="50l-2cr">₹50 Lakhs - ₹2 Crores</SelectItem>
                <SelectItem value="2cr-10cr">₹2 Crores - ₹10 Crores</SelectItem>
                <SelectItem value="10cr-50cr">₹10 Crores - ₹50 Crores</SelectItem>
                <SelectItem value="above-50cr">Above ₹50 Crores</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentLoanStatus" className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Current Loan Status
            </Label>
            <Select value={formData.currentLoanStatus} onValueChange={(value) => setFormData(prev => ({ ...prev, currentLoanStatus: value }))}>
              <SelectTrigger className="input-enhanced">
                <SelectValue placeholder="Select your current loan status" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="no-loan">No Current Loans</SelectItem>
                <SelectItem value="single-loan">Single Active Loan</SelectItem>
                <SelectItem value="multiple-loans">Multiple Active Loans</SelectItem>
                <SelectItem value="seeking-loan">Seeking First Loan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-secondary to-secondary-dark text-secondary-foreground hover:from-secondary-light hover:to-secondary transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 shadow-lg rounded-lg"
            disabled={isLoading || !formData.msmeNumber || !formData.tdsStatus || !formData.annualTurnover || !formData.currentLoanStatus}
          >
            {isLoading ? "Analyzing..." : "Start Smart Analysis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SmartAnalysisForm;