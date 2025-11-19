import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  AlertCircle,
  Users,
  Activity,
  Settings,
  FileText,
  Bell,
} from "lucide-react";

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: "summary", label: "Executive Summary", icon: LayoutDashboard },
  { id: "capital", label: "Working Capital", icon: TrendingUp },
  { id: "exposure", label: "Credit Exposure", icon: AlertCircle },
  { id: "vendors", label: "Vendor Performance", icon: Users },
  { id: "efficiency", label: "Operational Efficiency", icon: Activity },
  { id: "simulation", label: "Scenario Planning", icon: Settings },
  { id: "alerts", label: "Alerts & Warnings", icon: Bell },
  { id: "reports", label: "Monthly Reports", icon: FileText },
];

export const DashboardSidebar = ({ activeSection, onSectionChange }: DashboardSidebarProps) => {
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Rishabh World</h1>
        <p className="text-sm text-sidebar-foreground/70 mt-1">Credit Dashboard</p>
      </div>
      <nav className="space-y-1 px-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeSection === section.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {section.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
