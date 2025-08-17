import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, User, Settings, Search } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="w-full bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">U+</span>
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">Udyog Plus</h1>
                <p className="text-xs text-muted-foreground">AI-Powered MSME Solutions</p>
              </div>
            </div>
            <Badge className="bg-secondary text-secondary-foreground text-xs">
              Smart Dashboard
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search compliance, alerts..."
                className="pl-8 pr-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring w-64"
              />
            </div>
            
            <Button size="sm" variant="ghost" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                3
              </Badge>
            </Button>
            
            <Button size="sm" variant="ghost">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Rajesh Kumar</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;