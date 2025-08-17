import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Truck, 
  Package, 
  Star, 
  TrendingDown, 
  AlertCircle,
  CheckCircle,
  DollarSign,
  BarChart3
} from 'lucide-react';

const VendorOptimizationDetails: React.FC = () => {
  const costEffectiveSuppliers = [
    { name: 'ABC Suppliers Ltd.', category: 'Raw Materials', savings: '12%', rating: 4.2, status: 'recommended' },
    { name: 'Quality Parts Co.', category: 'Components', savings: '8%', rating: 4.5, status: 'recommended' },
    { name: 'Fast Logistics', category: 'Transportation', savings: '15%', rating: 4.0, status: 'new' }
  ];

  const inventoryLevels = [
    { item: 'Raw Material A', current: 85, optimal: 60, status: 'overstocked' },
    { item: 'Component B', current: 25, optimal: 40, status: 'understocked' },
    { item: 'Product C', current: 45, optimal: 50, status: 'optimal' }
  ];

  const vendorPerformance = [
    { name: 'Current Supplier 1', onTimeDelivery: 95, quality: 4.3, cost: 'High', overall: 4.1 },
    { name: 'Current Supplier 2', onTimeDelivery: 87, quality: 4.0, cost: 'Medium', overall: 3.8 },
    { name: 'Current Supplier 3', onTimeDelivery: 92, quality: 4.5, cost: 'Low', overall: 4.4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overstocked': return 'text-red-600';
      case 'understocked': return 'text-yellow-600';
      case 'optimal': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overstocked': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'understocked': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'optimal': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Supply Chain & Vendor Optimization</h2>
        <p className="text-muted-foreground">Optimize your supply chain for maximum efficiency and cost savings</p>
      </div>

      {/* Cost Effective Suppliers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Cost Effective Suppliers
          </CardTitle>
          <CardDescription>
            Recommended suppliers that can reduce your costs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {costEffectiveSuppliers.map((supplier, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{supplier.name}</p>
                  <p className="text-sm text-muted-foreground">{supplier.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <TrendingDown className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">{supplier.savings} savings</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm text-muted-foreground">{supplier.rating}</span>
                  </div>
                </div>
                <Badge variant={supplier.status === 'recommended' ? 'default' : 'secondary'}>
                  {supplier.status === 'recommended' ? 'Recommended' : 'New'}
                </Badge>
                <Button size="sm">
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Inventory Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Optimal Inventory Levels
          </CardTitle>
          <CardDescription>
            Insights on inventory optimization to reduce holding costs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {inventoryLevels.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className="font-medium">{item.item}</span>
                </div>
                <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Current: {item.current}</span>
                  <span>Optimal: {item.optimal}</span>
                </div>
                <Progress 
                  value={(item.current / Math.max(item.current, item.optimal)) * 100} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Vendor Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Vendor Performance Rating
          </CardTitle>
          <CardDescription>
            Performance analysis of your current vendors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {vendorPerformance.map((vendor, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{vendor.name}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{vendor.overall}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">On-time Delivery</p>
                  <p className="font-medium">{vendor.onTimeDelivery}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quality Rating</p>
                  <p className="font-medium">{vendor.quality}/5</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cost Level</p>
                  <Badge variant={
                    vendor.cost === 'Low' ? 'default' : 
                    vendor.cost === 'Medium' ? 'secondary' : 'destructive'
                  }>
                    {vendor.cost}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button variant="outline" className="justify-start gap-2">
          <BarChart3 className="h-4 w-4" />
          Generate Vendor Report
        </Button>
        <Button variant="outline" className="justify-start gap-2">
          <Package className="h-4 w-4" />
          Optimize Inventory
        </Button>
      </div>

      <Button className="w-full" size="lg">
        Get Complete Supply Chain Analysis
      </Button>
    </div>
  );
};

export default VendorOptimizationDetails;