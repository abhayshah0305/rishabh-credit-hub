import { Card } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, TrendingDown, FileWarning } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Vendor Nearing Limit",
    description: "Vendor C has utilized 95% of their credit limit (₹9.5 Cr / ₹10 Cr)",
    timestamp: "2 hours ago",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    id: "2",
    type: "critical",
    title: "Overdue Payment Alert",
    description: "Vendor E has payment overdue by 45 days (₹3.2 Cr)",
    timestamp: "5 hours ago",
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    id: "3",
    type: "warning",
    title: "Credit Score Decline",
    description: "Vendor G's credit score dropped from 82 to 68 in last 30 days",
    timestamp: "1 day ago",
    icon: <TrendingDown className="h-5 w-5" />,
  },
  {
    id: "4",
    type: "warning",
    title: "High Dispute Frequency",
    description: "Vendor K has raised 5 disputes in the last 15 days",
    timestamp: "1 day ago",
    icon: <FileWarning className="h-5 w-5" />,
  },
  {
    id: "5",
    type: "info",
    title: "Purchase Cycle Drop",
    description: "Vendor M's purchase frequency decreased by 40% this month",
    timestamp: "2 days ago",
    icon: <TrendingDown className="h-5 w-5" />,
  },
];

export const AlertsView = () => {
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Alerts & Early Warning System</h2>
        <p className="text-muted-foreground mt-2">Real-time flags and risk indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-destructive/50 bg-destructive/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
              <p className="text-4xl font-bold text-destructive mt-2">2</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </Card>
        <Card className="p-6 border-warning/50 bg-warning/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Warnings</p>
              <p className="text-4xl font-bold text-warning mt-2">2</p>
            </div>
            <AlertCircle className="h-12 w-12 text-warning" />
          </div>
        </Card>
        <Card className="p-6 border-accent/50 bg-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Informational</p>
              <p className="text-4xl font-bold text-accent mt-2">1</p>
            </div>
            <FileWarning className="h-12 w-12 text-accent" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={cn("p-6", getAlertStyles(alert.type))}>
            <div className="flex items-start gap-4">
              <div className={cn("mt-1", getIconColor(alert.type))}>
                {alert.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{alert.title}</h3>
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Alert Configuration</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">Credit limit utilization threshold</span>
            <span className="text-sm font-medium">90%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">Overdue payment alert trigger</span>
            <span className="text-sm font-medium">15 days</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">Credit score decline threshold</span>
            <span className="text-sm font-medium">10 points</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">Dispute frequency alert</span>
            <span className="text-sm font-medium">3 per month</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
