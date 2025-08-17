import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Brain, FileSearch, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: FileSearch,
      title: "Analyzing Your Profile",
      description: "Processing MSME registration and financial data"
    },
    {
      icon: Brain,
      title: "AI-Powered Assessment",
      description: "Evaluating loan eligibility and compliance status"
    },
    {
      icon: TrendingUp,
      title: "Generating Insights",
      description: "Creating personalized recommendations and opportunities"
    },
    {
      icon: CheckCircle,
      title: "Finalizing Report",
      description: "Preparing your comprehensive analysis report"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        const newProgress = prev + 2;
        const newStep = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(newStep, steps.length - 1));
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-elegant border-border/20">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Running Smart Analysis
            </h2>
            <p className="text-muted-foreground">
              Our AI is analyzing your business profile to provide personalized insights
            </p>
          </div>

          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-primary">{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-3 bg-muted progress-enhanced"
              />
            </div>

            {/* Current Step */}
            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                      isActive 
                        ? 'bg-primary/5 border border-primary/20 scale-105' 
                        : isCompleted
                        ? 'bg-success/5 border border-success/20'
                        : 'bg-muted/30 border border-border/10'
                    }`}
                  >
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500
                      ${isActive 
                        ? 'bg-primary text-primary-foreground animate-pulse' 
                        : isCompleted 
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-5 w-5 text-success animate-fade-in" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Status Message */}
            <div className="text-center p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
              <p className="text-sm font-medium text-foreground">
                {progress < 100 ? steps[currentStep]?.title : "Analysis Complete!"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingAnimation;