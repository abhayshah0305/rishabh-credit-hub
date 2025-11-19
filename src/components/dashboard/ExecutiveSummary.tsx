import { KpiCard } from "./KpiCard";
import { TrendingUp, Clock, FileText, DollarSign, CheckCircle, AlertTriangle } from "lucide-react";

export const ExecutiveSummary = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Executive Summary</h2>
        <p className="text-muted-foreground mt-2">High-level performance metrics at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KpiCard
          title="Total Working Capital Unlocked"
          value="₹45.2 Cr"
          change={23.5}
          changeLabel="vs last month"
          trend="up"
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <KpiCard
          title="Credit Cycle Compression"
          value="5 Days"
          change={88.9}
          changeLabel="from 45 days"
          trend="up"
          icon={<Clock className="h-6 w-6" />}
        />
        <KpiCard
          title="Total Invoices Financed"
          value="₹52.8 Cr"
          change={15.2}
          changeLabel="1,247 invoices"
          trend="up"
          icon={<FileText className="h-6 w-6" />}
        />
        <KpiCard
          title="Amount Financed by NBFC"
          value="₹48.5 Cr"
          change={18.7}
          changeLabel="vs last month"
          trend="up"
          icon={<DollarSign className="h-6 w-6" />}
        />
        <KpiCard
          title="Vendor Repayment Performance"
          value="96.8%"
          change={2.3}
          changeLabel="on-time rate"
          trend="up"
          icon={<CheckCircle className="h-6 w-6" />}
        />
        <KpiCard
          title="RW Exposure"
          value="₹0.8 Cr"
          change={-75.4}
          changeLabel="risk transfer active"
          trend="up"
          icon={<AlertTriangle className="h-6 w-6" />}
        />
      </div>
    </div>
  );
};
