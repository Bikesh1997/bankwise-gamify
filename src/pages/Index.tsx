import { useState } from "react";
import AdityaBirlaHeader from "@/components/AdityaBirlaHeader";
import HeroSection from "@/components/HeroSection";
import SmartAnalysisForm from "@/components/SmartAnalysisForm";
import LoadingAnimation from "@/components/LoadingAnimation";
import SmartAnalysisResults from "@/components/SmartAnalysisResults";
import MSMENewsSection from "@/components/MSMENewsSection";
import MuneemjiChatbot from "@/components/MuneemjiChatbot";

interface FormData {
  msmeNumber: string;
  tdsStatus: string;
  annualTurnover: string;
  currentLoanStatus: string;
}

type PageState = 'hero' | 'form' | 'loading' | 'results';

const Index = () => {
  const [pageState, setPageState] = useState<PageState>('hero');
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleStartAnalysis = () => {
    setPageState('form');
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setPageState('loading');
  };

  const handleLoadingComplete = () => {
    setPageState('results');
  };

  const handleStartOver = () => {
    setFormData(null);
    setPageState('hero');
  };

  return (
    <div className="min-h-screen bg-background">
      <AdityaBirlaHeader />
      
      {pageState === 'hero' && (
        <>
          <HeroSection onStartAnalysis={handleStartAnalysis} />
          {/* <MSMENewsSection /> */}
        </>
      )}

      {pageState === 'form' && (
        <section className="py-20 bg-gradient-to-b from-muted/10 to-background min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <SmartAnalysisForm 
              onSubmit={handleFormSubmit} 
              isLoading={false}
            />
          </div>
        </section>
      )}

      {pageState === 'loading' && (
        <section className="py-20 bg-gradient-to-b from-muted/10 to-background min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <LoadingAnimation onComplete={handleLoadingComplete} />
          </div>
        </section>
      )}

      {pageState === 'results' && formData && (
        <>
          <section className="py-20 bg-gradient-to-b from-muted/10 to-background">
            <div className="container mx-auto px-6">
              <SmartAnalysisResults 
                formData={formData} 
                onStartOver={handleStartOver}
              />
            </div>
          </section>
          <MSMENewsSection />
        </>
      )}

      {/* Premium Corporate Footer */}
      <footer className="bg-gradient-to-b from-background via-muted/20 to-muted py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center gap-4">
              <img 
src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}logo.png`}
alt="Aditya Birla Group" 
                className="h-12 w-auto"
              />
                <div className="text-left border-l border-border pl-4">
                  <div className="text-xl font-bold text-foreground">Finance Limited</div>
                  <div className="text-muted-foreground text-sm">Smart Financial Solutions for MSMEs</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-foreground mb-4 text-base">Loan Products</h4>
                  <div className="space-y-2 text-muted-foreground text-sm">
                    <div className="hover:text-primary cursor-pointer transition-colors">Business Loans</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">Working Capital</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">Equipment Finance</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">EMI Calculator</div>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-foreground mb-4 text-base">Platform</h4>
                  <div className="space-y-2 text-muted-foreground text-sm">
                    <div className="hover:text-primary cursor-pointer transition-colors">Smart Analysis</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">Growth Advisor</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">Digital Dashboard</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">Mobile App</div>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-foreground mb-4 text-base">Support</h4>
                  <div className="space-y-2 text-muted-foreground text-sm">
                    <div className="hover:text-primary cursor-pointer transition-colors">Customer Care</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">Branch Locator</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">FAQ & Help</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">Grievance Portal</div>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-foreground mb-4 text-base">Resources</h4>
                  <div className="space-y-2 text-muted-foreground text-sm">
                    <div className="hover:text-primary cursor-pointer transition-colors">Financial Literacy</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">Business Insights</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">Market Reports</div>
                    <div className="hover:text-primary cursor-pointer transition-colors">Regulatory Updates</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border pt-8 space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-muted-foreground text-sm">
                    © 2024 Aditya Birla Finance Limited. All rights reserved.
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Cookie Policy</span>
                  </div>
                </div>
                <p className="text-center bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent font-bold text-base">
                  Powered by AI-driven insights for smarter financial decisions
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Muneem Ji Chatbot */}
      <MuneemjiChatbot onNavigate={(section) => {
        // Handle navigation to different sections
        console.log('Navigate to:', section);
        // You can add logic here to scroll to sections or change page state
      }} />
    </div>
  );
};

export default Index;