import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ExecutiveSummary } from "@/components/dashboard/ExecutiveSummary";
import { WorkingCapitalView } from "@/components/dashboard/WorkingCapitalView";
import { CreditExposureView } from "@/components/dashboard/CreditExposureView";
import { VendorPerformanceView } from "@/components/dashboard/VendorPerformanceView";
import { OperationalEfficiencyView } from "@/components/dashboard/OperationalEfficiencyView";
import { AlertsView } from "@/components/dashboard/AlertsView";

const Index = () => {
  const [activeSection, setActiveSection] = useState("summary");

  const renderSection = () => {
    switch (activeSection) {
      case "summary":
        return <ExecutiveSummary />;
      case "capital":
        return <WorkingCapitalView />;
      case "exposure":
        return <CreditExposureView />;
      case "vendors":
        return <VendorPerformanceView />;
      case "efficiency":
        return <OperationalEfficiencyView />;
      case "alerts":
        return <AlertsView />;
      case "simulation":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Scenario Planning & Simulation</h2>
              <p className="text-muted-foreground mt-2">Coming soon - Model different credit scenarios</p>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Monthly Reports</h2>
              <p className="text-muted-foreground mt-2">Coming soon - Export and download reports</p>
            </div>
          </div>
        );
      default:
        return <ExecutiveSummary />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default Index;
