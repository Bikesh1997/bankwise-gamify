import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  FileText,
  CreditCard,
  Building
} from 'lucide-react';

const RemindersDetails: React.FC = () => {
  const [showAddReminder, setShowAddReminder] = useState(false);

  const activeReminders = [
    {
      id: 1,
      title: 'GST Return Filing',
      description: 'Monthly GST return filing due',
      type: 'compliance',
      frequency: 'Monthly',
      nextDue: '2024-01-20',
      priority: 'high',
      enabled: true
    },
    {
      id: 2,
      title: 'TDS Payment',
      description: 'Quarterly TDS payment reminder',
      type: 'tax',
      frequency: 'Quarterly',
      nextDue: '2024-01-25',
      priority: 'medium',
      enabled: true
    },
    {
      id: 3,
      title: 'License Renewal',
      description: 'Trade license renewal reminder',
      type: 'license',
      frequency: 'Yearly',
      nextDue: '2024-03-15',
      priority: 'low',
      enabled: false
    },
    {
      id: 4,
      title: 'Bank Statement Review',
      description: 'Monthly bank statement analysis',
      type: 'financial',
      frequency: 'Monthly',
      nextDue: '2024-02-01',
      priority: 'medium',
      enabled: true
    }
  ];

  const upcomingTasks = [
    { task: 'GST Return Filing', dueDate: '2024-01-20', daysLeft: 5, type: 'urgent' },
    { task: 'Employee PF Contribution', dueDate: '2024-01-22', daysLeft: 7, type: 'important' },
    { task: 'Insurance Premium Payment', dueDate: '2024-01-28', daysLeft: 13, type: 'normal' }
  ];

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'compliance': return <FileText className="h-4 w-4" />;
      case 'tax': return <CreditCard className="h-4 w-4" />;
      case 'license': return <Building className="h-4 w-4" />;
      case 'financial': return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'border-red-200 bg-red-50';
      case 'important': return 'border-yellow-200 bg-yellow-50';
      case 'normal': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Smart Reminders</h2>
        <p className="text-muted-foreground">Never miss important business deadlines and tasks</p>
      </div>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Upcoming Tasks
          </CardTitle>
          <CardDescription>
            Tasks and deadlines in the next 30 days
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingTasks.map((task, index) => (
            <div key={index} className={`p-3 rounded-lg border-2 ${getTaskTypeColor(task.type)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                </div>
                <Badge className={`${
                  task.type === 'urgent' ? 'bg-red-100 text-red-800' :
                  task.type === 'important' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {task.daysLeft} days left
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Reminders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Active Reminders
            </CardTitle>
            <CardDescription>
              Manage your recurring reminders and notifications
            </CardDescription>
          </div>
          <Button 
            onClick={() => setShowAddReminder(!showAddReminder)}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Reminder
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddReminder && (
            <Card className="border-2 border-dashed border-primary/30">
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reminderTitle">Reminder Title</Label>
                    <Input id="reminderTitle" placeholder="e.g., VAT Return Filing" />
                  </div>
                  <div>
                    <Label htmlFor="reminderType">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="tax">Tax</SelectItem>
                        <SelectItem value="license">License</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nextDue">Next Due Date</Label>
                    <Input id="nextDue" type="date" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Reminder
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAddReminder(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeReminders.map((reminder) => (
            <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getReminderIcon(reminder.type)}
                <div>
                  <p className="font-medium">{reminder.title}</p>
                  <p className="text-sm text-muted-foreground">{reminder.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {reminder.frequency}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(reminder.priority)}`}>
                      {reminder.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Next: {reminder.nextDue}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={reminder.enabled} />
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button variant="outline" className="justify-start gap-2">
          <Calendar className="h-4 w-4" />
          Sync with Calendar
        </Button>
        <Button variant="outline" className="justify-start gap-2">
          <Bell className="h-4 w-4" />
          Notification Settings
        </Button>
      </div>

      <Button className="w-full" size="lg">
        <Bell className="h-4 w-4 mr-2" />
        View All Reminders
      </Button>
    </div>
  );
};

export default RemindersDetails;