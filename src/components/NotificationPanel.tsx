import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertCircle, Info, TrendingUp, X } from "lucide-react";

const NotificationPanel = () => {
  const notifications = [
    {
      id: 1,
      type: "regulatory",
      icon: <AlertCircle className="h-4 w-4" />,
      title: "GST Rate Change Alert",
      message: "GST rate for textile products increased to 12% effective 1st Feb 2024. Update your pricing and billing systems.",
      actionLabel: "View Changes",
      priority: "high",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "opportunity",
      icon: <TrendingUp className="h-4 w-4" />,
      title: "New Government Scheme",
      message: "MSME Credit Guarantee Scheme 3.0 launched with enhanced benefits. Apply before 31st March 2024.",
      actionLabel: "Learn More",
      priority: "medium",
      timestamp: "1 day ago"
    },
    {
      id: 3,
      type: "info",
      icon: <Info className="h-4 w-4" />,
      title: "Compliance Update",
      message: "New ITR forms available for AY 2024-25. Download updated forms and instructions.",
      actionLabel: "Download",
      priority: "low",
      timestamp: "3 days ago"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-destructive bg-destructive/5";
      case "medium":
        return "border-l-warning bg-warning/5";
      case "low":
        return "border-l-primary bg-primary/5";
      default:
        return "border-l-muted";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "regulatory":
        return "bg-destructive text-destructive-foreground";
      case "opportunity":
        return "bg-secondary text-secondary-foreground";
      case "info":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Smart Alerts
          </div>
          <Badge variant="secondary" className="text-xs">
            3 New
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`relative p-3 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} transition-all hover:shadow-sm`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={`${getTypeColor(notification.type)} text-xs px-2 py-1`}>
                    {notification.icon}
                    <span className="ml-1 capitalize">{notification.type}</span>
                  </Badge>
                  <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                </div>
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {notification.message}
                </p>
                <Button size="sm" variant="outline" className="text-xs h-7">
                  {notification.actionLabel}
                </Button>
              </div>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button variant="ghost" className="w-full text-xs" size="sm">
            View All Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;