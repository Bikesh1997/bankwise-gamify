import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Clock,
  Bell
} from 'lucide-react';

const SmartComplianceDetails: React.FC = () => {
  const upcomingDeadlines = [
    { task: 'GST Return Filing', date: '2024-01-20', priority: 'high', daysLeft: 5 },
    { task: 'TDS Payment', date: '2024-01-25', priority: 'medium', daysLeft: 10 },
    { task: 'ESI Contribution', date: '2024-02-01', priority: 'low', daysLeft: 17 }
  ];

  const complianceStatus = [
    { item: 'GST Registration', status: 'compliant', lastUpdated: '2024-01-10' },
    { item: 'PAN Registration', status: 'compliant', lastUpdated: '2024-01-05' },
    { item: 'Labor License', status: 'expiring', lastUpdated: '2023-12-15' },
    { item: 'Fire Safety Certificate', status: 'pending', lastUpdated: '2023-11-20' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'expiring': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">SMART Compliance Dashboard</h2>
        <p className="text-muted-foreground">Stay compliant with automated tracking and reminders</p>
      </div>

      {/* Urgent Alerts */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Urgent:</strong> GST Return filing due in 5 days. Click to file now.
        </AlertDescription>
      </Alert>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Deadlines
          </CardTitle>
          <CardDescription>
            Next filing dates and compliance requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingDeadlines.map((deadline, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{deadline.task}</p>
                  <p className="text-sm text-muted-foreground">Due: {deadline.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(deadline.priority)}>
                  {deadline.daysLeft} days left
                </Badge>
                <Button size="sm" variant="outline">
                  File Now
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Compliance Status
          </CardTitle>
          <CardDescription>
            Current status of all regulatory requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {complianceStatus.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(item.status)}
                <div>
                  <p className="font-medium">{item.item}</p>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {item.lastUpdated}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={item.status === 'compliant' ? 'default' : 'destructive'}
                  className={
                    item.status === 'compliant' 
                      ? 'bg-green-100 text-green-800' 
                      : item.status === 'expiring' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button variant="outline" className="justify-start gap-2">
          <FileText className="h-4 w-4" />
          Generate Compliance Report
        </Button>
        <Button variant="outline" className="justify-start gap-2">
          <Bell className="h-4 w-4" />
          Set Custom Reminders
        </Button>
      </div>

      <Button className="w-full" size="lg">
        View All Compliance Tasks
      </Button>
    </div>
  );
};

export default SmartComplianceDetails;