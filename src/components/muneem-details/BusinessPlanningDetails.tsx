import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  TrendingUp, 
  Calculator, 
  HelpCircle,
  ChevronRight,
  BarChart3,
  Target,
  Lightbulb
} from 'lucide-react';

const BusinessPlanningDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whatif' | 'forecast'>('whatif');
  const [whatIfQuery, setWhatIfQuery] = useState('');
  const [planningStep, setPlanningStep] = useState(1);

  const whatIfExamples = [
    "What happens to my profit if I add 2 more vendors in my supply chain?",
    "How would hiring 3 new employees affect my monthly expenses?",
    "What if I increase my product price by 10%?",
    "How would expanding to a new city impact my revenue?"
  ];

  const forecastSteps = [
    { step: 1, title: "Business Overview", description: "Tell us about your current business" },
    { step: 2, title: "Financial Goals", description: "Set your revenue and growth targets" },
    { step: 3, title: "Market Analysis", description: "Analyze your market opportunity" },
    { step: 4, title: "Resource Planning", description: "Plan your resources and investments" }
  ];

  const handleWhatIfSubmit = () => {
    if (!whatIfQuery.trim()) return;
    
    // Simulate AI response
    alert(`Analyzing: "${whatIfQuery}"\n\nBased on your current data:\n- Expected impact on monthly profit: +₹25,000\n- Payback period: 4-6 months\n- Risk level: Medium\n\nWould you like a detailed analysis report?`);
    setWhatIfQuery('');
  };

  if (activeTab === 'forecast' && planningStep > 1) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Guided Business Forecast</h2>
          <p className="text-muted-foreground">Step {planningStep} of 4: {forecastSteps[planningStep - 1].description}</p>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            {forecastSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  planningStep > step.step 
                    ? 'bg-green-500 text-white' 
                    : planningStep === step.step 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.step}
                </div>
                {index < forecastSteps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{forecastSteps[planningStep - 1].title}</CardTitle>
            <CardDescription>{forecastSteps[planningStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {planningStep === 2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentRevenue">Current Monthly Revenue</Label>
                    <Input id="currentRevenue" placeholder="₹ 5,00,000" />
                  </div>
                  <div>
                    <Label htmlFor="targetRevenue">Target Monthly Revenue (12 months)</Label>
                    <Input id="targetRevenue" placeholder="₹ 8,00,000" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="growthGoals">Growth Goals</Label>
                  <Textarea 
                    id="growthGoals" 
                    placeholder="Describe your business growth objectives..."
                    rows={3}
                  />
                </div>
              </>
            )}
            
            {planningStep === 3 && (
              <>
                <div>
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <Input id="targetMarket" placeholder="SME manufacturers in Mumbai" />
                </div>
                <div>
                  <Label htmlFor="competition">Competition Analysis</Label>
                  <Textarea 
                    id="competition" 
                    placeholder="Describe your main competitors and market position..."
                    rows={3}
                  />
                </div>
              </>
            )}

            {planningStep === 4 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="requiredInvestment">Required Investment</Label>
                    <Input id="requiredInvestment" placeholder="₹ 10,00,000" />
                  </div>
                  <div>
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input id="timeline" placeholder="12 months" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="resources">Resource Requirements</Label>
                  <Textarea 
                    id="resources" 
                    placeholder="List required resources, staff, equipment..."
                    rows={3}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => planningStep > 1 ? setPlanningStep(planningStep - 1) : setActiveTab('whatif')}
          >
            Back
          </Button>
          <Button 
            onClick={() => planningStep < 4 ? setPlanningStep(planningStep + 1) : alert('Business forecast completed! Generating your comprehensive business plan...')}
          >
            {planningStep < 4 ? 'Next' : 'Generate Plan'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Business Planning Assistant</h2>
        <p className="text-muted-foreground">AI-powered business planning using natural language</p>
      </div>

      {/* Tab Selection */}
      <div className="flex space-x-2 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === 'whatif' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('whatif')}
          className="flex-1"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          What If Analysis
        </Button>
        <Button
          variant={activeTab === 'forecast' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('forecast')}
          className="flex-1"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Business Forecast
        </Button>
      </div>

      {activeTab === 'whatif' ? (
        <div className="space-y-6">
          {/* What If Query */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Ask "What If" Questions
              </CardTitle>
              <CardDescription>
                Get instant insights by asking hypothetical business questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatif">Your Question</Label>
                <Textarea
                  id="whatif"
                  placeholder="What happens to my profit if I add 2 more vendors in my supply chain?"
                  value={whatIfQuery}
                  onChange={(e) => setWhatIfQuery(e.target.value)}
                  rows={3}
                />
              </div>
              <Button onClick={handleWhatIfSubmit} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Analyze Impact
              </Button>
            </CardContent>
          </Card>

          {/* Example Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Example Questions
              </CardTitle>
              <CardDescription>
                Click on any example to try it out
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {whatIfExamples.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-3"
                  onClick={() => setWhatIfQuery(example)}
                >
                  <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  {example}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Guided Forecast Introduction */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Target className="h-5 w-5" />
                Guided Business Forecast
              </CardTitle>
              <CardDescription>
                Build a comprehensive financial plan with our interactive guide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI will guide you through creating a robust business forecast in 4 simple steps. 
                Get insights on revenue projections, market opportunities, and resource planning.
              </p>
              <Button onClick={() => setPlanningStep(2)} className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Start Business Forecast
              </Button>
            </CardContent>
          </Card>

          {/* Forecast Steps Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forecastSteps.map((step, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                      {step.step}
                    </div>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessPlanningDetails;