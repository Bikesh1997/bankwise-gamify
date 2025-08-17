import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const ComplianceDashboardDetails: React.FC = () => {
  const upcomingReminders = [
    {
      id: 1,
      title: 'GST Return Filing',
      dueDate: '15th March 2024',
      status: 'due-soon',
      priority: 'high'
    },
    {
      id: 2,
      title: 'TDS Return (24Q)',
      dueDate: '31st March 2024',
      status: 'upcoming',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Annual ROC Filing',
      dueDate: '30th April 2024',
      status: 'upcoming',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Income Tax Return',
      dueDate: '31st July 2024',
      status: 'upcoming',
      priority: 'medium'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'due-soon':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string, priority: string) => {
    if (status === 'due-soon') {
      return <Badge variant="destructive" className="text-xs">Due Soon</Badge>;
    }
    if (priority === 'high') {
      return <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">High Priority</Badge>;
    }
    return <Badge variant="outline" className="text-xs">Upcoming</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* TDS Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground">TDS Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-muted-foreground">Current Status</p>
              <p className="font-semibold text-green-700">Compliant</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-muted-foreground">Next Filing Due</p>
              <p className="font-semibold text-blue-700">31st March</p>
            </div>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-muted-foreground">Outstanding Amount</p>
            <p className="font-semibold text-amber-700">₹0 (All Clear)</p>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Reminders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground">Upcoming Reminders</h4>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
        </div>
        
        <div className="space-y-3">
          {upcomingReminders.map((reminder) => (
            <Card key={reminder.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(reminder.status)}
                    <div>
                      <h5 className="font-medium text-foreground">{reminder.title}</h5>
                      <p className="text-sm text-muted-foreground">Due: {reminder.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(reminder.status, reminder.priority)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Quick Actions</h4>
        <div className="grid grid-cols-1 gap-3">
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <p className="font-medium">View All Compliance Tasks</p>
              <p className="text-sm text-muted-foreground">Complete overview of all regulatory requirements</p>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <p className="font-medium">Set Custom Reminders</p>
              <p className="text-sm text-muted-foreground">Never miss important compliance deadlines</p>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <p className="font-medium">Download Compliance Report</p>
              <p className="text-sm text-muted-foreground">Get detailed compliance status report</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboardDetails;