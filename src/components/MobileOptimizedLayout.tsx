import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
}

const MobileOptimizedLayout = ({ children }: MobileOptimizedLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <div className="block lg:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 right-4 z-50 bg-card shadow-md"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">AB</span>
                </div>
                <div>
                  <h3 className="font-semibold">Quick Actions</h3>
                  <p className="text-xs text-muted-foreground">Tap to navigate</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" size="lg">
                  Dashboard Overview
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="lg">
                  My Loans
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="lg">
                  Compliance Tasks
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="lg">
                  Growth Opportunities
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="lg">
                  Learning Center
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default MobileOptimizedLayout;