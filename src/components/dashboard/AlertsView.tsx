import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, TrendingDown, FileWarning, Clock, Target, TrendingUp, Shield, CheckCircle, X, Filter, MoreVertical, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  category: "credit_limit" | "payment" | "credit_score" | "disputes" | "behavior" | "market";
  severity: 1 | 2 | 3 | 4 | 5;
  title: string;
  description: string;
  details: string;
  impact: string;
  recommendation: string;
  vendorId: string;
  vendorName: string;
  timestamp: string;
  estimatedResolutionTime: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "new" | "acknowledged" | "in_progress" | "resolved";
  assignedTo?: string;
  tags: string[];
  relatedMetrics: {
    current: string;
    threshold: string;
    trend: "up" | "down" | "stable";
  };
  icon: React.ReactNode;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    category: "credit_limit",
    severity: 5,
    title: "Critical Credit Limit Breach Imminent",
    description: "Delta Electronics Ltd. has utilized 95% of their credit limit",
    details: "Current utilization: ₹9.5 Cr out of ₹10 Cr limit. Vendor has pending orders worth ₹1.8 Cr that cannot be processed.",
    impact: "Potential business disruption and strained vendor relationship. Risk of payment default if limit exceeded.",
    recommendation: "Immediately review and increase credit limit to ₹15 Cr or implement payment acceleration program.",
    vendorId: "VND001",
    vendorName: "Delta Electronics Ltd.",
    timestamp: "2 hours ago",
    estimatedResolutionTime: "2-4 hours",
    priority: "urgent",
    status: "new",
    assignedTo: "Risk Team",
    tags: ["limit_breach", "high_value", "tier_1"],
    relatedMetrics: {
      current: "95%",
      threshold: "90%",
      trend: "up"
    },
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    id: "2",
    type: "critical",
    category: "payment",
    severity: 5,
    title: "Severe Payment Overdue - Collection Risk",
    description: "Eta Steel Works payment overdue by 45 days",
    details: "Outstanding amount: ₹3.2 Cr. Last contact: 15 days ago. Vendor cited cash flow issues due to delayed customer payments.",
    impact: "High probability of bad debt. Potential write-off of ₹3.2 Cr affecting quarterly financials.",
    recommendation: "Escalate to legal team for collection proceedings. Consider asset seizure or restructuring agreement.",
    vendorId: "VND045",
    vendorName: "Eta Steel Works",
    timestamp: "5 hours ago",
    estimatedResolutionTime: "1-2 weeks",
    priority: "urgent",
    status: "in_progress",
    assignedTo: "Collections Team",
    tags: ["overdue", "legal_risk", "cash_flow"],
    relatedMetrics: {
      current: "45 days",
      threshold: "30 days",
      trend: "up"
    },
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    id: "3",
    type: "warning",
    category: "credit_score",
    severity: 3,
    title: "Significant Credit Score Deterioration",
    description: "Gamma Industries credit score declined by 14 points",
    details: "Score dropped from 82 to 68 over 30 days. Contributing factors: delayed supplier payments, increased debt-to-equity ratio.",
    impact: "Elevated default risk. May affect future credit terms and require additional collateral.",
    recommendation: "Schedule credit review meeting. Consider reducing credit limit to ₹5 Cr and requiring monthly financial statements.",
    vendorId: "VND078",
    vendorName: "Gamma Industries",
    timestamp: "1 day ago",
    estimatedResolutionTime: "3-5 days",
    priority: "high",
    status: "acknowledged",
    assignedTo: "Credit Analyst",
    tags: ["credit_decline", "financial_stress", "monitoring"],
    relatedMetrics: {
      current: "68",
      threshold: "75",
      trend: "down"
    },
    icon: <TrendingDown className="h-5 w-5" />,
  },
  {
    id: "4",
    type: "warning",
    category: "disputes",
    severity: 3,
    title: "Abnormal Dispute Pattern Detected",
    description: "Kappa Manufacturing raised 5 disputes in 15 days",
    details: "Recent disputes: quality issues (2), delivery delays (2), pricing discrepancy (1). Average resolution time: 8 days.",
    impact: "Operational inefficiency and strained relationship. Potential quality control issues in supply chain.",
    recommendation: "Conduct vendor audit and quality assessment. Implement enhanced communication protocols.",
    vendorId: "VND092",
    vendorName: "Kappa Manufacturing",
    timestamp: "1 day ago",
    estimatedResolutionTime: "1 week",
    priority: "medium",
    status: "new",
    tags: ["disputes", "quality_issues", "relationship"],
    relatedMetrics: {
      current: "5",
      threshold: "3",
      trend: "up"
    },
    icon: <FileWarning className="h-5 w-5" />,
  },
  {
    id: "5",
    type: "info",
    category: "behavior",
    severity: 2,
    title: "Purchase Pattern Anomaly",
    description: "Mu Enterprises purchase frequency dropped 40%",
    details: "Monthly average decreased from 25 to 15 orders. Vendor reported seasonal business adjustment and market slowdown.",
    impact: "Reduced business volume. Potential early indicator of financial stress or market shift.",
    recommendation: "Monitor closely for 2 months. Schedule business review to understand market conditions.",
    vendorId: "VND156",
    vendorName: "Mu Enterprises",
    timestamp: "2 days ago",
    estimatedResolutionTime: "2 weeks",
    priority: "low",
    status: "new",
    tags: ["purchase_decline", "seasonal", "market_trend"],
    relatedMetrics: {
      current: "15",
      threshold: "20",
      trend: "down"
    },
    icon: <TrendingDown className="h-5 w-5" />,
  },
  {
    id: "6",
    type: "critical",
    category: "market",
    severity: 4,
    title: "Industry Sector Risk Alert",
    description: "Automotive sector showing stress indicators",
    details: "3 automotive vendors showing credit deterioration. Industry facing supply chain disruptions and EV transition challenges.",
    impact: "Portfolio concentration risk. Potential cascading defaults in automotive sector.",
    recommendation: "Conduct sector-wide risk assessment. Consider diversification strategies and enhanced monitoring.",
    vendorId: "SECTOR001",
    vendorName: "Automotive Sector",
    timestamp: "3 hours ago",
    estimatedResolutionTime: "2-3 weeks",
    priority: "high",
    status: "new",
    assignedTo: "Portfolio Manager",
    tags: ["sector_risk", "concentration", "systemic"],
    relatedMetrics: {
      current: "3 vendors",
      threshold: "2 vendors",
      trend: "up"
    },
    icon: <Shield className="h-5 w-5" />,
  },
];

export const AlertsView = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return "border-destructive/50 bg-destructive/5";
      case "warning":
        return "border-warning/50 bg-warning/5";
      case "info":
        return "border-accent/50 bg-accent/5";
    }
  };

  const getIconColor = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return "text-destructive";
      case "warning":
        return "text-warning";
      case "info":
        return "text-accent";
    }
  };

  const getPriorityColor = (priority: Alert["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getStatusColor = (status: Alert["status"]) => {
    switch (status) {
      case "new":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "acknowledged":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-red-500" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      case "stable":
        return <Target className="h-3 w-3 text-green-500" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "urgent") return alert.priority === "urgent";
    if (selectedFilter === "critical") return alert.type === "critical";
    if (selectedFilter === "new") return alert.status === "new";
    return alert.category === selectedFilter;
  });

  const alertCategories = [
    { id: "all", label: "All Alerts", count: alerts.length },
    { id: "urgent", label: "Urgent", count: alerts.filter(a => a.priority === "urgent").length },
    { id: "critical", label: "Critical", count: alerts.filter(a => a.type === "critical").length },
    { id: "new", label: "New", count: alerts.filter(a => a.status === "new").length },
    { id: "credit_limit", label: "Credit Limits", count: alerts.filter(a => a.category === "credit_limit").length },
    { id: "payment", label: "Payments", count: alerts.filter(a => a.category === "payment").length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Advanced Alert & Risk Management System</h2>
          <p className="text-muted-foreground mt-2">AI-powered early warning system with actionable insights</p>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Advanced Filtering</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-destructive/50 bg-destructive/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
              <p className="text-3xl font-bold text-destructive mt-1">
                {alerts.filter(a => a.type === "critical").length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Require immediate action</p>
            </div>
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
        </Card>
        <Card className="p-4 border-warning/50 bg-warning/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">High Priority</p>
              <p className="text-3xl font-bold text-warning mt-1">
                {alerts.filter(a => a.priority === "high" || a.priority === "urgent").length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Next 24 hours</p>
            </div>
            <Clock className="h-10 w-10 text-warning" />
          </div>
        </Card>
        <Card className="p-4 border-blue-500/50 bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">In Progress</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {alerts.filter(a => a.status === "in_progress").length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Being resolved</p>
            </div>
            <Target className="h-10 w-10 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4 border-green-500/50 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Resolution</p>
              <p className="text-3xl font-bold text-green-600 mt-1">4.2</p>
              <p className="text-xs text-muted-foreground mt-1">Days to resolve</p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {alertCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedFilter === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(category.id)}
            className="h-8"
          >
            {category.label}
            {category.count > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                {category.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Enhanced Alert Cards */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={cn("transition-all duration-200", getAlertStyles(alert.type))}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={cn("mt-1 p-2 rounded-full", getIconColor(alert.type).replace('text-', 'bg-').replace('destructive', 'destructive/10').replace('warning', 'warning/10').replace('accent', 'accent/10'))}>
                  <div className={getIconColor(alert.type)}>
                    {alert.icon}
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{alert.title}</h3>
                        <Badge className={cn("text-xs", getPriorityColor(alert.priority))}>
                          {alert.priority.toUpperCase()}
                        </Badge>
                        <Badge className={cn("text-xs", getStatusColor(alert.status))}>
                          {alert.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          ETA: {alert.estimatedResolutionTime}
                        </span>
                        {alert.assignedTo && (
                          <span className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            {alert.assignedTo}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-lg">
                      <span className="text-xs font-medium">Vendor:</span>
                      <span className="text-xs">{alert.vendorName}</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-muted/50 rounded-lg">
                      <span className="text-xs font-medium">Current:</span>
                      <span className="text-xs">{alert.relatedMetrics.current}</span>
                      {getTrendIcon(alert.relatedMetrics.trend)}
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-muted/50 rounded-lg">
                      <span className="text-xs font-medium">Threshold:</span>
                      <span className="text-xs">{alert.relatedMetrics.threshold}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {alert.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                  
                  {expandedAlert === alert.id && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Detailed Analysis</h4>
                        <p className="text-sm text-muted-foreground">{alert.details}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Business Impact</h4>
                        <p className="text-sm text-muted-foreground">{alert.impact}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Recommended Actions</h4>
                        <p className="text-sm text-muted-foreground">{alert.recommendation}</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="default">
                          Take Action
                        </Button>
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                        <Button size="sm" variant="ghost">
                          Assign
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Enhanced Configuration Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Alert Thresholds & Configuration</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <span className="text-sm font-medium">Credit Limit Utilization</span>
                <p className="text-xs text-muted-foreground">Critical threshold for vendor limits</p>
              </div>
              <span className="text-sm font-bold text-destructive">90%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <span className="text-sm font-medium">Payment Overdue Trigger</span>
                <p className="text-xs text-muted-foreground">Days before collection escalation</p>
              </div>
              <span className="text-sm font-bold text-warning">30 days</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <span className="text-sm font-medium">Credit Score Decline</span>
                <p className="text-xs text-muted-foreground">Points drop triggering review</p>
              </div>
              <span className="text-sm font-bold text-warning">10 points</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <span className="text-sm font-medium">Dispute Frequency</span>
                <p className="text-xs text-muted-foreground">Monthly disputes before audit</p>
              </div>
              <span className="text-sm font-bold text-accent">3 disputes</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Performance Metrics</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <span className="text-sm font-medium text-green-800">Alert Accuracy</span>
                <p className="text-xs text-green-600">True positive rate</p>
              </div>
              <span className="text-sm font-bold text-green-800">94.2%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <span className="text-sm font-medium text-blue-800">Avg Response Time</span>
                <p className="text-xs text-blue-600">From alert to action</p>
              </div>
              <span className="text-sm font-bold text-blue-800">2.4 hours</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <span className="text-sm font-medium text-purple-800">Risk Prevention</span>
                <p className="text-xs text-purple-600">Potential losses avoided</p>
              </div>
              <span className="text-sm font-bold text-purple-800">₹45.2 Cr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <span className="text-sm font-medium text-orange-800">Active Monitoring</span>
                <p className="text-xs text-orange-600">Vendors under watch</p>
              </div>
              <span className="text-sm font-bold text-orange-800">47 vendors</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
