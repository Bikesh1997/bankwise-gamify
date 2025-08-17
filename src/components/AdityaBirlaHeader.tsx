import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, User, Settings, Search, Shield, ChevronDown } from "lucide-react";
import { useState } from "react";

const AdityaBirlaHeader = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="w-full bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <img 
src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}logo.png`}
alt="Aditya Birla Group" 
                className="h-12 w-auto"
              />
              <div className="border-l border-border pl-4">
                <h1 className="font-bold text-xl text-foreground tracking-tight">Finance Limited</h1>
                <p className="text-xs text-muted-foreground font-medium">Smart Financial Solutions for MSMEs</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-secondary to-secondary-dark text-secondary-foreground text-xs font-medium px-3 py-1 hover:shadow-md transition-all duration-300">
                <Shield className="h-3 w-3 mr-1" />
                Secure Dashboard
              </Badge>
              <Badge variant="outline" className="text-xs font-medium px-3 py-1 hover:bg-accent transition-all duration-300">
                Digital Platform
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search loans, payments, alerts..."
                className="input-enhanced pl-10 pr-4 py-3 text-sm rounded-lg w-80 font-medium placeholder:text-muted-foreground/70"
              />
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <Button 
                size="sm" 
                variant="ghost" 
                className="btn-ghost-enhanced relative"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center p-0 animate-pulse">
                  5
                </Badge>
              </Button>
              
              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-elegant z-50 notification-slide-in">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                  </div>
                  <div className="p-2 space-y-2 max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-muted rounded-md cursor-pointer transition-colors">
                      <p className="text-sm font-medium">EMI Due Tomorrow</p>
                      <p className="text-xs text-muted-foreground">₹25,000 payment due</p>
                    </div>
                    <div className="p-3 hover:bg-muted rounded-md cursor-pointer transition-colors">
                      <p className="text-sm font-medium">New Loan Offer</p>
                      <p className="text-xs text-muted-foreground">Pre-approved at 8.5% interest</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button size="sm" variant="ghost" className="btn-ghost-enhanced">
              <Settings className="h-4 w-4" />
            </Button>
            
            {/* User Profile */}
            <div className="relative">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-2 hover:bg-accent transition-all duration-300 hover:shadow-md"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div className="text-left hidden sm:block">
                  <span className="text-sm font-semibold">Rajesh Kumar</span>
                  <p className="text-xs text-muted-foreground">Premium Customer</p>
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-elegant z-50 notification-slide-in">
                  <div className="p-2 space-y-1">
                    <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm transition-colors">Profile Settings</button>
                    <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm transition-colors">Account Details</button>
                    <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm transition-colors">Security</button>
                    <hr className="my-1" />
                    <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm text-destructive transition-colors">Sign Out</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdityaBirlaHeader;