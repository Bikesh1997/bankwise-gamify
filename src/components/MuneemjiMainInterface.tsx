import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LoanOverviewDetails from '@/components/muneem-details/LoanOverviewDetails';
import ComplianceDashboardDetails from '@/components/muneem-details/ComplianceDashboardDetails';
import RegulatoryUpdatesDetails from '@/components/muneem-details/RegulatoryUpdatesDetails';
import GrowthAdvisorDetails from '@/components/muneem-details/GrowthAdvisorDetails';
import MSMEUpdatesDetails from '@/components/muneem-details/MSMEUpdatesDetails';
import FinancialTipsDetails from '@/components/muneem-details/FinancialTipsDetails';

interface MuneemjiMainInterfaceProps {
  onNavigate?: (section: string) => void;
}

const MuneemjiMainInterface: React.FC<MuneemjiMainInterfaceProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const menuOptions = [
    { id: 'compliance', label: 'Compliance Dashboard', icon: '📊' },
    { id: 'loans', label: 'Loan Overview', icon: '💰' },
    { id: 'regulatory', label: 'Regulatory Updates', icon: '📋' },
    { id: 'growth', label: 'Growth Advisor', icon: '📈' },
    { id: 'msme', label: 'Latest MSME Updates', icon: '📰' },
    { id: 'financial', label: 'Financial Tips', icon: '💡' }
  ];

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
    if (onNavigate) onNavigate(optionId);
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedOption(null);
  };

  const renderDetailComponent = (optionId: string) => {
    switch (optionId) {
      case 'loans':
        return <LoanOverviewDetails />;
      case 'compliance':
        return <ComplianceDashboardDetails />;
      case 'regulatory':
        return <RegulatoryUpdatesDetails />;
      case 'growth':
        return <GrowthAdvisorDetails />;
      case 'msme':
        return <MSMEUpdatesDetails />;
      case 'financial':
        return <FinancialTipsDetails />;
      default:
        return <div>Content not available</div>;
    }
  };

  return (
    <>
      {/* Floating Muneem Ji Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Muneem Ji Assistant"
          className="h-20 w-20 rounded-full bg-white shadow-xl border-4 border-white hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <img
             src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}lovable-uploads/c7ef736c-7271-43d1-9fdf-7106dc697ab2.png`}
            alt="Muneem Ji"
            className="h-full w-full object-contain rounded-full"
          />
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-white"></div>
        </button>
      </div>

      {/* Main Interface Dialog */}
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-3">
              {selectedOption && (
                <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <img 
            src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}lovable-uploads/c7ef736c-7271-43d1-9fdf-7106dc697ab2.png`}
            alt="Muneem Ji"
                className="h-10 w-10 object-contain bg-muted/20 rounded-full p-1"
              />
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {selectedOption ? menuOptions.find(opt => opt.id === selectedOption)?.label : 'Muneem Ji'}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">Your Digital Business Assistant</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {!selectedOption ? (
              // Main Menu
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Namaste! Choose an option:
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {menuOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      onClick={() => handleOptionClick(option.id)}
                      className="justify-start gap-4 p-6 h-auto text-left border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200"
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              // Detail View
              <div className="space-y-4">
                {renderDetailComponent(selectedOption)}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MuneemjiMainInterface;